import React, { useState } from 'react';
import { PageRoute } from '../types';
import { BrandLogo } from '../components/brand/Logo';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Building, Phone, User, Store } from 'lucide-react';

interface RegisterPageProps {
  navigate: (route: PageRoute) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    storeName: '',
    email: '',
    whatsapp: '',
    password: '',
    segment: 'Moda & Calçados',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
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
          Crie a Conta da sua Loja na BRAND+
        </h2>
        <p className="text-xs text-slate-500">
          Transforme sua operação em um negócio digital lucrativo
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200 sm:px-10">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Conta Criada com Sucesso!</h3>
              <p className="text-xs text-slate-600">
                Sua empresa <strong>{formData.storeName}</strong> foi cadastrada. O assistente de configuração está pronto para ativar seu catálogo.
              </p>
              <button
                onClick={() => navigate('/')}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
              >
                Acessar Painel de Controle
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Seu Nome</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      placeholder="Nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Loja</label>
                  <div className="relative">
                    <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      placeholder="Ex: Requinte Calçados"
                      value={formData.storeName}
                      onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail Profissional</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="email"
                      placeholder="contato@sualoja.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Segmento Principal</label>
                <select
                  value={formData.segment}
                  onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                >
                  <option value="Moda & Calçados">Moda & Calçados</option>
                  <option value="Casa & Decoração">Casa & Decoração</option>
                  <option value="Autopeças & Moto">Autopeças & Moto</option>
                  <option value="Beleza & Cosméticos">Beleza & Cosméticos</option>
                  <option value="Eletrônicos & Informática">Eletrônicos & Informática</option>
                  <option value="Varejo de Bairro & Outros">Varejo Local / Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Criar Senha de Acesso</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    type="password"
                    placeholder="Mínimo de 8 caracteres"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="text-[11px] text-slate-500 leading-relaxed">
                Ao clicar em &ldquo;Criar Conta Grátis&rdquo;, você concorda com nossos{' '}
                <button
                  type="button"
                  onClick={() => navigate('/termos')}
                  className="text-orange-600 underline"
                >
                  Termos de Uso
                </button>{' '}
                e{' '}
                <button
                  type="button"
                  onClick={() => navigate('/privacidade')}
                  className="text-orange-600 underline"
                >
                  Política de Privacidade
                </button>
                .
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Criando sua loja...</span>
                ) : (
                  <>
                    <span>Criar Conta e Iniciar Transformação</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                Já tem cadastro?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-bold text-orange-600 hover:underline"
                >
                  Fazer login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
