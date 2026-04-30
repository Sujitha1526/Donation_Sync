import { useAuth } from '@/contexts/AuthContext';
import StatCard from '@/components/StatCard';
import DonationCard from '@/components/DonationCard';
import { Button } from '@/components/ui/button';
import { Gift, Package, CheckCircle, Clock, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from "react";

import { getDonations, requestDonation, completeDonation } from "@/api";

export default function OrganizationDashboard() {
  const { user, refreshUser } = useAuth();
  const [donations, setDonations] = useState([]);

  const userId = user?._id || user?.id;

  // ✅ FETCH DATA
  const fetchDonations = async () => {
    const res = await getDonations();
    setDonations(Array.isArray(res) ? res : []);
  };

  useEffect(() => {
    if (!user) return;
    fetchDonations();
  }, [user]);

  if (!user) return null;

  const available = donations.filter((d) => d.status === 'pending');
  const requested = donations.filter(
    (d) => d.status === 'requested' && d.requests?.some((r) => r._id === userId)
  );
  const accepted = donations.filter(
    (d) => d.status === 'accepted' && d.assignedOrganization?._id === userId
  );
  const inProgress = donations.filter(
    (d) => d.status === 'in-progress' && d.assignedOrganization?._id === userId
  );
  const completed = donations.filter(
    (d) => d.status === 'completed' && d.assignedOrganization?._id === userId
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-heading font-bold">Organization Dashboard</h1>
        <p className="text-sm text-muted-foreground">{user.name}</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Pending" value={available.length} icon={Gift} gradient="gradient-success" />
        <StatCard title="Requested" value={requested.length} icon={Clock} gradient="gradient-warm" />
        <StatCard title="Accepted" value={accepted.length} icon={Package} gradient="gradient-primary" />
        <StatCard title="In Progress" value={inProgress.length} icon={Truck} gradient="gradient-warning" />
        <StatCard title="Completed" value={completed.length} icon={CheckCircle} gradient="gradient-accent" />
      </div>

      {/* TABS */}
      <Tabs defaultValue="available" className="space-y-4">

        <TabsList className="bg-muted/50">
          <TabsTrigger value="available">Available ({available.length})</TabsTrigger>
          <TabsTrigger value="requested">Requested ({requested.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({accepted.length})</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>

        {/* AVAILABLE */}
        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {available.length === 0 ? (
              <p className="text-muted-foreground">No donations available</p>
            ) : (
              available.map(d => (
                <DonationCard
  key={d._id}
  donation={d}
  actions={
    <>
      <div className="text-xs text-gray-400 space-y-1 mb-2">
        <p>👤 Donor: {d.donor?.name || "Unknown"}</p>
      </div>

      <Button
        size="sm"
        className="gradient-primary border-0"
        onClick={async () => {
          try {
            const res = await requestDonation(d._id);

            if (res.message) {
              toast.success("Request sent!");
              fetchDonations();
            } else {
              toast.error("Request failed");
            }
          } catch {
            toast.error("Error sending request");
          }
        }}
      >
        Request Donation
      </Button>
    </>
  }
/>
              ))
            )}
          </div>
        </TabsContent>

        {/* REQUESTED */}
        <TabsContent value="requested">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requested.length === 0 ? (
              <p className="text-muted-foreground">No pending requests</p>
            ) : (
              requested.map(d => (
                <DonationCard
  key={d._id}
  donation={d}
  actions={
    <div className="text-xs text-gray-400 space-y-1">
      <p>👤 Donor: {d.donor?.name || "Unknown"}</p>
      <p>🏢 Org: {d.organization?.name || "Not assigned"}</p>
    </div>
  }
/>
              ))
            )}
          </div>
        </TabsContent>

        {/* ACCEPTED */}
        <TabsContent value="accepted">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accepted.length === 0 ? (
              <p className="text-muted-foreground">No accepted donations</p>
            ) : (
              accepted.map((d) => (
                <DonationCard
  key={d._id}
  donation={d}
  actions={
    <div className="text-xs text-gray-400 space-y-1">
      <p>👤 Donor: {d.donor?.name || "Unknown"}</p>
      <p>🏢 Org: {d.organization?.name || "Not assigned"}</p>
    </div>
  }
/>
              ))
            )}
          </div>
        </TabsContent>

        {/* IN-PROGRESS */}
        <TabsContent value="inProgress">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inProgress.length === 0 ? (
              <p className="text-muted-foreground">No donations in progress</p>
            ) : (
              inProgress.map((d) => (
                <DonationCard
  key={d._id}
  donation={d}
  actions={
    <>
      <div className="text-xs text-gray-400 space-y-1 mb-2">
        <p>👤 Donor: {d.donor?.name || "Unknown"}</p>
        <p>🤝 Volunteer: {d.volunteer?.name || "Not assigned"}</p>
      </div>

      <Button
        size="sm"
        className="gradient-success border-0"
        onClick={async () => {
          try {
            const res = await completeDonation(d._id);
            if (res.message) {
              toast.success('Donation completed!');
              await fetchDonations();
              refreshUser();
            } else {
              toast.error(res.message || 'Failed to complete');
            }
          } catch {
            toast.error('Error');
          }
        }}
      >
        Mark Completed
      </Button>
    </>
  }
/>
              ))
            )}
          </div>
        </TabsContent>

        {/* COMPLETED */}
        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completed.length === 0 ? (
              <p className="text-muted-foreground">No completed donations yet</p>
            ) : (
              completed.map(d => (
                <DonationCard key={d._id} donation={d} />
              ))
            )}
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
