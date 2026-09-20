import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Award,
  TrendingUp,
  FileCheck2,
  Layers,
  Calendar
} from 'lucide-react';

export const CreatorProfileModal: React.FC = () => {
  const { selectedCreatorForModal, closeCreatorModal, setCurrentView } = useApp();

  if (!selectedCreatorForModal) return null;

  const creator = selectedCreatorForModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/60 sticky top-0 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Factual Creator Credibility Audit</h3>
          </div>
          <button
            onClick={closeCreatorModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs">
          
          {/* Creator Profile Top Bio */}
          <div className="flex items-start gap-4 pb-4 border-b border-slate-800">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-md"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-white">{creator.name}</h4>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Verified NGO / Organizer
                </span>
              </div>
              <p className="text-emerald-400 font-medium text-xs mt-0.5">{creator.organization}</p>
              <p className="text-slate-400 text-[11px] mt-0.5 font-mono">Reg ID: {creator.registrationNumber}</p>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">{creator.bio}</p>
            </div>
          </div>

          {/* Factual Historical Metrics Grid (No subjective star ratings!) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Factual Historical Track Record
              </h5>
              <span className="text-[10px] text-slate-400">Audited by VeriRupee Escrow Protocol</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-center">
                <div className="text-[11px] text-slate-400 font-medium">Campaigns Completed</div>
                <div className="text-xl font-bold text-white mt-1">{creator.completedCampaignsCount}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">100% On-schedule</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-center">
                <div className="text-[11px] text-slate-400 font-medium">Total Funds Raised</div>
                <div className="text-xl font-bold text-white mt-1">
                  ₹{creator.totalFundsRaised.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-emerald-400 mt-0.5">Across all campaigns</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-center">
                <div className="text-[11px] text-slate-400 font-medium">Verified Utilization</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">
                  {creator.verifiedUtilizationRate}%
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Receipt backed</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-center">
                <div className="text-[11px] text-slate-400 font-medium">Successful Milestones</div>
                <div className="text-xl font-bold text-white mt-1">
                  {creator.successfulMilestonesCount}/{creator.totalMilestonesCount}
                </div>
                <div className="text-[10px] text-emerald-400 mt-0.5">Tranches released</div>
              </div>
            </div>
          </div>

          {/* Historical Campaign Audit Log */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Previous Campaign History & Audit Record
            </h5>

            <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/70">
              {creator.previousCampaigns.map((prev) => (
                <div key={prev.id} className="p-3.5 bg-slate-950/60 flex items-center justify-between gap-3 hover:bg-slate-950 transition-colors">
                  <div>
                    <div className="font-semibold text-white text-xs">{prev.title}</div>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px] mt-1">
                      <span>Year: {prev.year}</span>
                      <span>•</span>
                      <span>Milestones: {prev.milestonesPassed}</span>
                      <span>•</span>
                      <span className="text-emerald-400">Audit Status: {prev.status}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white text-xs">₹{prev.fundsRaised.toLocaleString('en-IN')}</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">{prev.verifiedRate}% Verified</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Objective Statement notice */}
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-[11px] text-slate-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong>Objective Transparency Guarantee:</strong> VeriRupee records are computed strictly from timestamped escrow releases and verified GST tax invoices. No subjective user reviews or paid sponsorships influence creator credibility.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={closeCreatorModal}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Close Profile
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
