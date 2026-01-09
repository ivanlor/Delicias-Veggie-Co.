
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import RecipeFormModal from './components/RecipeFormModal';
import AssistantChat from './components/AssistantChat';
import { RECIPES as INITIAL_RECIPES } from './recipesData';
import { Recipe } from './types';
import { syncToGoogleSheets } from './services/sheetsService';

const STORAGE_KEY = 'delicias_veggie_recipes_v1';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const savedRecipes = localStorage.getItem(STORAGE_KEY);
    if (savedRecipes) {
      try {
        const parsed = JSON.parse(savedRecipes);
        // Si la lista guardada es más corta que la inicial (actualizada), usamos la inicial
        return parsed.length < INITIAL_RECIPES.length ? INITIAL_RECIPES : parsed;
      } catch (error) {
        return INITIAL_RECIPES;
      }
    }
    return INITIAL_RECIPES;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, recipes]);

  const handleDelete = async (id: number) => {
    const recipeToDelete = recipes.find(r => r.id === id);
    if (!recipeToDelete) return;

    // Actualización inmediata de la interfaz
    setRecipes(prev => prev.filter(r => r.id !== id));
    
    setSyncing(true);
    try {
      await syncToGoogleSheets({ recipe: recipeToDelete, action: 'delete' });
    } catch (err) {
      console.error("Error al sincronizar borrado:", err);
    } finally {
      setTimeout(() => setSyncing(false), 500);
    }
  };

  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingRecipe(null);
    setIsFormOpen(true);
  };

  const handleSaveRecipe = async (recipeData: Partial<Recipe>) => {
    let finalRecipe: Recipe;
    let action: 'create' | 'update';
    let oldName: string | undefined = undefined;
    
    if (editingRecipe) {
      action = 'update';
      oldName = editingRecipe.name;
      finalRecipe = { ...editingRecipe, ...recipeData } as Recipe;
      setRecipes(prev => prev.map(r => r.id === editingRecipe.id ? finalRecipe : r));
    } else {
      action = 'create';
      finalRecipe = {
        id: Date.now(),
        name: recipeData.name || 'Nueva Receta',
        ingredients: recipeData.ingredients || '',
        instructions: recipeData.instructions || '',
        image: recipeData.image || "🍽️",
        type: recipeData.type || 'caliente'
      };
      setRecipes(prev => [finalRecipe, ...prev]);
    }

    setIsFormOpen(false);
    setEditingRecipe(null);

    setSyncing(true);
    try {
      await syncToGoogleSheets({ recipe: finalRecipe, action, oldName });
    } catch (err) {
      console.error("Error al sincronizar guardado:", err);
    } finally {
      setTimeout(() => setSyncing(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <Header />
      
      {syncing && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-8 py-3 rounded-full text-[10px] font-black animate-pulse shadow-2xl flex items-center justify-center gap-3 tracking-[0.2em] border border-slate-700">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          ACTUALIZANDO NUBE...
        </div>
      )}

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 max-w-3xl mx-auto">
            <div className="relative flex-grow w-full group">
              <div className="absolute inset-0 bg-emerald-100 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <input 
                type="text" 
                placeholder="Busca tus delicias..."
                className="relative block w-full pl-8 pr-4 py-5 bg-white border border-gray-100 rounded-[2rem] shadow-sm focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-lg font-medium placeholder:text-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={handleAdd}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 px-12 rounded-[2rem] shadow-xl shadow-emerald-200/50 transition-all whitespace-nowrap active:scale-95 text-sm uppercase tracking-widest"
            >
              + NUEVA RECETA
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onView={setSelectedRecipe} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
        
        {filteredRecipes.length === 0 && (
          <div className="text-center py-32">
            <span className="text-8xl mb-6 block animate-pulse">🥘</span>
            <p className="text-gray-400 font-bold text-xl">¿Cocinamos algo nuevo? No hay resultados.</p>
          </div>
        )}
      </main>

      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      {isFormOpen && <RecipeFormModal recipe={editingRecipe} onClose={() => setIsFormOpen(false)} onSave={handleSaveRecipe} />}
      <AssistantChat />
    </div>
  );
};

export default App;
