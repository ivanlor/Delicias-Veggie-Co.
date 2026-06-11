import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import RecipeFormModal from './components/RecipeFormModal';
import SettingsModal from './components/SettingsModal';
import { RECIPES as INITIAL_RECIPES } from './recipesData';
import { Recipe } from './types';
import { syncToGoogleSheets } from './services/sheetsService';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'loading';
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Carga inicial persistente desde localStorage o caida en INITIAL_RECIPES
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('delicias_recipes_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing recipes from localStorage:', e);
      }
    }
    return INITIAL_RECIPES;
  });

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Guardado persistente local ante cualquier cambio en recetas
  useEffect(() => {
    localStorage.setItem('delicias_recipes_v2', JSON.stringify(recipes));
  }, [recipes]);

  // Gestor de notificaciones tipo Toast
  const showToast = (message: string, type: 'success' | 'error' | 'loading', duration = 5000) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    if (type !== 'loading') {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
    return id;
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, recipes]);

  // Guardar receta (Soporta creación y edición)
  const handleSaveRecipe = async (recipeData: Partial<Recipe>) => {
    if (editingRecipe) {
      // MODO EDICIÓN
      const updatedRecipe: Recipe = {
        ...editingRecipe,
        name: recipeData.name || editingRecipe.name,
        ingredients: recipeData.ingredients || editingRecipe.ingredients,
        instructions: recipeData.instructions || editingRecipe.instructions,
        image: recipeData.image || editingRecipe.image,
        type: recipeData.type || editingRecipe.type,
      };

      const oldName = editingRecipe.name;
      
      setRecipes(prev => prev.map(r => r.id === editingRecipe.id ? updatedRecipe : r));
      
      // Si el modal detallado estaba abierto para esta receta, refrescarlo
      if (selectedRecipe && selectedRecipe.id === editingRecipe.id) {
        setSelectedRecipe(updatedRecipe);
      }
      
      setEditingRecipe(null);
      setIsFormOpen(false);

      // Sincronización en segundo plano con Toast informativo
      const toastId = showToast(`Actualizando "${updatedRecipe.name}" en Excel...`, 'loading');
      const res = await syncToGoogleSheets({ recipe: updatedRecipe, action: 'update', oldName });
      dismissToast(toastId);

      if (res.success) {
        showToast(`¡"${updatedRecipe.name}" sincronizada en Excel correctamente!`, 'success');
      } else {
        showToast(`Guardado en local. No se pudo conectar con el Excel.`, 'error');
      }
    } else {
      // MODO CREACIÓN (ALTA)
      const newRecipe: Recipe = {
        id: Date.now(),
        name: recipeData.name || 'Nueva Receta',
        ingredients: recipeData.ingredients || '',
        instructions: recipeData.instructions || '',
        image: recipeData.image || '🍲',
        type: (recipeData.type as 'fresco' | 'caliente') || 'caliente'
      };

      setRecipes(prev => [newRecipe, ...prev]);
      setIsFormOpen(false);

      // Sincronización en segundo plano con Toast informativo
      const toastId = showToast(`Creando "${newRecipe.name}" en Excel...`, 'loading');
      const res = await syncToGoogleSheets({ recipe: newRecipe, action: 'create' });
      dismissToast(toastId);

      if (res.success) {
        showToast(`¡"${newRecipe.name}" guardada en Excel correctamente!`, 'success');
      } else {
        showToast(`Guardada en local. No se pudo conectar con el Excel.`, 'error');
      }
    }
  };

  // Eliminar receta
  const handleDeleteRecipe = async (recipeToDelete: Recipe) => {
    setRecipes(prev => prev.filter(r => r.id !== recipeToDelete.id));
    setSelectedRecipe(null);

    // Sincronización en segundo plano con Toast informativo
    const toastId = showToast(`Eliminando "${recipeToDelete.name}" de Excel...`, 'loading');
    const res = await syncToGoogleSheets({ recipe: recipeToDelete, action: 'delete' });
    dismissToast(toastId);

    if (res.success) {
      showToast(`¡"${recipeToDelete.name}" eliminada de Excel con éxito!`, 'success');
    } else {
      showToast(`Eliminada localmente. No se pudo conectar con el Excel.`, 'error');
    }
  };

  // Activa la pantalla de edición desde la vista de detalle de receta
  const handleTriggerEdit = (recipeToEdit: Recipe) => {
    setEditingRecipe(recipeToEdit);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#d8dad0] flex flex-col selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-500">
      <Header 
        onNewRecipe={() => {
          setEditingRecipe(null);
          setIsFormOpen(true);
        }} 
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Section */}
        <section className="mb-16">
          <div className="max-w-xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-100 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <input 
                type="text" 
                placeholder="Busca una receta entre tus delicias..."
                className="relative block w-full px-8 py-6 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-xl font-medium placeholder:text-gray-300 text-center"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Grid of Recipes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {filteredRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onView={setSelectedRecipe} 
            />
          ))}
        </div>
        
        {filteredRecipes.length === 0 && (
          <div className="text-center py-40">
            <span className="text-9xl mb-8 block animate-pulse">🍲</span>
            <p className="text-gray-500 font-black text-2xl uppercase tracking-widest">Receta no encontrada</p>
            <p className="text-gray-400 mt-4 italic">Prueba con otros ingredientes o nombres</p>
          </div>
        )}
      </main>

      {/* Modals */}
      <RecipeModal 
        recipe={selectedRecipe} 
        onClose={() => setSelectedRecipe(null)} 
        onEdit={handleTriggerEdit}
        onDelete={handleDeleteRecipe}
      />
      
      {isFormOpen && (
        <RecipeFormModal 
          recipe={editingRecipe} 
          onClose={() => {
            setIsFormOpen(false);
            setEditingRecipe(null);
          }} 
          onSave={handleSaveRecipe} 
        />
      )}

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}

      {/* Panel Flotante de Notificaciones Toast */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-center gap-3 animate-in slide-in-from-right duration-300 ${
              toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
              toast.type === 'error' ? 'bg-amber-50 border-amber-200 text-amber-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            {toast.type === 'loading' && (
              <svg className="animate-spin h-5 w-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {toast.type === 'success' && (
              <span className="text-base shrink-0 select-none">✅</span>
            )}
            {toast.type === 'error' && (
              <span className="text-base shrink-0 select-none">⚠️</span>
            )}
            <p className="text-sm font-bold flex-grow leading-snug">{toast.message}</p>
            <button 
              onClick={() => dismissToast(toast.id)} 
              className="text-gray-400 hover:text-gray-600 transition-colors ml-1 p-1"
              aria-label="Cerrar notificación"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
