import { User, Donation, DonationRequest, Message, Chat, Certificate, ActivityFeedItem } from '@/types';

export const mockUsers: User[] = [
  { id: 'admin-1', name: 'System Admin', email: 'admin@donationsync.com', role: 'admin', level: 'none', totalContributions: 0, createdAt: '2024-01-01' },
  { id: 'donor-1', name: 'Sarah Johnson', email: 'sarah@email.com', role: 'donor', level: 'gold', totalContributions: 18, createdAt: '2024-02-15' },
  { id: 'donor-2', name: 'Michael Chen', email: 'michael@email.com', role: 'donor', level: 'silver', totalContributions: 12, createdAt: '2024-03-01' },
  { id: 'donor-3', name: 'Emma Wilson', email: 'emma@email.com', role: 'donor', level: 'diamond', totalContributions: 30, createdAt: '2024-01-20' },
  { id: 'donor-4', name: 'James Brown', email: 'james@email.com', role: 'donor', level: 'bronze', totalContributions: 7, createdAt: '2024-04-10' },
  { id: 'org-1', name: 'Hope Foundation', email: 'info@hope.org', role: 'organization', level: 'none', totalContributions: 45, createdAt: '2024-01-05' },
  { id: 'org-2', name: 'Care Network', email: 'hello@care.org', role: 'organization', level: 'none', totalContributions: 32, createdAt: '2024-02-10' },
  { id: 'org-3', name: 'Helping Hands', email: 'contact@helping.org', role: 'organization', level: 'none', totalContributions: 28, createdAt: '2024-03-15' },
  { id: 'vol-1', name: 'Alex Rivera', email: 'alex@email.com', role: 'volunteer', level: 'silver', totalContributions: 14, createdAt: '2024-02-20' },
  { id: 'vol-2', name: 'Priya Patel', email: 'priya@email.com', role: 'volunteer', level: 'gold', totalContributions: 22, createdAt: '2024-01-15' },
  { id: 'vol-3', name: 'David Kim', email: 'david@email.com', role: 'volunteer', level: 'bronze', totalContributions: 6, createdAt: '2024-04-01' },
];

export const mockDonations: Donation[] = [
  { id: 'd-1', donorId: 'donor-1', donorName: 'Sarah Johnson', category: 'food', title: 'Fresh Vegetables Pack', description: 'Assorted fresh vegetables from local farm', quantity: 50, status: 'pending', createdAt: '2025-03-20', freshnessDuration: '3 days' },
  { id: 'd-2', donorId: 'donor-1', donorName: 'Sarah Johnson', category: 'books', title: 'Academic Textbooks', description: 'Engineering textbooks in good condition', quantity: 25, status: 'requested', createdAt: '2025-03-18', bookType: 'academic', organizationId: 'org-1', organizationName: 'Hope Foundation' },
  { id: 'd-3', donorId: 'donor-2', donorName: 'Michael Chen', category: 'clothes', title: 'Winter Jackets', description: 'Warm winter jackets, various sizes', quantity: 30, status: 'accepted', createdAt: '2025-03-15', clothesGender: 'unisex', clothesAgeGroup: 'adults', organizationId: 'org-2', organizationName: 'Care Network' },
  { id: 'd-4', donorId: 'donor-3', donorName: 'Emma Wilson', category: 'food', title: 'Canned Food Supply', description: 'Non-perishable canned goods', quantity: 100, status: 'completed', createdAt: '2025-03-10', freshnessDuration: '12 months', organizationId: 'org-1', organizationName: 'Hope Foundation', volunteerId: 'vol-1', volunteerName: 'Alex Rivera' },
  { id: 'd-5', donorId: 'donor-2', donorName: 'Michael Chen', category: 'books', title: 'Children Story Books', description: 'Colorful story books for kids aged 5-10', quantity: 40, status: 'in-progress', createdAt: '2025-03-12', bookType: 'story', organizationId: 'org-3', organizationName: 'Helping Hands', volunteerId: 'vol-2', volunteerName: 'Priya Patel' },
  { id: 'd-6', donorId: 'donor-4', donorName: 'James Brown', category: 'clothes', title: 'Kids School Uniforms', description: 'School uniforms for primary school', quantity: 60, status: 'available', createdAt: '2025-03-22', clothesGender: 'unisex', clothesAgeGroup: 'kids' },
  { id: 'd-7', donorId: 'donor-3', donorName: 'Emma Wilson', category: 'food', title: 'Rice and Grain Pack', description: 'Bags of rice and assorted grains', quantity: 200, status: 'accepted', createdAt: '2025-03-19', freshnessDuration: '6 months', organizationId: 'org-2', organizationName: 'Care Network' },
  { id: 'd-8', donorId: 'donor-1', donorName: 'Sarah Johnson', category: 'books', title: 'Notebook Bundle', description: 'New blank notebooks for students', quantity: 150, status: 'completed', createdAt: '2025-03-05', bookType: 'notebooks', organizationId: 'org-3', organizationName: 'Helping Hands', volunteerId: 'vol-2', volunteerName: 'Priya Patel' },
];

export const mockRequests: DonationRequest[] = [
  { id: 'r-1', donationId: 'd-1', donationTitle: 'Fresh Vegetables Pack', requesterId: 'org-1', requesterName: 'Hope Foundation', requesterRole: 'organization', status: 'pending', createdAt: '2025-03-21' },
  { id: 'r-2', donationId: 'd-1', donationTitle: 'Fresh Vegetables Pack', requesterId: 'org-2', requesterName: 'Care Network', requesterRole: 'organization', status: 'pending', createdAt: '2025-03-21' },
  { id: 'r-3', donationId: 'd-6', donationTitle: 'Kids School Uniforms', requesterId: 'org-3', requesterName: 'Helping Hands', requesterRole: 'organization', status: 'pending', createdAt: '2025-03-23' },
  { id: 'r-4', donationId: 'd-7', donationTitle: 'Rice and Grain Pack', requesterId: 'vol-1', requesterName: 'Alex Rivera', requesterRole: 'volunteer', status: 'pending', createdAt: '2025-03-20' },
];

export const mockChats: Chat[] = [
  { id: 'chat-1', participants: [{ id: 'donor-1', name: 'Sarah Johnson', role: 'donor' }, { id: 'org-1', name: 'Hope Foundation', role: 'organization' }], lastMessage: 'Thanks for the donation!', lastMessageTime: '2025-03-21 14:30', donationId: 'd-2' },
  { id: 'chat-2', participants: [{ id: 'donor-2', name: 'Michael Chen', role: 'donor' }, { id: 'org-2', name: 'Care Network', role: 'organization' }, { id: 'vol-2', name: 'Priya Patel', role: 'volunteer' }], lastMessage: 'Delivery scheduled for tomorrow', lastMessageTime: '2025-03-22 09:15', donationId: 'd-5' },
];

export const mockMessages: Message[] = [
  { id: 'm-1', senderId: 'org-1', senderName: 'Hope Foundation', content: 'Hi Sarah, we would love to receive the textbooks!', timestamp: '2025-03-21 14:00', chatId: 'chat-1' },
  { id: 'm-2', senderId: 'donor-1', senderName: 'Sarah Johnson', content: 'Of course! They are ready for pickup.', timestamp: '2025-03-21 14:15', chatId: 'chat-1' },
  { id: 'm-3', senderId: 'org-1', senderName: 'Hope Foundation', content: 'Thanks for the donation!', timestamp: '2025-03-21 14:30', chatId: 'chat-1' },
  { id: 'm-4', senderId: 'donor-2', senderName: 'Michael Chen', content: 'The story books are packed and ready.', timestamp: '2025-03-22 08:45', chatId: 'chat-2' },
  { id: 'm-5', senderId: 'vol-2', senderName: 'Priya Patel', content: 'I can pick them up this afternoon.', timestamp: '2025-03-22 09:00', chatId: 'chat-2' },
  { id: 'm-6', senderId: 'org-3', senderName: 'Helping Hands', content: 'Delivery scheduled for tomorrow', timestamp: '2025-03-22 09:15', chatId: 'chat-2' },
];

export const mockCertificates: Certificate[] = [
  { id: 'cert-1', userId: 'donor-1', userName: 'Sarah Johnson', role: 'donor', level: 'gold', contributions: 18, awardedAt: '2025-02-10' },
  { id: 'cert-2', userId: 'donor-3', userName: 'Emma Wilson', role: 'donor', level: 'diamond', contributions: 30, awardedAt: '2025-01-25' },
  { id: 'cert-3', userId: 'vol-2', userName: 'Priya Patel', role: 'volunteer', level: 'gold', contributions: 22, awardedAt: '2025-03-01' },
  { id: 'cert-4', userId: 'donor-2', userName: 'Michael Chen', role: 'donor', level: 'silver', contributions: 12, awardedAt: '2025-03-05' },
  { id: 'cert-5', userId: 'vol-1', userName: 'Alex Rivera', role: 'volunteer', level: 'silver', contributions: 14, awardedAt: '2025-03-10' },
];

export const mockActivityFeed: ActivityFeedItem[] = [
  { id: 'a-1', type: 'donation_created', message: 'Sarah Johnson donated Fresh Vegetables Pack', timestamp: '2025-03-20 10:30', userId: 'donor-1', userName: 'Sarah Johnson' },
  { id: 'a-2', type: 'donation_completed', message: 'Canned Food Supply successfully delivered', timestamp: '2025-03-19 16:00', userId: 'donor-3', userName: 'Emma Wilson' },
  { id: 'a-3', type: 'level_up', message: 'Priya Patel reached Gold level!', timestamp: '2025-03-18 12:00', userId: 'vol-2', userName: 'Priya Patel' },
  { id: 'a-4', type: 'new_organization', message: 'Helping Hands joined the platform', timestamp: '2025-03-15 09:00', userId: 'org-3', userName: 'Helping Hands' },
  { id: 'a-5', type: 'donation_created', message: 'James Brown donated Kids School Uniforms', timestamp: '2025-03-22 11:00', userId: 'donor-4', userName: 'James Brown' },
  { id: 'a-6', type: 'donation_completed', message: 'Notebook Bundle delivered to Helping Hands', timestamp: '2025-03-14 15:30', userId: 'donor-1', userName: 'Sarah Johnson' },
];

export function getLevel(contributions: number): string {
  if (contributions >= 25) return 'diamond';
  if (contributions >= 15) return 'gold';
  if (contributions >= 10) return 'silver';
  if (contributions >= 5) return 'bronze';
  return 'none';
}

export function getLevelColor(level: string): string {
  switch (level) {
    case 'diamond': return 'from-blue-400 to-purple-500';
    case 'gold': return 'from-yellow-400 to-amber-500';
    case 'silver': return 'from-gray-300 to-gray-400';
    case 'bronze': return 'from-orange-400 to-orange-600';
    default: return 'from-muted to-muted';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending': return 'bg-success/20 text-success';
    case 'requested': return 'bg-warning/20 text-warning';
    case 'accepted': return 'bg-info/20 text-info';
    case 'in-progress': return 'bg-primary/20 text-primary';
    case 'completed': return 'bg-muted text-muted-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
}

export function getCategoryIcon(category: string): string {
  switch (category) {
    case 'food': return '🍎';
    case 'books': return '📚';
    case 'clothes': return '👕';
    default: return '📦';
  }
}
