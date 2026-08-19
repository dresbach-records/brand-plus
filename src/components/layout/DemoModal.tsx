import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Store,
  Clock,
  User,
  Phone,
  Mail,
} from 'lucide-react';
import { BrandLogo } from '../brand/Logo';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: 'Moda & Acessórios',
    revenue: 'Até R$ 30.000 / mês',
    challenge: 'Aumentar vendas e organizar estoque unificado',
    preferredDate: 'Amanhã às 14:00',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      try {
        await fetch('/api/v1/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            storeType: formData.segment,
            interest: formData.challenge,
            message: `Faixa de faturamento: ${formData.revenue} | Horário preferido: ${formData.preferredDate}`,
          }),
        });
      } catch (err) {
        console.warn('[DemoModal] Lead save API call failed:', err);
      }

      setStep(3);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF5500', '#FF7A00', '#111827', '#FFA040'],
        });
      } catch (err) {
        // Safe fallback
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP ACCENT BAR */}
        <div className="h-2 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 w-full" />

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                  Demonstração Guiada
                </span>
                <span className="text-xs text-slate-400">• Etapa 1 de 2</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                Conheça a BRAND+ na prática
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Descubra como a plataforma transforma seu comércio em uma operação digital de alto crescimento com demonstração sob medida para seu segmento.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Seu Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Mendonça"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-orange-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      E-mail Comercial *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        placeholder="seu@empresa.com.br"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-orange-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      WhatsApp / Telefone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-orange-500 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nome da Loja / Empresa *
                    </label>
                    <div className="relative">
                      <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="Ex: Boutique Elegance"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-orange-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Segmento do Varejo
                    </label>
                    <select
                      value={formData.segment}
                      onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-orange-500 focus:outline-hidden text-slate-800"
                    >
                      <option value="Moda & Acessórios">Moda & Acessórios</option>
                      <option value="Calçados">Calçados</option>
                      <option value="Beleza & Cosméticos">Beleza & Cosméticos</option>
                      <option value="Casa & Decoração">Casa & Decoração</option>
                      <option value="Eletrônicos & Informática">Eletrônicos & Informática</option>
                      <option value="Autopeças & Motopeças">Autopeças & Motopeças</option>
                      <option value="Esportes & Fitness">Esportes & Fitness</option>
                      <option value="Varejo Local / Bairro">Varejo Local de Bairro</option>
                      <option value="Outro Segmento">Outro Segmento</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Avançar para Escolher Horário</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                  Agendamento Personalizado
                </span>
                <span className="text-xs text-slate-400">• Etapa 2 de 2</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                Personalize sua sessão
              </h3>
              <p className="text-sm text-slate-600 mb-5">
                Para adaptarmos o tour aos desafios específicos da sua loja <strong>{formData.company || 'sua empresa'}</strong>.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Faixa de faturamento mensal aproximada:
                  </label>
                  <select
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-orange-500 focus:outline-hidden text-slate-800"
                  >
                    <option value="Até R$ 30.000 / mês">Até R$ 30.000 / mês (Iniciando no Digital)</option>
                    <option value="De R$ 30.000 a R$ 100.000 / mês">De R$ 30.000 a R$ 100.000 / mês</option>
                    <option value="De R$ 100.000 a R$ 300.000 / mês">De R$ 100.000 a R$ 300.000 / mês</option>
                    <option value="Acima de R$ 300.000 / mês">Acima de R$ 300.000 / mês (Múltiplas Lojas)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Qual seu principal objetivo com a BRAND+?
                  </label>
                  <div className="space-y-2">
                    {[
                      'Começar a vender online com loja virtual profissional',
                      'Unificar o estoque da loja física com os pedidos digitais',
                      'Aumentar o lucro e entender margem com a Inteligência Artificial',
                      'Treinar minha equipe de vendas e modernizar a operação',
                    ].map((item, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          formData.challenge === item
                            ? 'border-orange-500 bg-orange-50/50 text-orange-950 font-medium'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="challenge"
                          checked={formData.challenge === item}
                          onChange={() => setFormData({ ...formData, challenge: item })}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-4 text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Confirmar & Agendar Demonstração</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Demonstração Agendada com Sucesso!
              </h3>

              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Parabéns, <strong>{formData.name}</strong>! Nossos especialistas em transformação digital para o varejo já receberam seu perfil e entrarão em contato no WhatsApp <strong>{formData.phone}</strong> para conduzir a apresentação.
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left max-w-sm mx-auto text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400">Empresa:</span>
                  <span className="font-semibold text-slate-900">{formData.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Segmento:</span>
                  <span className="font-semibold text-slate-900">{formData.segment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Foco Principal:</span>
                  <span className="font-semibold text-orange-600 truncate max-w-[180px]">{formData.challenge}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors"
                >
                  Concluir e Navegar pelo Site
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
