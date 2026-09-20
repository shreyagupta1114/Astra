import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setCurrentRole, resetDemoData } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-base tracking-tight">VeriRupee</span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              <strong>Track Every Rupee. Build Trust.</strong> The modern crowdfunding protocol ensuring donated money is held in escrow and released only as real, verifiable milestones are independently audited.
            </p>
            <div className="text-[11px] text-slate-500">
              Money Raised ≠ Money Spent. Guaranteed escrow transparency.
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('explore')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Explore Campaigns
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('ledger')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Public Fund Ledger
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentRole('donor');
                    setCurrentView('donor-dashboard');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Donor Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentRole('admin');
                    setCurrentView('admin-dashboard');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Admin Verification Queue
                </button>
              </li>
            </ul>
          </div>

          {/* Prototype Controls */}
          <div className="space-y-2.5">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Prototype Mode</h4>
            <p className="text-[11px] text-slate-400">
              Interactive local-state hackathon prototype. All transactions, invoices, and escrow releases execute in browser memory.
            </p>
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Reset Prototype Data</span>
            </button>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} VeriRupee Platform. Built for transparent philanthropy and civic accountability.
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with milestone-based escrow release</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
