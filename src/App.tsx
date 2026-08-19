import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DemoModal } from './components/layout/DemoModal';

// Pages
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

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('/');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const navigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => setIsDemoModalOpen(false);

  // Authentication pages render without global header/footer for clean immersion
  if (currentRoute === '/login') {
    return <LoginPage navigate={navigate} />;
  }

  if (currentRoute === '/criar-conta') {
    return <RegisterPage navigate={navigate} />;
  }

  const renderContent = () => {
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
        return <AcademyPage navigate={navigate} openDemoModal={openDemoModal} subRoute="cursos" />;
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
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-orange-500 selection:text-white font-sans antialiased">
      <Header
        currentRoute={currentRoute}
        navigate={navigate}
        openDemoModal={openDemoModal}
      />

      <main className="flex-1">
        {renderContent()}
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
