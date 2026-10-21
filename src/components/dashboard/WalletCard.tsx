import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface WalletCardProps {
  onExploreDetails?: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({ onExploreDetails }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between" data-ui="true">
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[17px] font-semibold text-[#111111] tracking-tight">
            Revenue Overview
          </h2>
          <p className="text-[13px] text-[#666666]">
            Total hotspot earnings
          </p>
        </div>
        <button
          onClick={onExploreDetails}
          className="w-8 h-8 rounded-full bg-[#f4f4f4] hover:bg-[#ebebeb] flex items-center justify-center text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
          title="Inspect revenue details"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Normal Revenue Card (Majal Blue & White, not a VISA credit card) */}
      <div className="w-full bg-gradient-to-br from-[#1a4be0] via-[#1642c5] to-[#0d2a80] text-white rounded-2xl p-6 mb-5 relative overflow-hidden shadow-sm shadow-[#1a4be0]/20">
        {/* Subtle decorative radial glow */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

        {/* Card Header Tag */}
        <div className="flex items-center justify-between mb-3 relative z-10">
          <span className="text-[12px] font-medium tracking-wide text-blue-100 uppercase">
            Total Revenue
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/15 text-white backdrop-blur-xs">
            <TrendingUp size={12} />
            Live Sync
          </span>
        </div>

        {/* Prominent Revenue Balance in Naira */}
        <div className="text-[28px] sm:text-[32px] font-bold tracking-tight text-white mb-2 tabular-nums relative z-10">
          ₦4,850,000.00
        </div>

        {/* Sub-label */}
        <div className="text-[12px] text-blue-100/80 font-normal relative z-10">
          Processed across all MikroTik hotspots & vouchers
        </div>
      </div>

      {/* Footer Stat Row */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="text-[12px] text-[#666666]">
            Weekly Revenue
          </div>
          <div className="text-[18px] font-bold text-[#111111] tabular-nums">
            +₦1,240,000
          </div>
        </div>

        <div className="bg-[#eff6ff] text-[#1a4be0] border border-[#dbeafe] text-[12px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <span>+18.4%</span>
        </div>
      </div>
    </div>
  );
};
