import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ShieldCheck, FileText } from 'lucide-react';

interface TermsPageProps {
  navigate: (route: PageRoute) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ navigate }) => {
  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Termos de Uso do Serviço' },
          ]}
          navigate={navigate}
        />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-orange-600" />
            <span>Jurídico & Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Termos de Uso e Condições de Serviço — BRAND+
          </h1>
          <p className="text-xs text-slate-500">Última atualização: 15 de Agosto de 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Objeto e Aceitação</h2>
            <p>
              Estes Termos de Uso regem o acesso e a utilização da plataforma BRAND+, desenvolvida e operada para prestação de serviços de tecnologia SaaS de transformação digital para o varejo, comércio eletrônico, gestão integrada, inteligência de dados e capacitação empresarial.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Responsabilidade sobre Dados e Conteúdo</h2>
            <p>
              O lojista cadastrado é o único e exclusivo responsável pela veracidade, legalidade e conformidade fiscal de todos os produtos cadastrados, preços praticados, descrições, imagens e informações societárias inseridas na plataforma.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Disponibilidade e SLA</h2>
            <p>
              A BRAND+ envida seus melhores esforços técnicos para assegurar uma taxa de disponibilidade (uptime) de 99.9% nos serviços em nuvem, ressalvadas manutenções preventivas programadas com aviso prévio.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Pagamentos e Cancelamento</h2>
            <p>
              A contratação de planos mensais não exige tempo mínimo de permanência (fidelidade), podendo ser cancelada ou alterada a qualquer momento diretamente pelo painel administrativo do titular da conta.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
