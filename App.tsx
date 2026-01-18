import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import RecipeFormModal from './components/RecipeFormModal';
import { RECIPES as INITIAL_RECIPES } from './recipesData';
import { Recipe } from './types';
import { syncToGoogleSheets } from './services/sheetsService';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    
    // Sincronizar con Google Sheets (el webhook sigue configurado internamente)
    await syncToGoogleSheets({ recipe: newRecipe, action: 'create' });
  };

  return (
    <div className="min-h-screen bg-[#d8dad0] flex flex-col selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-500">
      <Header 
        onNewRecipe={() => setIsFormOpen(true)} 
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
      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      
      {isFormOpen && (
        <RecipeFormModal 
          recipe={null} 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleAddRecipe} 
        />
      )}
    </div>
  );
};

export default App;