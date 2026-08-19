import React from 'react';
import { useCustomer } from '../context/CustomerContext';
import { PageRoute } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  navigate: (route: PageRoute) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, navigate }) => {
  const { isAuthenticated, isLoading } = useCustomer();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-400">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return <>{children}</>;
};
