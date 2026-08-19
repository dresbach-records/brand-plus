import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { PageRoute } from '../../types';
import { Building, MapPin, Store, CheckCircle2, Save } from 'lucide-react';

interface CustomerCompanyPageProps {
  navigate: (route: PageRoute) => void;
}

export const CustomerCompanyPage: React.FC<CustomerCompanyPageProps> = ({ navigate }) => {
  const { company, updateCompany } = useCustomer();
  const [formData, setFormData] = useState({ ...company });
  const [toast, setToast] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateCompany(formData);
      setToast('Dados cadastrais da empresa atualizados com sucesso!');
      setTimeout(() => setToast(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Dados da Empresa
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Informações cadastrais e endereço para faturamento e emissão de notas fiscais da BRAND+.
        </p>
      </div>

      {toast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
        {/* IDENTIFICAÇÃO */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Building className="w-4 h-4 text-orange-600" />
            <span>Identificação Societária</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CNPJ</label>
              <input
                type="text"
                readOnly
                value={formData.cnpj}
                className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 font-mono cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Para alterar CNPJ, contate o suporte B2B.</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nome Fantasia</label>
              <input
                type="text"
                value={formData.tradeName}
                onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Razão Social</label>
            <input
              type="text"
              value={formData.corporateName}
              onChange={(e) => setFormData({ ...formData, corporateName: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">E-mail Financeiro</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Telefone Comercial</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* ENDEREÇO */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span>Endereço Comercial</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CEP</label>
              <input
                type="text"
                value={formData.address.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, address: { ...formData.address, zipCode: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Logradouro</label>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Número</label>
              <input
                type="text"
                value={formData.address.number}
                onChange={(e) =>
                  setFormData({ ...formData, address: { ...formData.address, number: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Complemento</label>
              <input
                type="text"
                value={formData.address.complement || ''}
                onChange={(e) =>
                  setFormData({ ...formData, address: { ...formData.address, complement: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bairro</label>
              <input
                type="text"
                value={formData.address.neighborhood}
                onChange={(e) =>
                  setFormData({ ...formData, address: { ...formData.address, neighborhood: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cidade</label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) =>
                  setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Estado (UF)</label>
              <input
                type="text"
                maxLength={2}
                value={formData.address.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, state: e.target.value.toUpperCase() },
                  })
                }
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="py-3 px-8 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Salvando...' : 'Salvar Alterações'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
