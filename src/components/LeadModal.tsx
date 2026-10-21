import React, { useState } from 'react';
import { LeadFormData } from '../types';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, defaultPlan }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phone: '',
    businessType: 'Campus / Student Hostel',
    routerCount: '1 - 2 Routers',
    mikrotikModels: 'MikroTik RB4011 / hEX S',
    notes: defaultPlan ? `Selected tier: ${defaultPlan}` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required.';
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      newErrors.phone = 'Valid phone number is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white p-8 my-8 text-[#111111]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#6b6b6b] hover:text-[#111111] text-[14px] cursor-pointer"
          aria-label="Close modal"
        >
          Close
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <h3 className="text-[22px] font-medium text-[#111111] tracking-tight">
                {defaultPlan ? `Connect ${defaultPlan}` : 'Connect your router'}
              </h3>
              <p className="text-[14px] text-[#6b6b6b] mt-1">
                Provide your network specifications to receive a generated RouterOS provisioning script.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Engr. Babatunde Lawal"
                  className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
                />
                {errors.fullName && <p className="text-[12px] text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="operator@campus.edu.ng"
                    className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
                  />
                  {errors.email && <p className="text-[12px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1">
                    WhatsApp or phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 803 000 0000"
                    className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
                  />
                  {errors.phone && <p className="text-[12px] text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1">
                    Network type
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none cursor-pointer"
                  >
                    <option value="Campus / Student Hostel">Campus / Student Hostel</option>
                    <option value="Hotel / Hospitality">Hotel / Hospitality</option>
                    <option value="Internet Café / Hub">Internet Café / Hub</option>
                    <option value="Residential Estate WISP">Residential Estate WISP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#111111] mb-1">
                    MikroTik hardware
                  </label>
                  <select
                    value={formData.mikrotikModels}
                    onChange={(e) => setFormData({ ...formData, mikrotikModels: e.target.value })}
                    className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none cursor-pointer"
                  >
                    <option value="MikroTik RB4011 / RB5009">MikroTik RB4011 / RB5009</option>
                    <option value="MikroTik hEX / hEX S">MikroTik hEX / hEX S</option>
                    <option value="MikroTik CCR Series">MikroTik CCR Series</option>
                    <option value="Cloud Hosted Router (CHR)">Cloud Hosted Router (CHR)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1">
                  Venue notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Estimated concurrent users, upstream speed, or questions..."
                  className="w-full bg-[#f4f4f4] px-3.5 py-2 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary w-full text-[15px] py-3 cursor-pointer"
                >
                  {isSubmitting ? 'Generating configuration...' : 'Request deployment script'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <h3 className="text-[20px] font-medium text-[#111111]">
              Deployment request received
            </h3>
            <p className="text-[15px] text-[#6b6b6b] max-w-sm mx-auto leading-relaxed">
              We have generated your tenant configuration profile. Our network team will reach out via WhatsApp and email with your customized script.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="button-secondary text-[14px] px-6 py-2.5 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
