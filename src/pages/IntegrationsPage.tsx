import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { INTEGRATIONS_LIST } from '../data/mockData';
import {
  Layers,
  Search,
  ArrowRight,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface IntegrationsPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const IntegrationsPage: React.FC<IntegrationsPageProps> = ({
  navigate,
  openDemoModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCat, setActiveCat] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todas as Integrações' },
    { id: 'pagamentos', name: 'Pagamentos' },
    { id: 'logistica', name: 'Logística & Frete' },
    { id: 'erp', name: 'ERPs' },
    { id: 'pdv', name: 'PDV & Caixa' },
    { id: 'marketplaces', name: 'Marketplaces' },
    { id: 'fiscal', name: 'Fiscal & NF-e' },
    { id: 'marketing', name: 'Marketing & WhatsApp' },
    { id: 'analytics', name: 'Analytics' },
  ];

  const filtered = INTEGRATIONS_LIST.filter((item) => {
    const matchesCat = activeCat === 'todos' || item.category === activeCat;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Ecossistema & Integrações' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            Conectividade & APIs
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Conecte as ferramentas que seu varejo já utiliza.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A BRAND+ opera em harmonia com os principais meios de pagamento, transportadoras, gateways, ERPs e marketplaces do mercado brasileiro.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar integração (ex: PIX, Correios, Bling, WhatsApp, Meta)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCat === c.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* INTEGRATIONS LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/80 hover:bg-white hover:border-orange-500/40 hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-emerald-700 font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Integração Nativa
                </span>
                <button
                  onClick={() => navigate('/criar-conta')}
                  className="text-orange-600 hover:underline font-bold"
                >
                  Conectar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CUSTOM API PROMPT */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center mx-auto">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Precisa de uma integração personalizada via API?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Nossas APIs RESTful e Webhooks permitem que desenvolvedores conectem qualquer sistema próprio ou banco de dados legado à BRAND+.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/contato')}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Falar com Engenharia de Integrações
            </button>
            <button
              onClick={openDemoModal}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors"
            >
              Documentação de APIs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
