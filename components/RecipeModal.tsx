
import React from 'react';
import { Recipe } from '../types.ts';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  const isEmoji = recipe.image && recipe.image.length <= 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 rounded-full p-2 text-gray-600 hover:text-red-500 transition-colors shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="md:w-1/2 h-80 md:h-auto shrink-0 flex items-center justify-center bg-gray-100 border-r border-gray-100 overflow-hidden">
          {isEmoji ? (
            <span className="text-[10rem] select-none" role="img" aria-label={recipe.name}>
              {recipe.image}
            </span>
          ) : (
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="w-full h-full object-cover md:object-contain drop-shadow-xl"
            />
          )}
        </div>

        <div className="p-8 md:p-12 overflow-y-auto w-full">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight border-b border-emerald-100 pb-4">
            {recipe.name}
          </h2>
          
          <div className="space-y-8">
            <div>
              <h4 className="flex items-center gap-2 text-lg font-bold text-emerald-700 mb-3 uppercase tracking-widest text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Ingredientes
              </h4>
              <p className="text-gray-700 leading-relaxed text-lg italic">
                {recipe.ingredients}
              </p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-lg font-bold text-emerald-700 mb-3 uppercase tracking-widest text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Instrucciones
              </h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                {recipe.instructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
