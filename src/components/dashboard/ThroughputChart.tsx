import React, { useState } from 'react';
import { ArrowUpRight, BarChart2 } from 'lucide-react';

interface ThroughputChartProps {
  onDetails?: () => void;
}

export const ThroughputChart: React.FC<ThroughputChartProps> = ({ onDetails }) => {
  const [period, setPeriod] = useState<'Monthly' | 'Annually'>('Annually');
  const [activeMonthIndex, setActiveMonthIndex] = useState<number | null>(3); // Default April

  const monthlyData = [
    { month: 'JAN', value: 1.9, label: '1,900 Sessions', throughput: '1.2 Gbps', delta: '+8.4%' },
    { month: 'FEB', value: 3.8, label: '3,800 Sessions', throughput: '2.8 Gbps', delta: '+14.1%' },
    { month: 'MAR', value: 3.1, label: '3,100 Sessions', throughput: '2.4 Gbps', delta: '+11.5%' },
    { month: 'APR', value: 4.9, label: '4,900 Sessions', throughput: '4.8 Gbps', delta: '+17.8%', isPeak: true },
    { month: 'MAY', value: 3.7, label: '3,700 Sessions', throughput: '2.9 Gbps', delta: '+13.2%' },
    { month: 'JUN', value: 3.4, label: '3,400 Sessions', throughput: '2.6 Gbps', delta: '+12.0%' },
  ];

  const yTicks = ['5k', '4k', '3k', '2k', '1k', '0'];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between" data-ui="true">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#f4f4f4] flex items-center justify-center text-[#111111]">
            <BarChart2 size={16} />
          </div>
          <h2 className="text-[17px] font-semibold text-[#111111] tracking-tight">
            Engagement Rate
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle pill */}
          <div className="flex items-center bg-[#f4f4f4] rounded-full p-1 text-[12px]">
            <button
              onClick={() => setPeriod('Monthly')}
              className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                period === 'Monthly'
                  ? 'bg-white text-[#111111] shadow-xs'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('Annually')}
              className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                period === 'Annually'
                  ? 'bg-[#1a4be0] text-white shadow-xs'
                  : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              Annually
            </button>
          </div>

          <button
            onClick={onDetails}
            className="w-8 h-8 rounded-full bg-[#f4f4f4] hover:bg-[#ebebeb] flex items-center justify-center text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
            title="Inspect throughput telemetry"
          >
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Chart Canvas Area */}
      <div className="relative pt-8 pb-2">
        <div className="flex h-56 items-end gap-2 sm:gap-4 pl-8 pr-2">
          
          {/* Y-axis Ticks */}
          <div className="absolute left-0 top-6 bottom-8 flex flex-col justify-between text-[11px] text-[#999999] tabular-nums select-none">
            {yTicks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>

          {/* Subtle horizontal guideline for 5k */}
          <div className="absolute left-8 right-2 top-8 h-[1px] bg-[#f0f0f0] pointer-events-none data-ui" /> {/* taste-skill-ignore */}

          {/* Vertical Bar Columns */}
          {monthlyData.map((d, index) => {
            const heightPercent = (d.value / 5.2) * 100;
            const isSelected = activeMonthIndex === index;
            const isPeak = d.isPeak;

            return (
              <div
                key={d.month}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                onClick={() => setActiveMonthIndex(index)}
              >
                {/* Floating Peak Tooltip Badge */}
                {isPeak && (
                  <div className="absolute -top-7 flex flex-col items-center">
                    <span className="bg-[#1a4be0] text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-xs shadow-[#1a4be0]/30">
                      {d.delta}
                    </span>
                    <span className="w-1.5 h-1.5 bg-[#1a4be0] rotate-45 -mt-0.5" />
                  </div>
                )}

                {/* Bar Pill Container (Majal Blue Palette) */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full max-w-[44px] rounded-full transition-colors duration-200 relative overflow-hidden ${
                    isPeak
                      ? 'bg-[#1a4be0]'
                      : isSelected
                      ? 'bg-[#2563eb]'
                      : 'bg-[#93c5fd] hover:bg-[#60a5fa]'
                  }`}
                />

                {/* X-axis Label */}
                <span className="text-[11px] font-medium text-[#777777] mt-3 group-hover:text-[#111111]">
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Month Summary Row */}
      {activeMonthIndex !== null && (
        <div className="mt-4 pt-3 bg-[#fafafa] p-3 rounded-lg flex items-center justify-between text-[12px] text-[#555555]">
          <div>
            <span className="font-semibold text-[#111111]">
              {monthlyData[activeMonthIndex].month}:
            </span>{' '}
            {monthlyData[activeMonthIndex].label} · {monthlyData[activeMonthIndex].throughput}
          </div>
          <div className="text-[#1a4be0] font-medium">
            Growth {monthlyData[activeMonthIndex].delta}
          </div>
        </div>
      )}
    </div>
  );
};
