import React, { useState, useMemo } from 'react';
import Header from './components/Header.tsx';
import RecipeCard from './components/RecipeCard.tsx';
import RecipeModal from './components/RecipeModal.tsx';
import { RECIPES } from './recipesData.ts';
import { Recipe } from './types.ts';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#d8dad0] flex flex-col selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-500">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
    </div>
  );
};

export default App;