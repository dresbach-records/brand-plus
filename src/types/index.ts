export type PageRoute =
  | '/'
  | '/produto'
  | '/produto/commerce'
  | '/produto/gestao'
  | '/produto/inteligencia'
  | '/produto/academy'
  | '/como-funciona'
  | '/planos'
  | '/integracoes'
  | '/empresas'
  | '/cases'
  | '/academy'
  | '/academy/cursos'
  | '/academy/trilhas'
  | '/academy/guias'
  | '/blog'
  | '/blog/varejo'
  | '/blog/ecommerce'
  | '/blog/gestao'
  | '/blog/marketing'
  | '/blog/inteligencia-artificial'
  | '/sobre'
  | '/contato'
  | '/ajuda'
  | '/termos'
  | '/privacidade'
  | '/login'
  | '/criar-conta';

export interface PlanFeature {
  name: string;
  includedIn: ('start' | 'growth' | 'pro' | 'enterprise')[];
  tooltip?: string;
  highlight?: boolean;
}

export interface PlanTier {
  id: 'start' | 'growth' | 'pro' | 'enterprise';
  name: string;
  badge?: string;
  tagline: string;
  description: string;
  monthlyEstimate: string;
  annualEstimate: string;
  idealFor: string;
  primaryFeatures: string[];
  ctaText: string;
  popular?: boolean;
}

export interface IntegrationItem {
  id: string;
  name: string;
  category: 'pagamentos' | 'logistica' | 'erp' | 'pdv' | 'marketplaces' | 'fiscal' | 'marketing' | 'analytics';
  description: string;
  badge?: string;
  popularity: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  companyName: string;
  segment: string;
  cityState: string;
  demonstrative: true;
  headline: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
    trend: 'up' | 'down';
  }[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
  tags: string[];
}

export interface AcademyCourse {
  id: string;
  title: string;
  slug: string;
  category: 'digital' | 'ecommerce' | 'marketing' | 'gestao' | 'precificacao' | 'estoque' | 'vendas' | 'ia';
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  lessonsCount: number;
  description: string;
  instructor: string;
  instructorRole: string;
  isPopular?: boolean;
  modules: {
    title: string;
    duration: string;
    lessons: string[];
  }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'varejo' | 'ecommerce' | 'gestao' | 'marketing' | 'inteligencia-artificial';
  categoryLabel: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  content: string[];
  tags: string[];
  featured?: boolean;
}

export interface HelpCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  articlesCount: number;
  popularQuestions: {
    question: string;
    answer: string;
  }[];
}
