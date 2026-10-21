import React from 'react';
import { 
  LayoutGrid, 
  BarChart3, 
  Wallet, 
  Radio, 
  Users, 
  Clock, 
  Settings, 
  LogOut 
} from 'lucide-react';

interface SidebarDockProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
}

export const SidebarDock: React.FC<SidebarDockProps> = ({
  activeTab,
  onSelectTab,
  onLogout,
}) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'billing', icon: Wallet, label: 'Revenue' },
    { id: 'routers', icon: Radio, label: 'Gateways' },
    { id: 'users', icon: Users, label: 'Active Sessions' },
    { id: 'history', icon: Clock, label: 'Audit Log' },
  ];

  return (
    <aside 
      className="hidden md:flex flex-col items-center justify-between bg-white rounded-full py-5 px-3 shadow-xs shrink-0 self-start sticky top-24"
      aria-label="Navigation dock"
    >
      {/* Top action / navigation icons */}
      <div className="flex flex-col items-center gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              title={item.label}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#1a4be0] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#111111] hover:bg-[#f4f4f4]'
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              <span className="sr-only">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom utility icons */}
      <div className="flex flex-col items-center gap-3 pt-6">
        <button
          onClick={() => onSelectTab('settings')}
          title="System Settings"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-[#1a4be0] text-white'
              : 'text-[#666666] hover:text-[#111111] hover:bg-[#f4f4f4]'
          }`}
        >
          <Settings size={18} strokeWidth={2} />
          <span className="sr-only">Settings</span>
        </button>

        <button
          onClick={onLogout}
          title="Sign Out"
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#666666] hover:text-[#b71c1c] hover:bg-[#fbeae5] transition-colors cursor-pointer"
        >
          <LogOut size={18} strokeWidth={2} />
          <span className="sr-only">Sign out</span>
        </button>
      </div>
    </aside>
  );
};
