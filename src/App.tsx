/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { DemoFlowBar } from './components/DemoFlowBar';
import { Footer } from './components/Footer';

// Views
import { LandingView } from './views/LandingView';
import { ExploreView } from './views/ExploreView';
import { CampaignDetailView } from './views/CampaignDetailView';
import { DonorDashboardView } from './views/DonorDashboardView';
import { CreatorDashboardView } from './views/CreatorDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { LedgerView } from './views/LedgerView';
import { CreateCampaignView } from './views/CreateCampaignView';

// Modals
import { DonateModal } from './components/DonateModal';
import { ReceiptModal } from './components/ReceiptModal';
import { CreatorProfileModal } from './components/CreatorProfileModal';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar />
      <DemoFlowBar />

      <main className="flex-1">
        {currentView === 'landing' && <LandingView />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'campaign-detail' && <CampaignDetailView />}
        {currentView === 'donor-dashboard' && <DonorDashboardView />}
        {currentView === 'creator-dashboard' && <CreatorDashboardView />}
        {currentView === 'admin-dashboard' && <AdminDashboardView />}
        {currentView === 'ledger' && <LedgerView />}
        {currentView === 'create-campaign' && <CreateCampaignView />}
      </main>

      <Footer />

      {/* Global Interactive Modals */}
      <DonateModal />
      <ReceiptModal />
      <CreatorProfileModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
