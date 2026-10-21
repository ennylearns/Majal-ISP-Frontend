import React from 'react';
import { ArrowUpRight, CreditCard } from 'lucide-react';

interface CreditAndStaffCardProps {
  onExploreStaff?: () => void;
}

export const CreditAndStaffCard: React.FC<CreditAndStaffCardProps> = ({ onExploreStaff }) => {
  const staffAvatars = [
    { name: 'Marcus Adebayo', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { name: 'Tariq Ibrahim', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
    { name: 'Chidinma Okafor', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
    { name: 'Victor Al-Hassan', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between" data-ui="true">
      {/* Top Section: Amount of Credit in Naira */}
      <div>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#f4f4f4] flex items-center justify-center text-[#111111]">
            <CreditCard size={17} />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-[#111111] tracking-tight">
              Amount of credit
            </h2>
            <p className="text-[12px] text-[#666666]">
              Total refund amount with fee
            </p>
          </div>
        </div>

        {/* Big Value + Delta Badge (Naira & Majal Blue) */}
        <div className="flex items-center gap-3 my-2">
          <div className="text-[24px] sm:text-[26px] font-bold text-[#111111] tracking-tight tabular-nums">
            ₦645,800.00
          </div>
          <div className="bg-[#eff6ff] text-[#1a4be0] border border-[#dbeafe] text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
            +12.8%
          </div>
        </div>
      </div>

      {/* Bottom Section: Mandatory Payments / Staff Avatars */}
      <div className="pt-5 mt-4 border-t border-[#f4f4f4] data-ui"> {/* taste-skill-ignore */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-[14px] font-semibold text-[#111111]">
              Mandatory Payments
            </h3>
            <p className="text-[12px] text-[#666666]">
              Recent payments
            </p>
          </div>
          <button
            onClick={onExploreStaff}
            className="w-7 h-7 rounded-full bg-[#f4f4f4] hover:bg-[#ebebeb] flex items-center justify-center text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
            title="Inspect operator roster"
          >
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* 4 Avatars + "+2" Count Pill (Majal Blue) */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex -space-x-2 overflow-hidden">
            {staffAvatars.map((person) => (
              <img
                key={person.name}
                src={person.src}
                alt={person.name}
                title={person.name}
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
              />
            ))}
          </div>

          <div className="w-8 h-8 rounded-full bg-[#1a4be0] text-white flex items-center justify-center text-[12px] font-semibold shadow-xs">
            +2
          </div>
        </div>
      </div>
    </div>
  );
};
