import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { INTEGRATIONS_LIST } from '../../data/mockData';
import {
  Layers,
  Search,
  ArrowRight,
  CreditCard,
  Truck,
  Database,
  Monitor,
  ShoppingBag,
  FileText,
  Megaphone,
  BarChart2,
  CheckCircle2,
} from 'lucide-react';

interface IntegrationsPreviewSectionProps {
  navigate: (route: PageRoute) => void;
}

export const IntegrationsPreviewSection: React.FC<IntegrationsPreviewSectionProps> = ({
  navigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', name: 'Todas' },
    { id: 'pagamentos', name: 'Pagamentos' },
    { id: 'logistica', name: 'Logística' },
    { id: 'erp', name: 'ERPs de Mercado' },
    { id: 'pdv', name: 'PDV & Frente de Caixa' },
    { id: 'marketplaces', name: 'Marketplaces' },
    { id: 'fiscal', name: 'Fiscal & NF-e' },
    { id: 'marketing', name: 'Marketing & WhatsApp' },
    { id: 'analytics', name: 'Analytics' },
  ];

  const filtered = selectedCategory === 'todos'
    ? INTEGRATIONS_LIST
    : INTEGRATIONS_LIST.filter((i) => i.category === selectedCategory);

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            Ecossistema Aberto
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight">
            A BRAND+ acompanha o seu ecossistema.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Conecte as ferramentas que você já utiliza com facilidade. Pagamentos, logística, emissores fiscais e ERPs integrados sem dor de cabeça.
          </p>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === c.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* INTEGRATIONS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filtered.slice(0, 9).map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-orange-500/40 hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/integracoes')}
            className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Conhecer Todas as Integrações</span>
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
