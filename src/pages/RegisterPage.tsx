import React, { useState } from 'react';
import { PageRoute } from '../types';
import { BrandLogo } from '../components/brand/Logo';
import { useCheckout } from '../context/CheckoutContext';
import { useCustomer } from '../context/CustomerContext';
import { authService } from '../services/authService';
import { Lock, Mail, ArrowRight, CheckCircle2, Phone, User, Store, AlertCircle, LayoutDashboard, Database } from 'lucide-react';

interface RegisterPageProps {
  navigate: (route: PageRoute) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
  const { setAccount, setCompany } = useCheckout();
  const { setSessionData } = useCustomer();
  const [formData, setFormData] = useState({
    name: '',
    storeName: '',
    email: '',
    phone: '',
    password: '',
    segment: 'Moda & Calçados',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      // 1. Real registration in Neon PostgreSQL database
      const session = await authService.register({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        storeName: formData.storeName,
        segment: formData.segment,
      });

      // 2. Set checkout state
      setAccount({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      setCompany({
        tradeName: formData.storeName,
        segment: formData.segment,
      });

      // 3. Set customer session in context
      if (session) {
        setSessionData({
          customer: session.customer,
          company: session.company,
          subscription: session.subscription,
          tenant: session.tenant,
          invoices: session.invoices,
          users: session.users,
        });
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro ao registrar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <button onClick={() => navigate('/')} className="inline-block cursor-pointer">
          <BrandLogo size="md" />
        </button>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Crie a Conta da sua Loja na BRAND+
        </h2>
        <p className="text-xs text-slate-500">
          Inicie sua jornada comercial e ative seu ambiente no <span className="font-semibold text-slate-700">Neon PostgreSQL</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-slate-200 sm:px-10">
          {success ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Conta Criada e Ativada!</h3>
                <p className="text-xs text-slate-600">
                  Bem-vindo à BRAND+! A conta de <strong>{formData.name}</strong> para a loja <strong>{formData.storeName || 'sua empresa'}</strong> foi registrada no banco de dados.
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 flex items-center justify-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ambiente provisionado e credenciais sincronizadas no PostgreSQL</span>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  id="btn-go-portal"
                  onClick={() => navigate('/cliente')}
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Acessar Portal do Cliente Agora</span>
                </button>

                <button
                  type="button"
                  id="btn-go-checkout"
                  onClick={() => navigate('/cliente/checkout/empresa')}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Completar Dados da Empresa & Planos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleRegister}>
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Seu Nome *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Loja *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail Profissional *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Telefone Comercial *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Criar Senha de Acesso *</label>
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
                Ao clicar em &ldquo;Criar Conta e Iniciar&rdquo;, você concorda com nossos{' '}
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
                id="btn-submit-register"
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Salvando no Neon PostgreSQL...
                  </span>
                ) : (
                  <>
                    <span>Criar Conta e Iniciar</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                Já tem cadastro?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-bold text-orange-600 hover:underline cursor-pointer"
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

