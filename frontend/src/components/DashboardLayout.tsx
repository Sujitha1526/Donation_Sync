import { useAuth } from '@/contexts/AuthContext';
import AppSidebar from '@/components/AppSidebar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const { user } = useAuth();
  if (!user) {
  return (
    <div className="flex min-h-screen items-center justify-center text-white">
      Loading...
    </div>
  );
}

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
