import React, { useState } from 'react';
import { PageRoute } from '../types';
import { BrandLogo } from '../components/brand/Logo';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  navigate: (route: PageRoute) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <button onClick={() => navigate('/')} className="inline-block">
          <BrandLogo size="md" />
        </button>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Acesse o Painel da sua Empresa
        </h2>
        <p className="text-xs text-slate-500">
          Gerencie pedidos, estoque e métricas do seu comércio
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200 sm:px-10">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Autenticação Autorizada!</h3>
              <p className="text-xs text-slate-600">
                Redirecionando para o painel de operações BRAND+...
              </p>
              <button
                onClick={() => navigate('/cliente')}
                className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Acessar Portal do Cliente
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleLogin}>
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Acessando...</span>
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
