import React, { useState, useEffect } from 'react';

interface HeroProps {
  onOpenLeadModal: () => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal, onExploreDemo }) => {
  const [selectedGateway, setSelectedGateway] = useState<'rtr-01' | 'rtr-02' | 'rtr-03'>('rtr-01');
  const [rxRate, setRxRate] = useState(64.2);
  const [txRate, setTxRate] = useState(18.5);
  const [generatedPin, setGeneratedPin] = useState<string | null>('842-190');
  const [pinDuration, setPinDuration] = useState('6 Hours');
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subtle live throughput variation
  useEffect(() => {
    const interval = setInterval(() => {
      setRxRate((prev) => +(prev + (Math.random() * 2 - 1)).toFixed(1));
      setTxRate((prev) => +(prev + (Math.random() * 1 - 0.5)).toFixed(1));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const gateways = {
    'rtr-01': {
      name: 'Unilag North Campus',
      model: 'MikroTik RB4011iGS+RM',
      ros: 'RouterOS v7.14.2',
      ip: '10.120.10.1',
      leases: 148,
      cpu: '24%',
    },
    'rtr-02': {
      name: 'Grand Suites Hotel',
      model: 'MikroTik hEX S (RB760iGS)',
      ros: 'RouterOS v7.13.5',
      ip: '192.168.88.1',
      leases: 86,
      cpu: '18%',
    },
    'rtr-03': {
      name: 'Silverline Internet Hub',
      model: 'MikroTik hAP ac3',
      ros: 'RouterOS v6.49.10',
      ip: '172.16.20.1',
      leases: 64,
      cpu: '31%',
    },
  };

  const currentGw = gateways[selectedGateway];

  const handleGeneratePin = () => {
    const randomPin = `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedPin(randomPin);
  };

  return (
    <section className="min-h-[85svh] grid grid-cols-1 lg:grid-cols-2 overflow-x-clip">
      {/* Left Half: Clean Ground with Anchored Typography */}
      <div className="bg-white px-6 sm:px-12 lg:px-16 py-12 lg:py-20 flex flex-col justify-between">
        <div className="hidden lg:block">
          {/* Top spacer */}
        </div>

        <div className="max-w-[480px] my-auto py-10">
          <h1 
            className="text-[clamp(26px,2.1vw,32px)] font-medium text-[#111111] leading-[1.1] tracking-[-0.02em] text-balance mb-6"
          >
            RouterOS Wi-Fi billing without captive friction.
          </h1>

          <p 
            data-rise 
            style={{ '--i': 1 } as React.CSSProperties}
            className="text-[16px] text-[#111111] leading-[1.5] max-w-[44ch] mb-8"
          >
            Centralized subscriber quotas, dynamic queue trees, and automated vouchers for MikroTik operators across campuses and estates.
          </p>

          <div 
            data-rise 
            style={{ '--i': 2 } as React.CSSProperties}
            className="flex flex-wrap items-center gap-6"
          >
            <button 
              onClick={onOpenLeadModal}
              className="button-primary cursor-pointer text-[15px]"
            >
              Deploy gateway
            </button>
            <button 
              onClick={onExploreDemo}
              className="text-[15px] text-[#111111] hover:underline cursor-pointer"
            >
              Inspect live console
            </button>
          </div>
        </div>

        <div data-rise style={{ '--i': 3 } as React.CSSProperties}>
          <p className="text-[13px] text-[#555555]">
            Compatible with RouterOS v6.49+ and v7.x hardware.
          </p>
        </div>
      </div>

      {/* Right Half: Tone-step Surface with Working Instrument Fragment */}
      <div className="bg-[#f4f4f4] px-6 sm:px-10 lg:px-12 py-12 lg:py-20 flex flex-col justify-center items-center">
        {/* Real Product Fragment (Marked data-ui for native borders & layout) */}
        <div 
          data-ui 
          className="w-full max-w-[480px] bg-white p-6 space-y-6 text-[#111111]"
        >
          {/* Instrument Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium text-[#111111] uppercase tracking-normal">
                Gateway Telemetry Instrument
              </p>
              <p className="text-[13px] text-[#555555]">
                Active radius socket · {viewportWidth}px viewport
              </p>
            </div>
            <div className="text-right">
              <span className="text-[13px] bg-[#f4f4f4] text-[#111111] px-2 py-1 font-medium">
                Live link
              </span>
            </div>
          </div>

          {/* Gateway Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1 bg-[#f4f4f4] p-1 text-[13px]">
            <button
              onClick={() => setSelectedGateway('rtr-01')}
              className={`py-1.5 px-2 text-center transition-colors cursor-pointer ${
                selectedGateway === 'rtr-01' ? 'bg-white text-[#111111] font-medium' : 'text-[#555555]'
              }`}
            >
              North Campus
            </button>
            <button
              onClick={() => setSelectedGateway('rtr-02')}
              className={`py-1.5 px-2 text-center transition-colors cursor-pointer ${
                selectedGateway === 'rtr-02' ? 'bg-white text-[#111111] font-medium' : 'text-[#555555]'
              }`}
            >
              Grand Hotel
            </button>
            <button
              onClick={() => setSelectedGateway('rtr-03')}
              className={`py-1.5 px-2 text-center transition-colors cursor-pointer ${
                selectedGateway === 'rtr-03' ? 'bg-white text-[#111111] font-medium' : 'text-[#555555]'
              }`}
            >
              Cyber Café
            </button>
          </div>

          {/* Router Specs Readout */}
          <div className="space-y-2 text-[14px]">
            <div className="flex justify-between text-[#555555]">
              <span>Hardware</span>
              <span className="text-[#111111] font-medium">{currentGw.model}</span>
            </div>
            <div className="flex justify-between text-[#555555]">
              <span>Operating system</span>
              <span className="text-[#111111] font-medium">{currentGw.ros}</span>
            </div>
            <div className="flex justify-between text-[#555555]">
              <span>Gateway IP</span>
              <span className="text-[#111111] font-medium tabular-nums">{currentGw.ip}</span>
            </div>
            <div className="flex justify-between text-[#555555]">
              <span>Active leases</span>
              <span className="text-[#111111] font-medium tabular-nums">{currentGw.leases} clients</span>
            </div>
          </div>

          {/* Telemetry Metric Readout */}
          <div className="bg-[#f4f4f4] p-4 space-y-3">
            <div className="flex justify-between text-[13px]">
              <span className="text-[#555555]">Throughput rate</span>
              <span className="text-[#111111] font-medium tabular-nums">
                {rxRate} Mbps rx / {txRate} Mbps tx
              </span>
            </div>
            {/* Visual throughput meter bar */}
            <div className="h-1.5 w-full bg-[#e5e5e5] overflow-hidden">
              <div 
                className="h-full bg-[#1a4be0] transition-[width] duration-500" 
                style={{ width: `${Math.min(100, rxRate * 1.1)}%` }} 
              />
            </div>
            <div className="flex justify-between text-[13px] text-[#555555]">
              <span>CPU load: {currentGw.cpu}</span>
              <span>Local latency: 2.1 ms</span>
            </div>
          </div>

          {/* Interactive Live PIN Voucher Generator */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-medium text-[#111111]">Instant voucher issuer</span>
              <div className="flex gap-2 text-[13px]">
                <button
                  onClick={() => setPinDuration('1 Hour')}
                  className={`px-2 py-0.5 cursor-pointer ${
                    pinDuration === '1 Hour' ? 'bg-[#111111] text-white' : 'text-[#555555]'
                  }`}
                >
                  1h
                </button>
                <button
                  onClick={() => setPinDuration('6 Hours')}
                  className={`px-2 py-0.5 cursor-pointer ${
                    pinDuration === '6 Hours' ? 'bg-[#111111] text-white' : 'text-[#555555]'
                  }`}
                >
                  6h
                </button>
                <button
                  onClick={() => setPinDuration('24 Hours')}
                  className={`px-2 py-0.5 cursor-pointer ${
                    pinDuration === '24 Hours' ? 'bg-[#111111] text-white' : 'text-[#555555]'
                  }`}
                >
                  24h
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[#f4f4f4] px-3 py-2 text-[15px] font-medium tracking-wide tabular-nums text-center text-[#111111]">
                {generatedPin ? `PIN: ${generatedPin}` : 'No PIN issued'}
              </div>
              <button
                onClick={handleGeneratePin}
                className="button-primary text-[13px] py-2 px-3 cursor-pointer shrink-0"
              >
                Issue test PIN
              </button>
            </div>
            <p className="text-[13px] text-[#555555]">
              Radius auth token verified · Simple Queue throttled to 8 Mbps
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
