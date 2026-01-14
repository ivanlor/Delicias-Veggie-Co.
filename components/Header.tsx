import React from 'react';

interface HeaderProps {
  onNewRecipe: () => void;
  onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewRecipe, onOpenSettings }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-none">
                Delicias Veggie
              </h1>
              <span className="text-[9px] font-black text-emerald-600/40 tracking-[0.2em] uppercase">Recetario V2.0</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={onNewRecipe}
              className="bg-emerald-50 text-emerald-700 p-2 sm:px-4 sm:py-2 rounded-xl font-bold hover:bg-emerald-100 transition-all flex items-center gap-2 border border-emerald-100 shadow-sm text-sm"
              title="Añadir nueva receta"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Nueva Receta</span>
            </button>
            
            <button 
              onClick={onOpenSettings}
              className="bg-white p-2 sm:px-4 sm:py-2 rounded-xl text-gray-600 font-bold border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm flex items-center gap-2 text-sm"
              title="Configuración de Google Sheets"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Google Sheets</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;