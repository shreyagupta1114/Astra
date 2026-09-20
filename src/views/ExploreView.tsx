import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Lock,
  CheckCircle2,
  Users,
  Coins,
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { Campaign } from '../types';

export const ExploreView: React.FC = () => {
  const {
    campaigns,
    setCurrentView,
    openDonateModal,
    openCreatorModal,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'raised' | 'goal' | 'recent'>('recent');

  const categories = ['All', 'Water & Sanitation', 'Education & Schools', 'Healthcare & Medical', 'Animal Welfare'];
  const statuses = ['All', 'in_execution', 'active', 'completed'];

  const filteredCampaigns = campaigns
    .filter((camp) => {
      const matchesSearch =
        camp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategory === 'All' || camp.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || camp.status === selectedStatus;

      return matchesSearch && matchesCat && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'raised') return b.raisedAmount - a.raisedAmount;
      if (sortBy === 'goal') return b.goalAmount - a.goalAmount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Escrow Protected Campaigns</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Explore Transparent Campaigns
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Every campaign below holds raised funds in escrow. Inspect current milestone completion, verified tax receipts, and factual creator track records.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 text-xs">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search campaigns, causes, or creator organizations..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="recent">Most Recent</option>
              <option value="raised">Highest Raised</option>
              <option value="goal">Funding Goal</option>
            </select>
          </div>

        </div>

        {/* Category & Status Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium mr-1">Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all capitalize ${
                  selectedStatus === st
                    ? 'bg-slate-700 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st === 'in_execution' ? 'In Execution' : st}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
          <p className="text-slate-400 text-sm">No campaigns match your search and filter criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedStatus('All');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((camp) => {
            const percent = Math.min(100, Math.round((camp.raisedAmount / camp.goalAmount) * 100));
            const currentMilestone = camp.milestones.find((m) => m.status === 'in_progress') || camp.milestones[0];

            return (
              <div
                key={camp.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                {/* Card Top Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
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
                    <span>Escrow Locked</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[10px] bg-slate-950/85 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-emerald-400" />
                      <strong>{camp.donorCount}</strong> Donors
                    </span>
                    <span className="capitalize font-semibold text-emerald-400">
                      ● {camp.status === 'in_execution' ? 'In Execution' : camp.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Creator Factual Credibility Indicator */}
                    <div
                      onClick={() => openCreatorModal(camp.creatorId)}
                      className="flex items-center justify-between cursor-pointer hover:opacity-80 transition-opacity mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={camp.creatorAvatar}
                          alt={camp.creatorName}
                          className="w-6 h-6 rounded-full object-cover border border-slate-700"
                        />
                        <span className="text-xs text-slate-300 font-medium">{camp.creatorName}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                        {camp.creatorCredibility.verifiedRate}% Verified Track Record
                      </span>
                    </div>

                    <h3
                      onClick={() => setCurrentView('campaign-detail', camp.id)}
                      className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors cursor-pointer line-clamp-2"
                    >
                      {camp.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {camp.description}
                    </p>
                  </div>

                  {/* Fund Tracking & Escrow Progress */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="font-extrabold text-white text-base">
                          ₹{camp.raisedAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-slate-400 text-[11px] ml-1">
                          raised ({percent}%)
                        </span>
                      </div>
                      <span className="text-slate-400 text-[11px]">
                        Goal: ₹{camp.goalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {/* Escrow vs Released Comparison */}
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

                    {/* Current Milestone */}
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Milestone {currentMilestone.order} of {camp.milestones.length}:</span>
                      <span className="font-medium text-amber-300 truncate max-w-[130px]">
                        {currentMilestone.name}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setCurrentView('campaign-detail', camp.id)}
                      className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors text-center"
                    >
                      Track Fund Movement
                    </button>
                    <button
                      onClick={() => openDonateModal(camp)}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm active:scale-95"
                    >
                      Contribute
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
