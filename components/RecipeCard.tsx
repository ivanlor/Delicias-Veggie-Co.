
import React from 'react';
import { Recipe } from '../types.ts';

interface RecipeCardProps {
  recipe: Recipe;
  onView: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onView }) => {
  const isEmoji = recipe.image && recipe.image.length <= 2;
  const isFresco = recipe.type === 'fresco';

  return (
    <div 
      onClick={() => onView(recipe)}
      className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative cursor-pointer"
    >
      <div className={`absolute top-4 right-4 z-10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
        isFresco ? 'bg-blue-50/90 text-blue-600 border border-blue-100' : 'bg-orange-50/90 text-orange-600 border border-orange-100'
      }`}>
        {isFresco ? '❄️ Fresco' : '🔥 Caliente'}
      </div>

      <div className="relative h-64 flex items-center justify-center bg-gray-50 overflow-hidden group-hover:bg-emerald-50/30 transition-colors">
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
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-black text-gray-800 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
          {recipe.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3 italic leading-relaxed">
          {recipe.ingredients}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
