import React, { useState } from 'react';
import { RegisteredAccount } from '../../types/auth';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
  prefilledEmail?: string;
  accounts: RegisteredAccount[];
  onRegisterAccount: (account: RegisteredAccount) => void;
  onLoginSuccess: (account: RegisteredAccount) => void;
  onNavigateHome: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  prefilledEmail = '',
  accounts,
  onRegisterAccount,
  onLoginSuccess,
  onNavigateHome,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState(prefilledEmail || 'admin@majalisp.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [venueName, setVenueName] = useState('');
  const [role, setRole] = useState('Network Operations Engineer');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [notFoundAlertEmail, setNotFoundAlertEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setNotFoundAlertEmail(null);
    setIsSubmitting(true);

    const cleanEmail = email.trim().toLowerCase();
    const existing = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

    setTimeout(() => {
      setIsSubmitting(false);
      if (!existing) {
        // Account NOT found -> prompt account creation as explicitly requested by user!
        setNotFoundAlertEmail(email.trim());
        return;
      }

      // Valid account found -> route to dashboard
      onLoginSuccess(existing);
    }, 450);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    const cleanEmail = email.trim().toLowerCase();
    const existing = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

    setTimeout(() => {
      setIsSubmitting(false);
      if (existing) {
        setErrorMsg(`An account with ${email} already exists. Please sign in instead.`);
        return;
      }

      const newAccount: RegisteredAccount = {
        name: name.trim() || 'New Operator',
        email: cleanEmail,
        password: password || 'password123',
        venueName: venueName.trim() || 'Metro Wi-Fi Fleet',
        role: role || 'Network Operator',
      };

      onRegisterAccount(newAccount);
      onLoginSuccess(newAccount);
    }, 450);
  };

  const handleSwitchToRegisterWithNotFoundEmail = () => {
    if (notFoundAlertEmail) {
      setEmail(notFoundAlertEmail);
    }
    setNotFoundAlertEmail(null);
    setErrorMsg(null);
    setMode('register');
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setErrorMsg(null);
    setNotFoundAlertEmail(null);
  };

  return (
    <div className="min-h-[100svh] bg-[#f8f9fa] flex flex-col justify-between text-[#111111] font-sans selection:bg-[#1a4be0] selection:text-white" data-ui="true">
      {/* Top Quiet Bar */}
      <div className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 text-left hover:opacity-85 transition-opacity cursor-pointer"
        >
          <img
            src="/assets/majal-logo.jpg"
            alt="MAJAL ISP"
            className="h-10 w-auto object-contain"
          />
          <span className="text-[17px] font-bold tracking-tight text-[#111111]">
            MAJAL ISP
          </span>
        </button>

        <button
          onClick={onNavigateHome}
          className="text-[14px] text-[#555555] hover:text-[#111111] hover:underline cursor-pointer"
        >
          Return to website
        </button>
      </div>

      {/* Main Centered Card Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white p-8 lg:p-10 border-none">
          
          {/* Header Title */}
          <div className="mb-7 text-center">
            <h1 className="text-[24px] font-bold tracking-tight text-[#111111]">
              {mode === 'login' ? 'Operator Sign In' : 'Create Operator Account'}
            </h1>
            <p className="text-[14px] text-[#555555] mt-1.5 leading-relaxed">
              {mode === 'login'
                ? 'Access your centralized MikroTik router fleet and billing dashboard.'
                : 'Connect your router nodes and start managing Wi-Fi vouchers.'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-[#f4f4f4] p-1 mb-6 text-[14px]">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
                setNotFoundAlertEmail(null);
              }}
              className={`flex-1 py-2 text-center font-medium transition-colors cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-[#111111] shadow-xs'
                  : 'text-[#555555] hover:text-[#111111]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMsg(null);
                setNotFoundAlertEmail(null);
              }}
              className={`flex-1 py-2 text-center font-medium transition-colors cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-[#111111] shadow-xs'
                  : 'text-[#555555] hover:text-[#111111]'
              }`}
            >
              Register
            </button>
          </div>

          {/* Dedicated Not Found Alert Banner (Requested User Behavior) */}
          {notFoundAlertEmail && (
            <div className="mb-6 p-4 bg-[#fdf2e9] text-[#111111] space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#e65100] mt-1.5 shrink-0" />
                <div className="text-[13px] leading-relaxed">
                  <span className="font-semibold">No account found</span> for{' '}
                  <span className="font-medium text-[#111111]">{notFoundAlertEmail}</span>.
                  Would you like to register this operator profile now?
                </div>
              </div>
              <button
                type="button"
                onClick={handleSwitchToRegisterWithNotFoundEmail}
                className="w-full bg-[#111111] text-white py-2 text-[13px] font-medium hover:bg-[#222222] transition-colors cursor-pointer"
              >
                Create account with this email
              </button>
            </div>
          )}

          {/* Generic Error message */}
          {errorMsg && (
            <div className="mb-5 p-3 bg-[#fbeae5] text-[#b71c1c] text-[13px]">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1">
                  Operator email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@majalisp.com"
                  className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[13px] font-medium text-[#111111]">
                    Password
                  </label>
                  <span className="text-[12px] text-[#555555]">
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

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary w-full text-[14px] py-2.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Verifying credentials...' : 'Enter Operator Console'}
                </button>
              </div>

              {/* Quick Fill Demo Accounts */}
              <div className="pt-4 text-center">
                <p className="text-[12px] text-[#555555] mb-2">
                  Instant demo accounts (click to test):
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('admin@majalisp.com')}
                    className="text-[12px] bg-[#f4f4f4] hover:bg-[#ebebeb] px-2.5 py-1 text-[#111111] cursor-pointer"
                  >
                    admin@majalisp.com
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('operator@campuswifi.ng')}
                    className="text-[12px] bg-[#f4f4f4] hover:bg-[#ebebeb] px-2.5 py-1 text-[#111111] cursor-pointer"
                  >
                    operator@campuswifi.ng
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1">
                  Operator full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sujon Al-Hassan"
                  className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1">
                  Operator email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@venue.ng"
                  className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1">
                  ISP / Venue network name
                </label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="e.g. Kano Central Wi-Fi Ring"
                  className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1">
                  Operational role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
                >
                  <option value="Principal Network Architect">Principal Network Architect</option>
                  <option value="Field Operations Engineer">Field Operations Engineer</option>
                  <option value="Hotspot Fleet Administrator">Hotspot Fleet Administrator</option>
                  <option value="ISP Billing Officer">ISP Billing Officer</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#111111] mb-1">
                  Set password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a password"
                  className="w-full bg-[#f4f4f4] px-3.5 py-2.5 text-[14px] text-[#111111] focus:outline-none focus:bg-[#ebebeb]"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary w-full text-[14px] py-2.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating operator workspace...' : 'Register & Enter Dashboard'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

      {/* Bottom Quiet Footer */}
      <div className="w-full max-w-5xl mx-auto px-6 py-6 text-center text-[13px] text-[#555555]">
        MAJAL ISP · RouterOS Centralized Fleet & Hotspot Management
      </div>
    </div>
  );
};
