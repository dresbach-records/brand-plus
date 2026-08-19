import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ACADEMY_COURSES } from '../data/mockData';
import {
  GraduationCap,
  PlayCircle,
  Clock,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle2,
  Filter,
  Search,
  Lock,
  Layers,
  FileDown,
  Sparkles,
} from 'lucide-react';

interface AcademyPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
  subRoute?: 'cursos' | 'trilhas' | 'guias';
}

export const AcademyPage: React.FC<AcademyPageProps> = ({
  navigate,
  openDemoModal,
  subRoute = 'cursos',
}) => {
  const [activeTab, setActiveTab] = useState<'cursos' | 'trilhas' | 'guias'>(subRoute);
  const [activeLevel, setActiveLevel] = useState<string>('todos');

  const guides = [
    {
      title: 'Playbook de Vendas no WhatsApp para Varejistas',
      type: 'Guia em PDF',
      pages: '28 páginas',
      desc: 'Scripts prontos, cadência de mensagens, gatilhos de fechamento e modelo de catálogo VIP.',
    },
    {
      title: 'Planilha de Markup e Formação de Preço de Venda',
      type: 'Planilha Excel / Sheets',
      pages: 'Com fórmulas automáticas',
      desc: 'Calcule o ponto de equilíbrio, margem de contribuição e impacto de taxas de cartão e frete.',
    },
    {
      title: 'Manual de Fotografia e Iluminação com Smartphone',
      type: 'E-book Ilustrado',
      pages: '34 páginas',
      desc: 'Como produzir fotos de catálogo atraentes usando apenas luz natural e a câmera do seu celular.',
    },
    {
      title: 'Checklist de Operação & Expedição Sem Erros',
      type: 'Checklist Prático',
      pages: 'Imprimível',
      desc: 'Passo a passo diário para conferência de estoque, separação e embalagem de pedidos.',
    },
  ];

  const filteredCourses = activeLevel === 'todos'
    ? ACADEMY_COURSES
    : ACADEMY_COURSES.filter((c) => c.level === activeLevel);

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'BRAND+ Academy' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
            <span>Centro de Conhecimento & Treinamento</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            BRAND+ Academy: Conhecimento prático para o seu comércio.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Cursos, trilhas formativas e materiais de apoio criados por especialistas que conhecem as dores e oportunidades do comércio brasileiro.
          </p>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex justify-center border-b border-slate-200">
          <div className="flex gap-4 sm:gap-8">
            <button
              onClick={() => {
                setActiveTab('cursos');
                navigate('/academy/cursos');
              }}
              className={`pb-4 px-2 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'cursos'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Cursos & Aulas ({ACADEMY_COURSES.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('trilhas');
                navigate('/academy/trilhas');
              }}
              className={`pb-4 px-2 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'trilhas'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Trilhas & Certificações</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('guias');
                navigate('/academy/guias');
              }}
              className={`pb-4 px-2 font-bold text-sm border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'guias'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileDown className="w-4 h-4" />
              <span>Guias & Playbooks ({guides.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CURSOS */}
        {activeTab === 'cursos' && (
          <div className="space-y-8">
            {/* LEVEL FILTERS */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                {['todos', 'Iniciante', 'Intermediário', 'Avançado'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveLevel(lvl)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeLevel === lvl
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {lvl === 'todos' ? 'Todos os Níveis' : lvl}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {filteredCourses.length} cursos encontrados
              </span>
            </div>

            {/* COURSES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-orange-500/40 transition-all flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md">
                        {course.level}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-800">
                        {course.instructor[0]}
                      </div>
                      <span>Instrutor: <strong className="text-slate-800">{course.instructor}</strong></span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold">{course.lessonsCount} aulas gravadas</span>
                    <button
                      onClick={() => navigate('/criar-conta')}
                      className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Assistir</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: TRILHAS */}
        {activeTab === 'trilhas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Trilha: Da Loja Física ao Digital</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aprenda a cadastrar seus produtos, criar sua vitrine digital, configurar meios de pagamento e fazer as primeiras 100 vendas na internet sem depender de intermediários.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs text-slate-700">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Módulo 1: Fundação Digital & Catálogo</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Módulo 2: Logística & Meios de Pagamento</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Módulo 3: Ativação de Clientes Locais</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/criar-conta')}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors mt-2"
              >
                Iniciar Esta Trilha
              </button>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Trilha: Gestão de Margem & Inteligência</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Para quem já vende e quer dominar a lucratividade: cálculo de markup correto, redução de rupturas de estoque e uso do copiloto de IA para decisões financeiras.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs text-slate-700">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Módulo 1: DRE Gerencial na Prática</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Módulo 2: Giro e Liquidação de Produtos Parados</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Módulo 3: Automações com BRAND+ Intelligence</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/criar-conta')}
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-colors mt-2 shadow-xs"
              >
                Iniciar Esta Trilha
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: GUIAS */}
        {activeTab === 'guias' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((g, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex items-start gap-4 space-y-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">
                  <FileDown className="w-6 h-6" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      {g.type}
                    </span>
                    <span className="text-[11px] text-slate-400">{g.pages}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{g.title}</h4>
                  <p className="text-xs text-slate-500">{g.desc}</p>
                  <button
                    onClick={() => navigate('/criar-conta')}
                    className="pt-2 text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <span>Baixar Material Gratuito</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Acesso ilimitado à Academy em todos os planos
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Ao criar sua conta na BRAND+, você e seus colaboradores têm acesso completo a todos os cursos e atualizações semanais.
          </p>
          <button
            onClick={() => navigate('/criar-conta')}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
          >
            <span>Liberar Meu Acesso Grátis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
