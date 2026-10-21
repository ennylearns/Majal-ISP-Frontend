import React, { useState } from 'react';
import { X, Ticket, Check, Printer } from 'lucide-react';

interface GenerateVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVouchersGenerated?: (amount: number, count: number) => void;
}

export const GenerateVoucherModal: React.FC<GenerateVoucherModalProps> = ({
  isOpen,
  onClose,
  onVouchersGenerated,
}) => {
  const [profile, setProfile] = useState('24h Unlimited Pass');
  const [quantity, setQuantity] = useState(20);
  const [unitPrice, setUnitPrice] = useState(500);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const codes: string[] = [];
    for (let i = 0; i < quantity; i++) {
      const code = `MJL-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
      codes.push(code);
    }
    setGeneratedCodes(codes);
    setIsGenerated(true);

    if (onVouchersGenerated) {
      onVouchersGenerated(quantity * unitPrice, quantity);
    }
  };

  const handleCopyCodes = () => {
    navigator.clipboard.writeText(generatedCodes.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setIsGenerated(false);
    setGeneratedCodes([]);
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
            <Ticket size={20} />
          </div>
          <div>
            <h2 className="text-[18px] font-bold tracking-tight text-[#111111]">
              Generate Wi-Fi Hotspot Vouchers
            </h2>
            <p className="text-[13px] text-[#666666]">
              Issue instant cryptographic RADIUS login vouchers for venue visitors.
            </p>
          </div>
        </div>

        {!isGenerated ? (
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-[#111111] mb-1">
                Bandwidth & Duration Tariff
              </label>
              <select
                value={profile}
                onChange={(e) => {
                  setProfile(e.target.value);
                  if (e.target.value.includes('1h')) setUnitPrice(100);
                  else if (e.target.value.includes('24h')) setUnitPrice(500);
                  else if (e.target.value.includes('7-Day')) setUnitPrice(2500);
                  else setUnitPrice(8500);
                }}
                className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
              >
                <option value="1h High-Speed Pass (5 Mbps)">1 Hour Pass (₦100)</option>
                <option value="24h Unlimited Pass">24 Hours Unlimited (₦500)</option>
                <option value="7-Day Executive Student Tier">7 Days Campus Pass (₦2,500)</option>
                <option value="30-Day Monthly Residential">30 Days High Speed (₦8,500)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1">
                  Voucher Batch Count
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
                >
                  <option value={10}>10 Vouchers</option>
                  <option value={20}>20 Vouchers</option>
                  <option value={50}>50 Vouchers</option>
                  <option value={100}>100 Vouchers</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1">
                  Price Per Voucher (₦)
                </label>
                <input
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                  className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] rounded-lg focus:outline-none focus:bg-[#ebebeb]"
                  required
                />
              </div>
            </div>

            <div className="p-3 bg-[#f8f9fa] rounded-xl text-[13px] text-[#555555] flex justify-between items-center">
              <span>Projected batch revenue:</span>
              <span className="font-bold text-[#111111] tabular-nums">
                ₦{(quantity * unitPrice).toLocaleString()}
              </span>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full bg-[#136c44] hover:bg-[#0f5434] text-white py-3 px-4 rounded-xl text-[14px] font-medium transition-colors cursor-pointer"
              >
                Generate & Sync with MikroTik RADIUS
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-[#e8f5e9] text-[#136c44] rounded-xl text-[13px] font-medium flex items-center justify-between">
              <span>Successfully generated {generatedCodes.length} vouchers!</span>
              <Check size={16} />
            </div>

            <div className="max-h-48 overflow-y-auto bg-[#f8f9fa] p-3 rounded-xl grid grid-cols-2 gap-2 text-[12px] font-medium text-[#111111] tabular-nums">
              {generatedCodes.map((code, idx) => (
                <div key={idx} className="bg-white p-2 rounded-lg text-center shadow-2xs">
                  {code}
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleCopyCodes}
                className="flex-1 bg-[#111111] hover:bg-[#222222] text-white py-2.5 rounded-xl text-[13px] font-medium transition-colors cursor-pointer"
              >
                {copied ? 'Codes Copied!' : 'Copy Code List'}
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-1.5 px-4 bg-[#f4f4f4] hover:bg-[#ebebeb] text-[#111111] py-2.5 rounded-xl text-[13px] font-medium transition-colors cursor-pointer"
              >
                <Printer size={15} />
                <span>Print</span>
              </button>
            </div>

            <button
              onClick={handleReset}
              className="w-full text-center text-[13px] text-[#555555] hover:text-[#111111] py-1 cursor-pointer"
            >
              Generate Another Batch
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
