import React, { useState } from 'react';
import { X, Radio } from 'lucide-react';
import { RouterNode } from '../../types/auth';

interface AddRouterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRouter: (router: RouterNode) => void;
}

export const AddRouterModal: React.FC<AddRouterModalProps> = ({
  isOpen,
  onClose,
  onAddRouter,
}) => {
  const [identity, setIdentity] = useState('');
  const [model, setModel] = useState('MikroTik CCR2004-16G-2S+');
  const [ipAddress, setIpAddress] = useState('');
  const [apiPort, setApiPort] = useState(8728);
  const [location, setLocation] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.trim() || !ipAddress.trim() || !location.trim()) {
      setError('Please provide router identity, IP address, and venue location.');
      return;
    }

    setIsTesting(true);
    setError(null);

    // Simulate MikroTik API handshake verification
    setTimeout(() => {
      setIsTesting(false);
      const newRouter: RouterNode = {
        id: `rt-${Date.now()}`,
        identity: identity.trim().toUpperCase(),
        model,
        ipAddress: ipAddress.trim(),
        apiPort: Number(apiPort),
        location: location.trim(),
        activeUsers: Math.floor(Math.random() * 80) + 15,
        cpuLoadPercent: Math.floor(Math.random() * 25) + 10,
        status: 'Online',
        uptime: 'Just provisioned',
      };

      onAddRouter(newRouter);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" data-ui="true">
      <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-[#111111]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#777777] hover:text-[#111111] p-1 cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#e8f5e9] text-[#136c44] flex items-center justify-center shrink-0">
            <Radio size={20} />
          </div>
          <div>
            <h2 className="text-[18px] font-bold tracking-tight text-[#111111]">
              Provision RouterOS Gateway
            </h2>
            <p className="text-[13px] text-[#666666]">
              Add a new MikroTik hardware node to your central cloud fleet.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#fbeae5] text-[#b71c1c] text-[13px] rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[#111111] mb-1">
              Router Identity Name
            </label>
            <input
              type="text"
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              placeholder="e.g. CCR2004-KANO-DISTRO"
              className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-[#111111] mb-1">
                Hardware Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
              >
                <option value="MikroTik CCR2004-16G-2S+">MikroTik CCR2004</option>
                <option value="MikroTik RB5009UG+S+IN">MikroTik RB5009</option>
                <option value="MikroTik hEX S (RB760iGS)">MikroTik hEX S</option>
                <option value="MikroTik CRS328-24P-4S+RM">MikroTik CRS328</option>
                <option value="MikroTik CHR (Cloud Hosted Router)">MikroTik CHR</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#111111] mb-1">
                IP Address / DDNS
              </label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                placeholder="10.0.0.1 or node.sn.mynetname.net"
                className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-medium text-[#111111] mb-1">
                API Port (RouterOS)
              </label>
              <input
                type="number"
                value={apiPort}
                onChange={(e) => setApiPort(Number(e.target.value))}
                className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#111111] mb-1">
                Installation Venue / Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bayero Library Hotspot"
                className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
                required
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isTesting}
              className="w-full bg-[#136c44] hover:bg-[#0f5434] text-white py-3 px-4 rounded-xl text-[14px] font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              {isTesting ? 'Verifying RouterOS API Handshake...' : 'Confirm Gateway Provisioning'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
