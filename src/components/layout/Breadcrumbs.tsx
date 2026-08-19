import React from 'react';
import { PageRoute } from '../../types';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: {
    label: string;
    route?: PageRoute;
  }[];
  navigate: (route: PageRoute) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, navigate }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs text-slate-500 py-3 mb-4 overflow-x-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 hover:text-orange-600 transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Início</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center space-x-2 shrink-0">
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            {item.route && !isLast ? (
              <button
                onClick={() => navigate(item.route!)}
                className="hover:text-orange-600 transition-colors font-medium"
              >
                {item.label}
              </button>
            ) : (
              <span className={`font-semibold ${isLast ? 'text-slate-900' : 'text-slate-600'}`}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
};
