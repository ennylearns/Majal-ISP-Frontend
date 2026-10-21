import React, { useState } from 'react';
import { Search, Bell, ChevronDown, ExternalLink } from 'lucide-react';
import { User } from '../../types/auth';

interface DashboardHeaderProps {
  user: User;
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onNavigateHome: () => void;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  currentTab,
  onSelectTab,
  onNavigateHome,
  onLogout,
  searchQuery,
  onSearchChange,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const mainTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'routers', label: 'Routers' },
    { id: 'vouchers', label: 'Vouchers' },
    { id: 'history', label: 'History' },
    { id: 'finance', label: 'Finance' },
  ];

  return (
    <header className="w-full bg-white shadow-xs sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-left hover:opacity-85 transition-opacity cursor-pointer shrink-0"
            title="Return to MAJAL ISP landing page"
          >
            <img
              src="/assets/majal-logo.jpg"
              alt="MAJAL ISP"
              className="h-9 w-auto object-contain"
            />
            <span className="text-[17px] font-bold tracking-tight text-[#111111]">
              MAJAL ISP
            </span>
          </button>

          {/* Navigation Pill Tabs Container (matching concept image) */}
          <nav className="hidden md:flex items-center bg-[#f4f4f4] rounded-full p-1 gap-1">
            {mainTabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#111111] shadow-xs'
                      : 'text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions, Search, Alerts, Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Search Trigger / Input */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-[#f4f4f4] rounded-full px-3 py-1.5 w-44 sm:w-60">
                <Search size={15} className="text-[#666666] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search payments, routers..."
                  className="bg-transparent border-none text-[13px] text-[#111111] focus:outline-none px-2 w-full"
                  autoFocus
                  onBlur={() => !searchQuery && setIsSearchOpen(false)}
                />
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 rounded-full bg-[#f4f4f4] hover:bg-[#ebebeb] flex items-center justify-center text-[#666666] transition-colors cursor-pointer"
                title="Search operator database"
              >
                <Search size={16} />
                <span className="sr-only">Search</span>
              </button>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setUnreadNotifications(0)}
              className="w-9 h-9 rounded-full bg-[#f4f4f4] hover:bg-[#ebebeb] flex items-center justify-center text-[#666666] transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <Bell size={16} />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#1a4be0]" />
              )}
              <span className="sr-only">Notifications</span>
            </button>
          </div>

          {/* Return to Landing Page Quick Switcher */}
          <button
            onClick={onNavigateHome}
            className="hidden lg:flex items-center gap-1.5 text-[13px] text-[#555555] hover:text-[#111111] px-2.5 py-1.5 rounded-full hover:bg-[#f4f4f4] transition-colors cursor-pointer"
            title="Preview public landing site"
          >
            <span>Public Site</span>
            <ExternalLink size={13} />
          </button>

          {/* Operator Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-[#f4f4f4] transition-colors cursor-pointer"
            >
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-black/10"
              />
              <span className="hidden sm:inline text-[13px] font-medium text-[#111111]">
                {user.name.split(' ')[0]}
              </span>
              <ChevronDown size={14} className="text-[#666666]" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white py-2 z-50 text-[13px] border border-[#e8e8e8]"> {/* taste-skill-ignore: real overlay dropdown */}
                <div className="px-4 py-2 bg-[#f8f9fa] border-none mb-1">
                  <div className="font-semibold text-[#111111]">{user.name}</div>
                  <div className="text-[12px] text-[#555555] truncate">{user.email}</div>
                  <div className="text-[11px] text-[#1a4be0] mt-0.5">{user.role}</div>
                </div>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onSelectTab('routers');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#f4f4f4] text-[#111111] cursor-pointer"
                >
                  Router Fleet ({user.activeRouters} Gateways)
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onSelectTab('billing');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#f4f4f4] text-[#111111] cursor-pointer"
                >
                  Billing & Settlement
                </button>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onNavigateHome();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#f4f4f4] text-[#555555] cursor-pointer"
                >
                  View Marketing Site
                </button>

                <div className="pt-1 mt-1 border-none">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#fbeae5] text-[#b71c1c] font-medium cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
