import React from 'react';

export const Footer: React.FC<{ onOpenLeadModal: () => void }> = () => {
  return (
    <footer className="bg-white px-6 lg:px-12 pt-12 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* The single quiet line: 3-column grid (1fr auto 1fr) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 text-[14px]">
          
          {/* Left margin: Brand & Logo */}
          <div className="flex items-center gap-3 text-left">
            <img 
              src="/assets/majal-logo.jpg" 
              alt="MAJAL ISP Logo" 
              className="h-8 w-auto object-contain"
            />
            <span className="text-[#555555] text-[14px]">
              MAJAL ISP. Simple Wi-Fi billing for RouterOS.
            </span>
          </div>

          {/* Centered: 2 to 5 links separated by 24px of space */}
          <div className="flex flex-wrap items-center justify-start md:justify-center gap-6">
            <a href="#console" className="text-[#111111] hover:underline">
              Instrumentation
            </a>
            <a href="#features-matrix" className="text-[#111111] hover:underline">
              Architecture
            </a>
            <a href="#hardware-spec" className="text-[#111111] hover:underline">
              Hardware
            </a>
            <a href="#pricing-menu" className="text-[#111111] hover:underline">
              Tariffs
            </a>
            <a href="#faq" className="text-[#111111] hover:underline">
              Manual
            </a>
          </div>

          {/* Right margin: Year and privacy link */}
          <div className="text-[#555555] text-left md:text-right">
            <span>© 2026 MAJAL Systems · </span>
            <span className="text-[#111111]">Privacy</span>
          </div>
        </div>

        {/* Required Open Collection Photography Credit Line */}
        <div className="mt-8 pt-4 text-[13px] text-[#555555] leading-relaxed">
          <p>
            Pictures: <a href="https://commons.wikimedia.org/w/index.php?curid=10861456" className="text-[#111111] underline">“Parabolic antennas on a telecommunications tower on Willans Hill”</a> by Bidgee, <a href="https://creativecommons.org/licenses/by-sa/2.5/au/deed.en/" className="text-[#111111] underline">CC BY-SA 2.5</a>, via Wikimedia Commons; <a href="https://commons.wikimedia.org/wiki/File:Vodno_Telecommunication_Tower_Skopje_2.jpg" className="text-[#111111] underline">“Vodno Telecommunication Tower Skopje 2”</a> by kallerna, <a href="https://creativecommons.org/licenses/by-sa/4.0" className="text-[#111111] underline">CC BY-SA 4.0</a>, via Wikimedia Commons; <a href="https://commons.wikimedia.org/w/index.php?curid=79709434" className="text-[#111111] underline">“Fiber Optical Cable”</a> by chaitawat, CC0, via Wikimedia Commons; <a href="https://commons.wikimedia.org/w/index.php?curid=176348830" className="text-[#111111] underline">“Map of African Undersea Fiber Optic Cables”</a> by Steve Song, CC BY-SA 4.0.
          </p>
        </div>
      </div>
    </footer>
  );
};
