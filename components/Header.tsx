import React from 'react';
import { Plus, Cloud, LogOut, User } from 'lucide-react';

interface HeaderProps {
  onNewRecipe: () => void;
  user: {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
  } | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewRecipe, user, onLogin, onLogout }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm animate-in fade-in duration-500">
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
                Delicias Veggie & Co.
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 pl-2 pr-3 py-1.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || "Avatar"} 
                    className="w-8 h-8 rounded-full border border-emerald-500 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <User className="h-4 w-4" />
                  </div>
                )}
                <span className="hidden md:inline max-w-[120px] truncate">{user.displayName || user.email}</span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ml-1" title="Sincronizado en la Nube"></span>
                <button 
                  onClick={onLogout}
                  className="ml-2 hover:text-rose-600 transition-colors p-1"
                  title="Cerrar sesión"
                  id="btn-logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="bg-slate-900 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all flex items-center gap-2 border border-slate-900 shadow-sm text-xs sm:text-sm"
                title="Sincronizar con Google"
                id="btn-login"
              >
                <Cloud className="h-4 w-4 text-emerald-400" />
                <span>Nube</span>
              </button>
            )}

            <button 
              onClick={onNewRecipe}
              className="bg-emerald-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-md shadow-emerald-100 text-xs sm:text-sm"
              title="Añadir nueva receta"
              id="btn-new-recipe"
            >
              <Plus className="h-4 w-4" />
              <span>Nueva Receta</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;