import React from 'react';
import { PageRoute } from '../../types';
import {
  Building2,
  Users2,
  ShieldCheck,
  Cpu,
  BarChart4,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Globe2,
} from 'lucide-react';

interface EnterpriseBannerSectionProps {
  navigate: (route: PageRoute) => void;
}

export const EnterpriseBannerSection: React.FC<EnterpriseBannerSectionProps> = ({
  navigate,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* GLOW */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COPY */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
              Soluções para Redes & Franquias
            </div>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Uma plataforma que cresce junto com sua operação.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Para varejistas em expansão acelerada, franquias e redes multi-lojas. Segurança de nível bancário, controle granular de permissões e suporte executivo dedicado.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate('/contato')}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Falar com Vendas Enterprise</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/empresas')}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
              >
                Conhecer Soluções Corporativas
              </button>
            </div>
          </div>

          {/* RIGHT 6 HIGHLIGHT CARDS GRID */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Múltiplas Lojas & CNPJs', desc: 'Centralize matriz, filiais e estoques em uma única tela de gestão unificada.', icon: <Building2 className="w-5 h-5 text-orange-400" /> },
              { title: 'Usuários & Permissões Granulares', desc: 'Defina com precisão quem acessa finanças, caixa, relatórios ou expedição.', icon: <Users2 className="w-5 h-5 text-emerald-400" /> },
              { title: 'APIs Abertas & Webhooks', desc: 'Integre com ERPs legados, WMS, BI e ferramentas proprietárias da sua rede.', icon: <Cpu className="w-5 h-5 text-blue-400" /> },
              { title: 'SLA 99.9% Garantido', desc: 'Disponibilidade contínua em infraestrutura redundante de alta performance.', icon: <ShieldCheck className="w-5 h-5 text-purple-400" /> },
              { title: 'Relatórios Executivos & DRE', desc: 'Visão consolidada do fluxo de caixa e margem de contribuição por filial.', icon: <BarChart4 className="w-5 h-5 text-amber-400" /> },
              { title: 'Gerente de Contas Dedicado', desc: 'Acompanhamento estratégico mensal e suporte com canal prioritário 24/7.', icon: <Headphones className="w-5 h-5 text-orange-400" /> },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2 hover:border-orange-500/50 transition-colors"
              >
                <div className="p-2 w-fit rounded-xl bg-slate-900 border border-slate-700">
                  {item.icon}
                </div>
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
