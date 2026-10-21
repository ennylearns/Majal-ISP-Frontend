import React, { useState } from 'react';
import { Wifi, Plus, Trash2, CheckCircle2, Eye, ShieldCheck, Smartphone, Laptop, Sparkles, X } from 'lucide-react';
import { WifiPlan } from '../../types/auth';

interface WifiPlansSectionProps {
  plans: WifiPlan[];
  onAddPlan: (plan: WifiPlan) => void;
  onTogglePlan: (id: string) => void;
  onDeletePlan: (id: string) => void;
}

export const WifiPlansSection: React.FC<WifiPlansSectionProps> = ({
  plans,
  onAddPlan,
  onTogglePlan,
  onDeletePlan,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // New plan form state
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('3 Days');
  const [priceNgn, setPriceNgn] = useState(2500);
  const [speedLimit, setSpeedLimit] = useState('10 Mbps');
  const [deviceLimit, setDeviceLimit] = useState(2);
  const [dataLimit, setDataLimit] = useState('Unlimited');
  const [isPopular, setIsPopular] = useState(false);

  const handleSubmitNewPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPlan: WifiPlan = {
      id: `plan-${Date.now()}`,
      name: name.trim(),
      duration: duration.trim(),
      priceNgn: Number(priceNgn),
      speedLimit: speedLimit.trim(),
      deviceLimit: Number(deviceLimit),
      dataLimit: dataLimit.trim(),
      isPopular,
      isActive: true,
      description: `${duration} high-speed Wi-Fi with ${speedLimit} bandwidth`,
    };

    onAddPlan(newPlan);
    setIsAddModalOpen(false);
    // Reset form
    setName('');
    setPriceNgn(2500);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xs flex flex-col justify-between" data-ui="true">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#1a4be0] border border-[#dbeafe] flex items-center justify-center shrink-0">
            <Wifi size={18} />
          </div>
          <div>
            <h2 className="text-[17px] font-semibold text-[#111111] tracking-tight flex items-center gap-2">
              <span>Customer Wi-Fi Tariff Plans</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#1a4be0] border border-[#dbeafe]">
                Captive Portal
              </span>
            </h2>
            <p className="text-[12.5px] text-[#666666]">
              Plans displayed to hotspot guests on the captive login screen.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="bg-[#f4f4f4] hover:bg-[#ebebeb] text-[#111111] px-3.5 py-1.5 rounded-full text-[12.5px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Preview how plans appear to hotspot customers"
          >
            <Eye size={14} className="text-[#1a4be0]" />
            <span>Preview Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#1a4be0] hover:bg-[#153bb5] text-white px-3.5 py-1.5 rounded-full text-[12.5px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs shadow-[#1a4be0]/20"
          >
            <Plus size={14} />
            <span>Create Plan</span>
          </button>
        </div>
      </div>

      {/* Plans Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
              plan.isActive
                ? 'bg-[#fcfdfd] border-[#e2e8f0] hover:border-[#1a4be0]/40 shadow-xs'
                : 'bg-[#f8f9fa] border-dashed border-[#d1d5db] opacity-60'
            }`}
          >
            {/* Top row: Duration Badge & Popular indicator */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#eff6ff] text-[#1a4be0]">
                {plan.duration}
              </span>

              {plan.isPopular && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1a4be0] text-white">
                  <Sparkles size={10} />
                  Best Value
                </span>
              )}
            </div>

            {/* Plan Name & Price */}
            <div>
              <div className="text-[15px] font-bold text-[#111111] mb-1">
                {plan.name}
              </div>
              <div className="text-[22px] font-extrabold text-[#111111] tracking-tight tabular-nums mb-2">
                ₦{plan.priceNgn.toLocaleString('en-NG')}
                <span className="text-[12px] font-normal text-[#666666] ml-1">/ pass</span>
              </div>
            </div>

            {/* Plan Specs */}
            <div className="space-y-1.5 text-[12px] text-[#555555] py-2 border-t border-[#f1f3f5] my-1">
              <div className="flex justify-between">
                <span>Speed:</span>
                <strong className="text-[#111111] font-medium">{plan.speedLimit}</strong>
              </div>
              <div className="flex justify-between">
                <span>Devices:</span>
                <strong className="text-[#111111] font-medium">{plan.deviceLimit} Device{plan.deviceLimit > 1 ? 's' : ''}</strong>
              </div>
              <div className="flex justify-between">
                <span>Data Quota:</span>
                <strong className="text-[#1a4be0] font-medium">{plan.dataLimit}</strong>
              </div>
            </div>

            {/* Controls: Active Toggle & Delete */}
            <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#f1f3f5]">
              <button
                type="button"
                onClick={() => onTogglePlan(plan.id)}
                className={`text-[11.5px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors ${
                  plan.isActive
                    ? 'bg-[#eff6ff] text-[#1a4be0] hover:bg-[#dbeafe]'
                    : 'bg-[#f0f0f0] text-[#777777] hover:bg-[#e4e4e4]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${plan.isActive ? 'bg-[#1a4be0]' : 'bg-[#999999]'}`} />
                <span>{plan.isActive ? 'Active on Portal' : 'Paused'}</span>
              </button>

              <button
                type="button"
                onClick={() => onDeletePlan(plan.id)}
                className="text-[#999999] hover:text-[#b71c1c] p-1.5 rounded-md hover:bg-[#fbeae5] transition-colors cursor-pointer"
                title="Remove plan"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create New Wi-Fi Plan */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative animate-in fade-in duration-150">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-[#888888] hover:text-[#111111] p-1.5 rounded-full hover:bg-[#f4f4f4] cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1a4be0] border border-[#dbeafe] flex items-center justify-center shrink-0">
                <Wifi size={20} />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#111111]">
                  Create Customer Wi-Fi Plan
                </h3>
                <p className="text-[12.5px] text-[#666666]">
                  Configure tariff, duration and bandwidth limits.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitNewPlan} className="space-y-3.5">
              <div>
                <label className="block text-[12.5px] font-medium text-[#111111] mb-1">
                  Plan Display Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 3-Days Conference Pass"
                  className="w-full bg-[#f4f4f4] px-3.5 py-2 text-[13.5px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-medium text-[#111111] mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 3 Days"
                    className="w-full bg-[#f4f4f4] px-3.5 py-2 text-[13.5px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[12.5px] font-medium text-[#111111] mb-1">
                    Price in Naira (₦)
                  </label>
                  <input
                    type="number"
                    value={priceNgn}
                    onChange={(e) => setPriceNgn(Number(e.target.value))}
                    className="w-full bg-[#f4f4f4] px-3.5 py-2 text-[13.5px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
                    required
                    min={50}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-medium text-[#111111] mb-1">
                    Bandwidth / Speed Limit
                  </label>
                  <select
                    value={speedLimit}
                    onChange={(e) => setSpeedLimit(e.target.value)}
                    className="w-full bg-[#f4f4f4] px-3.5 py-2 text-[13.5px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
                  >
                    <option value="3 Mbps">3 Mbps (Standard)</option>
                    <option value="5 Mbps">5 Mbps (Fast)</option>
                    <option value="8 Mbps">8 Mbps (Ultra)</option>
                    <option value="15 Mbps">15 Mbps (Gigabit Tier)</option>
                    <option value="25 Mbps">25 Mbps (Executive)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12.5px] font-medium text-[#111111] mb-1">
                    Simultaneous Devices
                  </label>
                  <select
                    value={deviceLimit}
                    onChange={(e) => setDeviceLimit(Number(e.target.value))}
                    className="w-full bg-[#f4f4f4] px-3.5 py-2 text-[13.5px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
                  >
                    <option value={1}>1 Device</option>
                    <option value={2}>2 Devices</option>
                    <option value={3}>3 Devices</option>
                    <option value={5}>5 Devices</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-medium text-[#111111] mb-1">
                  Data Quota
                </label>
                <input
                  type="text"
                  value={dataLimit}
                  onChange={(e) => setDataLimit(e.target.value)}
                  placeholder="Unlimited or e.g. 10 GB"
                  className="w-full bg-[#f4f4f4] px-3.5 py-2 text-[13.5px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="accent-[#1a4be0] rounded"
                />
                <label htmlFor="isPopular" className="text-[12.5px] text-[#444444] cursor-pointer">
                  Mark as 'Best Value' highlighted plan
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1a4be0] hover:bg-[#153bb5] text-white py-2.5 px-4 rounded-xl text-[13.5px] font-medium transition-colors cursor-pointer shadow-xs shadow-[#1a4be0]/20"
                >
                  Save & Broadcast Plan to Captive Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Customer Captive Portal Preview */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            {/* Phone/Device Header Bar */}
            <div className="bg-[#111827] text-white px-5 py-3 flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-1.5 opacity-80">
                <Smartphone size={13} />
                <span>Customer Mobile View · Majal Hotspot</span>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-white/70 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Captive Portal Screen Content */}
            <div className="p-6 bg-[#f8fafc] text-center max-h-[80vh] overflow-y-auto">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1a4be0] text-white mb-3 shadow-md shadow-[#1a4be0]/30">
                <Wifi size={24} />
              </div>
              <h4 className="text-[18px] font-bold text-[#0f172a] tracking-tight">
                Welcome to Majal High-Speed Wi-Fi
              </h4>
              <p className="text-[12.5px] text-[#64748b] mb-5">
                Select an internet pass to connect instantly to the internet.
              </p>

              {/* Customer Plan Selection List */}
              <div className="space-y-3 text-left mb-5">
                {plans
                  .filter((p) => p.isActive)
                  .map((p) => (
                    <div
                      key={p.id}
                      className={`p-3.5 rounded-xl border bg-white flex items-center justify-between transition-all hover:border-[#1a4be0] hover:shadow-sm ${
                        p.isPopular ? 'border-[#1a4be0] ring-1 ring-[#1a4be0]/30' : 'border-[#e2e8f0]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[14px] text-[#0f172a]">{p.name}</span>
                          {p.isPopular && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#1a4be0] text-white">
                              HOT
                            </span>
                          )}
                        </div>
                        <div className="text-[11.5px] text-[#64748b]">
                          {p.speedLimit} · {p.deviceLimit} Device{p.deviceLimit > 1 ? 's' : ''} · {p.dataLimit}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[16px] font-extrabold text-[#1a4be0] tabular-nums">
                          ₦{p.priceNgn.toLocaleString('en-NG')}
                        </div>
                        <span className="text-[11px] text-[#94a3b8]">One-time</span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Mock Instant Pay button */}
              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full bg-[#1a4be0] text-white py-3 px-4 rounded-xl text-[14px] font-semibold hover:bg-[#153bb5] transition-colors shadow-sm shadow-[#1a4be0]/30 cursor-pointer"
                >
                  Pay with Paystack / Card (₦)
                </button>
                <button
                  type="button"
                  className="w-full bg-white border border-[#cbd5e1] text-[#334155] py-2.5 px-4 rounded-xl text-[13px] font-medium hover:bg-[#f1f5f9] transition-colors cursor-pointer"
                >
                  Have a Voucher Code? Enter Here
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#94a3b8] mt-4">
                <ShieldCheck size={13} className="text-[#1a4be0]" />
                <span>Protected by Majal RADIUS Enterprise Firewall</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
