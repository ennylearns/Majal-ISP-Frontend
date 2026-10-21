import React from 'react';
import { ArrowUpRight, ArrowUp, ArrowDown } from 'lucide-react';

interface TrafficSparklineCardProps {
  onSendAction?: () => void;
  onReceiveAction?: () => void;
  onExploreDetails?: () => void;
}

export const TrafficSparklineCard: React.FC<TrafficSparklineCardProps> = ({
  onSendAction,
  onReceiveAction,
  onExploreDetails,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between" data-ui="true">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-[17px] font-semibold text-[#111111] tracking-tight">
            Settlement Balance
          </h2>
          <p className="text-[13px] text-[#666666]">
            Available hotspot balance
          </p>
        </div>
        <button
          onClick={onExploreDetails}
          className="w-8 h-8 rounded-full bg-[#f4f4f4] hover:bg-[#ebebeb] flex items-center justify-center text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
          title="Inspect total balance"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Prominent Balance in Naira */}
      <div className="my-2">
        <div className="text-[28px] sm:text-[30px] font-bold text-[#111111] tracking-tight tabular-nums">
          ₦1,850,000.00
        </div>
      </div>

      {/* Smooth Wavy Line SVG Chart (Majal Blue styling) */}
      <div className="w-full h-24 my-1 relative overflow-hidden">
        <svg 
          viewBox="0 0 300 80" 
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Shaded Area underneath the wave in light blue */}
          <path
            d="M 0 50 Q 30 40, 60 48 T 120 20 T 180 55 T 240 22 T 300 38 L 300 80 L 0 80 Z"
            fill="#eff6ff"
            opacity="0.9"
          />
          {/* Main Majal blue wave curve */}
          <path
            d="M 0 50 Q 30 40, 60 48 T 120 20 T 180 55 T 240 22 T 300 38"
            fill="none"
            stroke="#1a4be0"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Peak indicator dots */}
          <circle cx="120" cy="20" r="3.5" fill="#1a4be0" />
          <circle cx="240" cy="22" r="3.5" fill="#1a4be0" />
        </svg>
      </div>

      {/* Action Buttons: Payout / Receive in Majal Blue */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onSendAction}
          className="flex-1 bg-[#1a4be0] hover:bg-[#153bb5] text-white py-2.5 px-4 rounded-full text-[13px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs shadow-[#1a4be0]/20"
        >
          <span>Send</span>
          <ArrowUp size={14} />
        </button>

        <button
          type="button"
          onClick={onReceiveAction}
          className="flex-1 bg-[#f4f4f4] hover:bg-[#ebebeb] text-[#111111] py-2.5 px-4 rounded-full text-[13px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Receive</span>
          <ArrowDown size={14} />
        </button>
      </div>
    </div>
  );
};
