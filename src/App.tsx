import React, { useState } from 'react';
import { PageRoute } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DemoModal } from './components/layout/DemoModal';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CustomerProvider } from './context/CustomerContext';
import { CheckoutProvider } from './context/CheckoutContext';

// Institutional Pages
import { HomePage } from './pages/HomePage';
import { ProductOverviewPage } from './pages/ProductOverviewPage';
import { CommercePage } from './pages/CommercePage';
import { GestaoPage } from './pages/GestaoPage';
import { IntelligencePage } from './pages/IntelligencePage';
import { AcademyProductPage } from './pages/AcademyProductPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PlansPage } from './pages/PlansPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { CasesPage } from './pages/CasesPage';
import { AcademyPage } from './pages/AcademyPage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HelpPage } from './pages/HelpPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Commercial & Customer Portal Pages
import { CustomerCheckoutPage } from './pages/customer/CustomerCheckoutPage';
import { CustomerLayout } from './components/customer-portal/CustomerLayout';
import { CustomerDashboardPage } from './pages/customer/CustomerDashboardPage';
import { CustomerSubscriptionPage } from './pages/customer/CustomerSubscriptionPage';
import { CustomerPlanPage } from './pages/customer/CustomerPlanPage';
import { CustomerBillingPage } from './pages/customer/CustomerBillingPage';
import { CustomerInvoicesPage } from './pages/customer/CustomerInvoicesPage';
import { CustomerCompanyPage } from './pages/customer/CustomerCompanyPage';
import { CustomerUsersPage } from './pages/customer/CustomerUsersPage';
import { CustomerSecurityPage } from './pages/customer/CustomerSecurityPage';
import { CustomerSupportPage } from './pages/customer/CustomerSupportPage';
import { CustomerAccessPage } from './pages/customer/CustomerAccessPage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('/');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const navigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => setIsDemoModalOpen(false);

  return (
    <CustomerProvider>
      <CheckoutProvider>
        <AppContent
          currentRoute={currentRoute}
          navigate={navigate}
          isDemoModalOpen={isDemoModalOpen}
          openDemoModal={openDemoModal}
          closeDemoModal={closeDemoModal}
        />
      </CheckoutProvider>
    </CustomerProvider>
  );
}

interface AppContentProps {
  currentRoute: PageRoute;
  navigate: (route: PageRoute) => void;
  isDemoModalOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;
}

function AppContent({
  currentRoute,
  navigate,
  isDemoModalOpen,
  openDemoModal,
  closeDemoModal,
}: AppContentProps) {
  // 1. Independent Checkout Flow
  if (currentRoute.startsWith('/cliente/checkout')) {
    return <CustomerCheckoutPage currentRoute={currentRoute} navigate={navigate} />;
  }

// 2. Customer Portal Dashboard & Submodules (Protected)
  if (currentRoute.startsWith('/cliente')) {
    return (
      <ProtectedRoute navigate={navigate}>
        <CustomerLayout currentRoute={currentRoute} navigate={navigate}>
          {renderPortalContent(currentRoute, navigate)}
        </CustomerLayout>
      </ProtectedRoute>
    );
  }

  // 3. Standalone Authentication Pages
  if (currentRoute === '/login') {
    return <LoginPage navigate={navigate} />;
  }

  if (currentRoute === '/criar-conta') {
    return <RegisterPage navigate={navigate} />;
  }

  // 4. Institutional Website with Global Header/Footer
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-orange-500 selection:text-white font-sans antialiased">
      <Header
        currentRoute={currentRoute}
        navigate={navigate}
        openDemoModal={openDemoModal}
      />

      <main className="flex-1">
        {renderInstitutionalContent(currentRoute, navigate, openDemoModal)}
      </main>

      <Footer navigate={navigate} />

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={closeDemoModal}
        navigate={navigate}
      />
    </div>
  );
}

function renderPortalContent(currentRoute: PageRoute, navigate: (route: PageRoute) => void) {
  switch (currentRoute) {
    case '/cliente':
      return <CustomerDashboardPage navigate={navigate} />;
    case '/cliente/assinatura':
      return <CustomerSubscriptionPage navigate={navigate} />;
    case '/cliente/plano':
      return <CustomerPlanPage navigate={navigate} />;
    case '/cliente/cobrancas':
      return <CustomerBillingPage navigate={navigate} />;
    case '/cliente/faturas':
      return <CustomerInvoicesPage navigate={navigate} />;
    case '/cliente/empresa':
      return <CustomerCompanyPage navigate={navigate} />;
    case '/cliente/usuarios':
      return <CustomerUsersPage navigate={navigate} />;
    case '/cliente/seguranca':
      return <CustomerSecurityPage navigate={navigate} />;
    case '/cliente/suporte':
      return <CustomerSupportPage navigate={navigate} />;
    case '/cliente/acesso':
      return <CustomerAccessPage navigate={navigate} />;
    default:
      return <CustomerDashboardPage navigate={navigate} />;
  }
}

function renderInstitutionalContent(
  currentRoute: PageRoute,
  navigate: (route: PageRoute) => void,
  openDemoModal: () => void
) {
  switch (currentRoute) {
    case '/':
      return <HomePage navigate={navigate} openDemoModal={openDemoModal} />;

    // Product group
    case '/produto':
      return <ProductOverviewPage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/produto/commerce':
      return <CommercePage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/produto/gestao':
      return <GestaoPage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/produto/inteligencia':
      return <IntelligencePage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/produto/academy':
      return <AcademyProductPage navigate={navigate} openDemoModal={openDemoModal} />;

    // Solutions & Architecture
    case '/como-funciona':
      return <HowItWorksPage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/planos':
      return <PlansPage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/integracoes':
      return <IntegrationsPage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/empresas':
      return <CompaniesPage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/cases':
      return <CasesPage navigate={navigate} openDemoModal={openDemoModal} />;

    // Academy & Content
    case '/academy':
    case '/academy/cursos':
      return <AcademyPage navigate={navigate} openDemoModal={openDemoModal} subRoute="cursos" />;
    case '/academy/trilhas':
      return <AcademyPage navigate={navigate} openDemoModal={openDemoModal} subRoute="trilhas" />;
    case '/academy/guias':
      return <AcademyPage navigate={navigate} openDemoModal={openDemoModal} subRoute="guias" />;

    // Blog & Knowledge
    case '/blog':
      return <BlogPage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/blog/varejo':
      return <BlogPage navigate={navigate} openDemoModal={openDemoModal} initialCategory="Varejo" />;
    case '/blog/ecommerce':
      return <BlogPage navigate={navigate} openDemoModal={openDemoModal} initialCategory="E-commerce" />;
    case '/blog/gestao':
      return <BlogPage navigate={navigate} openDemoModal={openDemoModal} initialCategory="Gestão" />;
    case '/blog/marketing':
      return <BlogPage navigate={navigate} openDemoModal={openDemoModal} initialCategory="Marketing" />;
    case '/blog/inteligencia-artificial':
      return <BlogPage navigate={navigate} openDemoModal={openDemoModal} initialCategory="Inteligência Artificial" />;

    // Institutional & Support
    case '/sobre':
      return <AboutPage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/contato':
      return <ContactPage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/ajuda':
      return <HelpPage navigate={navigate} openDemoModal={openDemoModal} />;
    case '/termos':
      return <TermsPage navigate={navigate} />;
    case '/privacidade':
      return <PrivacyPage navigate={navigate} />;

    default:
      return <HomePage navigate={navigate} openDemoModal={openDemoModal} />;
  }
}
