import React, { useState } from 'react';
import { Recipe } from '../types';
import { Edit2, Trash2, AlertTriangle, ArrowLeft } from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipe: Recipe) => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!recipe) return null;

  const isEmoji = recipe.image && recipe.image.length <= 2;

  const handleDeleteConfirm = () => {
    onDelete(recipe);
    setShowConfirm(false);
  };

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
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="md:w-1/2 h-60 md:h-auto shrink-0 flex items-center justify-center bg-gray-50 border-r border-gray-100 overflow-hidden relative">
          {isEmoji ? (
            <span className="text-[8rem] md:text-[10rem] select-none" role="img" aria-label={recipe.name}>
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

        <div className="p-8 md:p-12 overflow-y-auto w-full flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 leading-tight border-b border-emerald-100 pb-4">
              {recipe.name}
            </h2>
            
            <div className="space-y-8">
              <div>
                <h4 className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-widest text-sm mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Ingredientes
                </h4>
                <p className="text-gray-700 leading-relaxed text-base italic">
                  {recipe.ingredients}
                </p>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-emerald-700 font-bold uppercase tracking-widest text-sm mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Instrucciones
                </h4>
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {recipe.instructions}
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-12 pt-6 border-t border-gray-100">
            {!showConfirm ? (
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onEdit(recipe)}
                  className="flex-1 min-w-[140px] px-6 py-3.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-emerald-200"
                  id="btn-edit-recipe-modal"
                >
                  <Edit2 className="h-4 w-4" />
                  Editar Receta
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  className="flex-1 min-w-[140px] px-6 py-3.5 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-rose-200"
                  id="btn-delete-recipe-modal"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar Receta
                </button>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex gap-3 mb-4 items-start">
                  <div className="p-2 bg-rose-100 text-rose-700 rounded-xl mt-0.5">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-rose-900 text-base">¿Deseas eliminar esta receta?</h5>
                    <p className="text-sm text-rose-700 mt-1">Estás a punto de borrar "{recipe.name}". Esta acción también la borrará de tu hoja de Excel.</p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowConfirm(false)}
                    className="px-5 py-2.5 bg-white text-gray-700 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm flex items-center gap-1.5"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Regresar
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteConfirm}
                    className="px-5 py-2.5 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors text-sm flex items-center gap-1.5"
                  >
                    <Trash2 className="h-4 w-4" />
                    Sí, Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;