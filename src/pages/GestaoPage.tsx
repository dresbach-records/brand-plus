import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import {
  Layers,
  Package,
  Boxes,
  Truck,
  Users,
  DollarSign,
  BarChart2,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
} from 'lucide-react';

interface GestaoPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const GestaoPage: React.FC<GestaoPageProps> = ({
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
            { label: 'BRAND+ Gestão & ERP' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Gestão Operacional & Estoque Unificado</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              O coração operacional que organiza e protege seu lucro.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Diga adeus à quebra de estoque, à divergência entre a loja física e online e ao caos das planilhas manuais. O BRAND+ Gestão unifica estoques, pedidos, clientes e finanças em uma interface limpa e intuitiva.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate('/criar-conta')}
                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <span>Começar a Organizar Minha Operação</span>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </button>
              <button
                onClick={openDemoModal}
                className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-colors"
              >
                Ver Demonstração ao Vivo
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <div className="font-bold text-slate-900 text-sm">
                Vantagens da Gestão Unificada BRAND+
              </div>
              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Zero Risco de Venda Duplicada:</strong> Quando uma peça é vendida no balcão da loja física, o estoque na loja virtual é reduzido automaticamente no mesmo segundo.
                  </div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Expedição Ágil e Sem Erros:</strong> Separação orientada por código de barras e emissão de etiquetas de postagem com 1 clique.
                  </div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Emissão Fiscal Descomplicada:</strong> Emissão automática de NF-e e NFC-e vinculada a cada pedido pago.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 MODULES DETAILS */}
        <div className="space-y-8 pt-8 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Controle total de cada área do seu varejo
            </h2>
            <p className="text-sm text-slate-600">
              Estrutura robusta projetada para simplificar sua rotina e economizar horas diárias de retrabalho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Estoque Multi-local e Físico/Online',
                desc: 'Controle almoxarifado, prateleira, loja matriz e filiais em uma única visualização com alertas de estoque mínimo.',
                icon: <Boxes className="w-5 h-5 text-slate-900" />,
              },
              {
                title: 'Central Unificada de Pedidos',
                desc: 'Acompanhe pedidos da loja virtual, balcão, WhatsApp e marketplaces em uma esteira de separação Kanban intuitiva.',
                icon: <Truck className="w-5 h-5 text-slate-900" />,
              },
              {
                title: 'Cadastro Completo de Produtos e SKUs',
                desc: 'Importação em massa via planilha, cadastro de códigos de barras (EAN), custos de compra, fornecedores e margens.',
                icon: <Package className="w-5 h-5 text-slate-900" />,
              },
              {
                title: 'CRM e Histórico de Clientes',
                desc: 'Perfil completo de cada comprador: ticket médio, frequência, categorias favoritas e data do último pedido.',
                icon: <Users className="w-5 h-5 text-slate-900" />,
              },
              {
                title: 'Fluxo de Caixa e DRE Gerencial',
                desc: 'Saiba exatamente quanto sobrou de lucro líquido real no fim do mês descontando taxas, CMV e custos fixos.',
                icon: <DollarSign className="w-5 h-5 text-slate-900" />,
              },
              {
                title: 'Emissão Fiscal Automática',
                desc: 'Certificado A1 integrado para emissão rápida de notas fiscais eletrônicas e envio por e-mail ao consumidor.',
                icon: <FileText className="w-5 h-5 text-slate-900" />,
              },
            ].map((feat, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3 hover:bg-white hover:border-slate-400 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-200/80 flex items-center justify-center">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BANNER */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Dê adeus à desorganização operacional
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Integre seu negócio agora e experimente a tranquilidade de ter todos os números da sua loja sob total controle.
          </p>
          <button
            onClick={() => navigate('/criar-conta')}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
          >
            <span>Testar a Gestão BRAND+</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
