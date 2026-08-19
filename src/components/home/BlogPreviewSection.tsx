import React from 'react';
import { PageRoute } from '../../types';
import { BLOG_ARTICLES } from '../../data/mockData';
import { BookOpen, Clock, ArrowRight, Sparkles, Tag } from 'lucide-react';

interface BlogPreviewSectionProps {
  navigate: (route: PageRoute) => void;
}

export const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({ navigate }) => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
              Blog do Varejo & Artigos
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Conhecimento para transformar seu negócio.
            </h2>
            <p className="text-base text-slate-600 max-w-2xl">
              Estratégias práticas, tendências de mercado, gestão de estoque e inteligência artificial aplicadas ao dia a dia do varejo.
            </p>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl border border-slate-200 shadow-2xs transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <span>Ver Todos os Artigos</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
          </button>
        </div>

        {/* 4 BLOG POSTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {BLOG_ARTICLES.slice(0, 4).map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-xl hover:border-orange-500/40 transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => navigate('/blog')}
            >
              <div className="space-y-3">
                {/* CATEGORY & READ TIME */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">
                    {art.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{art.date}</span>
                <span className="font-bold text-orange-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Ler Artigo <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 5 CATEGORY PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { name: 'Varejo', route: '/blog/varejo' },
            { name: 'E-commerce', route: '/blog/ecommerce' },
            { name: 'Gestão', route: '/blog/gestao' },
            { name: 'Marketing', route: '/blog/marketing' },
            { name: 'Inteligência Artificial', route: '/blog/inteligencia-artificial' },
          ].map((cat, idx) => (
            <button
              key={idx}
              onClick={() => navigate(cat.route as PageRoute)}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 text-xs font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 transition-colors shadow-2xs"
            >
              Artigos sobre {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
