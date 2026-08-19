import React from 'react';
import { PageRoute } from '../types';
import { HeroSection } from '../components/home/HeroSection';
import { ValuePillarsSection } from '../components/home/ValuePillarsSection';
import { EcosystemDiagramSection } from '../components/home/EcosystemDiagramSection';
import { CommerceShowcaseSection } from '../components/home/CommerceShowcaseSection';
import { GestaoShowcaseSection } from '../components/home/GestaoShowcaseSection';
import { IntelligenceShowcaseSection } from '../components/home/IntelligenceShowcaseSection';
import { MarketingShowcaseSection } from '../components/home/MarketingShowcaseSection';
import { AcademyPreviewSection } from '../components/home/AcademyPreviewSection';
import { JourneySection } from '../components/home/JourneySection';
import { VerticalsSection } from '../components/home/VerticalsSection';
import { IntegrationsPreviewSection } from '../components/home/IntegrationsPreviewSection';
import { EnterpriseBannerSection } from '../components/home/EnterpriseBannerSection';
import { PricingPreviewSection } from '../components/home/PricingPreviewSection';
import { CasesPreviewSection } from '../components/home/CasesPreviewSection';
import { AboutValuesSection } from '../components/home/AboutValuesSection';
import { BlogPreviewSection } from '../components/home/BlogPreviewSection';
import { ConversionCTASection } from '../components/home/ConversionCTASection';

interface HomePageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, openDemoModal }) => {
  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <HeroSection navigate={navigate} openDemoModal={openDemoModal} />

      {/* 2. PROPOSTA DE VALOR */}
      <ValuePillarsSection navigate={navigate} />

      {/* 3. DIAGRAMA DO ECOSSISTEMA */}
      <EcosystemDiagramSection navigate={navigate} />

      {/* 4. COMMERCE */}
      <CommerceShowcaseSection navigate={navigate} />

      {/* 5. GESTÃO */}
      <GestaoShowcaseSection navigate={navigate} />

      {/* 6. INTELLIGENCE */}
      <IntelligenceShowcaseSection navigate={navigate} />

      {/* 7. MARKETING & CRM */}
      <MarketingShowcaseSection navigate={navigate} />

      {/* 8. ACADEMY */}
      <AcademyPreviewSection navigate={navigate} />

      {/* 9. JORNADA DO VAREJISTA */}
      <JourneySection navigate={navigate} />

      {/* 10. PARA QUEM É (SEGMENTOS) */}
      <VerticalsSection navigate={navigate} />

      {/* 11. INTEGRAÇÕES */}
      <IntegrationsPreviewSection navigate={navigate} />

      {/* 12. EMPRESAS & REDES */}
      <EnterpriseBannerSection navigate={navigate} />

      {/* 13. PLANOS & PREÇOS */}
      <PricingPreviewSection navigate={navigate} openDemoModal={openDemoModal} />

      {/* 14. CASES DEMONSTRATIVOS */}
      <CasesPreviewSection navigate={navigate} />

      {/* 15. SOBRE, MISSÃO E VALORES */}
      <AboutValuesSection navigate={navigate} />

      {/* 16. BLOG DO VAREJO */}
      <BlogPreviewSection navigate={navigate} />

      {/* 19. CTA FINAL DE CONVERSÃO */}
      <ConversionCTASection navigate={navigate} openDemoModal={openDemoModal} />
    </div>
  );
};
