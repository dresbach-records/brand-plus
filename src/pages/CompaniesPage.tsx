import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { EnterpriseBannerSection } from '../components/home/EnterpriseBannerSection';
import {
  Building2,
  Users2,
  ShieldCheck,
  Cpu,
  BarChart4,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface CompaniesPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const CompaniesPage: React.FC<CompaniesPageProps> = ({
  navigate,
  openDemoModal,
}) => {
  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Empresas & Redes' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-orange-600" />
            <span>Soluções Corporativas & Multi-filiais</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Tecnologia escalável para empresas, franquias e redes de varejo.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Controle múltiplas lojas físicas, canais de e-commerce e centros de distribuição com segurança corporativa, SLAs garantidos e gestão financeira consolidada.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/contato')}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <span>Falar com Consultor Enterprise</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={openDemoModal}
              className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-colors"
            >
              Agendar Reunião Executiva
            </button>
          </div>
        </div>

        {/* ENTERPRISE HIGHLIGHT SECTION */}
        <EnterpriseBannerSection navigate={navigate} />

        {/* 4 ENTERPRISE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Arquitetura Multi-lojas & Multi-CNPJs
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gerencie todas as filiais e franqueados a partir de um único painel central. Acesso com permissões restritas por unidade ou visão analítica consolidada para diretores.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Segurança, Compliance & LGPD
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Logs detalhados de auditoria de cada ação de usuário, controle de IP de acesso, autenticação em duas etapas (2FA) e conformidade total com a Lei Geral de Proteção de Dados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
