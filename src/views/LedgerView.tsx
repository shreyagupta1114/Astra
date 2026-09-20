import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck2,
  Lock,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowDownRight,
  ShieldCheck,
  Building2,
  User,
  Layers,
  Sparkles
} from 'lucide-react';
import { TransactionType } from '../types';

export const LedgerView: React.FC = () => {
  const { transactions, setCurrentView } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = transactions.filter((tx) => {
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesSearch =
      tx.fromEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.toEntity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.milestoneName && tx.milestoneName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tx.txHash.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  const totalProcessed = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Real-Time Public Ledger</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Transparent Fund Tracking Ledger
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Every movement of money is permanently logged on the public ledger. Inspect how funds travel from the donor’s contribution into escrow, into milestone tranches, and directly to audited vendors.
        </p>
      </div>

      {/* Visual Flow Pipeline Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Verified Fund Movement Pipeline
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold">
            Zero Unaudited Withdrawals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase font-bold">1. Inflow</div>
            <div className="font-bold text-white mt-1">Donor Payment</div>
            <div className="text-[10px] text-slate-400 mt-1">Direct from supporters</div>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-xl">
            <div className="text-[10px] text-emerald-400 uppercase font-bold">2. Security</div>
            <div className="font-bold text-emerald-300 mt-1">Escrow Vault</div>
            <div className="text-[10px] text-slate-300 mt-1">100% Locked & Protected</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase font-bold">3. Allocation</div>
            <div className="font-bold text-white mt-1">Milestone Tranche</div>
            <div className="text-[10px] text-slate-400 mt-1">Sequenced phase release</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
            <div className="text-[10px] text-slate-400 uppercase font-bold">4. Audit</div>
            <div className="font-bold text-white mt-1">Verified Expense</div>
            <div className="text-[10px] text-slate-400 mt-1">GSTIN & invoice match</div>
          </div>

          <div className="bg-blue-950/40 border border-blue-500/40 p-3 rounded-xl">
            <div className="text-[10px] text-blue-400 uppercase font-bold">5. Outflow</div>
            <div className="font-bold text-blue-300 mt-1">Vendor Payout</div>
            <div className="text-[10px] text-slate-300 mt-1">Direct to supplier</div>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by donor, vendor, campaign, milestone, or tx hash..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                filterType === 'all'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setFilterType('donor_contribution')}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                filterType === 'donor_contribution'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              Donations
            </button>
            <button
              onClick={() => setFilterType('escrow_lock')}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                filterType === 'escrow_lock'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              Escrow Locks
            </button>
            <button
              onClick={() => setFilterType('milestone_release')}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                filterType === 'milestone_release'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              Tranche Releases
            </button>
            <button
              onClick={() => setFilterType('vendor_payout')}
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                filterType === 'vendor_payout'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              Vendor Payouts
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Date & Time</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">From</th>
                <th className="py-3 px-4 font-semibold">To</th>
                <th className="py-3 px-4 font-semibold">Campaign & Milestone</th>
                <th className="py-3 px-4 font-semibold text-right">Amount (INR)</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold font-mono text-center">Tx Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No transactions match your search filter.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => {
                  let badgeBg = 'bg-slate-800 text-slate-300';
                  if (tx.type === 'donor_contribution') badgeBg = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
                  if (tx.type === 'escrow_lock') badgeBg = 'bg-teal-500/20 text-teal-300 border border-teal-500/40';
                  if (tx.type === 'milestone_release') badgeBg = 'bg-blue-500/20 text-blue-300 border border-blue-500/40';
                  if (tx.type === 'vendor_payout') badgeBg = 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40';

                  return (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                        {tx.date}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${badgeBg}`}>
                          {tx.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-300">
                        {tx.fromEntity}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        {tx.toEntity}
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <div
                          onClick={() => setCurrentView('campaign-detail', tx.campaignId)}
                          className="font-semibold text-slate-200 hover:text-emerald-400 cursor-pointer truncate"
                        >
                          {tx.campaignTitle}
                        </div>
                        {tx.milestoneName && (
                          <div className="text-[10px] text-amber-300 truncate">
                            {tx.milestoneName}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400 whitespace-nowrap text-sm">
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-[10px] text-slate-500">
                        {tx.txHash}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
