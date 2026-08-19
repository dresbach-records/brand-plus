import React from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ShieldCheck, Lock } from 'lucide-react';

interface PrivacyPageProps {
  navigate: (route: PageRoute) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ navigate }) => {
  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Política de Privacidade & LGPD' },
          ]}
          navigate={navigate}
        />

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-orange-600" />
            <span>Privacidade & Proteção de Dados</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Política de Privacidade e Conformidade LGPD
          </h1>
          <p className="text-xs text-slate-500">Última atualização: 15 de Agosto de 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Compromisso com a Privacidade</h2>
            <p>
              A BRAND+ valoriza a privacidade e a segurança das informações de seus clientes e usuários finais. Tratamos dados pessoais em estrita observância à Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Coleta e Finalidade dos Dados</h2>
            <p>
              Coletamos exclusivamente os dados necessários para o fornecimento dos serviços contratados: cadastro de usuários, emissão de cobranças, processamento de pedidos, entrega logística e segurança contra fraudes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Segurança e Criptografia</h2>
            <p>
              Todas as transações e comunicações são protegidas por protocolos de criptografia SSL/TLS de ponta a ponta. Não armazenamos senhas em texto puro nem dados sensíveis de cartões de crédito em servidores próprios.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. Direitos do Titular</h2>
            <p>
              Você pode, a qualquer tempo, solicitar acesso, correção, anonimização ou exclusão definitiva de seus dados cadastrais enviando uma solicitação para privacidade@brandplus.com.br.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
