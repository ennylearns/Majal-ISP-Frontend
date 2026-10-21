import React, { useState } from 'react';
import { RegisteredAccount } from '../types/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (account: RegisteredAccount) => void;
  onAccountNotFound: (email: string) => void;
  onOpenFullAuth: () => void;
  accounts: RegisteredAccount[];
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
  onAccountNotFound,
  onOpenFullAuth,
  accounts,
}) => {
  const [email, setEmail] = useState('admin@majalisp.com');
  const [password, setPassword] = useState('password123');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('Verifying credentials against MAJAL RADIUS...');

    setTimeout(() => {
      const clean = email.trim().toLowerCase();
      const match = accounts.find((a) => a.email.toLowerCase() === clean);

      onClose();
      if (!match) {
        onAccountNotFound(email.trim());
      } else {
        onSuccessLogin(match);
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" data-ui="true">
      <div className="relative w-full max-w-md bg-white p-8 text-[#111111]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#6b6b6b] hover:text-[#111111] text-[14px] cursor-pointer"
          aria-label="Close modal"
        >
          Close
        </button>

        <div className="mb-6 flex items-start gap-3">
          <img
            src="/assets/majal-logo.jpg"
            alt="MAJAL ISP"
            className="h-10 w-auto object-contain shrink-0"
          />
          <div>
            <h3 className="text-[19px] font-bold text-[#111111] tracking-tight">
              Operator Console Sign In
            </h3>
            <p className="text-[13px] text-[#6b6b6b] mt-0.5">
              Access your centralized MikroTik router fleet and billing portal.
            </p>
          </div>
        </div>

        <form onSubmit={handleSimulateLogin} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[#111111] mb-1">
              Operator email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[13px] font-medium text-[#111111]">
                Operator password
              </label>
              <span className="text-[12px] text-[#666666]">
                Demo: password123
              </span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
              required
            />
          </div>

          <div className="p-3 bg-[#f8f9fa] text-[12px] text-[#6b6b6b] leading-relaxed">
            Logging in launches your real-time RouterOS console with live metrics, transaction settlements, and voucher controls.
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="button-primary w-full text-[14px] py-2.5 cursor-pointer"
            >
              {statusMsg || 'Sign in to Dashboard'}
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenFullAuth();
              }}
              className="text-[13px] text-[#1a4be0] hover:underline cursor-pointer"
            >
              Need to register a new account? Open Auth Screen
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
