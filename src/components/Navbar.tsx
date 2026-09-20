import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Compass,
  FileCheck2,
  PlusCircle,
  Menu,
  X,
  User,
  Wrench,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Layers,
  FileText
} from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    currentView,
    setCurrentView,
    proofs,
    resetDemoData
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pendingCount = proofs.filter((p) => p.status === 'pending').length;

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'admin') {
      setCurrentView('admin-dashboard');
    } else if (role === 'creator') {
      setCurrentView('creator-dashboard');
    } else {
      setCurrentView('donor-dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Platform Name */}
          <div
            id="nav-logo"
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-950/40 text-white group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  VeriRupee
                </span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Escrow Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 tracking-wide">
                Track Every Rupee. Build Trust.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              id="nav-explore"
              onClick={() => setCurrentView('explore')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'explore'
                  ? 'bg-slate-800 text-emerald-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              Explore Campaigns
            </button>

            <button
              id="nav-how-it-works"
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentView === 'landing'
                  ? 'text-emerald-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              How It Works
            </button>

            <button
              id="nav-ledger"
              onClick={() => setCurrentView('ledger')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'ledger'
                  ? 'bg-slate-800 text-emerald-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              Public Fund Ledger
            </button>

            {/* Dashboards dropdown / links */}
            <div className="relative group">
              <button
                id="nav-dashboards-menu"
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView.includes('dashboard')
                    ? 'bg-slate-800 text-emerald-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Layers className="w-4 h-4" />
                Dashboards
                {pendingCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </button>
              <div className="absolute top-full right-0 w-56 pt-2 hidden group-hover:block z-50">
                <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 text-xs">
                  <button
                    onClick={() => {
                      setCurrentRole('donor');
                      setCurrentView('donor-dashboard');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-700/80 flex items-center gap-2.5 text-slate-200"
                  >
                    <User className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold">Donor Dashboard</div>
                      <div className="text-[10px] text-slate-400">Track my contributions & escrow</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentRole('creator');
                      setCurrentView('creator-dashboard');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-700/80 flex items-center gap-2.5 text-slate-200"
                  >
                    <Wrench className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="font-semibold">Creator Studio</div>
                      <div className="text-[10px] text-slate-400">Submit proof & request tranches</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentRole('admin');
                      setCurrentView('admin-dashboard');
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-700/80 flex items-center gap-2.5 text-slate-200"
                  >
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <div className="flex-1">
                      <div className="font-semibold flex items-center justify-between">
                        <span>Admin Verification</span>
                        {pendingCount > 0 && (
                          <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded text-[10px] font-bold border border-amber-500/30">
                            {pendingCount}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">Audit receipts & release funds</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Controls: Role Selector & Action */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Demo Role Pill */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700 p-1 rounded-xl text-xs">
              <span className="text-slate-400 px-2 font-medium">Role:</span>
              <button
                id="role-btn-donor"
                onClick={() => handleRoleChange('donor')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  currentRole === 'donor'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Donor
              </button>
              <button
                id="role-btn-creator"
                onClick={() => handleRoleChange('creator')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  currentRole === 'creator'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Creator
              </button>
              <button
                id="role-btn-admin"
                onClick={() => handleRoleChange('admin')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  currentRole === 'admin'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>Admin</span>
                {pendingCount > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                )}
              </button>
            </div>

            {/* Create Campaign CTA */}
            <button
              id="nav-create-btn"
              onClick={() => {
                setCurrentRole('creator');
                setCurrentView('create-campaign');
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950/30 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Campaign</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => {
                setCurrentView('explore');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg text-left text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              Explore Campaigns
            </button>
            <button
              onClick={() => {
                setCurrentView('landing');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg text-left text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                setCurrentView('ledger');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 rounded-lg text-left text-sm font-medium text-slate-200 hover:bg-slate-800"
            >
              Public Fund Ledger
            </button>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Select Demo Role
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  handleRoleChange('donor');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs rounded-lg font-medium text-center ${
                  currentRole === 'donor' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Donor View
              </button>
              <button
                onClick={() => {
                  handleRoleChange('creator');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs rounded-lg font-medium text-center ${
                  currentRole === 'creator' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Creator View
              </button>
              <button
                onClick={() => {
                  handleRoleChange('admin');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-xs rounded-lg font-medium text-center ${
                  currentRole === 'admin' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                Admin ({pendingCount})
              </button>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3 flex gap-2">
            <button
              onClick={() => {
                setCurrentRole('creator');
                setCurrentView('create-campaign');
                setMobileMenuOpen(false);
              }}
              className="flex-1 bg-emerald-600 py-2.5 text-xs font-bold rounded-xl text-center text-white"
            >
              + Create Campaign
            </button>
            <button
              onClick={() => {
                resetDemoData();
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-slate-800 rounded-xl text-slate-400 hover:text-white"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
