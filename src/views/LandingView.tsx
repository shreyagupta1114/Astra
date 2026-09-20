import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Eye,
  Building2,
  Layers,
  Coins,
  ChevronRight,
  Sparkles,
  Users
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const {
    campaigns,
    setCurrentView,
    setCurrentRole,
    openDonateModal,
    openCreatorModal,
  } = useApp();

  const totalRaised = campaigns.reduce((acc, c) => acc + c.raisedAmount, 0);
  const totalInEscrow = campaigns.reduce((acc, c) => acc + c.escrowAmount, 0);
  const totalReleased = campaigns.reduce((acc, c) => acc + c.releasedAmount, 0);
  const totalVerifiedSpent = campaigns.reduce((acc, c) => acc + c.verifiedSpentAmount, 0);

  const featuredCampaigns = campaigns.slice(0, 3);

  const howItWorksSteps = [
    {
      num: '01',
      title: 'Donate',
      desc: 'Donor contributes securely. No funds are sent directly to the creator’s bank account.',
      icon: Coins,
      tag: 'Public Contribution',
    },
    {
      num: '02',
      title: 'Locked in Escrow',
      desc: '100% of the money enters a secure, programmatically enforced Escrow Smart Vault.',
      icon: Lock,
      tag: 'Zero Upfront Payout',
    },
    {
      num: '03',
      title: 'Milestone Completed',
      desc: 'Creator finishes a tangible phase (e.g. drilling, masonry, material purchase).',
      icon: Layers,
      tag: 'Phased Progress',
    },
    {
      num: '04',
      title: 'Proof Submitted',
      desc: 'Creator uploads itemized GST tax invoices, contractor work orders, and site photos.',
      icon: FileCheck2,
      tag: 'Receipt & GSTIN Check',
    },
    {
      num: '05',
      title: 'Admin Verifies',
      desc: 'Independent platform auditor checks vendor authenticity, deliverables, and amounts.',
      icon: ShieldCheck,
      tag: 'Third-Party Audit',
    },
    {
      num: '06',
      title: 'Funds Released',
      desc: 'Only the approved tranche moves from Escrow directly to the verified vendor/contractor.',
      icon: CheckCircle2,
      tag: 'Vendor Payout',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-900/60 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>The Next Generation of Transparent Philanthropy</span>
            </div>

            {/* Tagline & Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Track Every Rupee.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Build Trust.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Traditional crowdfunding gives creators 100% of the money upfront with zero accountability.
              VeriRupee locks funds in <strong className="text-white">Escrow</strong> and releases them only as milestones are verified with real invoices.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                id="hero-explore-cta"
                onClick={() => setCurrentView('explore')}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Explore Campaigns</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-create-cta"
                onClick={() => {
                  setCurrentRole('creator');
                  setCurrentView('create-campaign');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <span>Create Campaign</span>
              </button>

              <button
                id="hero-ledger-cta"
                onClick={() => setCurrentView('ledger')}
                className="w-full sm:w-auto px-4 py-3.5 text-xs text-slate-400 hover:text-emerald-400 flex items-center justify-center gap-1.5 transition-colors"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>View Live Public Ledger</span>
              </button>
            </div>

          </div>

          {/* Real-time Escrow Stats Bar */}
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md text-xs">
            <div className="p-3 border-r border-slate-800 last:border-none">
              <span className="text-slate-400 block font-medium">Total Raised</span>
              <span className="text-xl sm:text-2xl font-bold text-white mt-0.5 block">
                ₹{totalRaised.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" /> Across verified projects
              </span>
            </div>

            <div className="p-3 border-r border-slate-800 last:border-none">
              <span className="text-slate-400 block font-medium">Locked in Escrow</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 mt-0.5 block">
                ₹{totalInEscrow.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Lock className="w-3 h-3 text-emerald-400" /> Protected by protocol
              </span>
            </div>

            <div className="p-3 border-r border-slate-800 last:border-none">
              <span className="text-slate-400 block font-medium">Released to Milestones</span>
              <span className="text-xl sm:text-2xl font-bold text-blue-400 mt-0.5 block">
                ₹{totalReleased.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-blue-400" /> After admin audit
              </span>
            </div>

            <div className="p-3">
              <span className="text-slate-400 block font-medium">Verified Vendor Payouts</span>
              <span className="text-xl sm:text-2xl font-bold text-teal-300 mt-0.5 block">
                ₹{totalVerifiedSpent.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <FileCheck2 className="w-3 h-3 text-teal-400" /> Tax receipts verified
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. The Core Problem vs. The VeriRupee Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Structural Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why Traditional Crowdfunding Fails Donors
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            The core flaw in existing platforms is the disconnect between raising capital and spending it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          {/* Traditional Way */}
          <div className="bg-slate-900/80 border border-rose-500/30 rounded-2xl p-6 space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-rose-300">Traditional Crowdfunding</h3>
                <p className="text-xs text-slate-400">Opaque, lump-sum disbursements</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">✕</span>
                <span><strong>100% upfront payout:</strong> Creators get all funds deposited directly into personal accounts once the goal is hit.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">✕</span>
                <span><strong>Zero post-campaign visibility:</strong> Donors have no way of knowing whether materials were actually bought.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">✕</span>
                <span><strong>Unverifiable updates:</strong> Creators post subjective blog posts without receipts or GST audit records.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-bold mt-0.5">✕</span>
                <span><strong>"Money raised" assumed as "Money spent":</strong> Funds disappear with no legal proof of vendor delivery.</span>
              </li>
            </ul>
          </div>

          {/* VeriRupee Solution */}
          <div className="bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-6 space-y-4 relative overflow-hidden ring-1 ring-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-emerald-300">VeriRupee Escrow Protocol</h3>
                <p className="text-xs text-slate-400">Milestone-based, invoice-audited releases</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Escrow Smart Vault:</strong> 100% of money is locked in escrow. Not a single rupee is released upfront.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Milestone Tranches:</strong> Project is broken down into structured phases (e.g., Planning ₹20k, Drilling ₹50k, Pipeline ₹80k).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Proof of Utilization:</strong> Creator must upload vendor tax invoices, GSTIN receipts, and contractor deliverables.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Independent Verification:</strong> Platform auditors verify invoices before approving each individual tranche.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. How It Works (6-Step Visual Flow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Complete Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How VeriRupee Enforces Accountability
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From your contribution to the final vendor invoice, follow every step of the capital lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {howItWorksSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-3 transition-all hover:bg-slate-850 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center border border-slate-700 group-hover:bg-emerald-600/20 group-hover:border-emerald-500/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xl font-extrabold text-slate-700 group-hover:text-slate-600 transition-colors">
                    {step.num}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">{step.title}</h3>
                    <span className="text-[10px] text-slate-400 font-medium px-1.5 py-0.5 rounded bg-slate-800">
                      {step.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Campaigns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Active Campaigns
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Explore Verified Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Inspect current milestone statuses and proof receipts in real-time.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('explore')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            <span>View All Campaigns</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCampaigns.map((camp) => {
            const percent = Math.min(100, Math.round((camp.raisedAmount / camp.goalAmount) * 100));
            const currentMilestone = camp.milestones.find((m) => m.status === 'in_progress') || camp.milestones[0];

            return (
              <div
                key={camp.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={camp.coverImage}
                    alt={camp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-semibold text-slate-200 border border-slate-700">
                    {camp.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Escrow Active</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Creator Factual Credibility */}
                    <div
                      onClick={() => openCreatorModal(camp.creatorId)}
                      className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity mb-2"
                    >
                      <img
                        src={camp.creatorAvatar}
                        alt={camp.creatorName}
                        className="w-5 h-5 rounded-full object-cover border border-slate-700"
                      />
                      <span className="text-xs text-slate-300 font-medium truncate">{camp.creatorName}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                        {camp.creatorCredibility.verifiedRate}% Verified
                      </span>
                    </div>

                    <h3
                      onClick={() => setCurrentView('campaign-detail', camp.id)}
                      className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors cursor-pointer line-clamp-2"
                    >
                      {camp.title}
                    </h3>
                  </div>

                  {/* Fund Progress & Escrow breakdown */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-white text-sm">
                        ₹{camp.raisedAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        Goal: ₹{camp.goalAmount.toLocaleString('en-IN')} ({percent}%)
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {/* Escrow vs Released Metrics */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-400 border-t border-slate-800/80">
                      <div>
                        <span>In Escrow: </span>
                        <strong className="text-emerald-400">₹{camp.escrowAmount.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="text-right">
                        <span>Released: </span>
                        <strong className="text-blue-400">₹{camp.releasedAmount.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>

                    {/* Active Milestone Tag */}
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Milestone {currentMilestone.order} of {camp.milestones.length}:</span>
                      <span className="font-medium text-amber-300 truncate max-w-[130px]">
                        {currentMilestone.name}
                      </span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setCurrentView('campaign-detail', camp.id)}
                      className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors text-center"
                    >
                      Track Funds
                    </button>
                    <button
                      onClick={() => openDonateModal(camp)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm active:scale-95"
                    >
                      Contribute
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
