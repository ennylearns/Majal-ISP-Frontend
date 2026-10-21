import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HotspotTransaction } from '../../types/auth';

interface PaymentHistoryTableProps {
  transactions: HotspotTransaction[];
  searchQuery?: string;
  onViewAll?: () => void;
}

export const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({
  transactions,
  searchQuery = '',
  onViewAll,
}) => {
  const filtered = transactions.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.planName.toLowerCase().includes(q) ||
      t.date.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs" data-ui="true">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-[17px] font-semibold text-[#111111] tracking-tight">
            Payment History
          </h2>
          <p className="text-[13px] text-[#666666]">
            Recent payments history
          </p>
        </div>
        <button
          onClick={onViewAll}
          className="w-8 h-8 rounded-full bg-[#f4f4f4] hover:bg-[#ebebeb] flex items-center justify-center text-[#555555] hover:text-[#111111] transition-colors cursor-pointer"
          title="View all transactions"
        >
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px] border-collapse">
          <thead>
            <tr className="text-[#888888] font-normal">
              <th className="pb-3 pt-1 px-3 font-normal">Name</th>
              <th className="pb-3 pt-1 px-3 font-normal">Date</th>
              <th className="pb-3 pt-1 px-3 font-normal">Time</th>
              <th className="pb-3 pt-1 px-3 font-normal">Status</th>
              <th className="pb-3 pt-1 px-3 font-normal text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 5).map((item) => (
              <tr key={item.id} className="hover:bg-[#fafafa] transition-colors">
                {/* Brand / Customer */}
                <td className="py-3.5 pr-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#f4f4f4] flex items-center justify-center text-[12px] font-bold text-[#111111] shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-[#111111]">{item.name}</div>
                      <div className="text-[11px] text-[#2e7d32] font-medium">+12.2%</div>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3.5 pr-3 text-[#555555] whitespace-nowrap">
                  {item.date}
                </td>

                {/* Time */}
                <td className="py-3.5 pr-3 text-[#555555] whitespace-nowrap tabular-nums">
                  {item.time}
                </td>

                {/* Status Dot */}
                <td className="py-3.5 pr-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#136c44]" />
                    <span className="text-[#136c44] font-medium text-[12px]">
                      {item.status}
                    </span>
                  </div>
                </td>

                {/* Amount */}
                <td className="py-3.5 text-right font-medium text-[#111111] tabular-nums whitespace-nowrap">
                  {item.amountNgn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
