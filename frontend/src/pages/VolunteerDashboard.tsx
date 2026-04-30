import { useCallback, useEffect, useState } from 'react';
import { Donation } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { getDonations, contributeDonation, completeDonation } from '@/api';
import StatCard from '@/components/StatCard';
import DonationCard from '@/components/DonationCard';
import LevelBadge from '@/components/LevelBadge';
import { Button } from '@/components/ui/button';
import { Truck, CheckCircle, Award, Package } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function VolunteerDashboard() {
  const { user, refreshUser } = useAuth();
  const [availableForDelivery, setAvailableForDelivery] = useState<Donation[]>([]);
  const [myDeliveries, setMyDeliveries] = useState<Donation[]>([]);
  const [completedDeliveries, setCompletedDeliveries] = useState<Donation[]>([]);

  const userId = user?._id || user?.id;

  const fetchDonations = useCallback(async () => {
    if (!user) return;

    try {
      const available = await getDonations('accepted');
      const volunteerDeliveries = await getDonations('in-progress');
      const completed = await getDonations('completed');

      setAvailableForDelivery(Array.isArray(available) ? available.filter((d) => !d.assignedVolunteer) : []);
      setMyDeliveries(Array.isArray(volunteerDeliveries) ? volunteerDeliveries : []);
      setCompletedDeliveries(Array.isArray(completed) ? completed : []);
    } catch (err) {
      console.error('Failed to fetch donations for volunteer', err);
    }
  }, [user]);

  useEffect(() => {
    fetchDonations();
    const interval = setInterval(fetchDonations, 5000);
    return () => clearInterval(interval);
  }, [fetchDonations]);

  if (!user) return null;

  const takeDelivery = async (donationId) => {
    try {
      const res = await contributeDonation(donationId);
      if (res.message) {
        toast.success('Contribution started');
        await fetchDonations();
        refreshUser();
      } else {
        toast.error(res.message || 'Could not start contribution');
      }
    } catch (err) {
      toast.error('Error contacting backend');
    }
  };

  const finishDelivery = async (donationId) => {
    try {
      const res = await completeDonation(donationId);
      if (res.message) {
        toast.success('Delivery completed');
        await fetchDonations();
        refreshUser();
      } else {
        toast.error(res.message || 'Could not complete delivery');
      }
    } catch (err) {
      toast.error('Error contacting backend');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Volunteer Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
        </div>
        <LevelBadge level={user.level} size="md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Available Deliveries" value={availableForDelivery.length} icon={Package} gradient="gradient-success" />
        <StatCard title="In Transit" value={myDeliveries.length} icon={Truck} gradient="gradient-warm" />
        <StatCard title="Completed" value={completedDeliveries.length} icon={CheckCircle} gradient="gradient-primary" />
        <StatCard title="Contributions" value={user.totalContributions} icon={Award} gradient="gradient-accent" />
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="available">Available ({availableForDelivery.length})</TabsTrigger>
          <TabsTrigger value="transit">In Transit ({myDeliveries.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedDeliveries.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableForDelivery.length === 0 ? (
              <p className="text-muted-foreground text-sm">No deliveries available right now</p>
            ) : (
              availableForDelivery.map((d: Donation) => (
                <DonationCard
  key={d._id}
  donation={d}
  actions={
    <>
      <div className="text-xs text-gray-400 space-y-1 mb-2">
        <p>👤 Donor: {d.donor?.name || "Unknown"}</p>
        <p>🏢 Org: {d.organization?.name || "Not assigned"}</p>
      </div>

      <Button
        size="sm"
        className="gradient-primary border-0"
        onClick={() => takeDelivery(d._id)}
      >
        Volunteer to Deliver
      </Button>
    </>
  }
/>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="transit">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myDeliveries.length === 0 ? (
              <p className="text-muted-foreground text-sm">No active deliveries</p>
            ) : (
              myDeliveries.map((d: Donation) => (
                <DonationCard
                  key={d._id}
                  donation={d}
                  actions={
                    <Button
                      size="sm"
                      className="gradient-success border-0"
                      onClick={() => finishDelivery(d._id)}
                    >
                      Mark Delivered
                    </Button>
                  }
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedDeliveries.map((d: Donation) => <DonationCard
  key={d._id}
  donation={d}
  actions={
    <div className="text-xs text-gray-400 space-y-1">
      <p>👤 Donor: {d.donor?.name || "Unknown"}</p>
      <p>🏢 Org: {d.organization?.name || "Not assigned"}</p>
    </div>
  }
/>)}
            {completedDeliveries.length === 0 && <p className="text-muted-foreground text-sm">No completed deliveries yet</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
