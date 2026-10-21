import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DashboardPreview } from './components/DashboardPreview';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { RouterCompatibility } from './components/RouterCompatibility';
import { TestimonialThread } from './components/TestimonialThread';
import { Pricing } from './components/Pricing';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { LoginModal } from './components/LoginModal';
import { AuthPage } from './components/auth/AuthPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { User, RegisteredAccount } from './types/auth';
import { 
  INITIAL_ACCOUNTS, 
  INITIAL_ROUTERS, 
  INITIAL_TRANSACTIONS 
} from './data/dashboardData';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'auth' | 'dashboard'>('home');
  const [authPrefilledEmail, setAuthPrefilledEmail] = useState('');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<string | undefined>(undefined);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Registered accounts stored in state and localStorage
  const [accounts, setAccounts] = useState<RegisteredAccount[]>(() => {
    try {
      const saved = localStorage.getItem('majal_accounts');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ACCOUNTS;
  });

  // Current logged in operator session
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('majal_current_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name.includes('Sujon')) {
          parsed.name = 'Victor Al-Hassan';
          localStorage.setItem('majal_current_user', JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return null;
  });

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#dashboard' || hash.startsWith('#dashboard')) {
        if (currentUser) {
          setCurrentView('dashboard');
        } else {
          setCurrentView('auth');
        }
      } else if (hash === '#login' || hash === '#auth' || hash === '#register') {
        setCurrentView('auth');
      } else if (hash === '' || hash === '#') {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentUser]);

  const handleOpenLeadModal = (planName?: string) => {
    setSelectedPlanForModal(planName);
    setIsLeadModalOpen(true);
  };

  const handleExploreConsole = () => {
    const el = document.getElementById('live-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToAuth = (email?: string) => {
    if (email) setAuthPrefilledEmail(email);
    window.location.hash = '#auth';
    setCurrentView('auth');
  };

  const handleNavigateHome = () => {
    window.location.hash = '';
    setCurrentView('home');
  };

  const handleLoginSuccess = (account: RegisteredAccount) => {
    const user: User = {
      id: `usr-${account.email}`,
      name: account.name,
      email: account.email,
      role: account.role || 'Principal Network Architect',
      venueName: account.venueName || 'Kano Metro Fiber Net',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      balanceNgn: 78989.09,
      activeRouters: 4,
    };
    setCurrentUser(user);
    try {
      localStorage.setItem('majal_current_user', JSON.stringify(user));
    } catch {
      // ignore
    }
    window.location.hash = '#dashboard';
    setCurrentView('dashboard');
  };

  const handleRegisterAccount = (newAccount: RegisteredAccount) => {
    const updated = [newAccount, ...accounts];
    setAccounts(updated);
    try {
      localStorage.setItem('majal_accounts', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('majal_current_user');
    } catch {
      // ignore
    }
    window.location.hash = '';
    setCurrentView('home');
  };

  // View: Dedicated Dashboard Page
  if (currentView === 'dashboard') {
    const effectiveUser: User = currentUser || {
      id: 'usr-admin',
      name: 'Victor Al-Hassan',
      email: 'admin@majalisp.com',
      role: 'Principal Network Architect',
      venueName: 'Kano Metro Fiber Net',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      balanceNgn: 4850000,
      activeRouters: 4,
    };

    return (
      <DashboardPage
        user={effectiveUser}
        onLogout={handleLogout}
        onNavigateHome={handleNavigateHome}
        initialRouters={INITIAL_ROUTERS}
        initialTransactions={INITIAL_TRANSACTIONS}
      />
    );
  }

  // View: Dedicated Auth Page (Sign In & Register)
  if (currentView === 'auth') {
    return (
      <AuthPage
        prefilledEmail={authPrefilledEmail}
        accounts={accounts}
        onLoginSuccess={handleLoginSuccess}
        onRegisterAccount={handleRegisterAccount}
        onNavigateHome={handleNavigateHome}
      />
    );
  }

  // View: Public Landing Page
  return (
    <div className="min-h-[100svh] bg-white text-[#111111] flex flex-col font-sans selection:bg-[#1a4be0] selection:text-white">
      {/* Navigation */}
      <Navbar 
        onOpenLeadModal={() => handleOpenLeadModal()} 
        onOpenLoginModal={() => handleNavigateToAuth()} 
      />

      {/* Main Flow */}
      <main className="flex-1">
        {/* Section 1: Hero — Control that reads the page */}
        <Hero 
          onOpenLeadModal={() => handleOpenLeadModal()} 
          onExploreDemo={handleExploreConsole} 
        />

        {/* Section 2: Showcase — Live demo with controls (62/38 Split) */}
        <DashboardPreview />

        {/* Section 3: Features — Staggered fragment cells (3-col checkerboard) */}
        <Features />

        {/* Section 4: How It Works — Pinned fragment changing state */}
        <HowItWorks />

        {/* Section 5: Hardware Specification & Archival Context */}
        <RouterCompatibility 
          onOpenLeadModal={() => handleOpenLeadModal()} 
        />

        {/* Section 6: Testimonials — Quote as comment thread */}
        <TestimonialThread />

        {/* Section 7: Pricing — Prices like a menu */}
        <Pricing 
          onOpenLeadModal={handleOpenLeadModal} 
        />

        {/* Section 8: FAQ — Answers as reading text */}
        <FAQSection />

        {/* Section 9: Final CTA — A plain sentence, one action */}
        <FinalCTA 
          onOpenLeadModal={() => handleOpenLeadModal()} 
        />
      </main>

      {/* Footer — A single quiet line */}
      <Footer 
        onOpenLeadModal={() => handleOpenLeadModal()} 
      />

      {/* Interactive Modals */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultPlan={selectedPlanForModal}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccessLogin={handleLoginSuccess}
        onAccountNotFound={(notFoundEmail) => handleNavigateToAuth(notFoundEmail)}
        onOpenFullAuth={() => handleNavigateToAuth()}
        accounts={accounts}
      />
    </div>
  );
}
