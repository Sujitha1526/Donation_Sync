import { useEffect, useState } from "react";
import { User, Donation } from '@/types';
import {
  getStats,
  getTopDonors,
  getTopVolunteers,
  getCategoryStats,
  getActivity,
  getUsers,
  getDonations // ✅ IMPORTANT
} from "../api";

import StatCard from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Gift, Building2, HandHeart, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [donors, setDonors] = useState<User[]>([]);
  const [volunteers, setVolunteers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Array<{ _id: string; count: number }>>([]);
  const [donations, setDonations] = useState<Donation[]>([]); // ✅ FIXED
  const [activity, setActivity] = useState<Array<{ _id: string; category: string; status: string }>>([]);

  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getStats();
        const donorsData = await getTopDonors();
        const volsData = await getTopVolunteers();
        const catData = await getCategoryStats();
        const actData = await getActivity();
        const usersData = await getUsers();
        const donationsData = await getDonations(); // ✅ NEW

        setStats(statsData);
        setDonors(donorsData);
        setVolunteers(volsData);
        setActivity(actData);
        setUsers(usersData || []);
        setDonations(Array.isArray(donationsData) ? donationsData : []);

        if (statsData.categoryStats) {
          setCategories(
            Object.entries(statsData.categoryStats).map(([category, count]) => ({
              _id: category,
              count: Number(count),
            }))
          );
        } else {
          setCategories(catData);
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // 🔥 FIXED BAR GRAPH (DYNAMIC)
  const statusData = [
    { name: "Pending", value: donations.filter(d => d.status === "pending").length },
    { name: "Accepted", value: donations.filter(d => d.status === "accepted").length },
    { name: "In Progress", value: donations.filter(d => d.status === "in-progress").length },
    { name: "Completed", value: donations.filter(d => d.status === "completed").length },
  ];

  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((u) => u.role === filter);

  return (
    <div className="space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Live platform analytics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers || 0} icon={Users} gradient="gradient-primary" />
        <StatCard title="Donations" value={stats.totalDonations || 0} icon={Gift} gradient="gradient-warm" />
        <StatCard title="Organizations" value={stats.organizations || 0} icon={Building2} gradient="gradient-accent" />
        <StatCard title="Volunteers" value={stats.volunteers || 0} icon={HandHeart} gradient="gradient-success" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* 🔥 BAR GRAPH FIXED */}
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-heading flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Donations by Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {statusData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        entry.name === "Completed" ? "#22c55e" :
                        entry.name === "Pending" ? "#eab308" :
                        entry.name === "Accepted" ? "#3b82f6" :
                        "#a855f7"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-heading flex items-center gap-2">
              <Gift className="w-4 h-4 text-accent" />
              By Category
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                >
                  {categories.map((entry, i) => (
                    <Cell key={i} fill={["#f59e0b", "#3b82f6", "#8b5cf6"][i % 3]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Top Users + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <Card className="bg-card">
          <CardHeader><CardTitle>Top Donors</CardTitle></CardHeader>
          <CardContent>
            {donors.slice(0, 5).map((d) => (
              <div key={d._id} className="flex justify-between">
                <span>{d.name}</span>
                <span>{d.donationCount || 0}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader><CardTitle>Top Volunteers</CardTitle></CardHeader>
          <CardContent>
            {volunteers.slice(0, 5).map((v) => (
              <div key={v._id} className="flex justify-between">
                <span>{v.name}</span>
                <span>{v.contributionCount || 0}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardContent>
            {activity.slice(0, 5).map((a) => (
              <p key={a._id}>{a.category} - {a.status}</p>
            ))}
          </CardContent>
        </Card>

      </div>

    </div>
  );
}