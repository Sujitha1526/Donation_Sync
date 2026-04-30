import { Donation, DonationRequest } from '@/types';
import {
  getDonations,
  createDonation,
  requestDonation,
  acceptDonation,
  contributeDonation,
  completeDonation,
} from '@/api';

export const donationService = {
  async getAll(): Promise<Donation[]> {
    return getDonations();
  },

  async getByDonor(donorId: string): Promise<Donation[]> {
    const donations = await getDonations();
    return (donations || []).filter((d: Donation) => d.donorId === donorId);
  },

  async getAvailable(): Promise<Donation[]> {
    return getDonations('pending');
  },

  async getByOrganization(orgId: string): Promise<Donation[]> {
    const donations = await getDonations();
    return (donations || []).filter((d: Donation) => d.assignedOrganization === orgId);
  },

  async getByVolunteer(volId: string): Promise<Donation[]> {
    const donations = await getDonations('in-progress');
    return (donations || []).filter((d: Donation) => d.assignedVolunteer === volId);
  },

  async create(donation: Partial<Donation>) {
    return createDonation(donation);
  },

  async getRequests(donationId?: string): Promise<DonationRequest[]> {
    // No dedicated request endpoint yet
    return [];
  },

  async createRequest(req: Partial<DonationRequest>) {
    if (!req.donationId) throw new Error('donationId required');
    await requestDonation(req.donationId);
    return { ...req, id: `r-${Date.now()}`, status: 'pending', createdAt: new Date().toISOString() } as DonationRequest;
  },
};
