import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Coins,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Receipt,
  Layers,
  FileCheck2,
  Compass
} from 'lucide-react';

export const DonorDashboardView: React.FC = () => {
  const {
    donorContributions,
    campaigns,
    transactions,
    setCurrentView,
    openDonateModal,
  } = useApp();

  const totalDonated = donorContributions.reduce((acc, d) => acc + d.amount, 0);
  
  // Find distinct campaigns supported by the donor
  const supportedCampaignIds = Array.from(new Set(donorContributions.map((d) => d.campaignId)));
  const supportedCampaigns = campaigns.filter((c) => supportedCampaignIds.includes(c.id));

  // Funds calculation for supported campaigns
  const totalEscrowHeld = supportedCampaigns.reduce((acc, c) => acc + c.escrowAmount, 0);
  const totalReleased = supportedCampaigns.reduce((acc, c) => acc + c.releasedAmount, 0);

  // Completed milestones across supported campaigns
  let completedMilestonesCount = 0;
  let totalMilestonesCount = 0;
  supportedCampaigns.forEach((c) => {
    c.milestones.forEach((m) => {
      totalMilestonesCount++;
      if (m.status === 'completed') completedMilestonesCount++;
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Donor Transparency Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome, Aditi Nair
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Real-time tracking of where your donated rupees are currently held and released.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('explore')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Compass className="w-4 h-4" />
          <span>Support Another Cause</span>
        </button>
      </div>

      {/* Metric Cards (Total Donated, Supported Campaigns, Funds in Escrow, Funds Released) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Total Donated</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            ₹{totalDonated.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400">
            Across {donorContributions.length} contribution tranches
          </div>
        </div>

        <div className="bg-slate-900 border border-emerald-500/30 p-5 rounded-2xl space-y-2 ring-1 ring-emerald-500/10">
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-medium">Funds Remaining in Escrow</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400">
            ₹{totalEscrowHeld.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-300">
            Safeguarded against future milestones
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-blue-400 font-medium">Funds Released & Utilized</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-400">
            ₹{totalReleased.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400">
            Backed by audited vendor tax receipts
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Milestones Completed</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white">
            {completedMilestonesCount} / {totalMilestonesCount}
          </div>
          <div className="text-[11px] text-teal-400">
            Across supported campaigns
          </div>
        </div>
      </div>

      {/* Active Campaigns Supported */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Campaigns You Support ({supportedCampaigns.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportedCampaigns.map((camp) => {
            const myContributions = donorContributions.filter((d) => d.campaignId === camp.id);
            const myDonatedSum = myContributions.reduce((sum, d) => sum + d.amount, 0);
            const percent = Math.min(100, Math.round((camp.raisedAmount / camp.goalAmount) * 100));
            const currentMilestone = camp.milestones.find((m) => m.status === 'in_progress') || camp.milestones[0];

            return (
              <div
                key={camp.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      {camp.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Your Contribution: <strong className="text-white">₹{myDonatedSum.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>

                  <h3
                    onClick={() => setCurrentView('campaign-detail', camp.id)}
                    className="text-base font-bold text-white hover:text-emerald-300 cursor-pointer transition-colors"
                  >
                    {camp.title}
                  </h3>

                  {/* Fund Progress */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-300 font-semibold">
                        Overall Progress: {percent}%
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        ₹{camp.raisedAmount.toLocaleString('en-IN')} of ₹{camp.goalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Escrow Status for this campaign */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Still Locked in Escrow</span>
                      <strong className="text-emerald-400 font-bold">
                        ₹{camp.escrowAmount.toLocaleString('en-IN')}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Released to Vendors</span>
                      <strong className="text-blue-400 font-bold">
                        ₹{camp.releasedAmount.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>

                  {/* Milestone status indicator */}
                  <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
                    <span>Current Active Milestone:</span>
                    <span className="font-semibold text-amber-300 truncate max-w-[180px]">
                      {currentMilestone.name}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex gap-3">
                  <button
                    onClick={() => setCurrentView('campaign-detail', camp.id)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Track Escrow & Receipts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => openDonateModal(camp)}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Top Up
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Recent Contributions Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Your Contribution History & Audit Hashes
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Date & Time</th>
                <th className="py-3 px-4 font-semibold">Campaign</th>
                <th className="py-3 px-4 font-semibold text-right">Amount Donated</th>
                <th className="py-3 px-4 font-semibold text-center">Escrow Status</th>
                <th className="py-3 px-4 font-semibold text-center">Verification Hash</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {donorContributions.map((dc) => (
                <tr key={dc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                    {dc.date}
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">
                    {dc.campaignTitle}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400 text-sm">
                    ₹{dc.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Escrow Protected
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-[10px] text-slate-400">
                    {dc.txHash}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setCurrentView('campaign-detail', dc.campaignId)}
                      className="text-emerald-400 hover:underline font-semibold text-xs"
                    >
                      Inspect Movement
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
