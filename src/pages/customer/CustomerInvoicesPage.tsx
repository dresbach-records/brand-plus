import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { Invoice, PageRoute } from '../../types';
import {
  FileText,
  Download,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Search,
} from 'lucide-react';

interface CustomerInvoicesPageProps {
  navigate: (route: PageRoute) => void;
}

export const CustomerInvoicesPage: React.FC<CustomerInvoicesPageProps> = ({ navigate }) => {
  const { invoices } = useCustomer();
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadModalInvoice, setDownloadModalInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.planName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Faturas & Notas Fiscais
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Histórico completo de cobranças, comprovantes de quitação e emissão de NFS-e.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar fatura..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Identificador</th>
                <th className="py-3.5 px-6">Descrição do Plano</th>
                <th className="py-3.5 px-6">Emissão</th>
                <th className="py-3.5 px-6">Vencimento</th>
                <th className="py-3.5 px-6">Valor</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Comprovante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 font-mono">{inv.invoiceNumber}</td>
                  <td className="py-4 px-6 font-medium text-slate-800">{inv.planName}</td>
                  <td className="py-4 px-6 text-slate-500">
                    {new Date(inv.issueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    {new Date(inv.dueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900">R$ {inv.amount.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Pago</span>
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => setDownloadModalInvoice(inv)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Download className="w-3 h-3 text-orange-600" />
                      <span>Baixar PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DOWNLOAD / PREVIEW MODAL */}
      {downloadModalInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  Comprovante de Faturamento
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {downloadModalInvoice.invoiceNumber}
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Quitada
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between">
                <span>Serviço:</span>
                <span className="font-bold text-slate-900">{downloadModalInvoice.planName}</span>
              </div>
              <div className="flex justify-between">
                <span>Valor Faturado:</span>
                <span className="font-bold text-slate-900">
                  R$ {downloadModalInvoice.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Forma de Pagamento:</span>
                <span className="font-semibold text-slate-800">PIX Instantâneo</span>
              </div>
              <div className="flex justify-between">
                <span>Data de Liquidação:</span>
                <span className="font-semibold text-slate-800">
                  {new Date(downloadModalInvoice.issueDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDownloadModalInvoice(null)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Comprovante em PDF baixado com sucesso!');
                  setDownloadModalInvoice(null);
                }}
                className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Salvar PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
