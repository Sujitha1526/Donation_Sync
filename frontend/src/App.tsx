import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

import AdminDashboard from "@/pages/AdminDashboard";
import DonorDashboard from "@/pages/DonorDashboard";
import OrganizationDashboard from "@/pages/OrganizationDashboard";
import VolunteerDashboard from "@/pages/VolunteerDashboard";

import MessagesPage from "@/pages/MessagesPage";
import RewardsPage from "@/pages/RewardsPage";
import CertificatesPage from "@/pages/CertificatesPage";
import CommunityPage from "@/pages/CommunityPage";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>

      {/* ✅ PUBLIC ROUTES */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ✅ ROOT REDIRECT */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate
              to={
                user.role === "admin"
                  ? "/admin"
                  : user.role === "donor"
                  ? "/donor"
                  : user.role === "organization"
                  ? "/organization"
                  : "/volunteer"
              }
              replace
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* ✅ PROTECTED ROUTES */}
      {user && (
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/donor" element={<DonorDashboard />} />
          <Route path="/organization" element={<OrganizationDashboard />} />
          <Route path="/volunteer" element={<VolunteerDashboard />} />

          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Route>
      )}

      {/* ✅ FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
