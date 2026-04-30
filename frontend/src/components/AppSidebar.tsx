import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Gift, MessageSquare, Award, Users, Globe,
  LogOut, ChevronLeft, ChevronRight, FileText
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getLevelColor } from '@/data/mockData';

const roleMenus = {
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Gift, label: 'Donations', path: '/admin/donations' },
    { icon: Globe, label: 'Community', path: '/community' },
  ],
  donor: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/donor' },
    { icon: Gift, label: 'My Donations', path: '/donor/donations' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Award, label: 'Rewards', path: '/rewards' },
    { icon: FileText, label: 'Certificates', path: '/certificates' },
    { icon: Globe, label: 'Community', path: '/community' },
  ],
  organization: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/organization' },
    { icon: Gift, label: 'Donations', path: '/organization/donations' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Globe, label: 'Community', path: '/community' },
  ],
  volunteer: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/volunteer' },
    { icon: Gift, label: 'Deliveries', path: '/volunteer/deliveries' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Award, label: 'Rewards', path: '/rewards' },
    { icon: FileText, label: 'Certificates', path: '/certificates' },
    { icon: Globe, label: 'Community', path: '/community' },
  ],
};

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const menu = roleMenus[user.role] || [];

  return (
    <aside className={cn(
      "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 sticky top-0",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Gift className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-sm">DonationSync</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded hover:bg-sidebar-accent text-muted-foreground">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menu.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                active
                  ? "bg-primary/15 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className={cn("w-8 h-8 rounded-full bg-gradient-to-r flex items-center justify-center text-xs font-bold text-foreground shrink-0", getLevelColor(user.level))}>
            {user.name.charAt(0)}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          )}
          {!collapsed && (
            <button onClick={logout} className="p-1.5 rounded hover:bg-sidebar-accent text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
