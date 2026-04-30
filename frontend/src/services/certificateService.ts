import { Certificate } from '@/types';
import { mockCertificates } from '@/data/mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const certificateService = {
  async getByUser(userId: string): Promise<Certificate[]> {
    await delay(300);
    return mockCertificates.filter(c => c.userId === userId);
  },

  async getAll(): Promise<Certificate[]> {
    await delay(300);
    return mockCertificates;
  },

  async download(certId: string): Promise<void> {
    await delay(500);
    // Mock download — in real app, would return PDF blob
    console.log(`Downloading certificate ${certId}`);
    alert('Certificate download started (mock)');
  },
};
