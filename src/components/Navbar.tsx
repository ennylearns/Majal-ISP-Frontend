import React, { useState } from 'react';

interface NavbarProps {
  onOpenLeadModal: (defaultTier?: string) => void;
  onOpenLoginModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLeadModal, onOpenLoginModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Live console', href: '#console' },
    { label: 'Features', href: '#features-matrix' },
    { label: 'How it works', href: '#workflow' },
    { label: 'Hardware', href: '#hardware-spec' },
    { label: 'Plans', href: '#pricing-menu' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#e6e9ef] w-full overflow-x-clip">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-[72px] flex items-center justify-between gap-4">
        
        {/* Brand Wordmark & Official Logo */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 shrink-0 hover:opacity-85 transition-opacity"
        >
          <img 
            src="/assets/majal-logo.jpg" 
            alt="MAJAL ISP Logo" 
            className="h-9 w-auto object-contain"
          />
          <span className="text-[17px] font-bold tracking-tight text-[#111111] whitespace-nowrap">
            MAJAL ISP
          </span>
        </a>

        {/* Concise Plain Nav Links (Desktop >= 1024px) */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-[#172033]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-[#555555] hover:text-[#111111] transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Zone (Desktop >= 1024px) */}
        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <button
            onClick={onOpenLoginModal}
            className="text-[15px] font-normal text-[#111111] hover:underline whitespace-nowrap cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={() => onOpenLeadModal()}
            className="button-primary cursor-pointer text-[14px]"
          >
            Connect a gateway
          </button>
        </div>

        {/* Tablet & Mobile Toggle (< 1024px) */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => onOpenLeadModal()}
            className="button-primary text-[13px] py-1.5 px-3 cursor-pointer shrink-0"
          >
            Connect a gateway
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#111111] text-[14px] cursor-pointer p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e6e9ef] px-5 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-[16px] text-[#111111] py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLoginModal();
              }}
              className="text-left text-[15px] text-[#111111] py-1 cursor-pointer"
            >
              Log in
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
