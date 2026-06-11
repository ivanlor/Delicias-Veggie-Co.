import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import RecipeFormModal from './components/RecipeFormModal';
import { RECIPES as INITIAL_RECIPES } from './recipesData';
import { Recipe } from './types';
import { 
  auth, 
  loginWithGoogle, 
  logoutUser, 
  fetchRecipesFromCloud, 
  saveRecipeToCloud, 
  deleteRecipeFromCloud 
} from './services/firebaseService';
import { onAuthStateChanged, User } from 'firebase/auth';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'loading';
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loadingCloud, setLoadingCloud] = useState(false);
  
  // Local state for recipes
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
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast manager
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

  // Track Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        setLoadingCloud(true);
        const toastId = showToast(`¡Conectado! Sincronizando tus recetas con la nube...`, 'loading');
        
        try {
          // 1. Fetch recipes already in the cloud
          const cloudRecipes = await fetchRecipesFromCloud(currentUser.uid);
          
          if (cloudRecipes.length === 0) {
            // First time logging in or cloud is empty: Let's back up the current local recipes to the cloud!
            const backupToastId = showToast(`Subiendo tus recetas locales a tu nueva nube personal...`, 'loading');
            
            for (const recipe of recipes) {
              await saveRecipeToCloud(recipe, currentUser.uid);
            }
            
            dismissToast(backupToastId);
            // Re-fetch to guarantee complete sync
            const syncedRecipes = await fetchRecipesFromCloud(currentUser.uid);
            setRecipes(syncedRecipes);
            showToast(`¡Toda tu lista de recetas quedó guardada con éxito en la nube! 🚀`, 'success');
          } else {
            // Cloud has data: replace local list with the cloud data
            setRecipes(cloudRecipes);
            showToast(`Recetas cargadas desde tu cuenta en la nube correctamente. ✨`, 'success');
          }
        } catch (error) {
          console.error("Error synchronizing with cloud on auth change:", error);
          showToast(`No se pudieron sincronizar las recetas con la nube.`, 'error');
        } finally {
          dismissToast(toastId);
          setLoadingCloud(false);
        }
      } else {
        // Logged out: re-load from local storage or defaults
        const saved = localStorage.getItem('delicias_recipes_v2');
        if (saved) {
          try {
            setRecipes(JSON.parse(saved));
          } catch (e) {
            setRecipes(INITIAL_RECIPES);
          }
        } else {
          setRecipes(INITIAL_RECIPES);
        }
      }
    });

    return () => unsubscribe();
  }, [user === null]); // Keep subscription alive but stable

  // Auto-save local changes only when NOT logged in to preserve different states
  useEffect(() => {
    if (!user) {
      localStorage.setItem('delicias_recipes_v2', JSON.stringify(recipes));
    }
  }, [recipes, user]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, recipes]);

  const handleLogin = async () => {
    const toastId = showToast("Iniciando sesión con Google...", "loading");
    try {
      await loginWithGoogle();
      dismissToast(toastId);
    } catch (error) {
      dismissToast(toastId);
      showToast("Hubo un error al iniciar sesión con Google.", "error");
    }
  };

  const handleLogout = async () => {
    const toastId = showToast("Cerrando sesión...", "loading");
    try {
      await logoutUser();
      dismissToast(toastId);
      showToast("Sesión cerrada. Volviendo al modo local offline.", "success");
    } catch (error) {
      dismissToast(toastId);
      showToast("Error al cerrar sesión.", "error");
    }
  };

  // Save recipe (Supports Create and Edit)
  const handleSaveRecipe = async (recipeData: Partial<Recipe>) => {
    if (editingRecipe) {
      // EDIT MODE
      const updatedRecipe: Recipe = {
        ...editingRecipe,
        name: recipeData.name || editingRecipe.name,
        ingredients: recipeData.ingredients || editingRecipe.ingredients,
        instructions: recipeData.instructions || editingRecipe.instructions,
        image: recipeData.image || editingRecipe.image,
        type: recipeData.type || editingRecipe.type,
      };

      setRecipes(prev => prev.map(r => r.id === editingRecipe.id ? updatedRecipe : r));
      
      if (selectedRecipe && selectedRecipe.id === editingRecipe.id) {
        setSelectedRecipe(updatedRecipe);
      }
      
      setEditingRecipe(null);
      setIsFormOpen(false);

      if (user) {
        const toastId = showToast(`Actualizando "${updatedRecipe.name}" en la nube...`, 'loading');
        const res = await saveRecipeToCloud(updatedRecipe, user.uid);
        dismissToast(toastId);

        if (res.success) {
          showToast(`¡"${updatedRecipe.name}" actualizada en la nube! ✅`, 'success');
        } else {
          showToast(`Guardado en local. No se guardará en otros dispositivos temporalmente.`, 'error');
        }
      } else {
        showToast(`¡"${updatedRecipe.name}" modificada localmente!`, 'success');
      }
    } else {
      // CREATE MODE (ALTA)
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

      if (user) {
        const toastId = showToast(`Sincronizando "${newRecipe.name}" con la nube...`, 'loading');
        const res = await saveRecipeToCloud(newRecipe, user.uid);
        dismissToast(toastId);

        if (res.success) {
          showToast(`¡"${newRecipe.name}" guardada en la nube! Accede desde cualquier dispositivo. 🚀`, 'success');
        } else {
          showToast(`Guardada únicamente en tu dispositivo actual. Intenta re-conectar.`, 'error');
        }
      } else {
        showToast(`¡"${newRecipe.name}" guardada localmente!`, 'success');
      }
    }
  };

  // Delete recipe
  const handleDeleteRecipe = async (recipeToDelete: Recipe) => {
    setRecipes(prev => prev.filter(r => r.id !== recipeToDelete.id));
    setSelectedRecipe(null);

    if (user) {
      const toastId = showToast(`Borrando de la nube...`, 'loading');
      const res = await deleteRecipeFromCloud(recipeToDelete.id, user.uid);
      dismissToast(toastId);

      if (res.success) {
        showToast(`¡"${recipeToDelete.name}" eliminada de la nube con éxito!`, 'success');
      } else {
        showToast(`Eliminada localmente, pero falló la sincronización con la nube.`, 'error');
      }
    } else {
      showToast(`¡"${recipeToDelete.name}" eliminada de este dispositivo!`, 'success');
    }
  };

  // For editing inside detail modal
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
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Offline / Non-authenticated Friendly Banner */}
        {!user && (
          <div className="mb-8 max-w-4xl mx-auto bg-amber-50 border border-amber-200/80 rounded-3xl p-5 flex flex-col sm:flex-row shadow-sm gap-4 items-center justify-between animate-in slide-in-from-top duration-500">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <span className="text-3xl select-none">👋</span>
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">¿Deseas guardar tus recetas en la nube?</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Inicia sesión con Google usando el botón <b>Nube</b> para acceder desde tus otros dispositivos.
                </p>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-sm transition-all shrink-0 uppercase tracking-wider"
              id="btn-banner-login"
            >
              Conectarse Ahora
            </button>
          </div>
        )}

        {/* Search Section */}
        <section className="mb-12">
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
          <div className="text-center py-40 animate-in fade-in duration-700">
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

      {/* Toast floating notifications panel */}
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
