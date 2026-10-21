import React, { useMemo, useState } from 'react';
import {
  Activity,
  BarChart3,
  Bell,
  CircleDollarSign,
  Gauge,
  Home,
  KeyRound,
  LogOut,
  Megaphone,
  Router,
  Settings,
  Tag,
  Ticket,
  Users,
  Wifi,
  X,
} from 'lucide-react';

type NavItem = { label: string; icon: React.ElementType };

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: Home },
  { label: 'Customers', icon: Users },
  { label: 'Plans', icon: BarChart3 },
  { label: 'Vouchers', icon: Ticket },
  { label: 'Passcodes', icon: KeyRound },
  { label: 'Routing', icon: Router },
  { label: 'Campaigns', icon: Megaphone },
  { label: 'Coupons', icon: Tag },
];

const updates = [
  { label: 'Payment received from Campus North', amount: '+₦12,000', time: '8m ago', tone: 'success' },
  { label: 'Voucher batch redeemed', amount: '24 passes', time: '17m ago', tone: 'info' },
  { label: 'Grand Suites router is online', amount: '42 clients', time: '30m ago', tone: 'warning' },
  { label: 'New customer account created', amount: 'Abdul R.', time: '52m ago', tone: 'neutral' },
];

const usagePoints = [
  { day: 'Mon', value: 3.4 }, { day: 'Tue', value: 4.1 }, { day: 'Wed', value: 2.8 },
  { day: 'Thu', value: 5.2 }, { day: 'Fri', value: 4.7 }, { day: 'Sat', value: 6 }, { day: 'Sun', value: 5.3 },
];

const traffic = [
  { label: 'Social Media', value: 50, color: '#1a4be0' },
  { label: 'Video', value: 23, color: '#19a974' },
  { label: 'Entertainment', value: 6, color: '#f59e0b' },
  { label: 'Others', value: 21, color: '#94a3b8' },
];

export const DashboardPreview: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [showNotice, setShowNotice] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Sat');

  const selectedUsage = useMemo(
    () => usagePoints.find((point) => point.day === selectedDay)?.value ?? 6,
    [selectedDay],
  );

  return (
    <section id="live-showcase" className="bg-[#f4f4f4] px-6 py-24 lg:px-12" aria-labelledby="dashboard-showcase-title">
      <div className="mx-auto max-w-7xl">
        <div data-rise style={{ '--i': 0 } as React.CSSProperties} className="mb-10 max-w-2xl">
          <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.16em] text-[#1a4be0]">Live operator console</p>
          <h2 id="dashboard-showcase-title" className="mb-3 text-[clamp(26px,3vw,40px)] font-medium tracking-[-0.04em] text-[#111111]">One view for the whole network.</h2>
          <p className="text-[16px] text-[#555555]">Monitor revenue, subscribers, routers, and traffic from the same calm workspace your team uses every day.</p>
        </div>

        <div data-rise style={{ '--i': 1 } as React.CSSProperties} className="overflow-hidden rounded-[18px] border border-[#dedede] bg-white shadow-[0_24px_80px_rgba(17,17,17,0.1)]">
          <div className="flex min-h-[680px]">
            <aside className="hidden w-[220px] shrink-0 flex-col border-r border-[#e7e7e7] bg-[#fbfbfb] p-4 md:flex" aria-label="Dashboard navigation">
              <div className="mb-8 flex items-center gap-2 px-2 text-[15px] font-semibold text-[#111111]"><span className="grid size-7 place-items-center rounded-lg bg-[#1a4be0] text-white"><Wifi aria-hidden="true" /></span> IspFlow</div>
              <nav className="flex flex-1 flex-col gap-1">
                {navItems.map(({ label, icon: Icon }) => (
                  <button key={label} onClick={() => setActiveNav(label)} aria-current={activeNav === label ? 'page' : undefined} className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-left text-[13px] transition-colors ${activeNav === label ? 'bg-[#eaf0ff] font-semibold text-[#1a4be0]' : 'text-[#666666] hover:bg-[#f0f0f0] hover:text-[#111111]'}`}><Icon aria-hidden="true" />{label}</button>
                ))}
              </nav>
              <div className="flex flex-col gap-1 border-t border-[#e7e7e7] pt-3">
                <button onClick={() => setActiveNav('Settings')} className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-left text-[13px] text-[#666666] hover:bg-[#f0f0f0] hover:text-[#111111]"><Settings aria-hidden="true" />Settings</button>
                <button onClick={() => setActiveNav('Logout')} className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-left text-[13px] text-[#666666] hover:bg-[#f0f0f0] hover:text-[#111111]"><LogOut aria-hidden="true" />Logout</button>
              </div>
            </aside>

            <div className="min-w-0 flex-1 bg-[#f8f9fb]">
              <header className="flex min-h-[72px] items-center justify-between border-b border-[#e7e7e7] bg-white px-5 sm:px-8" aria-label="Dashboard header">
                <div><p className="text-[13px] text-[#777777]">Demo WiFi Business</p><h3 className="text-[18px] font-semibold text-[#111111]">Dashboard overview</h3></div>
                <div className="flex items-center gap-3"><span className="hidden items-center gap-1.5 text-[12px] text-[#278052] sm:flex"><span className="size-2 rounded-full bg-[#19a974]" />All systems operational</span><button className="grid size-10 place-items-center rounded-full text-[#666666] hover:bg-[#f4f4f4]" aria-label="View notifications"><Bell aria-hidden="true" /></button><div className="grid size-9 place-items-center rounded-full bg-[#dbe5ff] text-[12px] font-semibold text-[#1a4be0]">VA</div></div>
              </header>

              <main className="p-5 sm:p-8">
                {showNotice && <div role="alert" className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-[#dbe5ff] bg-[#eef3ff] px-4 py-3 text-[13px] text-[#334b86]"><div><strong className="font-semibold">You&apos;re exploring a live demo.</strong> Data resets after you leave this page.</div><div className="flex items-center gap-3"><button className="font-semibold text-[#1a4be0] hover:underline">Upgrade now</button><button onClick={() => setShowNotice(false)} aria-label="Dismiss demo notice" className="grid size-8 place-items-center rounded-lg hover:bg-white"><X aria-hidden="true" /></button></div></div>}

                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                  <MetricCard label="Bandwidth usage" value="600 MB" detail="of 10 GB" icon={Gauge} tone="blue" />
                  <MetricCard label="Active sessions" value="2" detail="Just now" icon={Activity} tone="green" />
                  <MetricCard label="Redeemable value" value="₦80" detail="2m ago" icon={CircleDollarSign} tone="orange" />
                </div>

                <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.85fr)]">
                  <section className="rounded-xl border border-[#e6e8ed] bg-white p-5" aria-labelledby="usage-title">
                    <div className="mb-5 flex items-start justify-between"><div><h4 id="usage-title" className="font-semibold text-[#111111]">Weekly network usage</h4><p className="mt-1 text-[12px] text-[#888888]">Data consumed across all access points</p></div><span className="rounded-full bg-[#edf8f3] px-2.5 py-1 text-[12px] font-medium text-[#278052]">+18.4%</span></div>
                    <div className="relative h-[220px]" aria-label={`Line chart showing ${selectedDay} usage of ${selectedUsage} GB`} role="img">
                      <div className="absolute inset-x-0 top-0 flex justify-between text-[11px] text-[#a0a0a0]"><span>6 GB</span><span>4 GB</span><span>2 GB</span><span>0 GB</span></div>
                      <svg viewBox="0 0 700 180" className="absolute inset-x-0 top-6 h-[170px] w-full" preserveAspectRatio="none"><path d="M0 78 H700 M0 126 H700 M0 174 H700" stroke="#eef0f3" strokeWidth="1" /><path d="M0 98 C55 85 70 82 116 75 S180 110 233 104 S285 52 350 59 S405 72 466 67 S520 29 583 38 S645 67 700 50" fill="none" stroke="#1a4be0" strokeWidth="3" strokeLinecap="round" /><path d="M0 98 C55 85 70 82 116 75 S180 110 233 104 S285 52 350 59 S405 72 466 67 S520 29 583 38 S645 67 700 50 V180 H0 Z" fill="url(#usageFill)" opacity=".13" /><defs><linearGradient id="usageFill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#1a4be0" /><stop offset="1" stopColor="#1a4be0" stopOpacity="0" /></linearGradient></defs></svg>
                      <div className="absolute inset-x-0 bottom-0 flex justify-between text-[11px] text-[#888888]">{usagePoints.map((point) => <button key={point.day} onClick={() => setSelectedDay(point.day)} className={`rounded px-1 py-0.5 ${selectedDay === point.day ? 'font-semibold text-[#1a4be0]' : 'hover:bg-[#f4f4f4]'}`}>{point.day}</button>)}</div>
                    </div>
                  </section>

                  <section className="rounded-xl border border-[#e6e8ed] bg-white p-5" aria-labelledby="traffic-title"><div className="mb-4"><h4 id="traffic-title" className="font-semibold text-[#111111]">Traffic by destination</h4><p className="mt-1 text-[12px] text-[#888888]">This week · 3.2 GB total</p></div><div className="flex items-center gap-5"><div className="relative grid size-32 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(#1a4be0 0 50%, #19a974 50% 73%, #f59e0b 73% 79%, #94a3b8 79% 100%)` }}><div className="grid size-20 place-items-center rounded-full bg-white text-center"><span className="text-[18px] font-semibold text-[#111111]">3.2</span><span className="text-[10px] text-[#888888]">GB used</span></div></div><ul className="flex flex-col gap-2 text-[12px]">{traffic.map((item) => <li key={item.label} className="flex items-center justify-between gap-4"><span className="flex items-center gap-2 text-[#666666]"><span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />{item.label}</span><strong className="font-medium text-[#111111]">{item.value}%</strong></li>)}</ul></div></section>
                </div>

                <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.85fr)]">
                  <section className="rounded-xl border border-[#e6e8ed] bg-white p-5" aria-labelledby="updates-title"><div className="mb-4 flex items-center justify-between"><h4 id="updates-title" className="font-semibold text-[#111111]">Today&apos;s updates <span className="font-normal text-[#888888]">(9)</span></h4><button className="text-[12px] font-medium text-[#1a4be0] hover:underline">View all</button></div><ul className="flex flex-col divide-y divide-[#f0f0f0]">{updates.map((item) => <li key={item.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"><div className="flex min-w-0 items-center gap-3"><span className={`grid size-8 shrink-0 place-items-center rounded-full ${item.tone === 'success' ? 'bg-[#edf8f3] text-[#278052]' : item.tone === 'warning' ? 'bg-[#fff5df] text-[#a66b00]' : item.tone === 'info' ? 'bg-[#eef3ff] text-[#1a4be0]' : 'bg-[#f3f4f6] text-[#667085]'}`}><Activity aria-hidden="true" /></span><span className="truncate text-[12px] text-[#444444]">{item.label}</span></div><div className="shrink-0 text-right"><div className="text-[12px] font-medium text-[#111111]">{item.amount}</div><time className="text-[11px] text-[#999999]">{item.time}</time></div></li>)}</ul></section>
                  <div className="flex flex-col gap-5"><section className="rounded-xl border border-[#e6e8ed] bg-white p-5"><div className="mb-3 flex items-center gap-2"><Router className="text-[#1a4be0]" aria-hidden="true" /><h4 className="font-semibold text-[#111111]">Connected APs</h4></div><p className="text-[13px] text-[#666666]"><strong className="text-[22px] font-semibold text-[#111111]">7</strong> access points connected</p><p className="mt-1 text-[12px] text-[#a66b00]">3 offline · 1 bypassed</p></section><section className="rounded-xl border border-[#e6e8ed] bg-white p-5"><h4 className="mb-4 font-semibold text-[#111111]">Income by source</h4><div className="flex flex-col gap-3 text-[12px]"><IncomeRow label="Mobile money" value="₦190" width="24%" tone="bg-[#19a974]" /><IncomeRow label="PayPal" value="₦0" width="0%" tone="bg-[#94a3b8]" /><IncomeRow label="Bank transfer" value="₦600" width="76%" tone="bg-[#1a4be0]" /></div></section></div>
                </div>
              </main>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[13px] text-[#777777]">Every card is a live surface. Select a day, switch sections, or dismiss the demo notice to explore the interface.</p>
      </div>
    </section>
  );
};

function MetricCard({ label, value, detail, icon: Icon, tone }: { label: string; value: string; detail: string; icon: React.ElementType; tone: 'blue' | 'green' | 'orange' }) {
  const styles = { blue: 'bg-[#eef3ff] text-[#1a4be0]', green: 'bg-[#edf8f3] text-[#278052]', orange: 'bg-[#fff5df] text-[#a66b00]' };
  return <article className="rounded-xl border border-[#e6e8ed] bg-white p-4"><div className="mb-5 flex items-start justify-between"><span className="text-[12px] text-[#777777]">{label}</span><span className={`grid size-8 place-items-center rounded-lg ${styles[tone]}`}><Icon aria-hidden="true" /></span></div><div className="flex items-baseline gap-2"><strong className="text-[24px] font-semibold tracking-[-0.03em] text-[#111111]">{value}</strong><span className="text-[12px] text-[#888888]">{detail}</span></div></article>;
}

function IncomeRow({ label, value, width, tone }: { label: string; value: string; width: string; tone: string }) {
  return <div><div className="mb-1 flex justify-between text-[#666666]"><span>{label}</span><strong className="font-medium text-[#111111]">{value}</strong></div><div className="h-1.5 rounded-full bg-[#f0f1f3]"><div className={`h-1.5 rounded-full ${tone}`} style={{ width }} /></div></div>;
}
