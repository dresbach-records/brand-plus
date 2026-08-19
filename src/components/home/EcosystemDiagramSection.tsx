import React from 'react';
import { PageRoute } from '../../types';
import { BrandLogo } from '../brand/Logo';
import {
  ShoppingBag,
  Layers,
  Sparkles,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Zap,
} from 'lucide-react';

interface EcosystemDiagramSectionProps {
  navigate: (route: PageRoute) => void;
}

export const EcosystemDiagramSection: React.FC<EcosystemDiagramSectionProps> = ({
  navigate,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* BACKGROUND ACCENTS */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT EXPLANATION */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
              Arquitetura Unificada
            </div>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Mais do que vender online.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              A <strong>BRAND+</strong> conecta comércio, gestão, inteligência e conhecimento em uma única plataforma para acompanhar toda a evolução digital do seu negócio.
            </p>

            <div className="space-y-3 pt-2 text-left max-w-md mx-auto lg:mx-0">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 shrink-0 mt-0.5">
                  <span className="text-xs font-bold font-mono">VS</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-300">O modelo tradicional fragmentado:</div>
                  <div className="text-xs text-slate-400">Uma loja virtual que não fala com seu estoque, planilhas avulsas e cursos genéricos.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-orange-500 text-white shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-orange-300">Com o Ecossistema BRAND+:</div>
                  <div className="text-xs text-slate-300">Tudo conectado: vendas alimentam o estoque, que gera dados para a IA, orientando suas decisões com apoio da Academy.</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/como-funciona')}
                className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm rounded-xl transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Entenda Como Funciona o Ecossistema</span>
                <ArrowRight className="w-4 h-4 text-orange-600" />
              </button>
            </div>
          </div>

          {/* RIGHT CONNECTED DIAGRAM */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-10 rounded-3xl bg-slate-800/90 border border-slate-700/80 shadow-2xl backdrop-blur-md">
              {/* CENTRAL BRAND+ NUCLEUS */}
              <div className="text-center mb-8">
                <div className="inline-block p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-orange-500/40 shadow-xl brand-glow">
                  <BrandLogo light size="lg" />
                  <div className="text-[11px] font-bold text-orange-400 uppercase tracking-widest mt-1">
                    Núcleo Tecnológico Unificado
                  </div>
                </div>
              </div>

              {/* 4 CONNECTED SATELLITES GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. COMMERCE */}
                <div
                  onClick={() => navigate('/produto/commerce')}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-orange-500/80 transition-all cursor-pointer group hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">
                      Pilar 01
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                    COMMERCE
                  </h4>
                  <div className="text-xs text-orange-300 font-medium">Vender & Converter</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Loja digital, catálogo responsivo, checkout 1-clique, pagamentos seguros.
                  </p>
                </div>

                {/* 2. BUSINESS / GESTÃO */}
                <div
                  onClick={() => navigate('/produto/gestao')}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer group hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-slate-700 text-white group-hover:bg-slate-600 transition-colors">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                      Pilar 02
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-slate-200 transition-colors">
                    BUSINESS & GESTÃO
                  </h4>
                  <div className="text-xs text-slate-300 font-medium">Organizar & Controlar</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Estoque unificado, pedidos, clientes, financeiro, emissão de NF-e.
                  </p>
                </div>

                {/* 3. INTELLIGENCE */}
                <div
                  onClick={() => navigate('/produto/inteligencia')}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-orange-500/50 hover:border-orange-400 transition-all cursor-pointer group hover:scale-[1.02] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-orange-500 text-white shadow-sm">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white px-2 py-0.5 rounded-full">
                      Pilar 03 • AI
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                    INTELLIGENCE
                  </h4>
                  <div className="text-xs text-orange-300 font-medium">Analisar & Lucrar</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Copiloto de IA, alertas de margem, automações de vendas e RFM.
                  </p>
                </div>

                {/* 4. ACADEMY */}
                <div
                  onClick={() => navigate('/produto/academy')}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer group hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-slate-700 text-white group-hover:bg-slate-600 transition-colors">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                      Pilar 04
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-slate-200 transition-colors">
                    ACADEMY
                  </h4>
                  <div className="text-xs text-slate-300 font-medium">Capacitar & Evoluir</div>
                  <p className="text-xs text-slate-400 mt-1">
                    Cursos práticos, trilhas de conhecimento e playbooks para seu time.
                  </p>
                </div>
              </div>

              {/* BOTTOM CONNECTIVITY BADGE */}
              <div className="mt-6 pt-4 border-t border-slate-700/80 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-orange-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Dados sincronizados em tempo real entre todos os módulos.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
