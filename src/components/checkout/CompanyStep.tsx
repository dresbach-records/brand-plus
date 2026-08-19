import React, { useState } from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { PageRoute } from '../../types';
import { Building, MapPin, Store, ArrowRight, ArrowLeft } from 'lucide-react';

interface CompanyStepProps {
  navigate: (route: PageRoute) => void;
}

export const CompanyStep: React.FC<CompanyStepProps> = ({ navigate }) => {
  const { state, setCompany } = useCheckout();
  const [formData, setFormData] = useState({
    corporateName: state.company.corporateName,
    tradeName: state.company.tradeName,
    cnpj: state.company.cnpj,
    phone: state.company.phone || state.account.phone,
    commercialEmail: state.company.commercialEmail || state.account.email,
    zipCode: state.company.zipCode,
    street: state.company.street,
    number: state.company.number,
    complement: state.company.complement || '',
    neighborhood: state.company.neighborhood,
    city: state.company.city,
    state: state.company.state,
    segment: state.company.segment || 'Moda & Calçados',
    storeCount: state.company.storeCount || '1 loja',
    estimatedProducts: state.company.estimatedProducts || 'Até 500 produtos',
    hasEcommerce: state.company.hasEcommerce || false,
    hasERP: state.company.hasERP || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const maskCNPJ = (val: string) => {
    return val
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const maskCEP = (val: string) => {
    return val
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .substring(0, 9);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.corporateName.trim()) newErrors.corporateName = 'Informe a Razão Social da empresa.';
    if (!formData.tradeName.trim()) newErrors.tradeName = 'Informe o Nome Fantasia.';
    if (!formData.cnpj.trim() || formData.cnpj.length < 14) {
      newErrors.cnpj = 'Informe um CNPJ válido.';
    }
    if (!formData.zipCode.trim() || formData.zipCode.length < 8) {
      newErrors.zipCode = 'Informe o CEP.';
    }
    if (!formData.street.trim()) newErrors.street = 'Informe o logradouro/endereço.';
    if (!formData.number.trim()) newErrors.number = 'Informe o número.';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Informe o bairro.';
    if (!formData.city.trim()) newErrors.city = 'Informe a cidade.';
    if (!formData.state.trim()) newErrors.state = 'Informe o Estado (UF).';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setCompany(formData);
    navigate('/cliente/checkout/plano');
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
          Etapa 02 de 05
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Dados da sua Empresa
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Informações cadastrais para faturamento, emissão de notas e configuração do seu ambiente comercial.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* IDENTIFICAÇÃO */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Building className="w-4 h-4 text-orange-600" />
            <span>Identificação Societária</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                CNPJ da Empresa *
              </label>
              <input
                type="text"
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: maskCNPJ(e.target.value) })}
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  errors.cnpj ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-mono`}
              />
              {errors.cnpj && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.cnpj}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nome Fantasia da Loja *
              </label>
              <input
                type="text"
                placeholder="Ex: Requinte Calçados"
                value={formData.tradeName}
                onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  errors.tradeName ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500`}
              />
              {errors.tradeName && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.tradeName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Razão Social Completa *
            </label>
            <input
              type="text"
              placeholder="Ex: Requinte Calçados e Artigos de Couro Ltda"
              value={formData.corporateName}
              onChange={(e) => setFormData({ ...formData, corporateName: e.target.value })}
              className={`w-full px-4 py-3 bg-slate-50 border ${
                errors.corporateName ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
              } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500`}
            />
            {errors.corporateName && (
              <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.corporateName}</p>
            )}
          </div>
        </div>

        {/* ENDEREÇO */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span>Endereço Comercial / Sede</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CEP *</label>
              <input
                type="text"
                placeholder="00000-000"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: maskCEP(e.target.value) })}
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  errors.zipCode ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-mono`}
              />
              {errors.zipCode && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.zipCode}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Logradouro / Rua *</label>
              <input
                type="text"
                placeholder="Ex: Av. Paulista"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  errors.street ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500`}
              />
              {errors.street && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.street}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Número *</label>
              <input
                type="text"
                placeholder="Ex: 1800"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  errors.number ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500`}
              />
              {errors.number && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.number}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Complemento / Sala</label>
              <input
                type="text"
                placeholder="Ex: Sala 402, Bloco B"
                value={formData.complement}
                onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bairro *</label>
              <input
                type="text"
                placeholder="Ex: Bela Vista"
                value={formData.neighborhood}
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  errors.neighborhood ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500`}
              />
              {errors.neighborhood && (
                <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.neighborhood}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cidade *</label>
              <input
                type="text"
                placeholder="Ex: São Paulo"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  errors.city ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500`}
              />
              {errors.city && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Estado (UF) *</label>
              <input
                type="text"
                maxLength={2}
                placeholder="SP"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                className={`w-full px-4 py-3 bg-slate-50 border ${
                  errors.state ? 'border-red-500 bg-red-50/30' : 'border-slate-200'
                } rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500 font-mono`}
              />
              {errors.state && <p className="text-red-600 text-[11px] mt-1 font-medium">{errors.state}</p>}
            </div>
          </div>
        </div>

        {/* PERFIL OPERACIONAL */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Store className="w-4 h-4 text-orange-600" />
            <span>Perfil Operacional</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Segmento do Comércio</label>
              <select
                value={formData.segment}
                onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Número de Lojas Físicas</label>
              <select
                value={formData.storeCount}
                onChange={(e) => setFormData({ ...formData, storeCount: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-orange-500"
              >
                <option value="1 loja">1 loja / Ponto único</option>
                <option value="2 a 3 lojas">2 a 3 lojas / Filiais</option>
                <option value="4 a 10 lojas">4 a 10 lojas</option>
                <option value="Mais de 10 lojas">Mais de 10 lojas (Rede)</option>
              </select>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate('/cliente/checkout/conta')}
            className="py-3.5 px-6 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            type="submit"
            className="flex-1 py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Avançar para Escolha do Plano</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
