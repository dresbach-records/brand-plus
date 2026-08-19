import React, { useState } from 'react';
import { PageRoute } from '../../types';
import {
  ShoppingBag,
  Smartphone,
  Monitor,
  CreditCard,
  Tag,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  ShoppingBag as CartIcon,
  Percent,
  Truck,
  Heart,
  Star,
} from 'lucide-react';

interface CommerceShowcaseSectionProps {
  navigate: (route: PageRoute) => void;
}

export const CommerceShowcaseSection: React.FC<CommerceShowcaseSectionProps> = ({
  navigate,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile' | 'checkout' | 'produto'>('desktop');

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
              BRAND+ Commerce • Vender
            </div>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight">
              Sua loja. Sua marca. Seu negócio.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
              Crie uma experiência de compra profissional sem precisar dominar tecnologia. Uma loja virtual rápida, elegante e pronta para converter visitantes em clientes fiéis.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              onClick={() => navigate('/produto/commerce')}
              className="px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>Conhecer o Commerce</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* INTERACTIVE VIEW SWITCHER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-slate-100/80 p-1.5 rounded-2xl max-w-xl mx-auto">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              viewMode === 'desktop'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-4 h-4 text-orange-500" />
            <span>Loja Desktop</span>
          </button>

          <button
            onClick={() => setViewMode('mobile')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              viewMode === 'mobile'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4 text-orange-500" />
            <span>Loja Mobile</span>
          </button>

          <button
            onClick={() => setViewMode('produto')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              viewMode === 'produto'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tag className="w-4 h-4 text-orange-500" />
            <span>Página de Produto</span>
          </button>

          <button
            onClick={() => setViewMode('checkout')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              viewMode === 'checkout'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-orange-500" />
            <span>Checkout 1-Clique</span>
          </button>
        </div>

        {/* MOCKUP SHOWCASE CONTAINER */}
        <div className="bg-slate-900 rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* 1. DESKTOP VIEW */}
          {viewMode === 'desktop' && (
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-700 shadow-2xl animate-in fade-in duration-200">
              {/* BROWSER BAR */}
              <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-3 border-b border-slate-200 text-xs text-slate-500">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="bg-white px-4 py-1 rounded-md border border-slate-200 text-slate-700 font-mono text-[11px] flex-1 max-w-md mx-auto text-center flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>https://www.sualoja.com.br</span>
                </div>
              </div>

              {/* STORE HOMEPAGE PREVIEW */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* STORE HEADER */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                    BOUTIQUE <span className="text-orange-600">AURORA</span>
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-700">
                    <span className="text-orange-600">Novidades</span>
                    <span>Vestuário</span>
                    <span>Calçados</span>
                    <span>Acessórios</span>
                    <span className="text-red-500">Promoções</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-700 cursor-pointer">
                      <CartIcon className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-900 bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-[11px]">
                      3 itens
                    </span>
                  </div>
                </div>

                {/* STORE HERO BANNER */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="px-2.5 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider">
                      Coleção Verão 2026
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      Elegância e Conforto para Toda Hora.
                    </h3>
                    <p className="text-xs text-slate-300">Frete grátis via Sedex e 5% de desconto no PIX instantâneo.</p>
                  </div>
                  <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl whitespace-nowrap shadow-md">
                    Comprar Agora
                  </button>
                </div>

                {/* FEATURED PRODUCTS ROW */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Destaques Mais Vendidos
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {[
                      { name: 'Vestido Midi Alfaiataria', price: 'R$ 289,90', pix: 'R$ 275,40 no PIX', tag: 'Destaque' },
                      { name: 'Sandália Couro Confort', price: 'R$ 219,00', pix: 'R$ 208,05 no PIX', tag: 'Lançamento' },
                      { name: 'Bolsa Estruturada Tressê', price: 'R$ 349,00', pix: 'R$ 331,55 no PIX', tag: '-15% OFF' },
                      { name: 'Óculos Solar Polarizado', price: 'R$ 179,00', pix: 'R$ 170,05 no PIX', tag: 'Últimas peças' },
                    ].map((item, i) => (
                      <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-2">
                        <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 relative">
                          <ShoppingBag className="w-8 h-8 opacity-40" />
                          <span className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase bg-slate-900 text-white px-1.5 py-0.5 rounded-sm">
                            {item.tag}
                          </span>
                        </div>
                        <div className="font-semibold text-slate-900 text-xs truncate">{item.name}</div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{item.price}</div>
                          <div className="text-[10px] text-emerald-600 font-semibold">{item.pix}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. MOBILE VIEW */}
          {viewMode === 'mobile' && (
            <div className="max-w-xs mx-auto bg-slate-950 rounded-[40px] p-3 border-4 border-slate-700 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="bg-white rounded-[32px] overflow-hidden p-4 space-y-4 text-slate-800">
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="font-bold text-slate-900">LOJA DIGITAL</span>
                  <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px]">
                    2
                  </div>
                </div>

                <div className="bg-orange-500 text-white p-4 rounded-2xl text-center space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider">Cupom: BEMVINDO10</div>
                  <div className="text-sm font-bold">10% OFF no 1º Pedido</div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-900">Produtos em Alta</div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {[1, 2].map((k) => (
                      <div key={k} className="w-32 shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-200">
                        <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 mb-1">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div className="text-[11px] font-semibold truncate">Item Premium #{k}</div>
                        <div className="text-xs font-bold text-orange-600">R$ 199,00</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-2.5 bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md">
                  Ver Todo o Catálogo Mobile
                </button>
              </div>
            </div>
          )}

          {/* 3. PRODUCT PAGE VIEW */}
          {viewMode === 'produto' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-700 shadow-2xl animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="aspect-4/3 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-200 relative">
                  <ShoppingBag className="w-16 h-16 text-orange-400 opacity-60" />
                  <span className="absolute bottom-3 left-3 bg-white/90 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-xs">
                    Fotos em Alta Definição & Zoom
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      Em Estoque • Pronta Entrega
                    </span>
                    <div className="flex items-center text-amber-500 text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold ml-1 text-slate-700">4.9</span>
                      <span className="text-slate-400 ml-1">(48 avaliações)</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    Vestido Midi Linho Puro com Cinto
                  </h3>

                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-slate-900">R$ 299,00</span>
                    <span className="text-sm text-slate-400 line-through">R$ 349,00</span>
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-sm">-14%</span>
                  </div>

                  <div className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg">
                    R$ 284,05 com 5% de desconto no PIX instantâneo
                  </div>

                  {/* VARIATION SELECTOR */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-700">Selecione o Tamanho:</div>
                    <div className="flex gap-2">
                      {['P', 'M', 'G', 'GG'].map((tam, idx) => (
                        <button
                          key={tam}
                          className={`w-10 h-10 rounded-xl font-bold text-xs border ${
                            idx === 1
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {tam}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button className="flex-1 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adicionar à Sacola</span>
                    </button>
                    <button className="p-3.5 border border-slate-200 rounded-xl text-slate-600 hover:text-red-500 hover:bg-red-50">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. CHECKOUT 1-CLIQUE VIEW */}
          {viewMode === 'checkout' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-700 shadow-2xl max-w-xl mx-auto animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Checkout Seguro 1-Clique BRAND+</span>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                  Conversão 42% Maior
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex justify-between font-medium text-slate-700">
                    <span>1x Vestido Midi Linho Puro (M)</span>
                    <span className="font-bold text-slate-900">R$ 299,00</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Frete Sedex Expresso</span>
                    <span className="text-emerald-600 font-bold">GRÁTIS</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-200">
                    <span>Total a Pagar</span>
                    <span className="text-orange-600">R$ 284,05 no PIX</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-slate-800">Forma de Pagamento Preferida:</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl border-2 border-orange-500 bg-orange-50/50 text-center font-bold text-orange-950">
                      PIX (-5%)
                    </div>
                    <div className="p-2.5 rounded-xl border border-slate-200 text-center text-slate-600 font-medium">
                      Cartão de Crédito
                    </div>
                    <div className="p-2.5 rounded-xl border border-slate-200 text-center text-slate-600 font-medium">
                      Boleto
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-3 rounded-xl border border-orange-200 text-center space-y-1">
                  <div className="font-bold text-orange-900">QR Code PIX Gerado Automaticamente</div>
                  <div className="text-[11px] text-orange-700">Aprovação imediata em menos de 3 segundos</div>
                </div>

                <button className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Finalizar Pedido com 1 Clique</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 8 COMMERCE CAPABILITIES PILLS */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { title: 'Loja Virtual', desc: 'Customizável com sua identidade e domínio próprio' },
            { title: 'Catálogo Digital', desc: 'Grade completa de cores, tamanhos e fotos HD' },
            { title: 'Checkout 1-Clique', desc: 'Sem senhas complicadas e formulários longos' },
            { title: 'PIX & Cartão', desc: 'Taxas negociadas e antifraude integrado' },
            { title: 'Promoções & Cupons', desc: 'Regras dinâmicas por valor, categoria ou cliente' },
            { title: 'Cálculo de Frete', desc: 'Sedex, transportadoras e motoboy no mesmo dia' },
            { title: 'Link de Pagamento', desc: 'Feche vendas diretas pelo WhatsApp com segurança' },
            { title: 'Central de Pedidos', desc: 'Notificações automáticas via WhatsApp ao cliente' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span className="font-bold text-slate-900 text-sm">{item.title}</span>
              </div>
              <p className="text-xs text-slate-600 pl-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
