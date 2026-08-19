import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../brand/Logo';
import { PageRoute } from '../../types';
import {
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  Layers,
  Sparkles,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Store,
  HelpCircle,
  BookOpen,
  Users,
  Shield,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

interface HeaderProps {
  currentRoute: PageRoute;
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  navigate,
  openDemoModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: PageRoute) => {
    navigate(route);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div
            id="header-brand-logo"
            onClick={() => handleNavClick('/')}
            className="cursor-pointer flex items-center gap-2 group transition-transform active:scale-95"
          >
            <BrandLogo size="md" />
          </div>

          {/* DESKTOP NAVIGATION MENU */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium text-slate-700">
            {/* DROPDOWN: PRODUTO */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('produto')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-dropdown-produto"
                onClick={() => handleNavClick('/produto')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-950 hover:bg-slate-50 transition-colors ${
                  currentRoute.startsWith('/produto') ? 'text-orange-600 font-semibold' : ''
                }`}
              >
                Produto
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'produto' ? 'rotate-180 text-orange-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'produto' && (
                <div className="absolute left-0 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-2">
                    Os 4 Pilares BRAND+
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => handleNavClick('/produto/commerce')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-orange-50/70 group flex items-start gap-3 transition-colors"
                    >
                      <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-orange-600 flex items-center gap-1 text-sm">
                          Commerce <span className="text-[10px] font-bold uppercase bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-sm">Vender</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">Loja virtual, catálogo, checkout & pagamentos</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('/produto/gestao')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 group flex items-start gap-3 transition-colors"
                    >
                      <div className="p-2 bg-slate-100 text-slate-700 rounded-lg group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1 text-sm">
                          Gestão & Business <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-sm">Organizar</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">Estoque, pedidos, clientes, financeiro e CRM</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('/produto/inteligencia')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-orange-50/70 group flex items-start gap-3 transition-colors"
                    >
                      <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-orange-600 flex items-center gap-1 text-sm">
                          Intelligence & IA <span className="text-[10px] font-bold uppercase bg-orange-500 text-white px-1.5 py-0.5 rounded-sm">Crescer</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">Copiloto de IA, análise de margem & automações</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleNavClick('/produto/academy')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 group flex items-start gap-3 transition-colors"
                    >
                      <div className="p-2 bg-slate-100 text-slate-700 rounded-lg group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-1 text-sm">
                          Academy <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-sm">Aprender</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">Cursos práticos, trilhas e capacitação para varejo</p>
                      </div>
                    </button>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 px-3 py-1 flex items-center justify-between">
                    <button
                      onClick={() => handleNavClick('/produto')}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                    >
                      Ver visão geral do ecossistema <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* COMO FUNCIONA */}
            <button
              id="nav-link-como-funciona"
              onClick={() => handleNavClick('/como-funciona')}
              className={`px-3 py-2 rounded-lg hover:text-slate-950 hover:bg-slate-50 transition-colors ${
                currentRoute === '/como-funciona' ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              Como Funciona
            </button>

            {/* ACADEMY */}
            <button
              id="nav-link-academy"
              onClick={() => handleNavClick('/academy')}
              className={`px-3 py-2 rounded-lg hover:text-slate-950 hover:bg-slate-50 transition-colors ${
                currentRoute.startsWith('/academy') ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              Academy
            </button>

            {/* PREÇOS / PLANOS */}
            <button
              id="nav-link-planos"
              onClick={() => handleNavClick('/planos')}
              className={`px-3 py-2 rounded-lg hover:text-slate-950 hover:bg-slate-50 transition-colors ${
                currentRoute === '/planos' ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              Preços & Planos
            </button>

            {/* EMPRESAS / ENTERPRISE */}
            <button
              id="nav-link-empresas"
              onClick={() => handleNavClick('/empresas')}
              className={`px-3 py-2 rounded-lg hover:text-slate-950 hover:bg-slate-50 transition-colors ${
                currentRoute === '/empresas' ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              Empresas
            </button>

            {/* DROPDOWN: RECURSOS */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('recursos')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-dropdown-recursos"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-950 hover:bg-slate-50 transition-colors"
              >
                Recursos
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'recursos' ? 'rotate-180 text-orange-600' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'recursos' && (
                <div className="absolute right-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="space-y-1">
                    <button
                      onClick={() => handleNavClick('/integracoes')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900"
                    >
                      <Layers className="w-4 h-4 text-orange-500" />
                      <span>Ecossistema de Integrações</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/cases')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900"
                    >
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>Cases de Sucesso</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/blog')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900"
                    >
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span>Blog & Artigos</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/sobre')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900"
                    >
                      <Users className="w-4 h-4 text-slate-600" />
                      <span>Sobre a BRAND+</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/ajuda')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900"
                    >
                      <HelpCircle className="w-4 h-4 text-amber-500" />
                      <span>Central de Ajuda</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/contato')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 flex items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900"
                    >
                      <PhoneCall className="w-4 h-4 text-orange-600" />
                      <span>Falar com Consultores</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ACTION BUTTONS (DESKTOP) */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              id="header-btn-login"
              onClick={() => handleNavClick('/login')}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Entrar
            </button>

            <button
              id="header-btn-demo"
              onClick={openDemoModal}
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 border border-slate-200 rounded-lg transition-colors"
            >
              Ver Demo
            </button>

            <button
              id="header-btn-comecar"
              onClick={() => handleNavClick('/criar-conta')}
              className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-lg shadow-sm hover:shadow transition-all transform active:scale-95 flex items-center gap-1.5"
            >
              <span>Começar agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="mobile-btn-comecar-fast"
              onClick={() => handleNavClick('/criar-conta')}
              className="text-xs font-semibold px-3 py-1.5 bg-orange-600 text-white rounded-lg"
            >
              Começar
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-hidden"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white z-50 overflow-y-auto border-t border-slate-200 p-5 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Plataforma BRAND+
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('/produto/commerce')}
                  className="p-2.5 bg-slate-50 rounded-xl text-left hover:bg-orange-50"
                >
                  <div className="font-semibold text-slate-900 text-xs">Commerce</div>
                  <div className="text-[11px] text-slate-500">Loja & Checkout</div>
                </button>
                <button
                  onClick={() => handleNavClick('/produto/gestao')}
                  className="p-2.5 bg-slate-50 rounded-xl text-left hover:bg-slate-100"
                >
                  <div className="font-semibold text-slate-900 text-xs">Gestão & ERP</div>
                  <div className="text-[11px] text-slate-500">Estoque & Pedidos</div>
                </button>
                <button
                  onClick={() => handleNavClick('/produto/inteligencia')}
                  className="p-2.5 bg-orange-50/60 rounded-xl text-left hover:bg-orange-100/60"
                >
                  <div className="font-semibold text-orange-700 text-xs">Intelligence</div>
                  <div className="text-[11px] text-orange-600">Copiloto IA</div>
                </button>
                <button
                  onClick={() => handleNavClick('/produto/academy')}
                  className="p-2.5 bg-slate-50 rounded-xl text-left hover:bg-slate-100"
                >
                  <div className="font-semibold text-slate-900 text-xs">Academy</div>
                  <div className="text-[11px] text-slate-500">Cursos & Trilhas</div>
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm font-medium text-slate-800">
              <button
                onClick={() => handleNavClick('/como-funciona')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Como Funciona a Transformação</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('/planos')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Preços & Planos</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('/empresas')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Soluções para Empresas & Redes</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('/cases')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Cases Demonstrativos</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('/integracoes')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Integrações & Conexões</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('/academy')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Academy & Cursos</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('/blog')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Blog & Conteúdos de Varejo</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('/sobre')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Sobre a BRAND+</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('/ajuda')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Central de Ajuda</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('/contato')}
                className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-50 flex items-center justify-between"
              >
                <span>Falar com Vendas / Suporte</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => handleNavClick('/login')}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl"
              >
                Acessar Minha Conta (Entrar)
              </button>
              <button
                onClick={() => handleNavClick('/criar-conta')}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm"
              >
                Criar Conta Gratuita & Começar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
