import React from 'react';
import { View, ActivityIndicator, Text, Pressable, FlatList, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { PlateCard, Plate } from '../components/PlateCard';
import { loadPlates } from '../services/plate';
import { loadFavoriteIds, saveFavoriteIds } from '../services/favorite';


export default function HomeScreen({ navigation }: any) {

  const [status, setStatus] = React.useState("idle"); 
  const [plateData, setPlateData] = React.useState<Plate[]>([]);

  const [favorites, setFavorites] = React.useState<string[]>([]);


  React.useEffect(() => {
    getPlates();
    loadFavoriteIds().then(setFavorites);
  }, []);


  async function getPlates() {
    setStatus("loading");
    try {
      const data = await loadPlates();    
      setPlateData(data)                  
      setTimeout(() => setStatus("success"), 1000);
    } 
    catch {
      setStatus("error");          
    }
   }


  if (status === "loading") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Piatti italiani</Text>
        <ActivityIndicator style={styles.indicator}
          size="large" 
          color="#ffffff" 
        />
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Piatti italiani</Text>
        <Text style={styles.error}>Errore caricamento !</Text>
        <Pressable style={styles.retryButton} onPress={() => getPlates()}>
          <Text style={styles.retryText}>Riprova</Text>
        </Pressable>
      </View>
    );
  }


  function toggleFavorite(idMeal: string) {
    setFavorites((current) => {
      const next = current.includes(idMeal)
        ? current.filter(id => id !== idMeal)
        : [...current, idMeal];

      saveFavoriteIds(next);
      return next;
    });
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>

          <Text style={styles.title}>Piatti italiani</Text>
    
          <FlatList contentContainerStyle={styles.list}
            data={plateData}
            keyExtractor={(plate) => plate.idMeal}
            renderItem={({ item : plate }) => 
              <PlateCard 
                plate={plate} 
                isFavorite={favorites.includes(plate.idMeal)}
                onPress={() => navigation.navigate("Details", { id: plate.idMeal })}
                onToggleFav={() => toggleFavorite(plate.idMeal)}>
              </PlateCard> }>
          </FlatList>
  
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#882323",
  },
  indicator: {
    marginTop: 250,
  },
  title: {
    marginBottom: 16,    
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", 
  },
  list: {
    paddingBottom: 16,
  },
  retryButton: {
    width: 200,
    alignSelf: "center",
    alignItems: "center",    
    marginTop: 16,
    padding: 10,
    backgroundColor: "#f66d38",
    borderRadius: 8,
  },
  retryText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  error: {
    marginTop: 50,
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
});