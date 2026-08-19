import React, { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { PageRoute } from '../../types';
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AccountStepProps {
  navigate: (route: PageRoute) => void;
}

export const AccountStep: React.FC<AccountStepProps> = ({ navigate }) => {
  const { state, setAccount } = useCheckout();
  const [formData, setFormData] = useState({
    fullName: state.account.fullName,
    email: state.account.email,
    phone: state.account.phone,
    password: state.account.password || '',
    confirmPassword: state.account.confirmPassword || '',
    acceptedTerms: state.account.acceptedTerms,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Informe seu nome completo.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Informe um e-mail válido.';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = 'Informe um telefone com DDD válido.';
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }
    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = 'Você deve aceitar os termos para prosseguir.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setAccount({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      acceptedTerms: formData.acceptedTerms,
    });

    navigate('/cliente/checkout/empresa');
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
          Etapa 01 de 05
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Crie a sua conta de Administrador
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Você utilizará estes dados para gerenciar sua assinatura e acessar o Portal do Cliente.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nome Completo do Titular *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ex: Carlos Alberto Mendonça"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                  errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-colors`}
              />
            </div>
            {errors.fullName && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.fullName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                E-mail Corporativo *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="carlos@sualoja.com.br"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                    errors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                  } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-colors`}
                />
              </div>
              {errors.email && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Telefone / Celular *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="(11) 98452-1100"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                    errors.phone ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                  } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-colors`}
                />
              </div>
              {errors.phone && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Senha de Acesso *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                    errors.password ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                  } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-colors`}
                />
              </div>
              {errors.password && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirmar Senha *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Repita sua senha"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                    errors.confirmPassword ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                  } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 transition-colors`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        </div>

        {/* Terms acceptance */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.acceptedTerms}
              onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
            />
            <span className="text-xs text-slate-600 leading-relaxed">
              Li e concordo com os{' '}
              <button
                type="button"
                onClick={() => navigate('/termos')}
                className="font-bold text-orange-600 hover:underline"
              >
                Termos de Uso
              </button>{' '}
              e a{' '}
              <button
                type="button"
                onClick={() => navigate('/privacidade')}
                className="font-bold text-orange-600 hover:underline"
              >
                Política de Privacidade
              </button>{' '}
              da plataforma BRAND+.
            </span>
          </label>
          {errors.acceptedTerms && (
            <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.acceptedTerms}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Avançar para Dados da Empresa</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
