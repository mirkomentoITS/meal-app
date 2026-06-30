import AsyncStorage from '@react-native-async-storage/async-storage';


export const USER_KEY = "app:user";


export async function loadUser(): Promise<any> {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } 
  catch (error) {
    console.error("Errore caricamento utente:", error);
    return null;
  }
}

export async function saveUser(user: any): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } 
  catch (error) {
    console.error("Errore salvataggio utente:", error);
  }
}

export async function deleteUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } 
  catch (error) {
    console.error("Errore eliminazione utente:", error);
  }
}