
import React, { useState } from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onView: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onView, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const isEmoji = recipe.image && recipe.image.length <= 2;
  const isFresco = recipe.type === 'fresco';

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (showConfirm) {
      onDelete(recipe.id);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirm(false);
  };

  return (
    <div className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative">
      {/* Badge de tipo */}
      <div className={`absolute top-4 right-4 z-10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
        isFresco ? 'bg-blue-50/90 text-blue-600 border border-blue-100' : 'bg-orange-50/90 text-orange-600 border border-orange-100'
      }`}>
        {isFresco ? '❄️ Fresco' : '🔥 Caliente'}
      </div>

      {/* Imagen / Emoji */}
      <div 
        className="relative h-56 flex items-center justify-center bg-gray-50 overflow-hidden cursor-pointer group-hover:bg-emerald-50/30 transition-colors"
        onClick={() => onView(recipe)}
      >
        {isEmoji ? (
          <span className="text-8xl transition-transform duration-700 group-hover:scale-125 select-none" role="img" aria-label={recipe.name}>
            {recipe.image}
          </span>
        ) : (
          <img 
            src={recipe.image || 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&q=80&w=800'} 
            alt={recipe.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </div>
      
      {/* Contenido */}
      <div className="p-7 flex flex-col flex-grow cursor-pointer" onClick={() => onView(recipe)}>
        <h3 className="text-2xl font-black text-gray-800 mb-3 leading-tight group-hover:text-emerald-600 transition-colors">
          {recipe.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3 italic mb-6 leading-relaxed">
          {recipe.ingredients}
        </p>
      </div>

      {/* Barra de Acciones - Corregida para ser infalible */}
      <div className="px-6 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between gap-2">
        {!showConfirm ? (
          <>
            <button 
              onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                onEdit(recipe); 
              }}
              className="flex-grow flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-emerald-600 text-gray-600 hover:text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm active:scale-95 border border-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </button>
            <button 
              onClick={handleDeleteClick}
              className="p-3 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-2xl border border-gray-200 transition-all active:scale-90"
              title="Eliminar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex w-full gap-2 animate-in slide-in-from-right-2 duration-200">
            <button 
              onClick={handleCancelDelete}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-2xl font-black text-[10px] uppercase tracking-widest"
            >
              Cancelar
            </button>
            <button 
              onClick={handleDeleteClick}
              className="flex-[2] py-3 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-200"
            >
              ¡Confirmar Borrado!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
