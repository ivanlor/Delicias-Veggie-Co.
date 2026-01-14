import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import RecipeFormModal from './components/RecipeFormModal';
import SettingsModal from './components/SettingsModal';
import { RECIPES as INITIAL_RECIPES } from './recipesData';
import { Recipe } from './types';
import { syncToGoogleSheets } from './services/sheetsService';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, recipes]);

  const handleAddRecipe = async (newRecipeData: Partial<Recipe>) => {
    const newRecipe: Recipe = {
      id: Date.now(),
      name: newRecipeData.name || 'Nueva Receta',
      ingredients: newRecipeData.ingredients || '',
      instructions: newRecipeData.instructions || '',
      image: newRecipeData.image || '🍲',
      type: (newRecipeData.type as 'fresco' | 'caliente') || 'caliente'
    };

    setRecipes(prev => [newRecipe, ...prev]);
    setIsFormOpen(false);
    
    // Sincronizar con Google Sheets
    await syncToGoogleSheets({ recipe: newRecipe, action: 'create' });
  };

  return (
    <div className="min-h-screen bg-[#d8dad0] flex flex-col selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-500">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <div className="max-w-xl mx-auto flex flex-col gap-6">
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
            
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-white px-6 py-3 rounded-2xl text-emerald-700 font-bold shadow-sm hover:shadow-md border border-emerald-50 transition-all flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nueva Receta
              </button>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="bg-white/50 px-6 py-3 rounded-2xl text-gray-600 font-bold shadow-sm hover:bg-white transition-all flex items-center gap-2 border border-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Google Sheets
              </button>
            </div>
          </div>
        </section>

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

      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      
      {isFormOpen && (
        <RecipeFormModal 
          recipe={null} 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleAddRecipe} 
        />
      )}

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
};

export default App;