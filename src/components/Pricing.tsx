import React from 'react';
import { Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import PixelCard from './PixelCard';

interface PricingProps {
  onOpenLeadModal: (planName: string) => void;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  isPopular?: boolean;
  desc: string;
  benefits: string[];
  buttonText: string;
  pixelVariant: 'default' | 'blue';
  theme: 'dark' | 'light';
}

export const Pricing: React.FC<PricingProps> = ({ onOpenLeadModal }) => {
  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter Gateway',
      price: '12,000',
      period: '/ month',
      isPopular: false,
      desc: 'Essential cloud billing & hotspot management for solo venues and new operators.',
      benefits: [
        'Up to 2 connected MikroTik routers',
        '250 active concurrent subscribers',
        'Captive billing portal & splash engine',
        'Instant USSD & mobile money webhooks',
        'Automated PDF & thermal voucher generation',
        'Real-time traffic monitoring & session logs',
        'Standard email & community support'
      ],
      buttonText: 'Select Starter Gateway',
      pixelVariant: 'default',
      theme: 'light'
    },
    {
      id: 'growth',
      name: 'Growth Fleet',
      price: '35,000',
      period: '/ month',
      badge: 'MOST POPULAR',
      isPopular: true,
      desc: 'Designed for scaling ISPs, commercial plazas, and multi-location hotspot networks.',
      benefits: [
        'Up to 8 connected MikroTik routers',
        '1,500 active concurrent subscribers',
        'Multi-location centralized accounting',
        'Dynamic queue shaping & burst QoS',
        'Automated SMS & WhatsApp voucher delivery',
        'Sub-second connection heartbeat telemetry',
        'Multi-gateway automatic failover',
        'Priority WhatsApp & network engineer support'
      ],
      buttonText: 'Deploy Growth Fleet',
      pixelVariant: 'blue',
      theme: 'dark'
    },
    {
      id: 'campus',
      name: 'Campus Fleet',
      price: '95,000',
      period: '/ month',
      badge: 'HIGH CAPACITY',
      isPopular: false,
      desc: 'High-density infrastructure for universities, enterprise hotels, and municipal WISPs.',
      benefits: [
        'Up to 25 connected MikroTik routers',
        '5,000 active concurrent subscribers',
        'High-availability distributed RADIUS sync',
        'Sub-second live telemetry & Prometheus export',
        'Priority webhook delivery & REST API',
        'Dedicated bandwidth pool partitioning',
        'White-label captive portal branding',
        '24/7 SLA & dedicated account engineer'
      ],
      buttonText: 'Select Campus Fleet',
      pixelVariant: 'default',
      theme: 'light'
    }
  ];

  return (
    <section id="pricing-menu" className="py-24 bg-[#fafafa] border-t border-[#e5e7eb] px-6 lg:px-12 relative overflow-hidden">
      {/* Background subtle ambiance */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header: Clean, confident, noise-free */}
        <div data-rise style={{ '--i': 0 } as React.CSSProperties} className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e5e7eb] text-[12px] font-medium tracking-wide uppercase text-[#555555] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a4be0] animate-pulse" />
            Simple monthly plans
          </div>
          <h2 className="text-[clamp(28px,3.2vw,42px)] font-medium text-[#111111] tracking-[-0.03em] leading-tight">
            Plans that scale with your network.
          </h2>
          <p className="text-[16px] text-[#555555] leading-relaxed">
            Pay a flat monthly subscription. You keep every voucher payment in your own settlement account.
          </p>
        </div>

        {/* 3 Different Cards on the Same Horizontal Line */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const isCenter = plan.isPopular;

            return (
              <div
                key={plan.id}
                data-rise
                style={{ '--i': idx + 1 } as React.CSSProperties}
                className={`relative flex flex-col ${isCenter ? 'md:-translate-y-3 z-10' : 'z-0'}`}
              >
                {/* Most Popular Floating Pill */}
                {isCenter && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#1a4be0] text-white shadow-md shadow-[#1a4be0]/30 border border-[#3b6df7]">
                      <Sparkles className="w-3 h-3 text-white" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* PixelCard Animation Container */}
                <PixelCard
                  variant={plan.pixelVariant}
                  theme={plan.theme}
                  radius={20}
                  speed={isCenter ? 35 : 25}
                  spotlight={isCenter ? 0.65 : 0.4}
                  glow={isCenter ? 0.65 : 0.35}
                  className={`w-full h-full flex flex-col justify-between ${
                    isCenter
                      ? 'bg-[#0d121f] text-white border-2 border-[#1a4be0] shadow-xl shadow-[#1a4be0]/10 hover:shadow-2xl hover:shadow-[#1a4be0]/20'
                      : 'bg-white text-[#111111] border border-[#e5e7eb] shadow-sm hover:shadow-xl hover:border-[#cbd5e1]'
                  }`}
                >
                  <div className="p-7 lg:p-8 flex flex-col flex-1 justify-between">
                    {/* Card Header */}
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <h3 className={`text-[20px] font-semibold tracking-[-0.01em] ${isCenter ? 'text-white' : 'text-[#111111]'}`}>
                          {plan.name}
                        </h3>
                        {!isCenter && plan.badge && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-medium tracking-wide uppercase bg-[#f4f4f4] text-[#666666] border border-[#e5e5e5]">
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <p className={`text-[13.5px] leading-snug min-h-[38px] ${isCenter ? 'text-[#94a3b8]' : 'text-[#666666]'}`}>
                        {plan.desc}
                      </p>

                      {/* Price Section */}
                      <div className="mt-5 mb-6 pb-6 border-b border-dashed border-[#e5e7eb] dark:border-[#1e293b]" style={{ borderColor: isCenter ? '#1e293b' : '#e5e7eb' }}>
                        <div className="flex items-baseline gap-1.5">
                          <span className={`text-[17px] font-semibold ${isCenter ? 'text-[#94a3b8]' : 'text-[#666666]'}`}>
                            ₦
                          </span>
                          <span className={`text-[36px] lg:text-[40px] font-bold tracking-tight tabular-nums ${isCenter ? 'text-white' : 'text-[#111111]'}`}>
                            {plan.price}
                          </span>
                          <span className={`text-[13.5px] font-normal ${isCenter ? 'text-[#94a3b8]' : 'text-[#666666]'}`}>
                            {plan.period}
                          </span>
                        </div>
                      </div>

                      {/* Benefits Section: Checkmarks in vertical order */}
                      <div className="space-y-3.5 mb-8">
                        <div className={`text-[11.5px] font-semibold tracking-wider uppercase ${isCenter ? 'text-[#38bdf8]' : 'text-[#1a4be0]'}`}>
                          What&apos;s included:
                        </div>
                        <ul className="space-y-3">
                          {plan.benefits.map((benefit, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-3">
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                  isCenter
                                    ? 'bg-[#1a4be0]/25 text-[#38bdf8] border border-[#1a4be0]/50'
                                    : 'bg-[#f0fdf4] text-[#16a34a] border border-[#bbf7d0]'
                                }`}
                              >
                                <Check className="w-3 h-3 stroke-[2.8]" />
                              </div>
                              <span className={`text-[14px] leading-tight ${isCenter ? 'text-[#e2e8f0]' : 'text-[#374151]'}`}>
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action CTA Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => onOpenLeadModal(plan.name)}
                        className={`w-full py-3.5 px-4 rounded-xl font-medium text-[15px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isCenter
                            ? 'bg-[#1a4be0] text-white hover:bg-[#1640c4] active:scale-[0.98] shadow-lg shadow-[#1a4be0]/30 hover:shadow-[#1a4be0]/50 font-semibold'
                            : 'bg-[#111111] text-white hover:bg-[#222222] active:scale-[0.98] shadow-xs'
                        }`}
                      >
                        <span>{plan.buttonText}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>

                  </div>
                </PixelCard>
              </div>
            );
          })}
        </div>

        {/* Quiet assurance footer */}
        <div data-rise style={{ '--i': 4 } as React.CSSProperties} className="mt-14 pt-8 border-t border-[#e5e7eb] flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-[13px] text-[#666666]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
            <span>Zero voucher commission</span>
          </div>
          <span className="hidden sm:inline text-[#d1d5db]">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
            <span>Sub-second RouterOS sync</span>
          </div>
          <span className="hidden sm:inline text-[#d1d5db]">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#16a34a]" />
            <span>Instant deployment & cancel anytime</span>
          </div>
        </div>

      </div>
    </section>
  );
};
