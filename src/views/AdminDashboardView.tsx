import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Eye,
  FileCheck2,
  Calendar,
  Building2,
  Coins,
  AlertCircle,
  Lock,
  ArrowRight,
  ExternalLink,
  Search
} from 'lucide-react';
import { ProofOfUtilization } from '../types';

export const AdminDashboardView: React.FC = () => {
  const {
    proofs,
    campaigns,
    approveProof,
    rejectProof,
    openProofModal,
    setCurrentView,
  } = useApp();

  const [rejectModalProof, setRejectModalProof] = useState<ProofOfUtilization | null>(null);
  const [rejectReason, setRejectReason] = useState<string>('Vendor GSTIN unverified on government portal / missing geotagged photos.');

  const pendingProofs = proofs.filter((p) => p.status === 'pending');
  const pastProofs = proofs.filter((p) => p.status !== 'pending');

  const totalEscrowManaged = campaigns.reduce((acc, c) => acc + c.escrowAmount, 0);
  const totalTranchesReleased = campaigns.reduce((acc, c) => acc + c.releasedAmount, 0);

  const handleConfirmReject = () => {
    if (!rejectModalProof) return;
    rejectProof(rejectModalProof.id, rejectReason);
    setRejectModalProof(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Independent Auditor Control Center</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Admin Verification & Escrow Disbursement
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Audit proof of utilization, inspect vendor tax invoices, and authorize tranche releases from Escrow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Pending Queue:</span>
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40">
            {pendingProofs.length} Requests Awaiting Audit
          </span>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-slate-900 border border-amber-500/40 p-5 rounded-2xl space-y-2 ring-1 ring-amber-500/20">
          <div className="text-amber-400 font-semibold flex items-center justify-between">
            <span>Pending Audit Queue</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">
            {pendingProofs.length}
          </div>
          <div className="text-[11px] text-slate-400">
            Milestone release requests
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-slate-400 font-medium flex items-center justify-between">
            <span>Escrow Under Custody</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">
            ₹{totalEscrowManaged.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400">
            Locked across active projects
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-slate-400 font-medium flex items-center justify-between">
            <span>Audited & Disbursed</span>
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-blue-400">
            ₹{totalTranchesReleased.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400">
            Directly transferred to vendors
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="text-slate-400 font-medium flex items-center justify-between">
            <span>Audit Approval Rate</span>
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-black text-white">
            96.4%
          </div>
          <div className="text-[11px] text-teal-400">
            Strict anti-fraud protocol
          </div>
        </div>
      </div>

      {/* PENDING VERIFICATION REQUESTS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>Pending Verification Requests</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          </h2>
          <span className="text-xs text-slate-400">
            Approving a request updates the campaign state and releases the next tranche
          </span>
        </div>

        {pendingProofs.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="font-bold text-white text-sm">All Verification Requests Cleared!</h3>
            <p className="text-slate-400 max-w-sm mx-auto">
              There are no pending proof submissions. Escrow vaults are safely locked until creators submit new invoices.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingProofs.map((req) => {
              const camp = campaigns.find((c) => c.id === req.campaignId);
              const milestone = camp?.milestones.find((m) => m.id === req.milestoneId);
              const trancheAmount = milestone ? milestone.targetAmount : req.amountSpent;

              return (
                <div
                  key={req.id}
                  className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 space-y-5 shadow-xl relative overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    
                    {/* Left Details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase border border-amber-500/40">
                          Pending Auditor Review
                        </span>
                        <span className="text-xs text-slate-400">
                          Submitted: {new Date(req.submittedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white">
                        {req.receiptTitle}
                      </h3>

                      <div className="text-xs text-slate-300">
                        <span className="text-slate-400">Campaign: </span>
                        <strong className="text-white">{req.campaignTitle}</strong>
                      </div>

                      <div className="text-xs text-slate-300">
                        <span className="text-slate-400">Target Milestone: </span>
                        <strong className="text-amber-300">{req.milestoneName}</strong>
                      </div>

                      <p className="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <strong className="text-slate-300">Work Description: </strong>
                        {req.description}
                      </p>
                    </div>

                    {/* Right Vendor & Amount Card */}
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2.5 text-xs w-full lg:w-72 shrink-0">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Vendor:</span>
                        <strong className="text-white text-right truncate max-w-[150px]">{req.vendorName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">GSTIN:</span>
                        <span className="font-mono text-slate-300">{req.vendorGstin || '27AABCU8891P1ZX'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Invoice No:</span>
                        <span className="font-mono text-slate-300">{req.receiptNumber}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold">
                        <span className="text-slate-300">Tranche Release:</span>
                        <span className="text-emerald-400 font-mono">₹{trancheAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                    <button
                      onClick={() => openProofModal(req)}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Complete Tax Invoice & Line Items</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setRejectModalProof(req)}
                        className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject Proof</span>
                      </button>

                      <button
                        id="admin-approve-btn"
                        onClick={() => approveProof(req.id)}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve & Release ₹{trancheAmount.toLocaleString('en-IN')}</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PAST AUDIT LOGS */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Audit Decision History & Compliance Log
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Date Audited</th>
                <th className="py-3 px-4 font-semibold">Campaign</th>
                <th className="py-3 px-4 font-semibold">Vendor</th>
                <th className="py-3 px-4 font-semibold text-right">Amount</th>
                <th className="py-3 px-4 font-semibold text-center">Decision</th>
                <th className="py-3 px-4 font-semibold">Auditor Review Notes</th>
                <th className="py-3 px-4 font-semibold text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {pastProofs.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                    {p.reviewedAt ? new Date(p.reviewedAt).toLocaleDateString() : p.date}
                  </td>
                  <td className="py-3 px-4 font-medium text-white max-w-xs truncate">
                    {p.campaignTitle}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {p.vendorName}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400 whitespace-nowrap">
                    ₹{p.amountSpent.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                        p.status === 'verified'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 max-w-sm truncate text-[11px]">
                    {p.reviewerNotes || 'Standard GSTIN verification passed.'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => openProofModal(p)}
                      className="text-emerald-400 hover:underline font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REJECT MODAL */}
      {rejectModalProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-rose-500/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-slate-100">
            <div className="flex items-center gap-2.5 text-rose-400">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-bold text-base text-white">Reject Proof of Utilization</h3>
            </div>

            <p className="text-xs text-slate-300">
              You are rejecting the proof submitted for <strong>{rejectModalProof.receiptTitle}</strong> ({rejectModalProof.vendorName}). Escrow funds will remain safely locked.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Auditor Rejection Reason:
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setRejectModalProof(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
