import React from 'react';
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
  Users,
  Sparkles,
} from 'lucide-react';

interface AcademyProductPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const AcademyProductPage: React.FC<AcademyProductPageProps> = ({
  navigate,
  openDemoModal,
}) => {
  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Produtos', route: '/produto' },
            { label: 'BRAND+ Academy' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
              <span>Capacitação & Conhecimento Prático</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A universidade corporativa para o varejo real.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Diferente de cursos genéricos da internet, a BRAND+ Academy ensina metodologias testadas no campo de batalha do comércio físico e digital brasileiro, integradas diretamente aos recursos da plataforma.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate('/academy')}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <span>Explorar Cursos da Academy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={openDemoModal}
                className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-colors"
              >
                Conhecer Planos de Equipe
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm">Metodologia Exclusiva BRAND+</div>
                  <div className="text-xs text-slate-400">100% prática e orientada a faturamento</div>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Aulas diretas ao ponto, gravadas em vídeos curtos de 8 a 15 minutos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Planilhas de markup, roteiros de atendimento e modelos de campanhas prontos para download.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Treinamento ilimitado para todos os funcionários cadastrados na sua conta.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6 MAIN COURSES GRID */}
        <div className="space-y-8 pt-8 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Trilhas de Aprendizado Disponíveis
            </h2>
            <p className="text-sm text-slate-600">
              Do básico ao avançado, desenvolva habilidades que geram vendas reais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMY_COURSES.map((course) => (
              <div
                key={course.id}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:bg-white hover:border-orange-500/40 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-md">
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

                  <div className="text-xs text-slate-500 pt-2 flex items-center gap-2">
                    <span className="font-medium">Instrutor:</span>
                    <strong className="text-slate-800">{course.instructor}</strong>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{course.lessonsCount} aulas</span>
                  <button
                    onClick={() => navigate('/academy')}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <span>Acessar Conteúdo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Capacite seu time com a BRAND+ Academy
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Inclusa em todos os planos da BRAND+. Comece a aprender e transformar o seu comércio agora.
          </p>
          <button
            onClick={() => navigate('/academy')}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
          >
            <span>Entrar na Academy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
