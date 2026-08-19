import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { UserAccount, UserRole, PageRoute } from '../../types';
import { Users, UserPlus, Shield, Mail, CheckCircle2, MoreVertical, X } from 'lucide-react';

interface CustomerUsersPageProps {
  navigate: (route: PageRoute) => void;
}

export const CustomerUsersPage: React.FC<CustomerUsersPageProps> = ({ navigate }) => {
  const { users } = useCustomer();
  const [userList, setUserList] = useState<UserAccount[]>(users);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ name: '', email: '', role: 'manager' as UserRole });
  const [toast, setToast] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteData.name || !inviteData.email) return;

    const newUser: UserAccount = {
      id: `u_${Math.random().toString(36).substring(2, 7)}`,
      name: inviteData.name,
      email: inviteData.email,
      role: inviteData.role,
      status: 'invited',
      lastAccess: 'Convite enviado',
    };

    setUserList([...userList, newUser]);
    setShowInviteModal(false);
    setInviteData({ name: '', email: '', role: 'manager' });
    setToast(`Convite de acesso enviado para ${inviteData.email}!`);
    setTimeout(() => setToast(''), 3500);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'owner':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-900 text-white">PROPRIETÁRIO</span>;
      case 'admin':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800">ADMIN</span>;
      case 'manager':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">GERENTE</span>;
      case 'billing':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">FINANCEIRO</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Usuários & Permissões
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Gerencie os colaboradores autorizados a acessar o Portal do Cliente e o sistema BRAND+.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowInviteModal(true)}
          className="py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Convidar Usuário</span>
        </button>
      </div>

      {toast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* USER LIST TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Nome / Colaborador</th>
                <th className="py-3.5 px-6">E-mail de Acesso</th>
                <th className="py-3.5 px-6">Perfil / Função</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Último Acesso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {userList.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200">
                      {usr.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span>{usr.name}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-500">{usr.email}</td>
                  <td className="py-4 px-6">{getRoleBadge(usr.role)}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      usr.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {usr.status === 'active' ? 'Ativo' : 'Convite Pendente'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">{usr.lastAccess}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INVITE MODAL */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Convidar Colaborador</h3>
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mariana Silveira"
                  value={inviteData.name}
                  onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">E-mail Profissional *</label>
                <input
                  type="email"
                  required
                  placeholder="mariana@sualoja.com.br"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Perfil de Acesso *</label>
                <select
                  value={inviteData.role}
                  onChange={(e) => setInviteData({ ...inviteData, role: e.target.value as UserRole })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-orange-500"
                >
                  <option value="manager">Gerente Operacional (Acesso ao PDV e E-commerce)</option>
                  <option value="billing">Financeiro (Acesso exclusivo a Faturas e Assinatura)</option>
                  <option value="admin">Administrador Geral</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Enviar Convite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
