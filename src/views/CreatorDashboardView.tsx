import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  Lock,
  CheckCircle2,
  Clock,
  AlertCircle,
  PlusCircle,
  UploadCloud,
  FileCheck2,
  FileText,
  Eye,
  ArrowRight,
  Send,
  Building2,
  Coins,
  ShieldCheck,
  X
} from 'lucide-react';
import { Campaign, Milestone } from '../types';

export const CreatorDashboardView: React.FC = () => {
  const {
    campaigns,
    proofs,
    setCurrentView,
    submitProofOfUtilization,
    openProofModal,
  } = useApp();

  // For this prototype, creator-1 is the active creator session (Priya Deshmukh)
  const myCampaigns = campaigns.filter((c) => c.creatorId === 'creator-1');
  const myProofs = proofs.filter((p) => myCampaigns.some((c) => c.id === p.campaignId));

  const totalRaised = myCampaigns.reduce((acc, c) => acc + c.raisedAmount, 0);
  const totalInEscrow = myCampaigns.reduce((acc, c) => acc + c.escrowAmount, 0);
  const totalReleased = myCampaigns.reduce((acc, c) => acc + c.releasedAmount, 0);

  const pendingProofs = myProofs.filter((p) => p.status === 'pending');
  const verifiedProofs = myProofs.filter((p) => p.status === 'verified');
  const rejectedProofs = myProofs.filter((p) => p.status === 'rejected');

  // Submit Proof Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(myCampaigns[0]?.id || '');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState('');
  const [vendorName, setVendorName] = useState('ABC Construction & Hardware Supplies');
  const [vendorGstin, setVendorGstin] = useState('27AABCU8891P1ZX');
  const [amountSpent, setAmountSpent] = useState<number>(32500);
  const [description, setDescription] = useState('Procurement of construction materials, PVC piping, and trench work.');
  const [receiptTitle, setReceiptTitle] = useState('Construction Materials & Rig Bill');
  const [mockFileName, setMockFileName] = useState('invoice_abc_materials.pdf');

  // Active campaign milestones
  const activeCampaign = myCampaigns.find((c) => c.id === selectedCampaignId) || myCampaigns[0];
  const activeMilestones = activeCampaign ? activeCampaign.milestones : [];

  const handleOpenSubmitProof = (campId?: string, mId?: string) => {
    if (campId) setSelectedCampaignId(campId);
    if (mId) setSelectedMilestoneId(mId);
    else if (activeMilestones.length > 0) {
      const inProgress = activeMilestones.find((m) => m.status === 'in_progress') || activeMilestones[0];
      setSelectedMilestoneId(inProgress.id);
    }
    setIsSubmitModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaignId || !selectedMilestoneId || amountSpent <= 0) return;

    submitProofOfUtilization({
      campaignId: selectedCampaignId,
      milestoneId: selectedMilestoneId,
      vendorName,
      vendorGstin,
      amountSpent,
      date: new Date().toISOString().split('T')[0],
      description,
      receiptTitle,
      receiptCategory: 'Civil Construction & Procurement',
      items: [
        { description: description, qty: 1, unitPrice: amountSpent, total: amountSpent }
      ],
    });

    setIsSubmitModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>Creator Studio & Milestone Tranche Control</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Creator Dashboard: Jal Seva Foundation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Submit proof of utilization and request milestone disbursements from the Escrow vault.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenSubmitProof()}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Submit Utilization Proof</span>
          </button>

          <button
            onClick={() => setCurrentView('create-campaign')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-slate-400 font-medium">Total Raised</div>
          <div className="text-2xl font-black text-white">
            ₹{totalRaised.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400">
            Across {myCampaigns.length} active campaigns
          </div>
        </div>

        <div className="bg-slate-900 border border-emerald-500/40 p-5 rounded-2xl space-y-2 ring-1 ring-emerald-500/10">
          <div className="text-emerald-400 font-medium flex items-center gap-1.5">
            <Lock className="w-4 h-4" />
            <span>Funds in Escrow Vault</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">
            ₹{totalInEscrow.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-300">
            Ready to be released as proofs are verified
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-blue-400 font-medium">Funds Released to Milestones</div>
          <div className="text-2xl font-black text-blue-400">
            ₹{totalReleased.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400">
            Transferred to vendors upon admin approval
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-slate-400 font-medium">Proof Audit Status</div>
          <div className="flex items-center gap-3 mt-1">
            <div className="text-center">
              <span className="text-xs text-amber-300 font-bold block">{pendingProofs.length}</span>
              <span className="text-[10px] text-slate-400">Pending</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div className="text-center">
              <span className="text-xs text-emerald-400 font-bold block">{verifiedProofs.length}</span>
              <span className="text-[10px] text-slate-400">Approved</span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div className="text-center">
              <span className="text-xs text-rose-400 font-bold block">{rejectedProofs.length}</span>
              <span className="text-[10px] text-slate-400">Rejected</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400">Real-time admin queue sync</div>
        </div>
      </div>

      {/* Campaigns Managed & Milestone Progress */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Campaigns Under Management & Milestone Actions
        </h2>

        <div className="space-y-6">
          {myCampaigns.map((camp) => {
            const inProgressMilestone = camp.milestones.find((m) => m.status === 'in_progress') || camp.milestones[0];
            const percent = Math.min(100, Math.round((camp.raisedAmount / camp.goalAmount) * 100));

            return (
              <div
                key={camp.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-400 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {camp.category}
                    </span>
                    <h3
                      onClick={() => setCurrentView('campaign-detail', camp.id)}
                      className="text-lg font-bold text-white hover:text-emerald-300 cursor-pointer mt-1"
                    >
                      {camp.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpenSubmitProof(camp.id, inProgressMilestone.id)}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Submit Proof for Milestone {inProgressMilestone.order}</span>
                    </button>
                    <button
                      onClick={() => setCurrentView('campaign-detail', camp.id)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors"
                    >
                      View Public Page
                    </button>
                  </div>
                </div>

                {/* Milestone Stepper */}
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Milestone Tranche Execution Status
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {camp.milestones.map((m) => {
                      const proof = proofs.find((p) => p.milestoneId === m.id);

                      return (
                        <div
                          key={m.id}
                          className={`p-3.5 rounded-xl border space-y-2 ${
                            m.status === 'completed'
                              ? 'bg-emerald-950/20 border-emerald-500/40'
                              : m.status === 'in_progress'
                              ? 'bg-amber-950/20 border-amber-500/40 ring-1 ring-amber-500/20'
                              : 'bg-slate-950 border-slate-800 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-300">Phase {m.order}</span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                                m.status === 'completed'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : m.status === 'in_progress'
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {m.status}
                            </span>
                          </div>

                          <div className="font-bold text-white text-xs truncate">{m.name}</div>
                          <div className="text-emerald-400 font-mono font-bold text-xs">
                            ₹{m.targetAmount.toLocaleString('en-IN')}
                          </div>

                          {proof && (
                            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                              <span className="text-slate-400 truncate max-w-[100px]">{proof.vendorName}</span>
                              <button
                                onClick={() => openProofModal(proof)}
                                className="text-emerald-400 hover:underline font-semibold"
                              >
                                View Bill
                              </button>
                            </div>
                          )}

                          {m.status === 'in_progress' && !proof && (
                            <button
                              onClick={() => handleOpenSubmitProof(camp.id, m.id)}
                              className="w-full py-1.5 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 rounded-lg text-[10px] font-bold transition-colors"
                            >
                              + Upload Invoice
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Submitted Proofs Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Proof of Utilization Submissions History
          </h2>
          <span className="text-xs text-slate-400">
            {myProofs.length} Submissions
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Invoice #</th>
                <th className="py-3 px-4 font-semibold">Vendor</th>
                <th className="py-3 px-4 font-semibold">Campaign & Milestone</th>
                <th className="py-3 px-4 font-semibold text-right">Amount Spent</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {myProofs.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                    {p.receiptNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{p.vendorName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">GSTIN: {p.vendorGstin}</div>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate">
                    <div className="text-slate-200">{p.campaignTitle}</div>
                    <div className="text-[10px] text-amber-300">{p.milestoneName}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400 text-sm">
                    ₹{p.amountSpent.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                        p.status === 'verified'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : p.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => openProofModal(p)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUBMIT PROOF MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100">
            
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/60 sticky top-0 z-10 backdrop-blur-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-white">Submit Proof of Utilization</h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs">
              
              {/* Campaign & Milestone Selection */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Target Campaign</label>
                <select
                  value={selectedCampaignId}
                  onChange={(e) => {
                    setSelectedCampaignId(e.target.value);
                    const camp = myCampaigns.find((c) => c.id === e.target.value);
                    if (camp && camp.milestones.length > 0) {
                      setSelectedMilestoneId(camp.milestones[0].id);
                    }
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  {myCampaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Allocated Milestone</label>
                <select
                  value={selectedMilestoneId}
                  onChange={(e) => setSelectedMilestoneId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  required
                >
                  {activeMilestones.map((m) => (
                    <option key={m.id} value={m.id}>
                      Phase {m.order}: {m.name} (Budget: ₹{m.targetAmount.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Vendor Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Vendor / Contractor Name</label>
                  <input
                    type="text"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    placeholder="e.g. ABC Construction Supplies"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Vendor GSTIN</label>
                  <input
                    type="text"
                    value={vendorGstin}
                    onChange={(e) => setVendorGstin(e.target.value)}
                    placeholder="27AABCU8891P1ZX"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Amount & Title */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Amount Spent (INR)</label>
                  <input
                    type="number"
                    value={amountSpent}
                    onChange={(e) => setAmountSpent(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold text-xs focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Invoice / Receipt Title</label>
                  <input
                    type="text"
                    value={receiptTitle}
                    onChange={(e) => setReceiptTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Purpose / Work Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Mock Upload Attachment Box */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Upload Receipt / Tax Invoice File</label>
                <div className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-4 text-center cursor-pointer bg-slate-950/60 transition-colors">
                  <FileText className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                  <span className="text-xs font-semibold text-white block">{mockFileName}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Click to simulate uploading PDF or image</span>
                </div>
              </div>

              {/* Trust Notice */}
              <div className="p-3 bg-blue-950/30 border border-blue-500/30 rounded-xl text-[11px] text-slate-300">
                Submissions enter the <strong>Admin Verification Queue</strong>. Once approved, the corresponding tranche will disburse from the Escrow Vault and register on the Public Ledger.
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit for Audit</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
