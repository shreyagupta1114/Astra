import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck2,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Users,
  Calendar,
  Building2,
  FileText,
  PlusCircle,
  TrendingUp,
  Receipt,
  Eye,
  Info,
  Layers,
  ArrowDown
} from 'lucide-react';
import { Milestone, ProofOfUtilization } from '../types';

export const CampaignDetailView: React.FC = () => {
  const {
    campaigns,
    selectedCampaignId,
    setCurrentView,
    openDonateModal,
    openProofModal,
    openCreatorModal,
    proofs,
    transactions,
    setCurrentRole,
    releaseTrancheDirect,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'milestones' | 'proofs' | 'ledger'>('milestones');

  const campaign = campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];

  if (!campaign) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-400">
        Campaign not found.
      </div>
    );
  }

  const campaignProofs = proofs.filter((p) => p.campaignId === campaign.id);
  const campaignTxs = transactions.filter((tx) => tx.campaignId === campaign.id);

  const percent = Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100));

  // Escrow Locked vs Released calculations
  const totalRaised = campaign.raisedAmount;
  const escrowAmount = campaign.escrowAmount;
  const releasedAmount = campaign.releasedAmount;
  const verifiedSpent = campaign.verifiedSpentAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button
          onClick={() => setCurrentView('explore')}
          className="hover:text-emerald-400 transition-colors"
        >
          Campaigns
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-300">{campaign.category}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-white truncate max-w-md">{campaign.title}</span>
      </div>

      {/* Top Banner: Campaign Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Title, Media & Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {campaign.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                Status: {campaign.status === 'in_execution' ? 'In Execution (Milestone-Funded)' : campaign.status}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {campaign.title}
            </h1>

            {/* Creator Bar with Credibility popover trigger */}
            <div className="flex items-center gap-3 pt-1">
              <img
                src={campaign.creatorAvatar}
                alt={campaign.creatorName}
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
              <div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openCreatorModal(campaign.creatorId)}
                    className="text-xs font-bold text-white hover:text-emerald-300 transition-colors flex items-center gap-1"
                  >
                    <span>{campaign.creatorName}</span>
                    <ExternalLink className="w-3 h-3 text-emerald-400" />
                  </button>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    {campaign.creatorCredibility.verifiedRate}% Verified Track Record
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {campaign.creatorOrg} • {campaign.creatorCredibility.completedCampaigns} Completed Projects
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 h-80 bg-slate-950 relative">
            <img
              src={campaign.coverImage}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-1.5 shadow-lg">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Escrow Vault Active</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs leading-relaxed text-slate-300">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">About This Campaign</h3>
            <p>{campaign.description}</p>
            <p className="text-slate-400">
              Unlike traditional platforms where funding is given to organizers in a single unchecked lump sum, VeriRupee holds 100% of these contributions in a smart contract escrow vault. Funds are only distributed in structured tranches upon administrative verification of tax invoices, vendor bills, and geotagged project delivery.
            </p>
          </div>
        </div>

        {/* Right 1 Col: Escrow & Fund Status Dashboard */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-24 shadow-xl">
            
            {/* Fund Bar Overview */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black text-white">
                  ₹{campaign.raisedAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400">
                  Goal: ₹{campaign.goalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-slate-400 pt-1">
                <span>{percent}% Funded</span>
                <span>{campaign.donorCount} Generous Donors</span>
              </div>
            </div>

            {/* Crucial "Money Raised != Money Spent" Escrow Breakdown */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                  Fund Escrow Breakdown
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Programmatic
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    Total Raised:
                  </span>
                  <span className="font-bold text-white">
                    ₹{totalRaised.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    Locked in Escrow:
                  </span>
                  <span className="font-bold text-emerald-400">
                    ₹{escrowAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    Released to Milestones:
                  </span>
                  <span className="font-bold text-blue-400">
                    ₹{releasedAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-300" />
                    Verified Vendor Payouts:
                  </span>
                  <span className="font-bold text-teal-300">
                    ₹{verifiedSpent.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                <strong className="text-emerald-300">Escrow Rule: </strong>
                Funds in Escrow cannot be withdrawn without verified vendor tax receipts approved by the platform auditor.
              </div>
            </div>

            {/* CTA Button: Contribute */}
            <div className="space-y-2">
              <button
                id="campaign-detail-donate-cta"
                onClick={() => openDonateModal(campaign)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Contribute to Escrow Vault</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Deadline: {campaign.deadline}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {campaign.donorCount} Donors
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Visual Flow Diagram: Escrow -> Milestone -> Proof -> Verification -> Release */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Transparent Capital Movement Architecture
            </h3>
            <p className="text-xs text-slate-400">
              The lifecycle of your funds through the milestone verification pipeline
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg">
            Active Escrow Protocol
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 text-xs">
          <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Step 1</span>
            <div className="font-bold text-white">Donor Contributes</div>
            <p className="text-[10px] text-slate-400">Public contributions pool</p>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-500/40 p-3.5 rounded-xl text-center space-y-1 ring-1 ring-emerald-500/20">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Step 2</span>
            <div className="font-bold text-emerald-300">Escrow Locked</div>
            <p className="text-[10px] text-slate-300">₹{escrowAmount.toLocaleString('en-IN')} safeguarded</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Step 3</span>
            <div className="font-bold text-white">Milestone Done</div>
            <p className="text-[10px] text-slate-400">Physical work completed</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Step 4</span>
            <div className="font-bold text-white">Proof Submitted</div>
            <p className="text-[10px] text-slate-400">GST invoices & geotags</p>
          </div>

          <div className="bg-blue-950/40 border border-blue-500/40 p-3.5 rounded-xl text-center space-y-1 ring-1 ring-blue-500/20">
            <span className="text-[10px] uppercase font-bold text-blue-400">Step 5</span>
            <div className="font-bold text-blue-300">Admin Releases Tranche</div>
            <p className="text-[10px] text-slate-300">Direct vendor payout</p>
          </div>
        </div>
      </div>

      {/* Tabs: Milestones, Proof of Utilization, Fund Ledger */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-800 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('milestones')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'milestones'
                ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Milestone Breakdown ({campaign.milestones.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('proofs')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'proofs'
                ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Proof of Utilization ({campaignProofs.length})</span>
            {campaignProofs.some((p) => p.status === 'pending') && (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'ledger'
                ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Fund Movement & Audit Ledger ({campaignTxs.length})</span>
          </button>
        </div>

        {/* TAB 1: Milestone Breakdown */}
        {activeTab === 'milestones' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <p>
                Milestones are executed sequentially. The creator must submit verifiable invoices before the next tranche can be released.
              </p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Completed</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> In Progress</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-600" /> Locked</span>
              </div>
            </div>

            <div className="space-y-4">
              {campaign.milestones.map((m) => {
                const milestoneProof = proofs.find((p) => p.milestoneId === m.id);

                return (
                  <div
                    key={m.id}
                    className={`border rounded-2xl p-5 transition-all ${
                      m.status === 'completed'
                        ? 'bg-slate-900/90 border-emerald-500/40'
                        : m.status === 'in_progress'
                        ? 'bg-slate-900 border-amber-500/50 ring-1 ring-amber-500/20'
                        : 'bg-slate-950/60 border-slate-800/80 opacity-75'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              m.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : m.status === 'in_progress'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {m.status === 'completed' ? '✓' : m.order}
                          </span>
                          <h4 className="font-bold text-sm text-white">
                            Milestone {m.order}: {m.name}
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                              m.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : m.status === 'in_progress'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {m.status === 'completed' ? 'Completed & Released' : m.status === 'in_progress' ? 'In Progress' : 'Locked in Escrow'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 ml-8 max-w-2xl leading-relaxed">
                          {m.description}
                        </p>
                      </div>

                      <div className="text-right ml-8 sm:ml-0 shrink-0">
                        <div className="text-lg font-extrabold text-white">
                          ₹{m.targetAmount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {m.status === 'completed' ? (
                            <span className="text-emerald-400">Released to Vendor</span>
                          ) : m.status === 'in_progress' ? (
                            <span className="text-amber-300">Target Date: {m.expectedDate}</span>
                          ) : (
                            <span>Locked Until Phase {m.order - 1} Verified</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Milestone Proof & Actions Section */}
                    {milestoneProof && (
                      <div className="mt-4 pt-3 border-t border-slate-800/80 ml-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-950/70 p-3 rounded-xl">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <span className="font-semibold text-white">
                              {milestoneProof.receiptTitle}
                            </span>
                            <span className="text-slate-400 text-[11px] ml-2">
                              ({milestoneProof.vendorName} • ₹{milestoneProof.amountSpent.toLocaleString('en-IN')})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openProofModal(milestoneProof)}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect Tax Receipt</span>
                          </button>

                          {milestoneProof.status === 'pending' && (
                            <button
                              onClick={() => {
                                setCurrentRole('admin');
                                setCurrentView('admin-dashboard');
                              }}
                              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                            >
                              <span>Admin Review Needed</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* In Progress Quick Trigger for Testing */}
                    {m.status === 'in_progress' && !milestoneProof && (
                      <div className="mt-3 ml-8 text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Work is currently underway for this milestone.</span>
                        <button
                          onClick={() => {
                            setCurrentRole('creator');
                            setCurrentView('creator-dashboard');
                          }}
                          className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                        >
                          <span>Creator: Upload Proof for Milestone {m.order}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Proof of Utilization (Invoices, Receipts) */}
        {activeTab === 'proofs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <p>
                Itemized procurement invoices, GST registration checks, and contractor receipts submitted by the creator.
              </p>
              <button
                onClick={() => {
                  setCurrentRole('creator');
                  setCurrentView('creator-dashboard');
                }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Submit New Proof</span>
              </button>
            </div>

            {campaignProofs.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                No proof receipts submitted yet for this campaign.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaignProofs.map((proof) => (
                  <div
                    key={proof.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400">
                          {proof.receiptNumber}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                            proof.status === 'verified'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : proof.status === 'pending'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          }`}
                        >
                          {proof.status === 'verified' ? 'Verified' : proof.status === 'pending' ? 'Pending Review' : 'Rejected'}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-white">{proof.receiptTitle}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{proof.description}</p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Vendor:</span>
                        <strong className="text-white">{proof.vendorName}</strong>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>GSTIN:</span>
                        <span className="font-mono text-slate-400">{proof.vendorGstin || '27AABCV8912X1Z5'}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Milestone:</span>
                        <span className="font-medium text-amber-300">{proof.milestoneName}</span>
                      </div>
                      <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800/80">
                        <span>Amount Spent:</span>
                        <strong className="text-emerald-400 text-sm">
                          ₹{proof.amountSpent.toLocaleString('en-IN')}
                        </strong>
                      </div>
                    </div>

                    <button
                      onClick={() => openProofModal(proof)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Tax Invoice & Line Items</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Public Fund Movement & Audit Ledger */}
        {activeTab === 'ledger' && (
          <div className="space-y-4">
            <div className="text-xs text-slate-400">
              Complete chronological audit trail tracing capital movement: Donor Payment → Escrow → Milestone Release → Vendor Payout.
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Date & Time</th>
                      <th className="py-3 px-4 font-semibold">Type</th>
                      <th className="py-3 px-4 font-semibold">From</th>
                      <th className="py-3 px-4 font-semibold">To</th>
                      <th className="py-3 px-4 font-semibold text-right">Amount</th>
                      <th className="py-3 px-4 font-semibold text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {campaignTxs.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                          {tx.date}
                        </td>
                        <td className="py-3 px-4 font-medium capitalize">
                          {tx.type.replace('_', ' ')}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-medium">
                          {tx.fromEntity}
                        </td>
                        <td className="py-3 px-4 text-white font-semibold">
                          {tx.toEntity}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400 whitespace-nowrap">
                          ₹{tx.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
