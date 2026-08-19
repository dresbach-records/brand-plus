import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { PageRoute } from '../../types';
import {
  ShieldCheck,
  Smartphone,
  Laptop,
  KeyRound,
  Lock,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  History,
} from 'lucide-react';

interface CustomerSecurityPageProps {
  navigate: (route: PageRoute) => void;
}

export const CustomerSecurityPage: React.FC<CustomerSecurityPageProps> = ({ navigate }) => {
  const { securitySettings } = useCustomer();
  const [twoFactor, setTwoFactor] = useState(securitySettings.twoFactorEnabled);
  const [toast, setToast] = useState('');

  const toggle2FA = () => {
    setTwoFactor(!twoFactor);
    setToast(!twoFactor ? 'Autenticação em 2 Etapas ativada!' : 'Autenticação em 2 Etapas desativada.');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Segurança & Sessões Ativas
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Controle de acesso, autenticação de dois fatores e auditoria de conexões.
        </p>
      </div>

      {toast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* 2FA & PASSWORD */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-extrabold text-slate-900">Autenticação & Senha</h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Autenticação em Duas Etapas (2FA)</div>
              <div className="text-[11px] text-slate-500">
                Exige código via aplicativo autenticador ao fazer login.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={toggle2FA}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              twoFactor
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            {twoFactor ? 'Ativado' : 'Desativado'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Senha da Conta</div>
              <div className="text-[11px] text-slate-500">
                Última alteração em {securitySettings.passwordLastChanged}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Link de redefinição de senha enviado para seu e-mail!')}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl"
          >
            Redefinir Senha
          </button>
        </div>
      </div>

      {/* ACTIVE SESSIONS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-extrabold text-slate-900">Dispositivos & Sessões Conectadas</h3>

        <div className="space-y-3">
          {securitySettings.activeSessions.map((sess) => (
            <div
              key={sess.id}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  {sess.device.includes('iPhone') ? (
                    <Smartphone className="w-4 h-4 text-slate-600" />
                  ) : (
                    <Laptop className="w-4 h-4 text-slate-600" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>{sess.device}</span>
                    {sess.isCurrent && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-md">
                        ESTA SESSÃO
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {sess.browser} • {sess.location} • IP: {sess.ipAddress}
                  </div>
                </div>
              </div>

              {!sess.isCurrent && (
                <button
                  type="button"
                  onClick={() => alert('Sessão encerrada com sucesso!')}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                  title="Desconectar"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AUDIT LOGS */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
          <History className="w-4 h-4 text-orange-600" />
          <span>Histórico de Auditoria & Acessos</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {securitySettings.auditLogs.map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between text-slate-600">
              <div>
                <div className="font-semibold text-slate-800">{log.action}</div>
                <div className="text-[11px] text-slate-400">Por {log.user}</div>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                <div>{log.timestamp}</div>
                <div className="font-mono">{log.ipAddress}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
