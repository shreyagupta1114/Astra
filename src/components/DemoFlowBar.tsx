import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Lock,
  FileText,
  ShieldCheck,
  Send,
  Eye,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

export const DemoFlowBar: React.FC = () => {
  const {
    setCurrentView,
    setCurrentRole,
    openDonateModal,
    campaigns,
    proofs,
    approveProof,
    resetDemoData,
  } = useApp();

  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      step: 1,
      title: 'Donor Contributes ₹50,000',
      description: 'Open contribution modal with ₹50,000 preset',
      actionLabel: 'Contribute ₹50,000',
      run: () => {
        const camp = campaigns.find((c) => c.id === 'camp-1') || campaigns[0];
        setCurrentRole('donor');
        setCurrentView('campaign-detail', camp.id);
        openDonateModal(camp);
        setCurrentStep(2);
      },
    },
    {
      step: 2,
      title: 'Funds Enter Escrow Vault',
      description: 'Observe: Money raised ≠ Money spent. Stored safely in escrow',
      actionLabel: 'Inspect Escrow Breakdown',
      run: () => {
        setCurrentRole('donor');
        setCurrentView('campaign-detail', 'camp-1');
        setCurrentStep(3);
      },
    },
    {
      step: 3,
      title: 'Predefined Milestones',
      description: 'Review the 4 sequential milestones with budgets',
      actionLabel: 'View Milestones',
      run: () => {
        setCurrentRole('creator');
        setCurrentView('campaign-detail', 'camp-1');
        setCurrentStep(4);
      },
    },
    {
      step: 4,
      title: 'Creator Completes Milestone 3',
      description: 'Pipe excavation completed, ready for proof submission',
      actionLabel: 'Open Creator Studio',
      run: () => {
        setCurrentRole('creator');
        setCurrentView('creator-dashboard');
        setCurrentStep(5);
      },
    },
    {
      step: 5,
      title: 'Upload Invoice & Receipt Proof',
      description: 'Invoice #INV-KIPC-7822 for ₹32,500 construction materials',
      actionLabel: 'View Uploaded Proof',
      run: () => {
        setCurrentRole('creator');
        setCurrentView('creator-dashboard');
        setCurrentStep(6);
      },
    },
    {
      step: 6,
      title: 'Admin Audits Verification Queue',
      description: 'Independent admin inspects vendor GSTIN & site receipts',
      actionLabel: 'Open Admin Queue',
      run: () => {
        setCurrentRole('admin');
        setCurrentView('admin-dashboard');
        setCurrentStep(7);
      },
    },
    {
      step: 7,
      title: 'Admin Approves Tranche Release',
      description: 'Tranche of ₹80,000 released from Escrow to contractor',
      actionLabel: 'Approve & Release Tranche',
      run: () => {
        setCurrentRole('admin');
        setCurrentView('admin-dashboard');
        const pending = proofs.find((p) => p.status === 'pending');
        if (pending) {
          approveProof(pending.id, 'Verified on GST portal and geotagged trench photos approved.');
        }
        setCurrentStep(8);
      },
    },
    {
      step: 8,
      title: 'Escrow Funds Disbursed',
      description: 'Escrow decreases, released and vendor payouts update live',
      actionLabel: 'Check Campaign Funds',
      run: () => {
        setCurrentView('campaign-detail', 'camp-1');
        setCurrentStep(9);
      },
    },
    {
      step: 9,
      title: 'Public Ledger Audit Trail',
      description: 'Trace Donor → Escrow → Milestone → Vendor Payout',
      actionLabel: 'Open Public Ledger',
      run: () => {
        setCurrentView('ledger');
        setCurrentStep(10);
      },
    },
    {
      step: 10,
      title: 'Donor Dashboard Synchronized',
      description: 'Donor sees live breakdown of where their money traveled',
      actionLabel: 'Open Donor Dashboard',
      run: () => {
        setCurrentRole('donor');
        setCurrentView('donor-dashboard');
        setCurrentStep(1);
      },
    },
  ];

  const activeStepObj = steps.find((s) => s.step === currentStep) || steps[0];

  return (
    <div className="bg-slate-950 border-b border-emerald-500/30 text-slate-100 text-xs shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          
          {/* Header & Toggle */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400 tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Demo Flow Walkthrough
            </span>
            <span className="hidden md:inline-block text-slate-400">
              (Step {currentStep} of 10): <strong className="text-white">{activeStepObj.title}</strong>
            </span>
          </div>

          {/* Quick Action Button & Step Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={activeStepObj.run}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors shadow-sm active:scale-95"
            >
              <span>{activeStepObj.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => resetDemoData()}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors flex items-center gap-1"
              title="Reset Demo Data to Initial State"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Toggle Steps Bar"
            >
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Detailed Expandable Horizontal Steps */}
        {isOpen && (
          <div className="mt-2.5 pt-2 border-t border-slate-800/80 overflow-x-auto pb-1 scrollbar-thin">
            <div className="flex items-center gap-2 min-w-max">
              {steps.map((s) => {
                const isActive = s.step === currentStep;
                const isPassed = s.step < currentStep;

                return (
                  <button
                    key={s.step}
                    onClick={() => {
                      setCurrentStep(s.step);
                      s.run();
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                      isActive
                        ? 'bg-emerald-900/60 border-emerald-400/80 text-white ring-1 ring-emerald-400/40 shadow-sm'
                        : isPassed
                        ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? 'bg-emerald-400 text-slate-950'
                          : isPassed
                          ? 'bg-emerald-800 text-emerald-200'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isPassed ? '✓' : s.step}
                    </span>
                    <span className="font-medium whitespace-nowrap text-[11px]">
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
