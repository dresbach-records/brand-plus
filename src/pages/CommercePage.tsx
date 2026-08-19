import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import {
  ShoppingBag,
  Zap,
  Smartphone,
  CreditCard,
  Tag,
  ShieldCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  BarChart2,
} from 'lucide-react';

interface CommercePageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const CommercePage: React.FC<CommercePageProps> = ({
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
            { label: 'BRAND+ Commerce' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>E-commerce & Catálogo Digital</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Sua loja virtual rápida, elegante e feita para converter.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              O BRAND+ Commerce oferece toda a infraestrutura para você criar uma presença digital marcante, com catálogo interativo de alta velocidade, checkout transparente em 1 clique e gestão integrada de fretes e pagamentos.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate('/criar-conta')}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <span>Criar Minha Loja Grátis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={openDemoModal}
                className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-colors"
              >
                Agendar Demonstração
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="font-bold text-sm">Resumo da Experiência Commerce</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded">
                  99.98% Uptime
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-orange-400">Velocidade de Carregamento</div>
                  <div className="text-slate-300">Tempo de resposta inferior a 0.8s em redes 4G/5G móveis.</div>
                </div>

                <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-emerald-400">Checkout Transparente</div>
                  <div className="text-slate-300">PIX com QR Code dinâmico e aprovação instantânea em 3 segundos.</div>
                </div>

                <div className="p-3 bg-slate-800 rounded-xl space-y-1">
                  <div className="font-bold text-blue-400">Recuperação via WhatsApp</div>
                  <div className="text-slate-300">Disparo automático de link para carrinhos com intenção de compra.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 MAIN FEATURES */}
        <div className="space-y-8 pt-8 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Recursos construídos para o dia a dia do lojista
            </h2>
            <p className="text-sm text-slate-600">
              Tudo o que é essencial para vender com segurança, sem complicações técnicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Catálogo Inteligente com Variações',
                desc: 'Organize produtos com múltiplas grades de cores, tamanhos, fotos em alta definição e controle automático de esgotamento.',
                icon: <Tag className="w-5 h-5 text-orange-600" />,
              },
              {
                title: 'Checkout 1-Clique sem Senhas',
                desc: 'Seu cliente compra informando apenas o telefone ou CPF, aumentando drasticamente a taxa de conversão no primeiro pedido.',
                icon: <Zap className="w-5 h-5 text-orange-600" />,
              },
              {
                title: 'PIX, Cartão e Boletos Integrados',
                desc: 'Receba pagamentos com taxas altamente competitivas e sistema antifraude de última geração já incluso.',
                icon: <CreditCard className="w-5 h-5 text-orange-600" />,
              },
              {
                title: 'Cálculo de Frete & Logística Automatizada',
                desc: 'Integração direta com Correios, transportadoras privadas e opção de Retirada na Loja Física (Click & Collect).',
                icon: <Truck className="w-5 h-5 text-orange-600" />,
              },
              {
                title: 'Motor de Promoções e Cupons Dinâmicos',
                desc: 'Crie cupons de primeira compra, frete grátis condicional e promoções progressivas por quantidade de itens.',
                icon: <PercentIcon className="w-5 h-5 text-orange-600" />,
              },
              {
                title: 'Certificado de Segurança SSL & Domínio',
                desc: 'Sua loja protegida com criptografia de ponta a ponta e conectada ao seu próprio endereço na web (ex: suaempresa.com.br).',
                icon: <Lock className="w-5 h-5 text-orange-600" />,
              },
            ].map((feat, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3 hover:bg-white hover:border-orange-500/40 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Comece a vender online hoje mesmo com a BRAND+
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Ativação rápida, importação simplificada de produtos e suporte humano dedicado para colocar sua loja no ar.
          </p>
          <button
            onClick={() => navigate('/criar-conta')}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
          >
            <span>Criar Minha Conta Gratuita</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PercentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <span className={`font-bold font-mono text-base ${className}`}>%</span>
);
