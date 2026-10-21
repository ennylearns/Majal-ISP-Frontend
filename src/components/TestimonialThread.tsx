import React from 'react';

export const TestimonialThread: React.FC = () => {
  return (
    <section className="py-24 bg-white px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Main thread occupies columns 2–9 */}
          <div className="lg:col-start-2 lg:col-span-8 space-y-8">
            
            {/* Primary Large Comment (data-ui) */}
            <div 
              data-ui 
              data-rise
              style={{ '--i': 0 } as React.CSSProperties}
              className="bg-[#f4f4f4] p-8 sm:p-10 space-y-5"
            >
              {/* Comment Header */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center font-medium text-[13px]">
                  TA
                </div>
                <div className="text-[13px] leading-tight">
                  <span className="font-medium text-[#111111]">Tunde Adeleke</span>
                  <span className="text-[#555555]"> · Lead Systems Admin, Unilag Campus Net</span>
                  <div className="text-[13px] text-[#555555] mt-0.5">October 12, 2026</div>
                </div>
              </div>

              {/* Body: 2 lines max adhering to statement length rule */}
              <p className="text-[clamp(19px,1.8vw,24px)] font-normal text-[#111111] leading-[1.3] tracking-[-0.015em]">
                We moved 42 MikroTik routers across three campuses. Students connect faster because vouchers authenticate instantly.
              </p>

              {/* Resolved / Telemetry State */}
              <div className="flex items-center gap-2 pt-1 text-[13px] text-[#555555]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#1a4be0]" />
                <span className="font-medium text-[#111111]">Resolved</span>
                <span>· 1,480 concurrent leases synced across 42 gateways</span>
              </div>
            </div>

            {/* Indented Replies underneath: 440px max width, 32px apart */}
            <div className="pl-6 sm:pl-12 space-y-6">
              
              {/* Reply 1 */}
              <div 
                data-ui 
                data-rise
                style={{ '--i': 1 } as React.CSSProperties}
                className="max-w-[480px] bg-[#f4f4f4] p-6 space-y-3"
              >
                <div className="flex items-center gap-2.5 text-[13px]">
                  <div className="w-7 h-7 rounded-full bg-[#e0e0e0] text-[#111111] flex items-center justify-center font-medium text-[13px]">
                    CO
                  </div>
                  <div>
                    <span className="font-medium text-[#111111]">Chidi Okafor</span>
                    <span className="text-[#555555]"> · Silverline Cybercafé Hub</span>
                  </div>
                </div>
                <p className="text-[15px] text-[#111111] leading-[1.45]">
                  Voucher printing used to take ten minutes of Winbox manual entry per customer. Now the thermal printer spits out PINs in three seconds with bandwidth already locked.
                </p>
                <div className="text-[13px] text-[#555555]">
                  Verified Operator · Lagos
                </div>
              </div>

              {/* Reply 2 */}
              <div 
                data-ui 
                data-rise
                style={{ '--i': 2 } as React.CSSProperties}
                className="max-w-[480px] bg-[#f4f4f4] p-6 space-y-3"
              >
                <div className="flex items-center gap-2.5 text-[13px]">
                  <div className="w-7 h-7 rounded-full bg-[#e0e0e0] text-[#111111] flex items-center justify-center font-medium text-[13px]">
                    FB
                  </div>
                  <div>
                    <span className="font-medium text-[#111111]">Fatima Bello</span>
                    <span className="text-[#555555]"> · GM, Grand Suites Hotel</span>
                  </div>
                </div>
                <p className="text-[15px] text-[#111111] leading-[1.45]">
                  Guests pay directly with their phone cards or USSD and get instantly routed onto the 20 Mbps guest pool without front-desk receptionist intervention.
                </p>
                <div className="text-[13px] text-[#555555]">
                  Verified Operator · Abuja
                </div>
              </div>

            </div>

          </div>

          {/* Columns 10-12 stay empty */}
          <div className="hidden lg:block lg:col-span-3" />
        </div>
      </div>
    </section>
  );
};
