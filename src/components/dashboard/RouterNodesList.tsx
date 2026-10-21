import React from 'react';
import { Plus, Radio, Server, Activity, ShieldCheck } from 'lucide-react';
import { RouterNode } from '../../types/auth';

interface RouterNodesListProps {
  routers: RouterNode[];
  onOpenAddRouter: () => void;
}

export const RouterNodesList: React.FC<RouterNodesListProps> = ({
  routers,
  onOpenAddRouter,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs" data-ui="true">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-[18px] font-bold text-[#111111] tracking-tight flex items-center gap-2">
            <Radio size={20} className="text-[#1a4be0]" />
            <span>MikroTik Hardware Gateway Fleet</span>
          </h2>
          <p className="text-[13px] text-[#666666]">
            Active RouterOS nodes synchronizing live bandwidth, hotspot leases, and RADIUS accounting.
          </p>
        </div>

        <button
          onClick={onOpenAddRouter}
          className="bg-[#1a4be0] hover:bg-[#153bb5] text-white px-4 py-2 rounded-full text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-xs shadow-[#1a4be0]/20"
        >
          <Plus size={16} />
          <span>Add Router Gateway</span>
        </button>
      </div>

      {/* Grid of Router Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routers.map((router) => (
          <div
            key={router.id}
            className="p-4 rounded-xl bg-[#f8f9fa] hover:bg-[#f1f3f5] transition-colors border-none"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111111] text-[15px]">
                    {router.identity}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#1a4be0]" />
                </div>
                <div className="text-[12px] text-[#555555]">
                  {router.model} · {router.location}
                </div>
              </div>

              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#1a4be0] border border-[#dbeafe]">
                {router.status}
              </span>
            </div>

            {/* IP and Ports */}
            <div className="flex items-center gap-4 text-[12px] text-[#666666] my-3 tabular-nums">
              <div className="flex items-center gap-1">
                <Server size={13} />
                <span>{router.ipAddress}:{router.apiPort}</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-[#1a4be0]" />
                <span>API TLS</span>
              </div>
              <div className="text-[11px] text-[#888888]">
                Up: {router.uptime}
              </div>
            </div>

            {/* Performance Bar (CPU and Users) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] text-[#555555]">
                <span>Active Leases: <strong className="text-[#111111]">{router.activeUsers}</strong></span>
                <span>CPU Load: <strong className="text-[#111111]">{router.cpuLoadPercent}%</strong></span>
              </div>
              <div className="w-full bg-[#e0e0e0] h-1.5 rounded-full overflow-hidden">
                <div
                  style={{ width: `${router.cpuLoadPercent}%` }}
                  className={`h-full rounded-full ${
                    router.cpuLoadPercent > 70 ? 'bg-[#b71c1c]' : 'bg-[#1a4be0]'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
