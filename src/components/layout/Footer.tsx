import React from 'react';
import { BrandLogo } from '../brand/Logo';
import { PageRoute } from '../../types';
import {
  ShieldCheck,
  Lock,
  Server,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Globe,
} from 'lucide-react';

interface FooterProps {
  navigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const handleNav = (route: PageRoute) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BRAND HIGHLIGHT BANNER */}
        <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 border border-slate-700/70 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold border border-orange-500/20">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              Plataforma B2B para o Varejo Brasileiro
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Pronto para transformar a sua loja tradicional em uma potência digital?
            </h3>
            <p className="text-sm text-slate-400 max-w-2xl">
              Junte-se a centenas de varejistas que vendem, gerenciam e escalam suas operações com a BRAND+.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => handleNav('/criar-conta')}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-95 text-center"
            >
              Criar Conta Gratuita
            </button>
            <button
              onClick={() => handleNav('/contato')}
              className="w-full md:w-auto px-5 py-3 bg-slate-700/80 hover:bg-slate-700 text-white font-medium text-sm rounded-xl border border-slate-600 transition-colors text-center"
            >
              Falar com Vendas
            </button>
          </div>
        </div>

        {/* MAIN FOOTER COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* BRAND COLUMN */}
          <div className="col-span-2 space-y-4">
            <div
              onClick={() => handleNav('/')}
              className="cursor-pointer inline-block"
            >
              <BrandLogo light size="lg" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Plataforma de transformação digital e crescimento para o varejo.
              Combinamos e-commerce, gestão integrada, inteligência de dados e capacitação em um único ecossistema tecnológico.
            </p>
            <div className="text-xs text-orange-400 font-semibold tracking-wider uppercase">
              Vender • Gerenciar • Crescer • Aprender
            </div>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>São Paulo, SP • Brasil — Atendimento Nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>contato@brandplus.com.br</span>
              </div>
            </div>
          </div>

          {/* COL 1: PRODUTO */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Produto</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('/produto/commerce')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Commerce (Loja Virtual)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/produto/gestao')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Gestão & ERP
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/produto/inteligencia')}
                  className="hover:text-orange-400 transition-colors"
                >
                  BRAND+ Intelligence (IA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/produto/academy')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Academy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/integracoes')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Integrações & APIs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/planos')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Planos & Preços
                </button>
              </li>
            </ul>
          </div>

          {/* COL 2: EMPRESA */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('/sobre')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Sobre a BRAND+
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/cases')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Cases de Sucesso
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/empresas')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Soluções Corporativas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contato')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Parcerias & Canais
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contato')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Fale com a Diretoria
                </button>
              </li>
            </ul>
          </div>

          {/* COL 3: RECURSOS & LEGAL */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Recursos & Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('/blog')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Blog do Varejista
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/academy')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Cursos & Guias
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/ajuda')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Central de Ajuda
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/termos')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Termos de Uso
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/privacidade')}
                  className="hover:text-orange-400 transition-colors"
                >
                  Privacidade & LGPD
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM METRICS & COMPLIANCE BAR */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Conforme com a LGPD (Lei 13.709/18)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-4 h-4 text-orange-400" />
              <span>Criptografia SSL de 256 bits</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Sistemas 100% Operacionais (SLA 99.9%)</span>
            </div>
          </div>

          <div className="text-center md:text-right text-slate-500">
            © 2026 BRAND+ Tecnologia SaaS. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
