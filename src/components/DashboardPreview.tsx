import React, { useState } from 'react';
import { DEMO_SUBSCRIBERS } from '../data/mockData';
import { Subscriber } from '../types';

export const DashboardPreview: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(DEMO_SUBSCRIBERS);
  const [maxQueueSpeed, setMaxQueueSpeed] = useState<number>(20);
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [autoDropExpired, setAutoDropExpired] = useState<boolean>(true);
  const [radiusProtocol, setRadiusProtocol] = useState<'MS-CHAPv2' | 'PAP'>('MS-CHAPv2');
  const [pollInterval, setPollInterval] = useState<'1s' | '5s'>('1s');
  const [activeTab, setActiveTab] = useState<'sessions' | 'queues'>('sessions');

  const handleDisconnect = (id: string) => {
    setSubscribers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'expired' } : s))
    );
  };

  const handleReset = () => {
    setSubscribers(DEMO_SUBSCRIBERS);
  };

  const filteredSubs = subscribers.filter((s) => {
    if (locationFilter === 'all') return true;
    return s.routerLocation.toLowerCase().includes(locationFilter);
  });

  return (
    <section id="live-showcase" className="py-24 bg-white px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading & Sentence */}
        <div data-rise style={{ '--i': 0 } as React.CSSProperties} className="mb-10 text-left">
          <h2 className="text-[clamp(24px,2vw,30px)] font-medium text-[#111111] tracking-[-0.02em] mb-3">
            Live operator dispatch.
          </h2>
          <p className="text-[16px] text-[#111111] max-w-[52ch]">
            Adjust bandwidth throttles, toggle captive authentication, and drop active subscriber sessions in real time.
          </p>
        </div>

        {/* The 62/38 Split Filled Panel */}
        <div 
          data-rise 
          style={{ '--i': 1 } as React.CSSProperties}
          className="bg-[#f4f4f4] rounded-[12px] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          
          {/* Left Area (62%): Real Interface in Action */}
          <div data-ui className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Product Top Header */}
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-medium text-[#111111]">
                    Active Lease Table
                  </span>
                  <span className="text-[13px] bg-white px-2 py-0.5 text-[#111111] tabular-nums">
                    {filteredSubs.length} sessions
                  </span>
                </div>
                <div className="flex gap-2 text-[13px]">
                  <button
                    onClick={() => setActiveTab('sessions')}
                    className={`px-2 py-1 cursor-pointer ${
                      activeTab === 'sessions' ? 'bg-[#111111] text-white' : 'text-[#555555]'
                    }`}
                  >
                    Sessions
                  </button>
                  <button
                    onClick={() => setActiveTab('queues')}
                    className={`px-2 py-1 cursor-pointer ${
                      activeTab === 'queues' ? 'bg-[#111111] text-white' : 'text-[#555555]'
                    }`}
                  >
                    Queue Trees
                  </button>
                </div>
              </div>

              {/* Table / List at true size */}
              <div className="space-y-2 mt-2">
                {activeTab === 'sessions' ? (
                  filteredSubs.slice(0, 5).map((sub, sIdx) => (
                    <div
                      key={sub.id}
                      data-rise
                      style={{ '--i': sIdx + 2 } as React.CSSProperties}
                      className="bg-white p-3.5 flex items-center justify-between gap-4 text-[13px]"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#111111] truncate">
                            {sub.name}
                          </span>
                          <span
                            className={`text-[13px] px-1.5 py-0.5 font-normal ${
                              sub.status === 'active'
                                ? 'bg-[#eaf5ea] text-[#1e6b1e]'
                                : 'bg-[#f4f4f4] text-[#111111]'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </div>
                        <div className="text-[13px] text-[#555555] tabular-nums truncate">
                          {sub.ipAddress} · {sub.macAddress}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="tabular-nums font-medium text-[#111111]">
                          {sub.dataUsedMb} MB
                        </div>
                        <div className="text-[13px] text-[#555555] tabular-nums">
                          Cap: {maxQueueSpeed}M limit
                        </div>
                      </div>

                      <button
                        onClick={() => handleDisconnect(sub.id)}
                        disabled={sub.status === 'expired'}
                        className={`text-[13px] px-2.5 py-1 transition-colors cursor-pointer shrink-0 ${
                          sub.status === 'expired'
                            ? 'bg-[#f0f0f0] text-[#333333] font-medium cursor-not-allowed'
                            : 'bg-[#f4f4f4] text-[#111111] hover:bg-[#111111] hover:text-white'
                        }`}
                      >
                        {sub.status === 'expired' ? 'Dropped' : 'Drop'}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="space-y-2 text-[13px]">
                    <div className="bg-white p-3 flex justify-between items-center">
                      <span className="font-medium text-[#111111]">simple-queue/hostel-pool</span>
                      <span className="tabular-nums text-[#111111]">Rate: {maxQueueSpeed}M / 8M</span>
                    </div>
                    <div className="bg-white p-3 flex justify-between items-center">
                      <span className="font-medium text-[#111111]">queue-tree/p2p-choke</span>
                      <span className="tabular-nums text-[#555555]">Drop packet priority 8</span>
                    </div>
                    <div className="bg-white p-3 flex justify-between items-center">
                      <span className="font-medium text-[#111111]">queue-tree/radius-accounting</span>
                      <span className="tabular-nums text-[#1a4be0]">{radiusProtocol} sync OK</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Link */}
            <div className="pt-6">
              <a
                href="#features-matrix"
                className="text-[13px] text-[#1a4be0] hover:underline"
              >
                Read RouterOS API specification →
              </a>
            </div>
          </div>

          {/* Right Area (38%): Narrow Column of Working Controls */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-[14px] font-medium text-[#111111] pb-4 uppercase tracking-normal">
                Dispatched Controls
              </p>

              {/* Stacked Control Rows 44px tall */}
              <div className="space-y-4">
                {/* Control 1: Max Queue Limit */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#111111]">Queue ceiling</span>
                    <span className="text-[#111111] font-medium tabular-nums">
                      {maxQueueSpeed} Mbps
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={maxQueueSpeed}
                    onChange={(e) => setMaxQueueSpeed(Number(e.target.value))}
                    className="w-full accent-[#1a4be0] cursor-pointer"
                  />
                </div>

                {/* Control 2: Router Filter */}
                <div className="flex items-center justify-between text-[13px] h-[44px]">
                  <span className="text-[#111111]">Gateway branch</span>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="bg-[#f4f4f4] text-[#111111] px-2.5 py-1.5 text-[13px] border-none focus:outline-none cursor-pointer"
                  >
                    <option value="all">All locations</option>
                    <option value="campus">Campus North</option>
                    <option value="hotel">Grand Suites</option>
                    <option value="hub">Silverline Hub</option>
                  </select>
                </div>

                {/* Control 3: Auto Drop */}
                <div className="flex items-center justify-between text-[13px] h-[44px]">
                  <span className="text-[#111111]">Auto-drop expired</span>
                  <button
                    onClick={() => setAutoDropExpired(!autoDropExpired)}
                    className={`px-3 py-1 text-[13px] font-medium cursor-pointer transition-colors ${
                      autoDropExpired ? 'bg-[#111111] text-white' : 'bg-[#f4f4f4] text-[#111111]'
                    }`}
                  >
                    {autoDropExpired ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                {/* Control 4: Radius Mode */}
                <div className="flex items-center justify-between text-[13px] h-[44px]">
                  <span className="text-[#111111]">RADIUS auth</span>
                  <button
                    onClick={() =>
                      setRadiusProtocol((p) => (p === 'MS-CHAPv2' ? 'PAP' : 'MS-CHAPv2'))
                    }
                    className="bg-[#f4f4f4] hover:bg-[#e8e8e8] text-[#111111] px-2.5 py-1 text-[13px] font-medium cursor-pointer"
                  >
                    {radiusProtocol}
                  </button>
                </div>

                {/* Control 5: Telemetry Poll Rate */}
                <div className="flex items-center justify-between text-[13px] h-[44px]">
                  <span className="text-[#111111]">Telemetry interval</span>
                  <div className="flex gap-1 text-[13px]">
                    <button
                      onClick={() => setPollInterval('1s')}
                      className={`px-2.5 py-1 cursor-pointer ${
                        pollInterval === '1s' ? 'bg-[#111111] text-white' : 'bg-[#f4f4f4] text-[#111111]'
                      }`}
                    >
                      1 sec
                    </button>
                    <button
                      onClick={() => setPollInterval('5s')}
                      className={`px-2.5 py-1 cursor-pointer ${
                        pollInterval === '5s' ? 'bg-[#111111] text-white' : 'bg-[#f4f4f4] text-[#111111]'
                      }`}
                    >
                      5 sec
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Action */}
            <div className="pt-6">
              <button
                onClick={handleReset}
                className="text-[13px] text-[#555555] hover:text-[#111111] hover:underline cursor-pointer"
              >
                Reset simulation data
              </button>
            </div>
          </div>
        </div>

        {/* Start Instruction Below Panel */}
        <p className="text-[13px] text-[#555555] mt-4 text-left">
          Change any parameter above to dispatch immediate RouterOS API packets.
        </p>
      </div>
    </section>
  );
};
