import React from 'react';
import { PageRoute } from '../../types';
import {
  GraduationCap,
  PlayCircle,
  Clock,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Users,
} from 'lucide-react';
import { ACADEMY_COURSES } from '../../data/mockData';

interface AcademyPreviewSectionProps {
  navigate: (route: PageRoute) => void;
}

export const AcademyPreviewSection: React.FC<AcademyPreviewSectionProps> = ({
  navigate,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            BRAND+ Academy • Aprender
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight">
            Tecnologia sem conhecimento não transforma um negócio.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Aprenda a vender, administrar e crescer no digital com cursos práticos, metodologias validadas e playbooks feitos sob medida para a rotina do varejista.
          </p>
        </div>

        {/* LEARNING PROGRESS SIMULATOR BAR */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm max-w-4xl mx-auto mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Sua Trilha de Evolução Digital
              </div>
              <div className="text-base font-bold text-slate-900">
                Certificação Varejista Digital Pro (Nível 2/4)
              </div>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600">Progresso Geral</span>
              <span className="text-orange-600">68% Concluído</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full w-[68%]" />
            </div>
          </div>
        </div>

        {/* 8 COURSE CATEGORY CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ACADEMY_COURSES.slice(0, 4).map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-lg hover:border-orange-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                    {course.level}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="pt-2 text-xs text-slate-600 flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                    {course.instructor[0]}
                  </div>
                  <span className="font-medium truncate">{course.instructor}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">{course.lessonsCount} aulas</span>
                <button
                  onClick={() => navigate('/academy')}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                >
                  <span>Ver Aulas</span>
                  <PlayCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 8 TOPIC BADGES ROW */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto mb-10">
          {[
            'Começando no Digital',
            'E-commerce',
            'Marketing',
            'Gestão',
            'Precificação',
            'Estoque',
            'Vendas',
            'Inteligência Artificial',
          ].map((topic, i) => (
            <span
              key={i}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* SECTION CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/academy')}
            className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Conhecer a BRAND+ Academy</span>
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
