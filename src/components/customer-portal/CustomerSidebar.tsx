import React from 'react';
import { PageRoute } from '../../types';
import { BrandLogo } from '../brand/Logo';
import { useCustomer } from '../../context/CustomerContext';
import { SAAS_APP_URL } from '../../config/env';
import {
  LayoutDashboard,
  CreditCard,
  Layers,
  FileText,
  Building,
  Users,
  ShieldCheck,
  Headphones,
  ExternalLink,
  ArrowLeft,
  Server,
  Receipt,
  LogOut,
} from 'lucide-react';

interface CustomerSidebarProps {
  currentRoute: PageRoute;
  navigate: (route: PageRoute) => void;
  onCloseMobile?: () => void;
}

export const CustomerSidebar: React.FC<CustomerSidebarProps> = ({
  currentRoute,
  navigate,
  onCloseMobile,
}) => {
  const { saasAccess, subscription, logout } = useCustomer();

  const navItems = [
    { label: 'Visão Geral', route: '/cliente' as PageRoute, icon: LayoutDashboard },
    { label: 'Minha Assinatura', route: '/cliente/assinatura' as PageRoute, icon: CreditCard },
    { label: 'Meu Plano & Upgrade', route: '/cliente/plano' as PageRoute, icon: Layers },
    { label: 'Cobranças & Pagamento', route: '/cliente/cobrancas' as PageRoute, icon: Receipt },
    { label: 'Faturas & Recibos', route: '/cliente/faturas' as PageRoute, icon: FileText },
    { label: 'Dados da Empresa', route: '/cliente/empresa' as PageRoute, icon: Building },
    { label: 'Usuários & Permissões', route: '/cliente/usuarios' as PageRoute, icon: Users },
    { label: 'Segurança & Sessões', route: '/cliente/seguranca' as PageRoute, icon: ShieldCheck },
    { label: 'Suporte B2B', route: '/cliente/suporte' as PageRoute, icon: Headphones },
    { label: 'Acesso ao SaaS', route: '/cliente/acesso' as PageRoute, icon: Server },
  ];

  const handleNav = (route: PageRoute) => {
    navigate(route);
    onCloseMobile?.();
  };

  const handleOpenSaaS = () => {
    window.open(SAAS_APP_URL, '_blank', 'noopener,noreferrer');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    onCloseMobile?.();
  };

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-800">
      {/* BRAND HEADER */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNav('/cliente')}
          className="flex items-center gap-2 hover:opacity-85 transition-opacity"
        >
          <BrandLogo size="sm" variant="white" />
        </button>
      </div>

      {/* PORTAL BADGE */}
      <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
          Portal do Cliente
        </span>
        <span className="text-[10px] font-extrabold bg-orange-600/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/30">
          B2B
        </span>
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = currentRoute === item.route;
          const Icon = item.icon;

          return (
            <button
              key={item.route}
              type="button"
              onClick={() => handleNav(item.route)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                isActive
                  ? 'bg-orange-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* QUICK SAAS ACCESS & SITE RETURN */}
      <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950/40">
        <button
          type="button"
          onClick={handleOpenSaaS}
          className="w-full py-2.5 px-3.5 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-between group shadow-sm cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            <span>Abrir BRAND+ SaaS</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => handleNav('/')}
          className="w-full py-2 px-3 text-slate-400 hover:text-slate-200 text-xs font-medium rounded-lg hover:bg-slate-800/50 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Site</span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-2 px-3 text-red-400 hover:text-red-300 text-xs font-medium rounded-lg hover:bg-red-950/30 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sair da Conta</span>
        </button>
      </div>
    </aside>
  );
};
