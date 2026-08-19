import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { HELP_CATEGORIES } from '../data/mockData';
import {
  HelpCircle,
  Search,
  BookOpen,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  Compass,
  UserCheck,
  Package,
  Layout,
  Truck,
  Archive,
  DollarSign,
  Megaphone,
  BarChart2,
  GraduationCap,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

interface HelpPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const HelpPage: React.FC<HelpPageProps> = ({
  navigate,
  openDemoModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="w-5 h-5" />,
    UserCheck: <UserCheck className="w-5 h-5" />,
    Package: <Package className="w-5 h-5" />,
    Layout: <Layout className="w-5 h-5" />,
    Truck: <Truck className="w-5 h-5" />,
    Archive: <Archive className="w-5 h-5" />,
    DollarSign: <DollarSign className="w-5 h-5" />,
    Megaphone: <Megaphone className="w-5 h-5" />,
    BarChart2: <BarChart2 className="w-5 h-5" />,
    GraduationCap: <GraduationCap className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  };

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Central de Ajuda & Suporte' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
            <span>Base de Conhecimento BRAND+</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Como podemos te ajudar hoje?
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Tutoriais passo a passo, respostas para dúvidas operacionais e orientações completas sobre todos os módulos da plataforma.
          </p>

          {/* SEARCH BAR */}
          <div className="relative max-w-2xl mx-auto pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Digite sua dúvida (ex: como emitir nota fiscal, cadastrar variação de tamanho, integrar correios)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {HELP_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 hover:bg-white hover:border-orange-500/40 hover:shadow-lg transition-all space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                {iconMap[cat.iconName] || <HelpCircle className="w-5 h-5" />}
              </div>

              <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                {cat.name}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                {cat.description}
              </p>

              <div className="pt-2 text-xs font-semibold text-orange-600 flex items-center gap-1">
                <span>{cat.articlesCount} artigos</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* POPULAR FAQS SECTION */}
        <div className="space-y-6 pt-8 border-t border-slate-100 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Perguntas Mais Frequentes</h2>
            <p className="text-xs text-slate-500">Respostas rápidas para as principais dúvidas de lojistas</p>
          </div>

          <div className="space-y-3">
            {HELP_CATEGORIES.flatMap((c) => c.popularQuestions).slice(0, 6).map((q, idx) => {
              const isOpen = openQuestion === String(idx);
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenQuestion(isOpen ? null : String(idx))}
                    className="w-full p-4 text-left font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between gap-4"
                  >
                    <span>{q.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-orange-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                      {q.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SUPPORT CONTACT FOOTER */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Não encontrou a resposta que procurava?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Nossa equipe de suporte técnico e atendimento especializado está disponível via WhatsApp e chat.
          </p>
          <button
            onClick={() => navigate('/contato')}
            className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Falar com o Suporte Humano</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
