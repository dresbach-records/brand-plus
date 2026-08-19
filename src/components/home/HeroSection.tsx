import React, { useState } from 'react';
import { PageRoute } from '../../types';
import {
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  Sparkles,
  Layers,
  CheckCircle2,
  DollarSign,
  Package,
  Users,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  BarChart3,
  RefreshCw,
  Bell,
  Search,
} from 'lucide-react';

interface HeroSectionProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  navigate,
  openDemoModal,
}) => {
  const [activeTab, setActiveTab] = useState<'vendas' | 'produtos' | 'ia'>('vendas');
  const [salesPeriod, setSalesPeriod] = useState<'Hoje' | 'Esta Semana' | 'Este Mês'>('Este Mês');

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-28 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40">
      {/* BACKGROUND DECORATIVE GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-orange-400/10 via-amber-300/10 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: HEADLINE & COPY */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/70 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-bold text-orange-800 tracking-wide">
                Plataforma B2B para o Varejo
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-medium text-slate-600">
                Transformação Digital
              </span>
            </div>

            {/* MAIN HEADLINE */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Transforme seu varejo em um{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600">
                negócio digital.
              </span>
            </h1>

            {/* SUBHEADLINE */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              A <strong className="text-slate-900 font-semibold">BRAND+</strong> reúne tecnologia, gestão, inteligência de dados e capacitação para ajudar sua empresa a vender, organizar e crescer no digital.
            </p>

            {/* KEY HIGHLIGHT BULLETS */}
            <div className="grid grid-cols-2 gap-2.5 pt-1 max-w-lg mx-auto lg:mx-0 text-left text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Loja virtual & Checkout rápido</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Estoque físico e online 100% unificado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Copiloto de IA com alertas de lucro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Treinamento completo para sua equipe</span>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                id="hero-btn-comecar"
                onClick={() => navigate('/criar-conta')}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>Começar agora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-btn-conhecer"
                onClick={() => navigate('/produto')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-200 shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Conhecer a plataforma</span>
                <Layers className="w-4 h-4 text-slate-400" />
              </button>

              <button
                id="hero-btn-demo"
                onClick={openDemoModal}
                className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-orange-700 hover:text-orange-800 hover:underline transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>Agendar Tour Guiado</span>
              </button>
            </div>

            {/* TRUST PROOF */}
            <div className="pt-4 border-t border-slate-200/60 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Sem taxa de instalação</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-500" />
                <span>Ativação guiada e rápida</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: HIGH-PRECISION SAAS DASHBOARD MOCKUP */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* GLASS / FRAME CONTAINER */}
              <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden brand-glow">
                {/* WINDOW HEADER */}
                <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/90" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono ml-2">app.brandplus.com.br/dashboard</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Operação ao vivo
                    </span>
                  </div>
                </div>

                {/* DASHBOARD INNER BODY */}
                <div className="p-4 sm:p-5 bg-slate-50/50 space-y-4">
                  {/* TOP KPI CARDS GRID */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {/* KPI 1: FATURAMENTO */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Faturamento</div>
                      <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">R$ 148.620</div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>+18.4%</span>
                      </div>
                    </div>

                    {/* KPI 2: PEDIDOS */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pedidos</div>
                      <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">642 un</div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>+12.1%</span>
                      </div>
                    </div>

                    {/* KPI 3: TICKET MÉDIO */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Ticket Médio</div>
                      <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">R$ 231,50</div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>+5.6%</span>
                      </div>
                    </div>

                    {/* KPI 4: MARGEM BRUTA */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Margem Bruta</div>
                      <div className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">41.8%</div>
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Saudável</span>
                      </div>
                    </div>
                  </div>

                  {/* INTERACTIVE MOCKUP CONTROLS */}
                  <div className="flex items-center justify-between bg-white p-1.5 rounded-xl border border-slate-200 text-xs">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setActiveTab('vendas')}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                          activeTab === 'vendas'
                            ? 'bg-orange-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Gráfico de Vendas
                      </button>
                      <button
                        onClick={() => setActiveTab('produtos')}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                          activeTab === 'produtos'
                            ? 'bg-orange-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Estoque & SKUs
                      </button>
                      <button
                        onClick={() => setActiveTab('ia')}
                        className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-colors ${
                          activeTab === 'ia'
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-orange-600 hover:bg-orange-50'
                        }`}
                      >
                        <Sparkles className="w-3 h-3 text-orange-400" />
                        <span>Recomendações IA</span>
                      </button>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-medium pr-2">
                      <span>Período:</span>
                      <span className="font-semibold text-slate-700">Agosto/2026</span>
                    </div>
                  </div>

                  {/* TAB 1: GRÁFICO DE VENDAS & MULTICANAL */}
                  {activeTab === 'vendas' && (
                    <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold text-slate-800">
                          Evolução Diária de Vendas (Loja Física + Online)
                        </div>
                        <div className="flex items-center gap-3 text-[11px]">
                          <span className="flex items-center gap-1 font-medium text-slate-600">
                            <span className="w-2.5 h-2.5 rounded-sm bg-orange-500"></span> Digital
                          </span>
                          <span className="flex items-center gap-1 font-medium text-slate-600">
                            <span className="w-2.5 h-2.5 rounded-sm bg-slate-800"></span> Balcão Físico
                          </span>
                        </div>
                      </div>

                      {/* SIMULATED RESPONSIVE BAR/AREA CHART */}
                      <div className="h-32 w-full flex items-end justify-between gap-1.5 pt-4 pb-1">
                        {[
                          { day: '01', dig: 40, fis: 30 },
                          { day: '05', dig: 55, fis: 35 },
                          { day: '09', dig: 45, fis: 40 },
                          { day: '13', dig: 70, fis: 38 },
                          { day: '17', dig: 85, fis: 42 },
                          { day: '21', dig: 65, fis: 36 },
                          { day: '25', dig: 92, fis: 45 },
                          { day: '29', dig: 100, fis: 50 },
                        ].map((bar, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group cursor-pointer">
                            <div className="w-full flex flex-col gap-0.5 items-center">
                              <div
                                style={{ height: `${bar.dig * 0.8}px` }}
                                className="w-full max-w-[20px] bg-orange-500 rounded-t-xs transition-all group-hover:bg-orange-600"
                              />
                              <div
                                style={{ height: `${bar.fis * 0.7}px` }}
                                className="w-full max-w-[20px] bg-slate-800 rounded-b-xs transition-all group-hover:bg-slate-900"
                              />
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">{bar.day}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Pico de conversão: <strong>Sexta-feira 19h-22h (PIX 1-clique)</strong></span>
                        <span className="text-orange-600 font-semibold cursor-pointer hover:underline">Ver relatório completo</span>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: PRODUTOS & ESTOQUE */}
                  {activeTab === 'produtos' && (
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Top Produtos & Nível de Estoque</span>
                        <span className="text-[11px] text-slate-400 font-normal">Sincronizado há 2min</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { name: 'Vestido Linho Premium', sku: 'MOD-842', stock: 42, sold: 128, margin: '54%', status: 'Alta rotação' },
                          { name: 'Tênis Couro Casual', sku: 'CAL-109', stock: 18, sold: 94, margin: '48%', status: 'Estoque ideal' },
                          { name: 'Bolsa Estruturada Café', sku: 'ACS-054', stock: 5, sold: 61, margin: '62%', status: 'Ponto de pedido' },
                        ].map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-md bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-[10px]">
                                #{idx + 1}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">{p.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono">SKU {p.sku} • {p.sold} vendidos</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-slate-900">Margem: {p.margin}</div>
                              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                                p.status === 'Ponto de pedido'
                                  ? 'bg-amber-100 text-amber-800 font-semibold'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {p.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: BRAND+ INTELLIGENCE PREDICTIVE AI */}
                  {activeTab === 'ia' && (
                    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-inner space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-md bg-orange-500 text-white">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-white tracking-wide">
                            BRAND+ Intelligence Copilot
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          Diagnóstico Ativo
                        </span>
                      </div>

                      <div className="bg-slate-800/90 rounded-lg p-3 border border-slate-700 text-xs space-y-2">
                        <div className="text-slate-300 font-medium">
                          &quot;Seu faturamento cresceu <strong>18.4%</strong> nesta quinzena, mas a margem do <em>Tênis Couro Casual</em> caiu <strong>3.2%</strong> devido ao novo frete regional.&quot;
                        </div>
                        <div className="p-2 bg-orange-500/10 border-l-2 border-orange-500 text-[11px] text-orange-200">
                          <strong>Recomendação da IA:</strong> Ajustar o preço de R$ 289 para R$ 299 e ativar frete grátis apenas acima de R$ 350. Recuperação estimada de +R$ 1.840 no lucro líquido.
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>Ação sugerida: 1 clique para aplicar</span>
                        <button
                          onClick={() => navigate('/produto/inteligencia')}
                          className="text-orange-400 font-semibold hover:underline flex items-center gap-1"
                        >
                          Explorar Copiloto <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* BOTTOM RECENT ORDER LIVE NOTIFICATION */}
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">Novo pedido #4819 pago via PIX</span>
                        <span className="text-slate-400 ml-1.5">(R$ 389,00 • Curitiba/PR)</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">agora</span>
                  </div>
                </div>
              </div>

              {/* FLOATING BENEFIT BADGES AROUND MOCKUP */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white p-3 rounded-2xl border border-slate-200 shadow-xl items-center gap-3 animate-bounce duration-1000">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Conversão Média</div>
                  <div className="text-sm font-bold text-slate-900">+3.8x no digital</div>
                </div>
              </div>

              <div className="hidden sm:flex absolute -top-5 -right-5 bg-white p-3 rounded-2xl border border-slate-200 shadow-xl items-center gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Inteligência BRAND+</div>
                  <div className="text-sm font-bold text-slate-900">Margem sob controle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
