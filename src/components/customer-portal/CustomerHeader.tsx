import React from 'react';
import { PageRoute } from '../../types';
import { useCustomer } from '../../context/CustomerContext';
import { SubscriptionStatusBadge } from './SubscriptionStatusBadge';
import { SAAS_APP_URL } from '../../config/env';
import {
  Menu,
  Bell,
  Building,
  User,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface CustomerHeaderProps {
  currentRoute: PageRoute;
  navigate: (route: PageRoute) => void;
  onOpenMobileMenu: () => void;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  currentRoute,
  navigate,
  onOpenMobileMenu,
}) => {
  const { customer, company, subscription, saasAccess } = useCustomer();

  const getRouteTitle = (route: PageRoute) => {
    switch (route) {
      case '/cliente':
        return 'Visão Geral';
      case '/cliente/assinatura':
        return 'Minha Assinatura';
      case '/cliente/plano':
        return 'Meu Plano & Upgrade';
      case '/cliente/cobrancas':
        return 'Cobranças & Pagamentos';
      case '/cliente/faturas':
        return 'Faturas & Recibos';
      case '/cliente/empresa':
        return 'Dados da Empresa';
      case '/cliente/usuarios':
        return 'Usuários & Permissões';
      case '/cliente/seguranca':
        return 'Segurança & Sessões';
      case '/cliente/suporte':
        return 'Suporte B2B';
      case '/cliente/acesso':
        return 'Acesso ao SaaS BRAND+';
      default:
        return 'Portal do Cliente';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
      {/* LEFT: MOBILE TOGGLE & BREADCRUMB */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Abrir Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium hidden sm:inline">Portal do Cliente</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden sm:inline" />
          <h1 className="font-extrabold text-slate-900 text-sm sm:text-base">
            {getRouteTitle(currentRoute)}
          </h1>
        </div>
      </div>

      {/* RIGHT: COMPANY, SUBSCRIPTION BADGE, USER */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Company indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
          <Building className="w-3.5 h-3.5 text-orange-600" />
          <span className="font-bold text-slate-800 max-w-[140px] truncate">
            {company.tradeName || company.corporateName}
          </span>
        </div>

        {/* Subscription status */}
        <div className="hidden sm:block">
          <SubscriptionStatusBadge status={subscription.status} />
        </div>

        {/* SAAS DIRECT BUTTON */}
        <button
          type="button"
          onClick={() => window.open(SAAS_APP_URL, '_blank', 'noopener,noreferrer')}
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-2xs"
        >
          <span>Abrir SaaS</span>
          <ExternalLink className="w-3 h-3 text-orange-400" />
        </button>

        {/* User avatar */}
        <div
          onClick={() => navigate('/cliente/usuarios')}
          className="flex items-center gap-2.5 pl-2 border-l border-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center border border-orange-200 shadow-2xs">
            {customer.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-900 leading-none truncate max-w-[130px]">
              {customer.name}
            </div>
            <div className="text-[10px] text-slate-500 leading-none mt-1">Proprietário (Owner)</div>
          </div>
        </div>
      </div>
    </header>
  );
};
