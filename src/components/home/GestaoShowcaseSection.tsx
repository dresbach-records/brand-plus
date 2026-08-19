import React, { useState } from 'react';
import { PageRoute } from '../../types';
import {
  Layers,
  Package,
  Boxes,
  Truck,
  Users,
  DollarSign,
  BarChart2,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Search,
} from 'lucide-react';

interface GestaoShowcaseSectionProps {
  navigate: (route: PageRoute) => void;
}

export const GestaoShowcaseSection: React.FC<GestaoShowcaseSectionProps> = ({
  navigate,
}) => {
  const [activeModule, setActiveModule] = useState<'estoque' | 'pedidos' | 'financeiro' | 'crm'>('estoque');

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-bold uppercase tracking-wider">
              BRAND+ Gestão & ERP • Organizar
            </div>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight">
              Tenha o controle da sua operação.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
              Chega de planilhas desconectadas e perdas de estoque. Centralize produtos, estoque físico e digital, expedição e finanças em uma visão unificada e simples.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              onClick={() => navigate('/produto/gestao')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Conhecer a Gestão</span>
              <ArrowRight className="w-4 h-4 text-orange-400" />
            </button>
          </div>
        </div>

        {/* 7 GESTÃO CARDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
          {[
            { id: 'produtos', title: 'Produtos', icon: <Package className="w-4 h-4" />, count: '1.240 SKUs' },
            { id: 'estoque', title: 'Estoque', icon: <Boxes className="w-4 h-4" />, count: 'Multi-local' },
            { id: 'pedidos', title: 'Pedidos', icon: <Truck className="w-4 h-4" />, count: 'Central Única' },
            { id: 'clientes', title: 'Clientes', icon: <Users className="w-4 h-4" />, count: 'Base Unificada' },
            { id: 'crm', title: 'CRM', icon: <Users className="w-4 h-4" />, count: 'Fidelização' },
            { id: 'financeiro', title: 'Financeiro', icon: <DollarSign className="w-4 h-4" />, count: 'DRE & Fluxo' },
            { id: 'indicadores', title: 'Indicadores', icon: <BarChart2 className="w-4 h-4" />, count: 'Tempo Real' },
          ].map((c) => (
            <div
              key={c.id}
              className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-400 transition-all text-center space-y-1"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto">
                {c.icon}
              </div>
              <div className="font-bold text-slate-900 text-xs">{c.title}</div>
              <div className="text-[10px] text-slate-500 font-mono">{c.count}</div>
            </div>
          ))}
        </div>

        {/* INTERACTIVE GESTÃO DASHBOARD PREVIEW */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
          {/* HEADER BAR */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 text-white">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  Painel de Controle Operacional
                </h4>
                <p className="text-xs text-slate-500">
                  Visão consolidada de todas as lojas físicas e canais digitais
                </p>
              </div>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600 w-full sm:w-auto">
              <button
                onClick={() => setActiveModule('estoque')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg transition-colors ${
                  activeModule === 'estoque' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Estoque Unificado
              </button>
              <button
                onClick={() => setActiveModule('pedidos')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg transition-colors ${
                  activeModule === 'pedidos' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Expedição & Pedidos
              </button>
              <button
                onClick={() => setActiveModule('financeiro')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg transition-colors ${
                  activeModule === 'financeiro' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                DRE Financeiro
              </button>
            </div>
          </div>

          {/* TAB 1: ESTOQUE UNIFICADO */}
          {activeModule === 'estoque' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">Valor Total do Estoque</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">R$ 214.800,00</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-0.5">8.420 unidades em giro</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">Itens em Alerta Mínimo</div>
                  <div className="text-xl font-bold text-amber-600 mt-1">6 produtos</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Reposição sugerida enviada</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500">Taxa de Ruptura de Estoque</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">0.4%</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-0.5">-85% após a BRAND+</div>
                </div>
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/80 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Produto / Variação</th>
                      <th className="p-3">Loja Física</th>
                      <th className="p-3">Estoque Online</th>
                      <th className="p-3">Total Disponível</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">Camisa Linho Clássica (Branca / M)</td>
                      <td className="p-3">12 un</td>
                      <td className="p-3">24 un</td>
                      <td className="p-3 font-bold text-slate-900">36 un</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Estoque Saudável
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">Calça Alfaiataria Slim (Preta / 42)</td>
                      <td className="p-3">3 un</td>
                      <td className="p-3">2 un</td>
                      <td className="p-3 font-bold text-amber-600">5 un</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          Ponto de Reposição
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">Cinto Couro Legítimo (Caramelo / G)</td>
                      <td className="p-3">18 un</td>
                      <td className="p-3">30 un</td>
                      <td className="p-3 font-bold text-slate-900">48 un</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Estoque Saudável
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PEDIDOS & EXPEDIÇÃO */}
          {activeModule === 'pedidos' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900">
                  <div className="font-semibold">Novos Pagos (PIX/Cartão)</div>
                  <div className="text-lg font-bold mt-1">14 pedidos</div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
                  <div className="font-semibold">Em Separação no Balcão</div>
                  <div className="text-lg font-bold mt-1">8 pedidos</div>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-900">
                  <div className="font-semibold">Etiqueta Pronta / Coleta</div>
                  <div className="text-lg font-bold mt-1">21 pedidos</div>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                  <div className="font-semibold">Entregues Hoje</div>
                  <div className="text-lg font-bold mt-1">45 pedidos</div>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                A BRAND+ gera automaticamente a etiqueta de postagem dos Correios/Transportadoras e envia o link de rastreamento no WhatsApp do comprador.
              </p>
            </div>
          )}

          {/* TAB 3: DRE FINANCEIRO */}
          {activeModule === 'financeiro' && (
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-400 uppercase font-sans font-bold">
                <span>Demonstrativo de Resultado (Agosto/2026)</span>
                <span>Consolidado</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>(+) Receita Bruta Total</span>
                <span>R$ 148.620,00</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>(-) Impostos & Taxas de Gateway</span>
                <span>- R$ 11.889,60 (8.0%)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>(-) Custo da Mercadoria Vendida (CMV)</span>
                <span>- R$ 68.365,20 (46.0%)</span>
              </div>
              <div className="flex justify-between text-slate-300 font-bold border-t border-slate-800 pt-1">
                <span>(=) Lucro Bruto Operacional</span>
                <span className="text-orange-400">R$ 68.365,20 (46.0%)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>(-) Despesas Fixas & Pessoal</span>
                <span>- R$ 28.500,00</span>
              </div>
              <div className="flex justify-between text-emerald-300 font-bold text-sm border-t-2 border-slate-700 pt-2 font-sans">
                <span>(=) Lucro Líquido Real</span>
                <span className="text-emerald-400">R$ 39.865,20 (26.8%)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
