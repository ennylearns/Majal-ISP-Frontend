import React, { useState } from 'react';

interface RouterCompatibilityProps {
  onOpenLeadModal: () => void;
}

export const RouterCompatibility: React.FC<RouterCompatibilityProps> = ({ onOpenLeadModal }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const hardwareFleet = [
    {
      model: 'MikroTik RB4011iGS+RM',
      role: 'Campus Hostels & Academic Blocks',
      cpu: 'Annapurna Labs AL21400 (4-Core 1.4 GHz)',
      ram: '1 GB RAM · 512 MB NAND',
      capacity: 'Up to 600 concurrent subscribers',
      ports: '10x Gigabit Ethernet · 1x 10G SFP+ cage',
      rosTested: 'RouterOS v7.14.2 & v6.49 LTS',
    },
    {
      model: 'MikroTik CCR2004-16G-2S+',
      role: 'Carrier Gateway & High-Density Core',
      cpu: 'AL32400 (4-Core 1.7 GHz 64-bit)',
      ram: '4 GB DDR4 RAM',
      capacity: 'Up to 2,500 concurrent subscribers',
      ports: '16x Gigabit Ethernet · 2x 10G SFP+ cages',
      rosTested: 'RouterOS v7.14.3',
    },
    {
      model: 'MikroTik hEX S (RB760iGS)',
      role: 'Hotels, Cafés & Small Estates',
      cpu: 'MT7621A (2-Core 880 MHz, 4 threads)',
      ram: '256 MB RAM · microSD slot',
      capacity: 'Up to 120 concurrent subscribers',
      ports: '5x Gigabit Ethernet · 1x SFP cage · PoE out',
      rosTested: 'RouterOS v7.13.5 & v6.48.6',
    },
    {
      model: 'MikroTik hAP ax3',
      role: 'Integrated Wi-Fi 6 Access Points',
      cpu: 'IPQ-6010 (4-Core 1.8 GHz ARM64)',
      ram: '1 GB RAM · 128 MB NAND',
      capacity: 'Up to 200 concurrent subscribers',
      ports: '1x 2.5G Ethernet · 4x Gigabit · Wi-Fi 6 dual-band',
      rosTested: 'RouterOS v7.14.2',
    },
  ];

  const currentHw = hardwareFleet[selectedIdx];

  return (
    <section id="hardware-spec" className="py-24 bg-white px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div data-rise style={{ '--i': 0 } as React.CSSProperties} className="mb-12 text-left">
          <h2 className="text-[clamp(26px,2.5vw,32px)] font-medium text-[#111111] tracking-[-0.02em] mb-3">
            Hardware specification.
          </h2>
          <p className="text-[16px] text-[#111111] max-w-[50ch]">
            MAJAL runs on genuine RouterOS firmware. No customized bootloaders or physical hardware modifications required.
          </p>
        </div>

        {/* 2-Column Layout: Real Archival Media Left, Matrix Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column Left (Cols 1-5): Real Archival Photograph with slow drift */}
          <div data-rise style={{ '--i': 1 } as React.CSSProperties} className="lg:col-span-5 space-y-4">
            <div className="bg-[#f4f4f4] overflow-hidden">
              <img
                src="/assets/parabolic-antennas-on-a-telecommunications-tower-on.jpg"
                alt="Parabolic antennas on a telecommunications microwave relay tower"
                className="w-full h-[360px] object-cover animate-slow-drift"
                loading="lazy"
              />
            </div>
            <p className="text-[13px] text-[#555555] leading-tight">
              Microwave backbone distribution towers deployed in regional WISP networks.
            </p>
          </div>

          {/* Column Right (Cols 6-12): Hardware Matrix */}
          <div 
            data-rise 
            style={{ '--i': 2 } as React.CSSProperties}
            className="lg:col-span-7 bg-[#f4f4f4] p-6 sm:p-8 space-y-6"
          >
            
            {/* Hardware selector tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[13px]">
              {hardwareFleet.map((hw, idx) => (
                <button
                  key={hw.model}
                  onClick={() => setSelectedIdx(idx)}
                  className={`py-2 px-2 text-center transition-colors cursor-pointer text-[13px] ${
                    selectedIdx === idx
                      ? 'bg-white text-[#111111] font-medium'
                      : 'bg-[#f4f4f4] text-[#555555] hover:text-[#111111]'
                  }`}
                >
                  {hw.model.replace('MikroTik ', '')}
                </button>
              ))}
            </div>

            {/* Hardware Detail Card (data-ui) */}
            <div data-ui className="bg-white p-6 space-y-4 text-[14px]">
              <div className="flex justify-between items-start pb-2">
                <div>
                  <h3 className="font-medium text-[16px] text-[#111111]">
                    {currentHw.model}
                  </h3>
                  <div className="text-[13px] text-[#555555]">
                    {currentHw.role}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[13px] text-[#1a4be0] font-medium tabular-nums">
                    {currentHw.capacity}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-[13px] pt-2">
                <div className="flex justify-between text-[#555555]">
                  <span>Processor</span>
                  <span className="text-[#111111] font-medium">{currentHw.cpu}</span>
                </div>
                <div className="flex justify-between text-[#555555]">
                  <span>System Memory</span>
                  <span className="text-[#111111] font-medium">{currentHw.ram}</span>
                </div>
                <div className="flex justify-between text-[#555555]">
                  <span>Physical Interfaces</span>
                  <span className="text-[#111111] font-medium">{currentHw.ports}</span>
                </div>
                <div className="flex justify-between text-[#555555]">
                  <span>Tested Firmware</span>
                  <span className="text-[#111111] font-medium">{currentHw.rosTested}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <span className="text-[13px] text-[#555555]">
                Deploying custom x86 CHR or unlisted RouterBOARD?
              </span>
              <button
                onClick={onOpenLeadModal}
                className="button-secondary text-[13px] py-1.5 px-3 cursor-pointer shrink-0"
              >
                Inquire compatibility
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
