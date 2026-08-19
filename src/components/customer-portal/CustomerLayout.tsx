import React, { useState } from 'react';
import { PageRoute } from '../../types';
import { CustomerSidebar } from './CustomerSidebar';
import { CustomerHeader } from './CustomerHeader';
import { X } from 'lucide-react';

interface CustomerLayoutProps {
  children: React.ReactNode;
  currentRoute: PageRoute;
  navigate: (route: PageRoute) => void;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({
  children,
  currentRoute,
  navigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex selection:bg-orange-500 selection:text-white">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64">
        <CustomerSidebar currentRoute={currentRoute} navigate={navigate} />
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900">
            <div className="absolute top-3 right-3 z-10">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <CustomerSidebar
              currentRoute={currentRoute}
              navigate={navigate}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        <CustomerHeader
          currentRoute={currentRoute}
          navigate={navigate}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
