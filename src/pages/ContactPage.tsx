import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import {
  Mail,
  Phone,
  MessageSquare,
  Building2,
  Clock,
  Send,
  CheckCircle2,
  Headphones,
  MapPin,
} from 'lucide-react';

interface ContactPageProps {
  navigate: (route: PageRoute) => void;
  openDemoModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  navigate,
  openDemoModal,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    employees: '1-5',
    segment: 'Moda & Calçados',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Breadcrumbs
          items={[
            { label: 'Início', route: '/' },
            { label: 'Contato & Especialistas' },
          ]}
          navigate={navigate}
        />

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
            Atendimento B2B Especializado
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Fale com os consultores da BRAND+.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Estamos prontos para entender os desafios específicos do seu comércio e desenhar a melhor estratégia de digitalização.
          </p>
        </div>

        {/* 2-COL CONTACT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* FORM */}
          <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Mensagem Enviada com Sucesso!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Recebemos seus dados. Um de nossos especialistas em varejo entrará em contato via WhatsApp ou telefone em até 2 horas úteis.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Solicitar Proposta ou Demonstração</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Seu Nome Completo *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Carlos Eduardo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">E-mail Corporativo *</label>
                    <input
                      required
                      type="email"
                      placeholder="carlos@sualoja.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Telefone *</label>
                    <input
                      required
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Empresa / Loja *</label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Requinte Calçados"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Segmento do Comércio</label>
                    <select
                      value={formData.segment}
                      onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    >
                      <option value="Moda & Calçados">Moda & Calçados</option>
                      <option value="Casa & Decoração">Casa & Decoração</option>
                      <option value="Autopeças & Moto">Autopeças & Moto</option>
                      <option value="Beleza & Cosméticos">Beleza & Cosméticos</option>
                      <option value="Eletrônicos">Eletrônicos & Informática</option>
                      <option value="Varejo de Bairro">Varejo Local / Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Porte da Empresa</label>
                    <select
                      value={formData.employees}
                      onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                    >
                      <option value="1-5">1 a 5 colaboradores</option>
                      <option value="6-20">6 a 20 colaboradores</option>
                      <option value="21-50">21 a 50 colaboradores</option>
                      <option value="50+">Mais de 50 (Rede/Franquia)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Como podemos te ajudar?</label>
                  <textarea
                    rows={3}
                    placeholder="Descreva seus desafios atuais com vendas, estoque ou integrações..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Enviar Solicitação para Consultor</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* CONTACT INFO SIDEBAR */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 border border-slate-800 shadow-xl">
              <div>
                <h3 className="text-xl font-bold">Canais Diretos de Contato</h3>
                <p className="text-xs text-slate-400 mt-1">Atendimento humanizado de segunda a sexta, das 8h às 19h.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">WhatsApp Comercial & Vendas</div>
                    <div className="text-slate-300 font-mono mt-0.5">(11) 98765-4321</div>
                    <div className="text-[10px] text-slate-400">Resposta média: 5 minutos</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 border border-slate-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">E-mail Corporativo</div>
                    <div className="text-slate-300 font-mono mt-0.5">contato@brandplus.com.br</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 border border-slate-700">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Sede Tecnológica</div>
                    <div className="text-slate-300 mt-0.5">Av. Paulista, 1800 — São Paulo, SP</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-orange-50 border border-orange-200/80 space-y-2">
              <div className="font-bold text-orange-950 text-sm flex items-center gap-2">
                <Headphones className="w-4 h-4 text-orange-600" />
                <span>Já é cliente BRAND+?</span>
              </div>
              <p className="text-xs text-orange-900">
                Acesse diretamente o suporte prioritário com nosso time técnico através do seu painel ou da Central de Ajuda.
              </p>
              <button
                onClick={() => navigate('/ajuda')}
                className="text-xs font-bold text-orange-700 hover:underline pt-1 block"
              >
                Ir para a Central de Ajuda →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
