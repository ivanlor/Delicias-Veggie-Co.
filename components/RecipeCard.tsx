
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onView: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onView, onEdit, onDelete }) => {
  const isEmoji = recipe.image && recipe.image.length <= 2;
  const isFresco = recipe.type === 'fresco';

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(recipe); }}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-xl text-gray-600 hover:text-emerald-600 transition-colors shadow-sm hover:shadow-md"
          title="Editar receta"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(recipe.id); }}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-xl text-gray-600 hover:text-red-600 transition-colors shadow-sm hover:shadow-md"
          title="Eliminar receta"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div 
        className="relative h-48 flex items-center justify-center bg-gray-50 overflow-hidden cursor-pointer transition-colors group-hover:bg-emerald-50/50"
        onClick={() => onView(recipe)}
      >
        {isEmoji ? (
          <span className="text-7xl transition-transform duration-500 group-hover:scale-125 select-none" role="img" aria-label={recipe.name}>
            {recipe.image}
          </span>
        ) : (
          <img 
            src={recipe.image || 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&q=80&w=800'} 
            alt={recipe.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className={`absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-colors ${
          isFresco ? 'bg-blue-50/90 text-blue-600 border border-blue-100' : 'bg-orange-50/90 text-orange-600 border border-orange-100'
        }`}>
          {isFresco ? '❄️ Fresco' : '🔥 Caliente'}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow cursor-pointer" onClick={() => onView(recipe)}>
        <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight group-hover:text-emerald-600 transition-colors">
          {recipe.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3 flex-grow italic mb-4">
          {recipe.ingredients}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-emerald-500 font-semibold text-sm flex items-center gap-1">
            Ver detalle
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
