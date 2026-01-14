import React, { useState, useEffect } from 'react';
import { Recipe } from '../types.ts';

interface RecipeFormModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onSave: (recipe: Partial<Recipe>) => void;
}

const RecipeFormModal: React.FC<RecipeFormModalProps> = ({ recipe, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Recipe>>({
    name: '',
    ingredients: '',
    instructions: '',
    image: '',
    type: 'caliente'
  });

  useEffect(() => {
    if (recipe) {
      setFormData(recipe);
    } else {
      setFormData({
        name: '',
        ingredients: '',
        instructions: '',
        image: '',
        type: 'caliente'
      });
    }
  }, [recipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden relative z-10 animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {recipe ? 'Editar Receta' : 'Nueva Receta'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la receta</label>
              <input 
                type="text"
                required
                placeholder="Ej: Pasta con pesto de albahaca"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de plato</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'caliente'})}
                  className={`flex-1 py-2 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-semibold ${
                    formData.type === 'caliente' 
                      ? 'bg-orange-50 border-orange-500 text-orange-600' 
                      : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  🔥 Caliente
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'fresco'})}
                  className={`flex-1 py-2 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-semibold ${
                    formData.type === 'fresco' 
                      ? 'bg-blue-50 border-blue-500 text-blue-600' 
                      : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  ❄️ Fresco
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ingredientes</label>
              <textarea 
                rows={3}
                required
                placeholder="Lista los ingredientes separados por comas..."
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.ingredients}
                onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instrucciones</label>
              <textarea 
                rows={4}
                required
                placeholder="Paso a paso para cocinar..."
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.instructions}
                onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emoticono (ej: 🥦, 🍲, 🥗)</label>
              <input 
                type="text"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                value={formData.image}
                placeholder="Pega un emoticono aquí"
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-1 px-4 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                {recipe ? 'Actualizar' : 'Crear Receta'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeFormModal;