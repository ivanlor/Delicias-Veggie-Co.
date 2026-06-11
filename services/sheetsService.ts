import { Recipe } from "../types";

export type SheetAction = 'create' | 'update' | 'delete';

interface SyncParams {
  recipe: Recipe;
  action: SheetAction;
  oldName?: string;
}

export const syncToGoogleSheets = async ({ recipe, action, oldName }: SyncParams) => {
  // Intentar cargar la url personalizada del localStorage, si no usar el fallback por defecto
  const customUrl = localStorage.getItem('delicias_webhook_url');
  const WEBHOOK_URL = customUrl || 'https://script.google.com/macros/s/AKfycbzDxWBp66FKrCzIbAPyV-L0vzfBYwJ3TybwkmPQXanlHNfSjkYcPMwCuyFL9b2uDj9t/exec';

  try {
    const payload = {
      action,
      oldName: oldName || recipe.name, // Clave para buscar la fila
      name: recipe.name,
      type: recipe.type,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    };

    console.log(`Enviando a Sheets (${action}):`, payload);

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      body: JSON.stringify(payload),
    });

    console.log(`Sincronizado correctamente usando link: ${WEBHOOK_URL}`);
    return { success: true };
  } catch (error) {
    console.error(`Error de sincronización con Google Sheets:`, error);
    return { success: false };
  }
};