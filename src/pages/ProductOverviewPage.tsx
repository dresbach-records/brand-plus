import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import {
  ShoppingBag,
  Layers,
  Sparkles,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Smartphone,
  Cpu,
} from 'lucide-react';

interface ProductOverviewPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const ProductOverviewPage: React.FC<ProductOverviewPageProps> = ({
  navigate,
  openDemoModal,
}) => {
  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Visão Geral dos Produtos' },
          ]}
          navigate={navigate}
        />

        {/* HERO BANNER */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
            Arquitetura Integrada BRAND+
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl">
            Uma plataforma completa. Quatro pilares essenciais.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Elimine a colcha de retalhos de múltiplos softwares isolados. A BRAND+ reúne comércio digital, controle operacional, inteligência de dados e capacitação contínua em uma única conta.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/criar-conta')}
              className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Experimentar Grátis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={openDemoModal}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
            >
              Agendar Apresentação Guiada
            </button>
          </div>
        </div>

        {/* 4 PILLARS DETAILED BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1. COMMERCE */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Pilar 01 • Vender</span>
                <h2 className="text-2xl font-bold text-slate-900">BRAND+ Commerce</h2>
                <p className="text-sm text-slate-500 mt-1">Sua loja virtual profissional e catálogo digital responsivo.</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Experiência de compra moderna, checkout simplificado com PIX instantâneo, catálogo responsivo para celulares, integração com redes sociais e cálculo automatizado de frete.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Checkout em 1 clique com retenção de conversão recorde</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Domínio próprio e SSL grátis para sua marca</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Recuperação automática de pedidos via WhatsApp</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/produto/commerce')}
              className="w-full py-3 bg-slate-50 hover:bg-orange-50 text-slate-900 hover:text-orange-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explorar BRAND+ Commerce</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2. GESTÃO */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pilar 02 • Organizar</span>
                <h2 className="text-2xl font-bold text-slate-900">BRAND+ Gestão</h2>
                <p className="text-sm text-slate-500 mt-1">Estoque unificado, pedidos, clientes e controle financeiro.</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Centralize o estoque da sua loja física e loja online em tempo real. Emita notas fiscais, gerencie a expedição de pedidos e acompanhe o fluxo de caixa sem planilhas confusas.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Sincronização em tempo real de saldo físico e online</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Emissão simplificada de NF-e e NFC-e automática</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>DRE gerencial e cálculo de margem de contribuição por SKU</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/produto/gestao')}
              className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explorar BRAND+ Gestão</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. INTELLIGENCE */}
          <div className="bg-white rounded-3xl p-8 border border-orange-500/40 shadow-sm space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Pilar 03 • Crescer</span>
                <h2 className="text-2xl font-bold text-slate-900">BRAND+ Intelligence</h2>
                <p className="text-sm text-slate-500 mt-1">Copiloto de IA empresarial, alertas preditivos e automações.</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transforme dados brutos em orientações claras em português. Descubra quais produtos puxam sua margem para baixo, onde há vazamento de dinheiro e quais ações tomar hoje.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Chat interativo com IA para diagnóstico do seu negócio</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Detecção de estoque parado com sugestão de liquidação lucrativa</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Alertas automáticos de queda de margem ou ruptura</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/produto/inteligencia')}
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Explorar BRAND+ Intelligence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4. ACADEMY */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pilar 04 • Aprender</span>
                <h2 className="text-2xl font-bold text-slate-900">BRAND+ Academy</h2>
                <p className="text-sm text-slate-500 mt-1">Cursos práticos, trilhas e capacitação para sua equipe.</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A tecnologia só gera lucro quando seu time sabe como usá-la. Acesso a playbooks, treinamentos de atendimento no WhatsApp, fotografia de produtos e gestão de tráfego.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Trilhas passo a passo do iniciante ao varejo avançado</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Certificados de conclusão para capacitar seus colaboradores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Materiais para download, planilhas de markup e checklists</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/produto/academy')}
              className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explorar BRAND+ Academy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
