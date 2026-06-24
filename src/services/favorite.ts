import AsyncStorage from '@react-native-async-storage/async-storage';


export const FAVORITES_KEY = "app:v1:favs";


export async function loadFavoriteIds(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } 
  catch (error) {
    console.error("Errore caricamento favoriti:", error);
    return [];
  }
}

export async function saveFavoriteIds(ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } 
  catch (error) {
    console.error("Errore salvataggio favoriti:", error);
  }
}