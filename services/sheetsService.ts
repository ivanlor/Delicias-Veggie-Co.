import { Recipe } from "../types.ts";

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxmwoIanCHW0l0bjuiuC6pHAW9meQJAlEMdeDu_6H3oKugIh1sP4UIDo0KIi8NKEXTCCQ/exec';

export type SheetAction = 'create' | 'update' | 'delete';

interface SyncParams {
  recipe: Recipe;
  action: SheetAction;
  oldName?: string;
}

export const syncToGoogleSheets = async ({ recipe, action, oldName }: SyncParams) => {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      body: JSON.stringify({
        action,
        oldName: oldName || recipe.name, // Clave para buscar la fila
        name: recipe.name,
        type: recipe.type,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions
      }),
    });

    console.log(`Sincronizado: ${action} -> ${recipe.name}`);
    return { success: true };
  } catch (error) {
    console.error(`Error de sincronización:`, error);
    return { success: false };
  }
};