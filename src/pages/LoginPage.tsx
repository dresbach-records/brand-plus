import React, { useState } from 'react';
import { PageRoute } from '../types';
import { BrandLogo } from '../components/brand/Logo';
import { Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, Database, Sparkles, KeyRound } from 'lucide-react';
import { authService } from '../services/authService';
import { useCustomer } from '../context/CustomerContext';

interface LoginPageProps {
  navigate: (route: PageRoute) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const { setSessionData } = useCustomer();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const session = await authService.login(email, password);
      
      // Update global context with authenticated data
      setSessionData({
        customer: session.customer,
        company: session.company,
        subscription: session.subscription,
        tenant: session.tenant,
        invoices: session.invoices,
        users: session.users,
      });

      setUserRole(session.customer.role || 'owner');
      setSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao autenticar. Verifique o e-mail e a senha.');
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (userEmail: string, userPass: string) => {
    setEmail(userEmail);
    setPassword(userPass);
    setErrorMessage('');
  };

  return (
    <div id="login-page-container" className="min-h-screen bg-slate-900/5 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <button onClick={() => navigate('/')} className="inline-block cursor-pointer">
          <BrandLogo size="md" />
        </button>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Acesso ao Portal Corporativo
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Autenticação segura conectada ao banco de dados <span className="font-semibold text-slate-700">Neon PostgreSQL</span>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 space-y-4">
        {/* Quick Demo Credentials Assistant */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-lg border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-orange-400" />
              Contas de Acesso Cadastradas
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Neon DB
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {/* Admin Credential */}
            <button
              type="button"
              onClick={() => fillCredentials('admin@brand-plus-nine.vercel.app', 'Ma596220@')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition flex items-center justify-between cursor-pointer group"
            >
              <div>
                <div className="text-xs font-bold text-white group-hover:text-orange-300 flex items-center gap-1.5">
                  <span>👑 Administrador Geral</span>
                  <span className="px-1.5 py-0.2 bg-orange-500/20 text-orange-400 rounded text-[9px] font-semibold">Super Admin</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">admin@brand-plus-nine.vercel.app</div>
              </div>
              <span className="text-[10px] text-orange-400 font-bold bg-orange-950/60 px-2 py-1 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition">
                Preencher
              </span>
            </button>

            {/* Client Credential */}
            <button
              type="button"
              onClick={() => fillCredentials('carlos@calcadosrequinte.com.br', 'Carlos@2026')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700/60 transition flex items-center justify-between cursor-pointer group"
            >
              <div>
                <div className="text-xs font-bold text-white group-hover:text-orange-300 flex items-center gap-1.5">
                  <span>👞 Carlos (Requinte Calçados)</span>
                  <span className="px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded text-[9px] font-semibold">Lojista</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">carlos@calcadosrequinte.com.br</div>
              </div>
              <span className="text-[10px] text-slate-300 font-bold bg-slate-800 px-2 py-1 rounded-lg group-hover:bg-slate-600 group-hover:text-white transition">
                Preencher
              </span>
            </button>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200 sm:px-10">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">Autenticação Autorizada!</h3>
                <p className="text-xs text-slate-600">
                  Conectado como <span className="font-bold text-slate-900">{email}</span> {userRole === 'superadmin' && '(Super Admin)'}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-center justify-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dados carregados do Neon PostgreSQL em tempo real</span>
              </div>

              <button
                id="btn-access-portal"
                onClick={() => navigate('/cliente')}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Acessar Portal do Cliente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleLogin}>
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  E-mail de Acesso
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="email"
                    placeholder="seu.email@empresa.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">Senha</label>
                  <a href="#" className="text-[11px] font-semibold text-orange-600 hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-medium"
                  />
                </div>
              </div>

              <button
                id="btn-login-submit"
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Validando no Neon PostgreSQL...
                  </span>
                ) : (
                  <>
                    <span>Entrar no Portal do Cliente</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                Ainda não possui uma conta?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/cliente/checkout/conta')}
                  className="font-bold text-orange-600 hover:underline cursor-pointer"
                >
                  Contratar e Criar Conta
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
