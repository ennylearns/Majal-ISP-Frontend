import React, { useState } from 'react';
import { Calendar, Plus, ChevronDown } from 'lucide-react';
import { User, RouterNode, HotspotTransaction } from '../../types/auth';
import { DashboardHeader } from './DashboardHeader';
import { SidebarDock } from './SidebarDock';
import { WalletCard } from './WalletCard';
import { PaymentHistoryTable } from './PaymentHistoryTable';
import { ThroughputChart } from './ThroughputChart';
import { TrafficSparklineCard } from './TrafficSparklineCard';
import { CreditAndStaffCard } from './CreditAndStaffCard';
import { RouterNodesList } from './RouterNodesList';
import { AddRouterModal } from './AddRouterModal';
import { GenerateVoucherModal } from './GenerateVoucherModal';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
  onNavigateHome: () => void;
  initialRouters: RouterNode[];
  initialTransactions: HotspotTransaction[];
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  onLogout,
  onNavigateHome,
  initialRouters,
  initialTransactions,
}) => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [routers, setRouters] = useState<RouterNode[]>(initialRouters);
  const [transactions, setTransactions] = useState<HotspotTransaction[]>(initialTransactions);

  const [isAddRouterOpen, setIsAddRouterOpen] = useState(false);
  const [isGenerateVoucherOpen, setIsGenerateVoucherOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('29 Jun, 2025 - 29 August, 2025');

  const handleAddRouter = (newRouter: RouterNode) => {
    setRouters((prev) => [newRouter, ...prev]);
  };

  const handleVouchersGenerated = (totalAmount: number, count: number) => {
    const newTx: HotspotTransaction = {
      id: `tx-${Date.now()}`,
      name: 'Voucher Batch Sale',
      planName: `${count}× Hotspot RADIUS Passes`,
      date: 'Today',
      time: 'Just now',
      status: 'Successful',
      amountNgn: totalAmount,
      category: 'Voucher',
      gatewayId: routers[0]?.identity || 'CCR2004-Kano',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <div className="min-h-[100svh] bg-[#EFF1F5] text-[#111111] font-sans selection:bg-[#1a4be0] selection:text-white pb-16" data-ui="true">
      {/* 1. Header (Matching reference mockup navigation) */}
      <DashboardHeader
        user={user}
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onNavigateHome={onNavigateHome}
        onLogout={onLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* 2. Greeting & Top Action Bar (Matching "Welcome Back, Sujon" row) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#111111]">
              Welcome Back, {user.name.split(' ')[0]}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Date range picker pill (Matching reference mockup) */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-xs text-[13px] text-[#555555]">
              <Calendar size={15} className="text-[#136c44]" />
              <span className="font-medium text-[#111111]">{selectedDateRange}</span>
              <ChevronDown size={14} className="text-[#888888]" />
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => setIsAddRouterOpen(true)}
              className="bg-white hover:bg-[#f9f9f9] text-[#111111] px-4 py-2 rounded-full shadow-xs text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus size={15} />
              <span>+ Add New Wallet</span>
            </button>
          </div>
        </div>

        {/* 3. Main Dashboard Body: Left Dock + Bento Grid */}
        <div className="flex items-start gap-5">
          
          {/* Floating Pill Sidebar Dock (Matching concept mockup left dock) */}
          <SidebarDock
            activeTab={currentTab}
            onSelectTab={setCurrentTab}
            onLogout={onLogout}
          />

          {/* Dynamic Content Area based on Tab */}
          <div className="flex-1 w-full min-w-0">
            {currentTab === 'dashboard' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Column 1: Left (~33% width / 4 cols) */}
                <div className="lg:col-span-4 flex flex-col gap-5">
                  {/* Card 1: Payment Goal with Styled Virtual Card */}
                  <WalletCard
                    onExploreDetails={() => setCurrentTab('billing')}
                  />

                  {/* Card 2: Payment History (Table) */}
                  <PaymentHistoryTable
                    transactions={transactions}
                    searchQuery={searchQuery}
                    onViewAll={() => setCurrentTab('history')}
                  />
                </div>

                {/* Column 2: Center (~42% width / 5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  {/* Card 3: Engagement Rate / Throughput Bar Chart */}
                  <ThroughputChart
                    onDetails={() => setCurrentTab('analytics')}
                  />

                  {/* Quick Router Fleet Live Node Status Card */}
                  <div className="bg-white rounded-2xl p-6 shadow-xs" data-ui="true">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-[17px] font-semibold text-[#111111] tracking-tight">
                          Router Gateways
                        </h2>
                        <p className="text-[13px] text-[#666666]">
                          {routers.length} online MikroTik nodes
                        </p>
                      </div>
                      <button
                        onClick={() => setCurrentTab('routers')}
                        className="text-[13px] font-medium text-[#136c44] hover:underline cursor-pointer"
                      >
                        View all
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {routers.slice(0, 3).map((rt) => (
                        <div
                          key={rt.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#f8f9fa] text-[13px]"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-[#136c44]" />
                            <span className="font-semibold text-[#111111]">{rt.identity}</span>
                          </div>
                          <div className="text-[#555555] tabular-nums">
                            {rt.activeUsers} active leases
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 3: Right (~25% width / 3 cols) */}
                <div className="lg:col-span-3 flex flex-col gap-5">
                  {/* Card 4: Total Balance & Wave Curve */}
                  <TrafficSparklineCard
                    onSendAction={() => setIsGenerateVoucherOpen(true)}
                    onReceiveAction={() => setCurrentTab('billing')}
                    onExploreDetails={() => setCurrentTab('billing')}
                  />

                  {/* Card 5: Amount of Credit & Active Staff Avatars */}
                  <CreditAndStaffCard
                    onExploreStaff={() => setCurrentTab('routers')}
                  />
                </div>

              </div>
            ) : currentTab === 'routers' ? (
              <RouterNodesList
                routers={routers}
                onOpenAddRouter={() => setIsAddRouterOpen(true)}
              />
            ) : currentTab === 'history' ? (
              <PaymentHistoryTable
                transactions={transactions}
                searchQuery={searchQuery}
                onViewAll={() => {}}
              />
            ) : currentTab === 'vouchers' ? (
              <div className="bg-white rounded-2xl p-6 shadow-xs space-y-6" data-ui="true">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[18px] font-bold text-[#111111]">Hotspot Voucher Management</h2>
                    <p className="text-[13px] text-[#666666]">Generate and batch-print time/bandwidth tokens.</p>
                  </div>
                  <button
                    onClick={() => setIsGenerateVoucherOpen(true)}
                    className="bg-[#136c44] hover:bg-[#0f5434] text-white px-4 py-2 rounded-full text-[13px] font-medium transition-colors cursor-pointer"
                  >
                    + Generate New Batch
                  </button>
                </div>
                <PaymentHistoryTable
                  transactions={transactions.filter((t) => t.category === 'Voucher')}
                  searchQuery={searchQuery}
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-xs text-center" data-ui="true">
                <h2 className="text-[18px] font-bold text-[#111111] mb-2">
                  {currentTab.toUpperCase()} View Active
                </h2>
                <p className="text-[14px] text-[#666666] mb-4">
                  Full operator telemetry is synchronized in real-time.
                </p>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="bg-[#111111] text-white px-5 py-2 rounded-full text-[13px] font-medium cursor-pointer"
                >
                  Return to Dashboard Overview
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Interactive Modals */}
      <AddRouterModal
        isOpen={isAddRouterOpen}
        onClose={() => setIsAddRouterOpen(false)}
        onAddRouter={handleAddRouter}
      />

      <GenerateVoucherModal
        isOpen={isGenerateVoucherOpen}
        onClose={() => setIsGenerateVoucherOpen(false)}
        onVouchersGenerated={handleVouchersGenerated}
      />
    </div>
  );
};
