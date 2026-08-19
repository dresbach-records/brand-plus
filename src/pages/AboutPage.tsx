import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { AboutValuesSection } from '../components/home/AboutValuesSection';
import {
  Target,
  Compass,
  ShieldCheck,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react';

interface AboutPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  navigate,
  openDemoModal,
}) => {
  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Sobre a BRAND+' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            Quem Somos
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Democratizando a tecnologia e a inteligência para o varejo brasileiro.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Nascemos com a convicção de que o pequeno e médio comerciante não deve ficar refém de ferramentas fragmentadas ou soluções caras reservadas apenas para grandes corporações.
          </p>
        </div>

        {/* STORY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl space-y-4 border border-slate-800 shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
              Nossa Origem
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Criada no Brasil, para a realidade do comércio brasileiro.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sabemos que vender no Brasil envolve lidar com complexidade tributária, desafios logísticos continentais e a necessidade de atender o consumidor tanto no balcão físico quanto pelo WhatsApp.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Por isso, a BRAND+ integra ferramentas pensadas exatamente para os fluxos reais do comércio nacional, combinando facilidade de uso, inteligência artificial e suporte 100% humanizado.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span>Foco Absoluto em Lucratividade</span>
              </div>
              <p className="text-xs text-slate-600">
                Não medimos nosso sucesso pelo número de botões do sistema, mas pelo aumento da margem líquida e economia de tempo dos nossos clientes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-orange-600" />
                <span>Apoio e Capacitação Contínua</span>
              </div>
              <p className="text-xs text-slate-600">
                Acreditamos que a tecnologia sem educação é inútil. Por isso investimos pesadamente na BRAND+ Academy para formar lojistas e suas equipes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-600" />
                <span>Segurança e Confiabilidade</span>
              </div>
              <p className="text-xs text-slate-600">
                Infraestrutura redundante com 99.9% de uptime para garantir que sua loja nunca fique fora do ar nos momentos mais críticos de venda.
              </p>
            </div>
          </div>
        </div>

        {/* EMBEDDED VALUES */}
        <AboutValuesSection navigate={navigate} />

        {/* CTA */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Venha fazer parte da transformação digital do varejo
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Abra sua conta na BRAND+ e descubra como uma plataforma unificada pode acelerar os resultados do seu comércio.
          </p>
          <button
            onClick={() => navigate('/criar-conta')}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
          >
            <span>Começar Agora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
