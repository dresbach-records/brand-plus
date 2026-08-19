import React, { useState } from 'react';
import { PageRoute } from '../types';
import { BrandLogo } from '../components/brand/Logo';
import { Lock, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { authService } from '../services/authService';
import { useCustomer } from '../context/CustomerContext';

interface LoginPageProps {
  navigate: (route: PageRoute) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const { refreshAll } = useCustomer();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      await authService.login(email, password);
      await refreshAll();
      setSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Falha ao autenticar. Verifique seu e-mail e senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-page-container" className="min-h-screen bg-slate-900/5 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <button onClick={() => navigate('/')} className="inline-block cursor-pointer">
          <BrandLogo size="md" />
        </button>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Acesso ao Portal do Cliente
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Autenticação segura via API BRAND+
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 space-y-4">
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
                  Conectado como <span className="font-bold text-slate-900">{email}</span>
                </p>
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
                    Autenticando...
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
