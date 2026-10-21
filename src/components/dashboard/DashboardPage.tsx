import React, { useState } from 'react';
import { User, RouterNode, HotspotTransaction, WifiPlan } from '../../types/auth';
import { INITIAL_WIFI_PLANS } from '../../data/dashboardData';
import { DashboardHeader } from './DashboardHeader';
import { SidebarDock } from './SidebarDock';
import { WalletCard } from './WalletCard';
import { PaymentHistoryTable } from './PaymentHistoryTable';
import { ThroughputChart } from './ThroughputChart';
import { TrafficSparklineCard } from './TrafficSparklineCard';
import { CreditAndStaffCard } from './CreditAndStaffCard';
import { RouterNodesList } from './RouterNodesList';
import { WifiPlansSection } from './WifiPlansSection';
import { AddRouterModal } from './AddRouterModal';
import { GenerateVoucherModal } from './GenerateVoucherModal';
import { AnalyticsView, BillingView, SessionsView, SettingsView } from './AdminTabViews';

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
  const [wifiPlans, setWifiPlans] = useState<WifiPlan[]>(INITIAL_WIFI_PLANS);

  const [isAddRouterOpen, setIsAddRouterOpen] = useState(false);
  const [isGenerateVoucherOpen, setIsGenerateVoucherOpen] = useState(false);

  const handleAddRouter = (newRouter: RouterNode) => {
    setRouters((prev) => [newRouter, ...prev]);
  };

  const handleAddPlan = (newPlan: WifiPlan) => {
    setWifiPlans((prev) => [newPlan, ...prev]);
  };

  const handleTogglePlan = (id: string) => {
    setWifiPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleDeletePlan = (id: string) => {
    setWifiPlans((prev) => prev.filter((p) => p.id !== id));
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
      {/* 1. Header */}
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
        
        {/* 2. Clean Greeting Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#111111]">
              Welcome back Victor
            </h1>
            <p className="text-[13px] text-[#666666] mt-0.5">
              Live MikroTik network telemetry, revenue streams, and captive Wi-Fi plans.
            </p>
          </div>
        </div>

        {/* 3. Main Dashboard Body: Left Dock + Bento Grid */}
        <div className="flex items-start gap-5">
          
          {/* Floating Pill Sidebar Dock */}
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
                  {/* Card 1: Normal Revenue Display Card in Majal Blue */}
                  <WalletCard
                    onExploreDetails={() => setCurrentTab('billing')}
                  />

                  {/* Card 2: Payment History (Table in Naira) */}
                  <PaymentHistoryTable
                    transactions={transactions}
                    searchQuery={searchQuery}
                    onViewAll={() => setCurrentTab('history')}
                  />
                </div>

                {/* Column 2: Center (~42% width / 5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  {/* Card 3: Engagement Rate / Throughput Bar Chart in Majal Blue */}
                  <ThroughputChart
                    onDetails={() => setCurrentTab('analytics')}
                  />

                  {/* New Section: Customer Wi-Fi Plans Creation & Management */}
                  <WifiPlansSection
                    plans={wifiPlans}
                    onAddPlan={handleAddPlan}
                    onTogglePlan={handleTogglePlan}
                    onDeletePlan={handleDeletePlan}
                  />
                </div>

                {/* Column 3: Right (~25% width / 3 cols) */}
                <div className="lg:col-span-3 flex flex-col gap-5">
                  {/* Card 4: Settlement Balance & Blue Wave Curve */}
                  <TrafficSparklineCard
                    onSendAction={() => setIsGenerateVoucherOpen(true)}
                    onReceiveAction={() => setCurrentTab('billing')}
                    onExploreDetails={() => setCurrentTab('billing')}
                  />

                  {/* Card 5: Amount of Credit & Active Staff Avatars */}
                  <CreditAndStaffCard
                    onExploreStaff={() => setCurrentTab('routers')}
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
                        className="text-[13px] font-medium text-[#1a4be0] hover:underline cursor-pointer"
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
                            <span className="w-2 h-2 rounded-full bg-[#1a4be0]" />
                            <span className="font-semibold text-[#111111]">{rt.identity}</span>
                          </div>
                          <div className="text-[#555555] tabular-nums">
                            {rt.activeUsers} active
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                    className="bg-[#1a4be0] hover:bg-[#153bb5] text-white px-4 py-2 rounded-full text-[13px] font-medium transition-colors cursor-pointer shadow-xs shadow-[#1a4be0]/20"
                  >
                    + Generate New Batch
                  </button>
                </div>
                <PaymentHistoryTable
                  transactions={transactions.filter((t) => t.category === 'Voucher')}
                  searchQuery={searchQuery}
                />
              </div>
            ) : currentTab === 'analytics' ? (
              <AnalyticsView routers={routers} transactions={transactions} onNavigate={setCurrentTab} />
            ) : currentTab === 'billing' ? (
              <BillingView routers={routers} transactions={transactions} onNavigate={setCurrentTab} />
            ) : currentTab === 'users' ? (
              <SessionsView routers={routers} transactions={transactions} onNavigate={setCurrentTab} />
            ) : currentTab === 'settings' ? (
              <SettingsView />
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-xs text-center" data-ui="true">
                <h2 className="text-[18px] font-bold text-[#111111] mb-2">View Active</h2>
                <p className="text-[14px] text-[#666666] mb-4">Full operator telemetry is synchronized in real-time.</p>
                <button onClick={() => setCurrentTab('dashboard')} className="bg-[#1a4be0] text-white px-5 py-2 rounded-full text-[13px] font-medium cursor-pointer shadow-xs shadow-[#1a4be0]/20">Return to Dashboard Overview</button>
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
