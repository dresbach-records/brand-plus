import React from 'react';
import { PageRoute } from '../../types';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Headphones } from 'lucide-react';

interface ConversionCTASectionProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const ConversionCTASection: React.FC<ConversionCTASectionProps> = ({
  navigate,
  openDemoModal,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-white relative overflow-hidden">
      {/* GLOWS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
          <Sparkles className="w-4 h-4" />
          <span>Transformação Digital Imediata</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Pronto para transformar o seu negócio?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Comece a usar a <strong>BRAND+</strong> e leve seu varejo para o próximo nível digital com comércio, gestão unificada, inteligência de dados e capacitação contínua.
        </p>

        {/* DUAL ACTION BUTTONS */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => navigate('/criar-conta')}
            className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <span>Criar Conta Grátis</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={openDemoModal}
            className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>Agendar Demonstração</span>
          </button>
        </div>

        {/* TRUST BADGES */}
        <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sem cartão de crédito inicial</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-400" />
            <span>Ativação em menos de 15 minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-blue-400" />
            <span>Suporte em português via WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  );
};
