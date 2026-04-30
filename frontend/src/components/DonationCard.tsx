import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Donation } from '@/types';
import { getCategoryIcon, getStatusColor } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface DonationCardProps {
  donation: Donation;
  actions?: React.ReactNode;
}

export default function DonationCard({ donation, actions }: DonationCardProps) {
  return (
    <Card className="border-border/50 bg-card hover:border-primary/30 transition-all animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getCategoryIcon(donation.category)}</span>
            <CardTitle className="text-base font-heading">{donation.title}</CardTitle>
          </div>
          <Badge className={cn("capitalize text-xs border-0", getStatusColor(donation.status))}>
            {donation.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{donation.description}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground">Qty: {donation.quantity}</span>
          <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground capitalize">{donation.category}</span>
          {donation.freshnessDuration && <span className="px-2 py-1 rounded-md bg-warning/15 text-warning">⏱ {donation.freshnessDuration}</span>}
          {donation.bookType && <span className="px-2 py-1 rounded-md bg-info/15 text-info capitalize">{donation.bookType}</span>}
          {donation.clothesGender && <span className="px-2 py-1 rounded-md bg-primary/15 text-primary capitalize">{donation.clothesGender}</span>}
          {donation.clothesAgeGroup && <span className="px-2 py-1 rounded-md bg-accent/15 text-accent capitalize">{donation.clothesAgeGroup}</span>}
        </div>
        <div className="text-xs text-muted-foreground">
          <span>By {donation.donorName}</span>
          {donation.organizationName && <span> → {donation.organizationName}</span>}
          {donation.volunteerName && <span> • 🚚 {donation.volunteerName}</span>}
        </div>
        {actions && <div className="pt-2 flex gap-2">{actions}</div>}
      </CardContent>
    </Card>
  );
}
