import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { Headphones, Mail, BookOpen, Clock, CheckCircle2, MessageSquare, Send } from 'lucide-react';

interface CustomerSupportPageProps {
  navigate: (route: PageRoute) => void;
}

export const CustomerSupportPage: React.FC<CustomerSupportPageProps> = ({ navigate }) => {
  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('technical');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Suporte B2B Dedicado
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Abra chamados prioritários com nossa equipe técnica e de engenharia de varejo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">SLA Prioritário</div>
          <p className="text-[11px] text-slate-500">Atendimento em até 4 horas úteis para planos Growth e Pro.</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">Base de Conhecimento</div>
          <p className="text-[11px] text-slate-500">Manuais completos de integração de estoque e emissão fiscal.</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-slate-900">E-mail Corporativo</div>
          <p className="text-[11px] text-slate-500">suporte@brandplus.com.br</p>
        </div>
      </div>

      {/* TICKET FORM */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <h3 className="text-sm font-extrabold text-slate-900">Abrir Novo Chamado Técnico</h3>

        {submitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-emerald-950">Chamado Aberto com Sucesso!</h4>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Protocolo <strong className="font-mono">#TK-2026-8942</strong> registrado. Nossa equipe entrará em contato por e-mail dentro do SLA contratado.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setSubject('');
                setMessage('');
              }}
              className="mt-2 py-2 px-4 bg-emerald-600 text-white font-bold text-xs rounded-xl"
            >
              Abrir outro chamado
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Departamento / Assunto *</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500"
              >
                <option value="technical">Suporte Técnico (PDV / E-commerce / Estoque)</option>
                <option value="fiscal">Dúvidas Fiscais (NFC-e / NF-e)</option>
                <option value="billing">Faturamento / Financeiro</option>
                <option value="integration">Integrações & API</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Título do Chamado *</label>
              <input
                type="text"
                required
                placeholder="Ex: Dúvida na conciliação de pagamentos do PDV"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Descrição Detalhada *</label>
              <textarea
                rows={4}
                required
                placeholder="Descreva o que está ocorrendo ou sua solicitação com o máximo de detalhes..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="py-3 px-8 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Chamado</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
