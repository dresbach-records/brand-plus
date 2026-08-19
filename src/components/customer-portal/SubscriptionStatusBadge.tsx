import React from 'react';
import { SubscriptionStatus } from '../../types';
import { CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus;
}

export const SubscriptionStatusBadge: React.FC<SubscriptionStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'active':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Ativa</span>
        </span>
      );
    case 'trialing':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Período de Testes</span>
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Aguardando Pagamento</span>
        </span>
      );
    case 'past_due':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
          <span>Pagamento Pendente</span>
        </span>
      );
    case 'cancelled':
    case 'expired':
    case 'suspended':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700 border border-slate-300">
          <XCircle className="w-3.5 h-3.5 text-slate-500" />
          <span>{status === 'cancelled' ? 'Cancelada' : 'Inativa'}</span>
        </span>
      );
    default:
      return null;
  }
};
