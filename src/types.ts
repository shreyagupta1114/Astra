export type UserRole = 'donor' | 'creator' | 'admin';

export type CampaignStatus = 'active' | 'funded' | 'in_execution' | 'completed';

export type MilestoneStatus = 'locked' | 'in_progress' | 'completed';

export type ProofStatus = 'pending' | 'verified' | 'rejected';

export type TransactionType =
  | 'donor_contribution'
  | 'escrow_lock'
  | 'milestone_release'
  | 'vendor_payout';

export interface Milestone {
  id: string;
  order: number;
  name: string;
  description: string;
  targetAmount: number;
  releasedAmount: number;
  status: MilestoneStatus;
  expectedDate: string;
  completedDate?: string;
  proofIds: string[];
}

export interface ProofOfUtilization {
  id: string;
  campaignId: string;
  campaignTitle: string;
  milestoneId: string;
  milestoneName: string;
  vendorName: string;
  vendorGstin?: string;
  amountSpent: number;
  date: string;
  description: string;
  receiptNumber: string;
  receiptTitle: string;
  receiptCategory: string;
  items?: Array<{ description: string; qty: number; unitPrice: number; total: number }>;
  status: ProofStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: TransactionType;
  fromEntity: string;
  toEntity: string;
  campaignId: string;
  campaignTitle: string;
  milestoneId?: string;
  milestoneName?: string;
  status: 'completed' | 'released' | 'verified' | 'pending';
  proofRefId?: string;
  txHash: string;
}

export interface DonorContribution {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  campaignId: string;
  campaignTitle: string;
  date: string;
  status: 'in_escrow' | 'partially_released' | 'fully_utilized';
  txHash: string;
}

export interface CreatorProfile {
  id: string;
  name: string;
  organization: string;
  avatar: string;
  email: string;
  phone: string;
  registrationNumber: string;
  bio: string;
  completedCampaignsCount: number;
  totalFundsRaised: number;
  verifiedUtilizationRate: number; // e.g. 96 (percentage)
  successfulMilestonesCount: number;
  totalMilestonesCount: number;
  previousCampaigns: Array<{
    id: string;
    title: string;
    year: string;
    fundsRaised: number;
    verifiedRate: number;
    milestonesPassed: string;
    status: string;
  }>;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  category: string;
  creatorId: string;
  creatorName: string;
  creatorOrg: string;
  creatorAvatar: string;
  creatorCredibility: {
    completedCampaigns: number;
    verifiedRate: number;
    successfulMilestones: string;
  };
  goalAmount: number;
  raisedAmount: number;
  escrowAmount: number;
  releasedAmount: number;
  verifiedSpentAmount: number;
  donorCount: number;
  deadline: string;
  coverImage: string;
  status: CampaignStatus;
  milestones: Milestone[];
  createdAt: string;
}
