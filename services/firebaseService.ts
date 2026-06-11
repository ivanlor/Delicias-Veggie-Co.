import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  collection, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { Recipe } from '../types';

const app = initializeApp(firebaseConfig);
// CRITICAL: The app will break without Passing the firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validation validation test on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('offline')) {
      console.error("Please check your Firebase configuration or network status.");
    }
  }
}

testConnection();

// HELPER: Login with Google (PopUp)
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// HELPER: Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// FIRESTORE SYNC: Load recipes for currentUser
export const fetchRecipesFromCloud = async (userId: string): Promise<Recipe[]> => {
  const path = 'recipes';
  try {
    const q = query(collection(db, path), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const cloudRecipes: Recipe[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      cloudRecipes.push({
        id: data.id,
        name: data.name,
        ingredients: data.ingredients,
        instructions: data.instructions,
        image: data.image,
        type: data.type as 'fresco' | 'caliente',
        category: data.category
      });
    });
    return cloudRecipes;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
};

// FIRESTORE SYNC: Save (Create/Update) Recipe
export const saveRecipeToCloud = async (recipe: Recipe, userId: string) => {
  const docId = `${userId}_${recipe.id}`;
  const path = `recipes/${docId}`;
  try {
    const docRef = doc(db, 'recipes', docId);
    const payload = {
      id: Number(recipe.id),
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: recipe.image || '🍲',
      type: recipe.type || 'caliente',
      userId: userId,
      createdAt: new Date().toISOString()
    };
    await setDoc(docRef, payload);
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false };
  }
};

// FIRESTORE SYNC: Delete Recipe
export const deleteRecipeFromCloud = async (recipeId: number, userId: string) => {
  const docId = `${userId}_${recipeId}`;
  const path = `recipes/${docId}`;
  try {
    const docRef = doc(db, 'recipes', docId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    return { success: false };
  }
};
