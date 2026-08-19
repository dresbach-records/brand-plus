import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { BLOG_ARTICLES } from '../data/mockData';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  Search,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface BlogPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
  initialCategory?: string;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  navigate,
  openDemoModal,
  initialCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'todos', name: 'Todos os Artigos', route: '/blog' },
    { id: 'Varejo', name: 'Varejo Físico & Local', route: '/blog/varejo' },
    { id: 'E-commerce', name: 'E-commerce & Conversão', route: '/blog/ecommerce' },
    { id: 'Gestão', name: 'Gestão & DRE', route: '/blog/gestao' },
    { id: 'Marketing', name: 'Marketing & WhatsApp', route: '/blog/marketing' },
    { id: 'Inteligência Artificial', name: 'Inteligência Artificial', route: '/blog/inteligencia-artificial' },
  ];

  const filtered = BLOG_ARTICLES.filter((art) => {
    const matchesCat =
      selectedCategory === 'todos' ||
      art.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Blog do Varejo' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Artigos & Estratégias Práticas</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Blog do Varejo: Conhecimento para crescer.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Aprenda as táticas mais recentes de vendas online, controle de estoque, inteligência de dados e atendimento humanizado.
          </p>
        </div>

        {/* SEARCH & CATEGORY PILLS */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar artigos por palavra-chave (ex: estoque, IA, WhatsApp, margem)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  navigate(cat.route as PageRoute);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* FEATURED POST */}
        {filtered.length > 0 && (
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold bg-orange-500 text-white px-2.5 py-1 rounded-md">
                  Artigo em Destaque
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {filtered[0].readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                {filtered[0].title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {filtered[0].summary}
              </p>

              <div className="pt-2 text-xs text-slate-400">
                Publicado em {filtered[0].date} • Por Especialistas BRAND+
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                onClick={() => navigate('/criar-conta')}
                className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Ler Artigo Completo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ARTICLES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/80 p-6 rounded-3xl border border-slate-200/80 hover:bg-white hover:border-orange-500/40 hover:shadow-xl transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span>{item.date}</span>
                <button
                  onClick={() => navigate('/criar-conta')}
                  className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Ler Artigo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NEWSLETTER / ACADEMY BOX */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Receba as melhores dicas de varejo toda semana
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Junte-se a mais de 10.000 lojistas que recebem gratuitamente nossos resumos semanais de inteligência e mercado.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail profissional"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={() => navigate('/criar-conta')}
              className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl whitespace-nowrap shadow-md transition-all"
            >
              Inscrever Grátis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
