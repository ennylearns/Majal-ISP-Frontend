import React, { useState, useEffect, useRef } from 'react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const stepRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.innerHeight / 2;
      stepRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= mid && rect.bottom >= mid) {
            setActiveStep(index + 1);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="workflow" className="py-24 bg-white px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column (Cols 1-5): Three Statements in 50vh Blocks */}
          <div className="lg:col-span-6 space-y-8">
            <div data-rise style={{ '--i': 0 } as React.CSSProperties} className="mb-8">
              <h2 className="text-[clamp(24px,2.2vw,28px)] font-medium text-[#111111] tracking-[-0.02em]">
                Set it up in three steps.
              </h2>
            </div>

            {/* Statement 1 */}
            <div
              ref={stepRefs[0]}
              onClick={() => setActiveStep(1)}
              data-rise
              style={{ '--i': 1 } as React.CSSProperties}
              className={`min-h-[44vh] flex flex-col justify-center cursor-pointer transition-opacity duration-300 ${
                activeStep === 1 ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <h3 className="text-[clamp(24px,2.2vw,30px)] font-medium text-[#111111] leading-[1.2] mb-3">
                Connect your router.
              </h3>
              <p className="text-[16px] text-[#111111] leading-[1.5] max-w-[42ch]">
                Paste one line into RouterOS Terminal. Your gateway establishes a TLS tunnel to the dispatch engine without public IP configuration or port forwarding.
              </p>
            </div>

            {/* Statement 2 */}
            <div
              ref={stepRefs[1]}
              onClick={() => setActiveStep(2)}
              data-rise
              style={{ '--i': 2 } as React.CSSProperties}
              className={`min-h-[44vh] flex flex-col justify-center cursor-pointer transition-opacity duration-300 ${
                activeStep === 2 ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <h3 className="text-[clamp(24px,2.2vw,30px)] font-medium text-[#111111] leading-[1.2] mb-3">
                Set plans and speed limits.
              </h3>
              <p className="text-[16px] text-[#111111] leading-[1.5] max-w-[42ch]">
                Configure 1-hour, daily, or monthly passes. The engine automatically creates corresponding Simple Queues with download and burst limits directly on the router.
              </p>
            </div>

            {/* Statement 3 */}
            <div
              ref={stepRefs[2]}
              onClick={() => setActiveStep(3)}
              data-rise
              style={{ '--i': 3 } as React.CSSProperties}
              className={`min-h-[44vh] flex flex-col justify-center cursor-pointer transition-opacity duration-300 ${
                activeStep === 3 ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <h3 className="text-[clamp(24px,2.2vw,30px)] font-medium text-[#111111] leading-[1.2] mb-3">
                Sell access and send vouchers.
              </h3>
              <p className="text-[16px] text-[#111111] leading-[1.5] max-w-[42ch]">
                Patrons connect and pay via Card, USSD, or Mobile Money. Webhooks trigger instant PIN issuance and RouterOS RADIUS lease authorization in milliseconds.
              </p>
            </div>
          </div>

          {/* Right Column (Cols 7-12): Sticky Stage with Changing Interface State */}
          <div className="lg:col-span-6 relative">
            <div className="lg:sticky lg:top-[14vh] bg-[#f4f4f4] p-8 sm:p-10 min-h-[460px] flex flex-col justify-between">
              
              {/* Header of Stage */}
              <div className="flex justify-between items-center text-[13px] pb-4">
                <span className="font-medium text-[#111111]">
                  Stage Inspector · State {activeStep} of 3
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((step) => (
                    <button
                      key={step}
                      onClick={() => setActiveStep(step)}
                      className={`w-6 h-6 text-[13px] flex items-center justify-center cursor-pointer ${
                        activeStep === step ? 'bg-[#111111] text-white font-medium' : 'bg-white text-[#555555]'
                      }`}
                    >
                      {step}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Fragment Content based on activeStep */}
              <div data-ui className="bg-white p-6 my-auto text-[13px] space-y-4">
                {activeStep === 1 && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-[#555555] text-[13px]">
                      <span>RouterOS Socket Handshake</span>
                      <span className="text-[#1a4be0] font-medium">Listening 1812/udp</span>
                    </div>
                    <pre className="bg-[#111111] text-white p-4 font-mono text-[13px] tabular-nums leading-relaxed font-normal">
                      <div className="text-[#a0a0a0]"># Test outbound gateway probe</div>
                      <div className="text-[#4ade80]">/tool fetch url="https://api.majaisp.com/v1/ping"</div>
                      <div className="text-white/80">status: finished</div>
                      <div className="text-white/80">downloaded: 42 B (200 OK)</div>
                      <div className="text-[#60a5fa] mt-1">RADIUS secret sync confirmed.</div>
                    </pre>
                    <div className="flex justify-between text-[13px] text-[#555555]">
                      <span>RB4011iGS+RM</span>
                      <span>Gateway IP: 10.120.10.1</span>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-[#555555] text-[13px]">
                      <span>Tariff Configuration</span>
                      <span className="text-[#111111] font-medium">3 active tiers</span>
                    </div>
                    <div className="space-y-2 tabular-nums">
                      <div className="p-3 bg-[#f4f4f4] flex justify-between items-center">
                        <div>
                          <div className="font-medium text-[#111111]">1-Hour Flash Pass</div>
                          <div className="text-[13px] text-[#555555]">Queue limit: 6M down / 2M up</div>
                        </div>
                        <div className="text-right font-medium text-[#111111]">₦200</div>
                      </div>
                      <div className="p-3 bg-[#f4f4f4] flex justify-between items-center">
                        <div>
                          <div className="font-medium text-[#111111]">6-Hour Study Pass</div>
                          <div className="text-[13px] text-[#555555]">Queue limit: 8M down / 4M up</div>
                        </div>
                        <div className="text-right font-medium text-[#111111]">���600</div>
                      </div>
                      <div className="p-3 bg-[#f4f4f4] flex justify-between items-center">
                        <div>
                          <div className="font-medium text-[#111111]">24-Hour Unlimited</div>
                          <div className="text-[13px] text-[#555555]">Queue limit: 12M down / 6M up</div>
                        </div>
                        <div className="text-right font-medium text-[#111111]">₦1,500</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-[#555555] text-[13px]">
                      <span>Automated Voucher Dispatch</span>
                      <span className="text-[#1a4be0] font-medium">Webhook Delivered</span>
                    </div>
                    <div className="p-4 bg-[#f4f4f4] space-y-3">
                      <div className="text-center py-2">
                        <div className="text-[13px] text-[#555555] uppercase">Generated Access Voucher</div>
                        <div className="text-[22px] font-medium tracking-widest text-[#111111] tabular-nums mt-1">
                          5 2 9 - 3 1 4
                        </div>
                      </div>
                      <div className="flex justify-between text-[13px] pt-2 text-[#555555] tabular-nums">
                        <span>Duration: 24h Unlimited</span>
                        <span>MAC: 3c:22:fb:80:a1</span>
                      </div>
                      <div className="flex justify-between text-[13px] text-[#555555]">
                        <span>Payment: Card ₦1,500</span>
                        <span className="text-[#1e6b1e] font-medium">Radius Lease Active</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Stage Footer */}
              <div className="text-[13px] text-[#555555] pt-4">
                Scroll through the steps or click a number to see what happens in RouterOS.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
