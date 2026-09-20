import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PlusCircle,
  Trash2,
  Lock,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Image as ImageIcon
} from 'lucide-react';

export const CreateCampaignView: React.FC = () => {
  const { createCampaign, setCurrentView } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Water & Sanitation');
  const [goalAmount, setGoalAmount] = useState<number>(180000);
  const [deadline, setDeadline] = useState('2026-11-30');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&q=80&w=900'
  );

  const [milestones, setMilestones] = useState([
    {
      name: 'Phase 1: Hydrological Survey & Planning',
      description: 'Aquifer resistivity survey, soil tests, and panchayat clearance.',
      targetAmount: 20000,
      expectedDate: '2026-10-15',
    },
    {
      name: 'Phase 2: Material Purchase & Drilling Rig',
      description: 'Casing pipes, 5HP solar DC pump kit, and drilling contractor advance.',
      targetAmount: 50000,
      expectedDate: '2026-10-30',
    },
    {
      name: 'Phase 3: Pipeline Distribution Network',
      description: 'Laying underground high-density polyethylene distribution lines.',
      targetAmount: 80000,
      expectedDate: '2026-11-15',
    },
    {
      name: 'Phase 4: Water Kiosk & Commissioning',
      description: 'Automated dispensing tap and village water committee training handover.',
      targetAmount: 30000,
      expectedDate: '2026-11-30',
    },
  ]);

  const categories = [
    'Water & Sanitation',
    'Education & Schools',
    'Healthcare & Medical',
    'Animal Welfare',
    'Disaster Relief',
    'Rural Livelihoods',
  ];

  const imagePresets = [
    {
      label: 'Clean Water Project',
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&q=80&w=900',
    },
    {
      label: 'School Renovation',
      url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=900',
    },
    {
      label: 'Medical Emergency',
      url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=900',
    },
    {
      label: 'Animal Shelter',
      url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=900',
    },
  ];

  const milestonesSum = milestones.reduce((acc, m) => acc + (Number(m.targetAmount) || 0), 0);
  const isBudgetBalanced = milestonesSum === Number(goalAmount);

  const handleAddMilestone = () => {
    setMilestones([
      ...milestones,
      {
        name: `Phase ${milestones.length + 1}: Implementation`,
        description: 'Describe key vendor deliverables and verification milestones.',
        targetAmount: 25000,
        expectedDate: '2026-12-15',
      },
    ]);
  };

  const handleRemoveMilestone = (index: number) => {
    if (milestones.length <= 1) return;
    setMilestones(milestones.filter((_, idx) => idx !== index));
  };

  const handleUpdateMilestone = (index: number, field: string, value: any) => {
    const updated = [...milestones];
    updated[index] = { ...updated[index], [field]: value };
    setMilestones(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || goalAmount <= 0) return;

    createCampaign({
      title,
      description,
      category,
      goalAmount,
      deadline,
      coverImage,
      milestones,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Escrow Protected Campaign Creation</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Create Transparent Campaign
        </h1>
        <p className="text-sm text-slate-400">
          All campaigns on VeriRupee require predefined, sequential milestones. Funds are locked into an Escrow Vault and disbursed only as verified tax receipts are audited.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        
        {/* Basic Campaign Information */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            1. Campaign Overview
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Campaign Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Clean Drinking Water for Parched Marathwada Village"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Detailed Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Explain the cause, why funds are needed, and how the community will benefit..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Goal Amount (INR)</label>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Image Selection Presets */}
            <div>
              <label className="block text-slate-300 font-semibold mb-2">Campaign Cover Image</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {imagePresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setCoverImage(preset.url)}
                    className={`relative rounded-xl overflow-hidden h-20 border text-left transition-all ${
                      coverImage === preset.url
                        ? 'border-emerald-500 ring-2 ring-emerald-500/40'
                        : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 p-1 text-[9px] font-bold text-white text-center truncate">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Or paste an image URL..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Milestone Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                2. Predefined Milestone Breakdown & Budgets
              </h2>
              <p className="text-[11px] text-slate-400">
                Milestones lock funds in escrow. You will submit verified receipts for each phase.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddMilestone}
              className="self-start sm:self-auto px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Add Milestone</span>
            </button>
          </div>

          {/* Budget Reconciliation Bar */}
          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            isBudgetBalanced
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
          }`}>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 shrink-0" />
              <span>
                <strong>Milestones Total:</strong> ₹{milestonesSum.toLocaleString('en-IN')} / Goal: ₹{Number(goalAmount).toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[11px] font-bold">
              {isBudgetBalanced ? '✓ Balanced 100%' : `Diff: ₹${(goalAmount - milestonesSum).toLocaleString('en-IN')}`}
            </span>
          </div>

          {/* Milestone Cards List */}
          <div className="space-y-4">
            {milestones.map((m, index) => (
              <div
                key={index}
                className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                    Milestone Phase {index + 1}
                  </span>
                  {milestones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(index)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Remove Milestone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Milestone Name</label>
                    <input
                      type="text"
                      value={m.name}
                      onChange={(e) => handleUpdateMilestone(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">Required Amount (₹)</label>
                      <input
                        type="number"
                        min="1000"
                        step="500"
                        value={m.targetAmount}
                        onChange={(e) => handleUpdateMilestone(index, 'targetAmount', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-bold focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-[11px] mb-1">Target Completion</label>
                      <input
                        type="date"
                        value={m.expectedDate}
                        onChange={(e) => handleUpdateMilestone(index, 'expectedDate', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Deliverable Scope & Verification Criteria</label>
                  <input
                    type="text"
                    value={m.description}
                    onChange={(e) => handleUpdateMilestone(index, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Geotagged site inspection report and GST invoice for cement/iron"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="text-[11px] text-slate-400">
            By publishing, you agree to submit verifiable vendor tax receipts before any funds are released.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setCurrentView('explore')}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all w-full sm:w-auto active:scale-95"
            >
              <span>Publish Campaign with Escrow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </form>

    </div>
  );
};
