import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_CREATOR_PROFILES,
  INITIAL_DONOR_CONTRIBUTIONS,
  INITIAL_PROOFS,
  INITIAL_TRANSACTIONS,
} from '../data/mockData';
import {
  Campaign,
  CreatorProfile,
  DonorContribution,
  Milestone,
  ProofOfUtilization,
  Transaction,
  UserRole,
} from '../types';

interface AppContextType {
  campaigns: Campaign[];
  proofs: ProofOfUtilization[];
  transactions: Transaction[];
  donorContributions: DonorContribution[];
  creatorProfiles: Record<string, CreatorProfile>;
  currentRole: UserRole;
  currentView: string;
  selectedCampaignId: string | null;
  selectedProofForModal: ProofOfUtilization | null;
  selectedCreatorForModal: CreatorProfile | null;
  isDonateModalOpen: boolean;
  donateTargetCampaign: Campaign | null;
  notification: { message: string; type: 'success' | 'info' | 'warning' } | null;

  // Setters & Navigation
  setCurrentRole: (role: UserRole) => void;
  setCurrentView: (view: string, campaignId?: string) => void;
  openDonateModal: (campaign: Campaign) => void;
  closeDonateModal: () => void;
  openProofModal: (proof: ProofOfUtilization) => void;
  closeProofModal: () => void;
  openCreatorModal: (creatorId: string) => void;
  closeCreatorModal: () => void;
  dismissNotification: () => void;

  // Actions
  contributeToCampaign: (campaignId: string, amount: number, donorName: string, donorEmail: string) => void;
  submitProofOfUtilization: (data: {
    campaignId: string;
    milestoneId: string;
    vendorName: string;
    vendorGstin?: string;
    amountSpent: number;
    date: string;
    description: string;
    receiptTitle: string;
    receiptCategory: string;
    items?: Array<{ description: string; qty: number; unitPrice: number; total: number }>;
  }) => void;
  approveProof: (proofId: string, reviewerNotes?: string) => void;
  rejectProof: (proofId: string, reviewerNotes: string) => void;
  releaseTrancheDirect: (campaignId: string, milestoneId: string) => void;
  createCampaign: (data: {
    title: string;
    description: string;
    category: string;
    goalAmount: number;
    deadline: string;
    coverImage: string;
    milestones: Array<{ name: string; description: string; targetAmount: number; expectedDate: string }>;
  }) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'verirupee_crowdfund_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_campaigns');
      return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });

  const [proofs, setProofs] = useState<ProofOfUtilization[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_proofs');
      return saved ? JSON.parse(saved) : INITIAL_PROOFS;
    } catch {
      return INITIAL_PROOFS;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_tx');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [donorContributions, setDonorContributions] = useState<DonorContribution[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_donors');
      return saved ? JSON.parse(saved) : INITIAL_DONOR_CONTRIBUTIONS;
    } catch {
      return INITIAL_DONOR_CONTRIBUTIONS;
    }
  });

  const [creatorProfiles] = useState<Record<string, CreatorProfile>>(INITIAL_CREATOR_PROFILES);
  const [currentRole, setCurrentRole] = useState<UserRole>('donor');
  const [currentView, setCurrentViewInternal] = useState<string>('landing');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>('camp-1');
  const [selectedProofForModal, setSelectedProofForModal] = useState<ProofOfUtilization | null>(null);
  const [selectedCreatorForModal, setSelectedCreatorForModal] = useState<CreatorProfile | null>(null);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);
  const [donateTargetCampaign, setDonateTargetCampaign] = useState<Campaign | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(
    null
  );

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_campaigns', JSON.stringify(campaigns));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_proofs', JSON.stringify(proofs));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_tx', JSON.stringify(transactions));
      localStorage.setItem(LOCAL_STORAGE_KEY + '_donors', JSON.stringify(donorContributions));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
  }, [campaigns, proofs, transactions, donorContributions]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotification({ message, type });
  };

  const dismissNotification = () => setNotification(null);

  const setCurrentView = (view: string, campaignId?: string) => {
    if (campaignId) {
      setSelectedCampaignId(campaignId);
    }
    setCurrentViewInternal(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDonateModal = (campaign: Campaign) => {
    setDonateTargetCampaign(campaign);
    setIsDonateModalOpen(true);
  };

  const closeDonateModal = () => {
    setIsDonateModalOpen(false);
    setDonateTargetCampaign(null);
  };

  const openProofModal = (proof: ProofOfUtilization) => {
    setSelectedProofForModal(proof);
  };

  const closeProofModal = () => {
    setSelectedProofForModal(null);
  };

  const openCreatorModal = (creatorId: string) => {
    const profile = creatorProfiles[creatorId] || Object.values(creatorProfiles)[0];
    setSelectedCreatorForModal(profile);
  };

  const closeCreatorModal = () => {
    setSelectedCreatorForModal(null);
  };

  // 1. Contribute to Campaign (Funds lock in Escrow)
  const contributeToCampaign = (campaignId: string, amount: number, donorName: string, donorEmail: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    if (!campaign) return;

    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const hash = '0x' + Math.random().toString(16).substring(2, 6) + '...' + Math.random().toString(16).substring(2, 6);

    // Update Campaign
    const updatedCampaigns = campaigns.map((c) => {
      if (c.id === campaignId) {
        const newRaised = c.raisedAmount + amount;
        const newEscrow = c.escrowAmount + amount;
        const newDonors = c.donorCount + 1;
        const newStatus = newRaised >= c.goalAmount ? (c.status === 'active' ? 'in_execution' : c.status) : c.status;
        return {
          ...c,
          raisedAmount: newRaised,
          escrowAmount: newEscrow,
          donorCount: newDonors,
          status: newStatus,
        };
      }
      return c;
    });

    // Create Donor Contribution
    const newContribution: DonorContribution = {
      id: 'don-' + Date.now(),
      donorName: donorName || 'Verified Contributor',
      donorEmail: donorEmail || 'donor@example.com',
      amount,
      campaignId,
      campaignTitle: campaign.title,
      date: dateFormatted,
      status: 'in_escrow',
      txHash: hash,
    };

    // Create Transactions
    const tx1: Transaction = {
      id: 'tx-' + Date.now(),
      date: dateFormatted,
      amount,
      type: 'donor_contribution',
      fromEntity: `${donorName || 'Donor'} (${donorEmail || 'aditi@example.com'})`,
      toEntity: 'Escrow Smart Vault',
      campaignId,
      campaignTitle: campaign.title,
      status: 'completed',
      txHash: hash,
    };

    const tx2: Transaction = {
      id: 'tx-' + (Date.now() + 1),
      date: dateFormatted,
      amount,
      type: 'escrow_lock',
      fromEntity: 'Public Contributions Pool',
      toEntity: 'Escrow Smart Vault',
      campaignId,
      campaignTitle: campaign.title,
      status: 'completed',
      txHash: '0x' + Math.random().toString(16).substring(2, 6) + '...' + Math.random().toString(16).substring(2, 6),
    };

    setCampaigns(updatedCampaigns);
    setDonorContributions([newContribution, ...donorContributions]);
    setTransactions([tx1, tx2, ...transactions]);

    showToast(
      `₹${amount.toLocaleString('en-IN')} securely locked in Escrow for "${campaign.title.slice(0, 30)}..."! Money will not be released until verified milestones are completed.`,
      'success'
    );
  };

  // 2. Creator submits Proof of Utilization
  const submitProofOfUtilization = (data: {
    campaignId: string;
    milestoneId: string;
    vendorName: string;
    vendorGstin?: string;
    amountSpent: number;
    date: string;
    description: string;
    receiptTitle: string;
    receiptCategory: string;
    items?: Array<{ description: string; qty: number; unitPrice: number; total: number }>;
  }) => {
    const campaign = campaigns.find((c) => c.id === data.campaignId);
    const milestone = campaign?.milestones.find((m) => m.id === data.milestoneId);

    const newProofId = 'proof-' + Date.now();
    const newProof: ProofOfUtilization = {
      id: newProofId,
      campaignId: data.campaignId,
      campaignTitle: campaign ? campaign.title : 'Campaign Project',
      milestoneId: data.milestoneId,
      milestoneName: milestone ? milestone.name : 'Milestone',
      vendorName: data.vendorName,
      vendorGstin: data.vendorGstin || '27AABCV' + Math.floor(1000 + Math.random() * 9000) + 'X1Z9',
      amountSpent: data.amountSpent,
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description,
      receiptNumber: 'INV-' + Math.floor(10000 + Math.random() * 90000),
      receiptTitle: data.receiptTitle || 'Vendor Tax Invoice',
      receiptCategory: data.receiptCategory || 'Procurement & Services',
      items: data.items && data.items.length > 0 ? data.items : [
        { description: data.description, qty: 1, unitPrice: data.amountSpent, total: data.amountSpent }
      ],
      status: 'pending',
      submittedAt: new Date().toISOString(),
      reviewerNotes: 'Submitted by creator. Pending auditor verification on GSTIN and deliverables.',
    };

    setProofs([newProof, ...proofs]);

    // Attach proof ID to milestone
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === data.campaignId) {
          return {
            ...c,
            milestones: c.milestones.map((m) => {
              if (m.id === data.milestoneId) {
                return {
                  ...m,
                  proofIds: [...m.proofIds, newProofId],
                };
              }
              return m;
            }),
          };
        }
        return c;
      })
    );

    showToast(`Proof of ₹${data.amountSpent.toLocaleString('en-IN')} submitted successfully! Admin verification queue updated.`, 'info');
  };

  // 3. Admin Approves Proof -> Releases Tranche
  const approveProof = (proofId: string, reviewerNotes = 'Verified against vendor GSTIN, site photographs, and physical work order.') => {
    const proof = proofs.find((p) => p.id === proofId);
    if (!proof || proof.status === 'verified') return;

    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const hash1 = '0x' + Math.random().toString(16).substring(2, 6) + '...' + Math.random().toString(16).substring(2, 6);
    const hash2 = '0x' + Math.random().toString(16).substring(2, 6) + '...' + Math.random().toString(16).substring(2, 6);

    let trancheReleased = 0;
    let campaignTitle = '';
    let milestoneName = '';

    // Update Campaign state
    const updatedCampaigns = campaigns.map((camp) => {
      if (camp.id === proof.campaignId) {
        campaignTitle = camp.title;
        const targetMilestone = camp.milestones.find((m) => m.id === proof.milestoneId);
        trancheReleased = targetMilestone ? targetMilestone.targetAmount : proof.amountSpent;
        milestoneName = targetMilestone ? targetMilestone.name : 'Milestone Tranche';

        const newEscrow = Math.max(0, camp.escrowAmount - trancheReleased);
        const newReleased = camp.releasedAmount + trancheReleased;
        const newVerifiedSpent = camp.verifiedSpentAmount + proof.amountSpent;

        // Update milestones: set this to completed, unlock next
        let foundCurrent = false;
        let allCompleted = true;

        const updatedMilestones: Milestone[] = camp.milestones.map((m) => {
          if (m.id === proof.milestoneId) {
            foundCurrent = true;
            return {
              ...m,
              status: 'completed',
              releasedAmount: m.targetAmount,
              completedDate: now.toISOString().split('T')[0],
            };
          }
          if (foundCurrent && m.status === 'locked') {
            foundCurrent = false; // only unlock the immediate next
            allCompleted = false;
            return {
              ...m,
              status: 'in_progress',
            };
          }
          if (m.status !== 'completed') {
            allCompleted = false;
          }
          return m;
        });

        return {
          ...camp,
          escrowAmount: newEscrow,
          releasedAmount: newReleased,
          verifiedSpentAmount: newVerifiedSpent,
          status: allCompleted ? 'completed' : camp.status,
          milestones: updatedMilestones,
        };
      }
      return camp;
    });

    // Update Proof
    const updatedProofs = proofs.map((p) => {
      if (p.id === proofId) {
        return {
          ...p,
          status: 'verified' as const,
          reviewedAt: now.toISOString(),
          reviewerNotes,
        };
      }
      return p;
    });

    // Create 2 Transactions:
    // Tx 1: Escrow -> Milestone Release
    const txRelease: Transaction = {
      id: 'tx-' + Date.now(),
      date: dateFormatted,
      amount: trancheReleased,
      type: 'milestone_release',
      fromEntity: 'Escrow Smart Vault',
      toEntity: `Milestone: ${milestoneName}`,
      campaignId: proof.campaignId,
      campaignTitle,
      milestoneId: proof.milestoneId,
      milestoneName,
      status: 'released',
      proofRefId: proof.id,
      txHash: hash1,
    };

    // Tx 2: Milestone -> Vendor Payout
    const txVendor: Transaction = {
      id: 'tx-' + (Date.now() + 1),
      date: dateFormatted,
      amount: proof.amountSpent,
      type: 'vendor_payout',
      fromEntity: `Milestone Pool: ${milestoneName}`,
      toEntity: proof.vendorName,
      campaignId: proof.campaignId,
      campaignTitle,
      milestoneId: proof.milestoneId,
      milestoneName,
      status: 'verified',
      proofRefId: proof.id,
      txHash: hash2,
    };

    setCampaigns(updatedCampaigns);
    setProofs(updatedProofs);
    setTransactions([txRelease, txVendor, ...transactions]);

    showToast(
      `Admin Approved! Tranche of ₹${trancheReleased.toLocaleString('en-IN')} released from Escrow to ${proof.vendorName}. Public ledger updated.`,
      'success'
    );
  };

  // 4. Admin Rejects Proof
  const rejectProof = (proofId: string, reviewerNotes: string) => {
    setProofs((prev) =>
      prev.map((p) => {
        if (p.id === proofId) {
          return {
            ...p,
            status: 'rejected',
            reviewedAt: new Date().toISOString(),
            reviewerNotes: reviewerNotes || 'Missing verifiable GST tax invoice and GPS site geotag.',
          };
        }
        return p;
      })
    );
    showToast('Proof rejected. Escrow funds remain safely locked.', 'warning');
  };

  // 5. Direct Release Helper (for manual demo triggers)
  const releaseTrancheDirect = (campaignId: string, milestoneId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    const milestone = campaign?.milestones.find((m) => m.id === milestoneId);
    if (!campaign || !milestone) return;

    // Check if there is an existing pending proof or create one
    let targetProof = proofs.find((p) => p.campaignId === campaignId && p.milestoneId === milestoneId && p.status === 'pending');
    if (!targetProof) {
      const newProofId = 'proof-auto-' + Date.now();
      targetProof = {
        id: newProofId,
        campaignId,
        campaignTitle: campaign.title,
        milestoneId,
        milestoneName: milestone.name,
        vendorName: 'Direct Project Vendor & Contractors',
        amountSpent: milestone.targetAmount,
        date: new Date().toISOString().split('T')[0],
        description: `Verified completion for ${milestone.name}`,
        receiptNumber: 'INV-REL-' + Math.floor(1000 + Math.random() * 9000),
        receiptTitle: 'Verified Completion Invoice',
        receiptCategory: 'Tranche Disbursement',
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };
      setProofs((prev) => [targetProof!, ...prev]);
    }
    approveProof(targetProof.id, 'Direct tranche release confirmed by supervisor.');
  };

  // 6. Create Campaign
  const createCampaign = (data: {
    title: string;
    description: string;
    category: string;
    goalAmount: number;
    deadline: string;
    coverImage: string;
    milestones: Array<{ name: string; description: string; targetAmount: number; expectedDate: string }>;
  }) => {
    const newId = 'camp-' + Date.now();
    const creator = creatorProfiles['creator-1'];

    const formattedMilestones: Milestone[] = data.milestones.map((m, idx) => ({
      id: `m-${newId}-${idx + 1}`,
      order: idx + 1,
      name: m.name,
      description: m.description,
      targetAmount: m.targetAmount,
      releasedAmount: 0,
      status: idx === 0 ? 'in_progress' : 'locked',
      expectedDate: m.expectedDate || '2026-11-30',
      proofIds: [],
    }));

    const newCampaign: Campaign = {
      id: newId,
      title: data.title,
      description: data.description,
      category: data.category || 'Community Development',
      creatorId: creator.id,
      creatorName: creator.name,
      creatorOrg: creator.organization,
      creatorAvatar: creator.avatar,
      creatorCredibility: {
        completedCampaigns: creator.completedCampaignsCount,
        verifiedRate: creator.verifiedUtilizationRate,
        successfulMilestones: `${creator.successfulMilestonesCount}/${creator.totalMilestonesCount}`,
      },
      goalAmount: data.goalAmount,
      raisedAmount: 0,
      escrowAmount: 0,
      releasedAmount: 0,
      verifiedSpentAmount: 0,
      donorCount: 0,
      deadline: data.deadline || '2026-12-31',
      coverImage:
        data.coverImage ||
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&q=80&w=900',
      status: 'active',
      milestones: formattedMilestones,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setCampaigns([newCampaign, ...campaigns]);
    setSelectedCampaignId(newId);
    setCurrentView('campaign-detail', newId);
    showToast(`Campaign "${data.title}" successfully created with ${formattedMilestones.length} milestones!`, 'success');
  };

  // Reset demo data to pristine state
  const resetDemoData = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY + '_campaigns');
      localStorage.removeItem(LOCAL_STORAGE_KEY + '_proofs');
      localStorage.removeItem(LOCAL_STORAGE_KEY + '_tx');
      localStorage.removeItem(LOCAL_STORAGE_KEY + '_donors');
    } catch {}
    setCampaigns(INITIAL_CAMPAIGNS);
    setProofs(INITIAL_PROOFS);
    setTransactions(INITIAL_TRANSACTIONS);
    setDonorContributions(INITIAL_DONOR_CONTRIBUTIONS);
    setSelectedCampaignId('camp-1');
    showToast('Demo data restored to initial state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        campaigns,
        proofs,
        transactions,
        donorContributions,
        creatorProfiles,
        currentRole,
        currentView,
        selectedCampaignId,
        selectedProofForModal,
        selectedCreatorForModal,
        isDonateModalOpen,
        donateTargetCampaign,
        notification,

        setCurrentRole,
        setCurrentView,
        openDonateModal,
        closeDonateModal,
        openProofModal,
        closeProofModal,
        openCreatorModal,
        closeCreatorModal,
        dismissNotification,

        contributeToCampaign,
        submitProofOfUtilization,
        approveProof,
        rejectProof,
        releaseTrancheDirect,
        createCampaign,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
