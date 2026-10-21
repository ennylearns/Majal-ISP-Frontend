import React from 'react';

export const Features: React.FC = () => {
  return (
    <section id="features-matrix" className="py-24 bg-white px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading: 2-4 words at 24-30px, 56px below */}
        <div data-rise style={{ '--i': 0 } as React.CSSProperties} className="mb-14 text-left">
          <h2 className="text-[clamp(26px,2.5vw,32px)] font-medium text-[#111111] tracking-[-0.02em]">
            The router architecture.
          </h2>
        </div>

        {/* 3-Column Staggered Checkerboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          
          {/* Cell 1 (Row 1, Col 1): Text Top, Fragment Bottom */}
          <div 
            data-rise 
            style={{ '--i': 1 } as React.CSSProperties}
            className="bg-[#f4f4f4] h-[450px] flex flex-col justify-between overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-[17px] font-medium text-[#111111] mb-2">
                RouterOS provisioning
              </h3>
              <p className="text-[15px] text-[#111111] leading-[1.5]">
                Pair any MikroTik hardware in seconds via RouterOS script or standard RADIUS. Operates securely behind NAT with zero public IP dependency.
              </p>
            </div>
            {/* Terminal snippet fragment */}
            <pre data-ui className="bg-[#111111] text-white p-5 text-[13px] tabular-nums font-mono overflow-hidden shrink-0 mt-auto font-normal">
              <div className="text-[#a0a0a0] mb-1"># RouterOS Terminal Script</div>
              <div className="text-[#4ade80]">/ip hotspot profile add name="majal-hsp"</div>
              <div className="text-white/80">  radius-mac-format=XX:XX:XX:XX:XX:XX</div>
              <div className="text-white/80">  login-by=http-chap,cookie radius-accounting=yes</div>
              <div className="text-[#60a5fa] mt-1">/radius add service=hotspot address=10.120.10.1</div>
            </pre>
          </div>

          {/* Cell 2 (Row 1, Col 2): Fragment Top, Text Bottom */}
          <div 
            data-rise 
            style={{ '--i': 2 } as React.CSSProperties}
            className="bg-[#f4f4f4] h-[450px] flex flex-col justify-between overflow-hidden"
          >
            {/* Payment webhook ledger fragment */}
            <div data-ui className="bg-white p-5 text-[13px] overflow-hidden shrink-0 mb-auto">
              <div className="flex justify-between items-center pb-2 text-[13px] text-[#555555]">
                <span>Webhook Reference</span>
                <span className="text-[#1a4be0] font-medium">Verified</span>
              </div>
              <div className="p-3 bg-[#f4f4f4] space-y-1.5 tabular-nums">
                <div className="flex justify-between">
                  <span className="text-[#555555]">Amount:</span>
                  <span className="font-medium text-[#111111]">₦1,500 NGN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">Channel:</span>
                  <span className="text-[#111111]">USSD *737*</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#555555]">PIN:</span>
                  <span className="font-medium text-[#111111]">419-802</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-[17px] font-medium text-[#111111] mb-2">
                Automated captive billing
              </h3>
              <p className="text-[15px] text-[#111111] leading-[1.5]">
                Direct integration with debit cards, mobile money, and USSD. Webhooks authenticate payments and authorize router leases with zero manual confirmation.
              </p>
            </div>
          </div>

          {/* Cell 3 (Row 1, Col 3): Text Top, Fragment Bottom */}
          <div 
            data-rise 
            style={{ '--i': 3 } as React.CSSProperties}
            className="bg-[#f4f4f4] h-[450px] flex flex-col justify-between overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-[17px] font-medium text-[#111111] mb-2">
                Dynamic queue trees
              </h3>
              <p className="text-[15px] text-[#111111] leading-[1.5]">
                Generates Simple Queues on RouterOS automatically. Enforces strict burst thresholds, upload limits, and packet priorities for high-density venues.
              </p>
            </div>
            {/* Queue Table slice fragment */}
            <div data-ui className="bg-white p-5 text-[13px] tabular-nums overflow-hidden shrink-0 mt-auto space-y-2">
              <div className="flex justify-between text-[#555555] pb-1">
                <span>Queue Target</span>
                <span>Max Limit</span>
              </div>
              <div className="flex justify-between p-2 bg-[#f4f4f4]">
                <span className="font-medium text-[#111111]">hostel-north-142</span>
                <span className="text-[#1a4be0] font-medium">10M / 4M</span>
              </div>
              <div className="flex justify-between p-2 bg-[#f4f4f4]">
                <span className="font-medium text-[#111111]">library-quiet-09</span>
                <span className="text-[#111111]">6M / 2M</span>
              </div>
            </div>
          </div>

          {/* Cell 4 (Row 2, Col 1): Fragment Top, Text Bottom */}
          <div 
            data-rise 
            style={{ '--i': 4 } as React.CSSProperties}
            className="bg-[#f4f4f4] h-[450px] flex flex-col justify-between overflow-hidden"
          >
            {/* Hardware Telemetry Dial Fragment */}
            <div data-ui className="bg-white p-5 text-[13px] overflow-hidden shrink-0 mb-auto space-y-3">
              <div className="flex justify-between text-[13px] text-[#555555]">
                <span>MikroTik RB4011</span>
                <span>Uptime 19d 14h</span>
              </div>
              <div className="p-3 bg-[#f4f4f4] space-y-2 tabular-nums">
                <div className="flex justify-between">
                  <span>CPU 4-Core</span>
                  <span className="font-medium text-[#111111]">24%</span>
                </div>
                <div className="h-1.5 bg-[#e0e0e0] w-full">
                  <div className="bg-[#111111] h-1.5 w-[24%]" />
                </div>
                <div className="flex justify-between text-[13px] text-[#555555] pt-1">
                  <span>Free RAM: 748 MB</span>
                  <span>Temp: 41°C</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-[17px] font-medium text-[#111111] mb-2">
                Sub-second health telemetry
              </h3>
              <p className="text-[15px] text-[#111111] leading-[1.5]">
                Continuous monitoring of router CPU load, memory utilization, link quality, and thermal readings with instant alerts before outages occur.
              </p>
            </div>
          </div>

          {/* Cell 5 (Row 2, Col 2): Text Top, Fragment Bottom */}
          <div 
            data-rise 
            style={{ '--i': 5 } as React.CSSProperties}
            className="bg-[#f4f4f4] h-[450px] flex flex-col justify-between overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-[17px] font-medium text-[#111111] mb-2">
                Student & guest portal
              </h3>
              <p className="text-[15px] text-[#111111] leading-[1.5]">
                Responsive captive portal served directly on user connection. Patrons enter their voucher PIN or purchase instant access in three taps.
              </p>
            </div>
            {/* Captive form slice fragment */}
            <div data-ui className="bg-white p-5 text-[13px] overflow-hidden shrink-0 mt-auto space-y-2.5">
              <div className="text-[13px] text-[#555555]">
                Campus Express Wi-Fi Login
              </div>
              <div className="p-2.5 bg-[#f4f4f4] text-center font-medium text-[#111111] tabular-nums">
                8 4 2 - 1 9 0
              </div>
              <div className="bg-[#1a4be0] text-white text-center py-2 text-[13px] font-medium">
                Connect Device
              </div>
            </div>
          </div>

          {/* Cell 6 (Row 2, Col 3): Fragment Top, Text Bottom */}
          <div 
            data-rise 
            style={{ '--i': 6 } as React.CSSProperties}
            className="bg-[#f4f4f4] h-[450px] flex flex-col justify-between overflow-hidden"
          >
            {/* Multi-Site Gateway Table Fragment */}
            <div data-ui className="bg-white p-5 text-[13px] tabular-nums overflow-hidden shrink-0 mb-auto space-y-2">
              <div className="flex justify-between text-[#555555] pb-1">
                <span>Managed Gateway</span>
                <span>Active Leases</span>
              </div>
              <div className="p-2 bg-[#f4f4f4] flex justify-between">
                <span className="font-medium text-[#111111]">Campus North (RB4011)</span>
                <span className="text-[#1a4be0] font-medium">148 users</span>
              </div>
              <div className="p-2 bg-[#f4f4f4] flex justify-between">
                <span className="font-medium text-[#111111]">Grand Hotel (hEX S)</span>
                <span>86 users</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-[17px] font-medium text-[#111111] mb-2">
                Distributed fleet dispatch
              </h3>
              <p className="text-[15px] text-[#111111] leading-[1.5]">
                Consolidate fifty routers across disparate campuses and towns under one tenant. Synchronize rate policies and pull centralized revenue reports.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
