import React from 'react';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      q: 'What is MAJAL ISP?',
      a: 'A cloud software platform for Wi-Fi network operators. We provide the management console, RADIUS authentication, and captive billing engine that enables operators, campuses, and hotels to monetize their existing MikroTik infrastructure without manual voucher entry.',
    },
    {
      q: 'Does it support both RouterOS v6 and v7?',
      a: 'Yes. The engine has been validated across both RouterOS v6.48 (long-term release) and RouterOS v7.14+. It runs natively on hEX, hAP, RB series, Cloud Core Routers (CCR), and Cloud Hosted Router (CHR) virtual appliances.',
    },
    {
      q: 'How does the router pair with the cloud engine?',
      a: 'You paste a generated configuration script into RouterOS Terminal. The router initiates an outbound encrypted tunnel or standard RADIUS socket. It functions behind carrier-grade NAT with no public IP address or open inbound management ports required.',
    },
    {
      q: 'Can multiple branches run from a single account?',
      a: 'Yes. You can manage multiple routers distributed across disparate campuses, hotels, or cafe branches under a single tenant, with independent tariff plans and segregated location telemetry.',
    },
    {
      q: 'How do customers purchase Wi-Fi access at the venue?',
      a: 'When patrons connect to your SSID, the router redirects them to your captive landing page. They select a tariff pass, enter their phone number, and complete payment via card, bank transfer, or USSD.',
    },
    {
      q: 'How are subscription payments authenticated before access unlocks?',
      a: 'Transactions are verified server-side through cryptographically authenticated webhooks. Internet access is only granted once confirmation of funds arrives, triggering immediate RADIUS authorization on the router.',
    },
    {
      q: 'What happens when a customer quota expires?',
      a: 'Session duration and byte quotas are tracked continuously. Upon quota exhaustion, the router terminates the session automatically and returns the subscriber to the captive renewal screen.',
    },
    {
      q: 'Can the captive portal carry our venue branding?',
      a: 'Yes. Operators can configure custom business names, color themes, support contacts, and venue logos on their captive portals.',
    },
    {
      q: 'What happens if venue upstream internet connectivity drops?',
      a: 'Active subscriber leases remain cached in the router RAM table so connected users are not kicked off. Once the link recovers, the router synchronizes accounting telemetry automatically.',
    },
    {
      q: 'What are the hardware memory and CPU requirements?',
      a: 'Small venues run smoothly on a 256 MB hEX S. Larger campuses with over a thousand concurrent users benefit from a quad-core RB4011 or CCR2004 with 1 GB or more RAM.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Columns 1–3: Heading */}
          <div data-rise style={{ '--i': 0 } as React.CSSProperties} className="lg:col-span-4 text-left">
            <h2 className="text-[clamp(26px,2.2vw,30px)] font-medium text-[#111111] tracking-[-0.02em] leading-tight">
              Common questions.
            </h2>
            <p className="text-[16px] text-[#111111] mt-3 leading-[1.5]">
              Straightforward answers about setup, payments, hardware, and day-to-day network management.
            </p>
          </div>

          {/* Columns 5–12: Continuous Reading Text in Two Columns */}
          <div className="lg:col-span-8 lg:columns-2 gap-14 space-y-6 text-[16px] leading-[1.55]">
            {faqs.map((item, idx) => (
              <p
                key={idx}
                data-rise
                style={{ '--i': idx + 1 } as React.CSSProperties}
                className="text-[#111111] break-inside-avoid text-balance"
              >
                <span className="font-medium text-[#111111] mr-1.5">
                  {item.q}
                </span>
                <span className="text-[#333333]">
                  {item.a}
                </span>
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
