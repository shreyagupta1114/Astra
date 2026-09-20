import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  FileCheck2,
  AlertCircle,
  Building2,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { selectedProofForModal, closeProofModal } = useApp();

  if (!selectedProofForModal) return null;

  const proof = selectedProofForModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/60 sticky top-0 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">Proof of Utilization Document</h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                    proof.status === 'verified'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : proof.status === 'pending'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  {proof.status === 'verified' ? 'Verified & Audited' : proof.status === 'pending' ? 'Pending Review' : 'Rejected'}
                </span>
              </div>
              <p className="text-xs text-slate-400">Ref: {proof.receiptNumber} • {proof.campaignTitle}</p>
            </div>
          </div>
          <button
            onClick={closeProofModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs">
          
          {/* Authentic Tax Invoice Replica Container */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 shadow-inner">
            
            {/* Invoice Top Header */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400">
                  Tax Invoice / Utilization Proof
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">{proof.vendorName}</h4>
                <p className="text-slate-400 text-[11px] mt-0.5">GSTIN: <span className="font-mono text-slate-200">{proof.vendorGstin || '27AABCV8912X1Z5'}</span></p>
                <p className="text-slate-400 text-[11px]">Authorized Vendor & Procurement Supplier</p>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-[11px]">Invoice No:</div>
                <div className="font-mono font-bold text-white text-xs">{proof.receiptNumber}</div>
                <div className="text-slate-400 text-[11px] mt-1">Invoice Date:</div>
                <div className="font-semibold text-slate-200 text-xs">{proof.date}</div>
              </div>
            </div>

            {/* Target Milestone & Project Details */}
            <div className="grid grid-cols-2 gap-4 bg-slate-900/80 p-3 rounded-lg border border-slate-800/80 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Allocated Milestone</span>
                <span className="font-bold text-white">{proof.milestoneName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Category of Expense</span>
                <span className="font-medium text-slate-200">{proof.receiptCategory}</span>
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                Itemized Expense Breakdown
              </div>
              <div className="border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 text-[11px]">
                    <tr>
                      <th className="py-2 px-3 font-semibold">Description</th>
                      <th className="py-2 px-3 font-semibold text-center">Qty</th>
                      <th className="py-2 px-3 font-semibold text-right">Unit Rate</th>
                      <th className="py-2 px-3 font-semibold text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {proof.items && proof.items.length > 0 ? (
                      proof.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/40">
                          <td className="py-2 px-3">{item.description}</td>
                          <td className="py-2 px-3 text-center">{item.qty}</td>
                          <td className="py-2 px-3 text-right">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                          <td className="py-2 px-3 text-right font-medium text-white">₹{item.total.toLocaleString('en-IN')}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-2 px-3">{proof.description}</td>
                        <td className="py-2 px-3 text-center">1</td>
                        <td className="py-2 px-3 text-right">₹{proof.amountSpent.toLocaleString('en-IN')}</td>
                        <td className="py-2 px-3 text-right font-medium text-white">₹{proof.amountSpent.toLocaleString('en-IN')}</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="bg-slate-900/90 border-t border-slate-800 font-bold text-white">
                    <tr>
                      <td colSpan={3} className="py-2.5 px-3 text-right text-xs">Total Bill Amount Paid:</td>
                      <td className="py-2.5 px-3 text-right text-sm text-emerald-400 font-mono">
                        ₹{proof.amountSpent.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Description Notes */}
            <div>
              <span className="text-slate-400 text-[10px] font-semibold uppercase block mb-1">Creator Justification / Site Notes:</span>
              <p className="text-slate-300 text-xs bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                {proof.description}
              </p>
            </div>

          </div>

          {/* Admin Verification & Audit Stamp */}
          <div className={`p-4 rounded-xl border space-y-2 ${
            proof.status === 'verified'
              ? 'bg-emerald-950/30 border-emerald-500/30'
              : proof.status === 'pending'
              ? 'bg-amber-950/30 border-amber-500/30'
              : 'bg-rose-950/30 border-rose-500/30'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {proof.status === 'verified' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {proof.status === 'pending' && <Clock className="w-5 h-5 text-amber-400" />}
              {proof.status === 'rejected' && <AlertCircle className="w-5 h-5 text-rose-400" />}
              <span className={proof.status === 'verified' ? 'text-emerald-300' : proof.status === 'pending' ? 'text-amber-300' : 'text-rose-300'}>
                {proof.status === 'verified' ? 'Administrative Verification Passed' : proof.status === 'pending' ? 'Audit in Progress' : 'Proof Rejected'}
              </span>
            </div>

            <p className="text-slate-300 text-xs">
              <strong className="text-slate-200">Auditor Notes: </strong>
              {proof.reviewerNotes || 'Pending review by platform trust and safety auditor.'}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
              <span>Submitted: {new Date(proof.submittedAt).toLocaleDateString()}</span>
              {proof.reviewedAt && (
                <span>Audited: {new Date(proof.reviewedAt).toLocaleDateString()}</span>
              )}
              <span className="font-mono text-[10px] text-slate-500">Hash: 0x{proof.id.slice(-8)}</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={closeProofModal}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Close Receipt
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
