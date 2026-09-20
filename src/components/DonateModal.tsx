import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Coins
} from 'lucide-react';

export const DonateModal: React.FC = () => {
  const {
    isDonateModalOpen,
    closeDonateModal,
    donateTargetCampaign,
    contributeToCampaign,
    setCurrentView,
  } = useApp();

  const [amount, setAmount] = useState<number>(50000);
  const [donorName, setDonorName] = useState<string>('Aditi Nair');
  const [donorEmail, setDonorEmail] = useState<string>('aditi.nair@example.com');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isDonateModalOpen || !donateTargetCampaign) return null;

  const presets = [1000, 5000, 15000, 50000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    contributeToCampaign(donateTargetCampaign.id, amount, donorName, donorEmail);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    closeDonateModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl text-slate-100">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-white">Contribute to Escrow Vault</h3>
              <p className="text-xs text-slate-400 truncate max-w-xs">{donateTargetCampaign.title}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Success Screen */
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white">₹{amount.toLocaleString('en-IN')} Locked in Escrow!</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                Your donation has been secured. Not a single rupee is released until the creator submits verifiable invoices that pass independent admin auditing.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Transaction Hash:</span>
                <span className="font-mono text-emerald-400">0x{Math.random().toString(16).substring(2, 10)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Allocation Destination:</span>
                <span className="font-semibold text-white">Escrow Smart Contract Vault</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Release Condition:</span>
                <span className="text-amber-300 font-medium">Milestone Proof Verification</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  handleClose();
                  setCurrentView('ledger');
                }}
                className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
              >
                View Public Ledger
              </button>
              <button
                onClick={() => {
                  handleClose();
                  setCurrentView('donor-dashboard');
                }}
                className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-950/40"
              >
                Go to Donor Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Contribution Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Contribution Amount (INR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xl font-bold text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="50000"
                  required
                />
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-2.5">
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      amount === val
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    ₹{val.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Donor Information */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Escrow Guarantee Notice */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Lock className="w-4 h-4" />
                <span>Escrow Trust Protection Active</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Your ₹{amount.toLocaleString('en-IN')} does <strong className="text-white">NOT</strong> go into the creator's personal bank account upfront. It remains locked in the campaign's Escrow Vault and is released in tranches only after physical work milestones and vendor receipts are independently audited.
              </p>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>Deposit ₹{amount.toLocaleString('en-IN')} into Escrow</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                Simulated fintech transaction. No real card or bank deduction required.
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
