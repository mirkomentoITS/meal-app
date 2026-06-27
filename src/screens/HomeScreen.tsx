import React from 'react';

import { View, ActivityIndicator, Text, Pressable, TextInput, FlatList, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { PlateCard, Plate } from '../components/PlateCard';
import { loadPlates } from '../services/plate';
import { loadFavoriteIds, saveFavoriteIds } from '../services/favorite';


export default function HomeScreen({ navigation }: any) {

  const [status, setStatus] = React.useState("idle"); 
  const [plateData, setPlateData] = React.useState<Plate[]>([]);

  const [search, setSearch] = React.useState(""); 

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


  async function searchPlate() {
    const q = search.toLowerCase().trim();

    if (!q) {
      setPlateData(plateData);
      return;
    }

    const filtered = plateData.filter(plate =>
      plate.strMeal.toLowerCase().includes(q)
    );

    setPlateData(filtered);
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

          <View style={styles.header}>
            <Text style={styles.title}>Piatti italiani</Text>

            <Pressable style={styles.profile}
              onPress={() => navigation.navigate("Profile")}>
              <MaterialIcons
                name="account-circle" 
                size={45}
                color={"#fff"}
              />
            </Pressable>
          </View>
          
          <View style={styles.search}>
            <MaterialIcons name="search" size={22} color="#882323" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={searchPlate}
              autoCapitalize="none"
              placeholder="Cerca un piatto..."
              placeholderTextColor="#666"
              style={styles.textInput}
            />
          </View>

          <FlatList contentContainerStyle={styles.list}
            data={plateData}
            keyExtractor={(plate) => plate.idMeal}
            renderItem={({ item : plate }) => 
              <PlateCard 
                plate={plate}
                onPress={() => navigation.navigate("Details", { id: plate.idMeal })}
                isFavorite={favorites.includes(plate.idMeal)}
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
    gap: 15,
    backgroundColor: "#882323",
  },
  indicator: {
    marginTop: 250,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#ffffff", 
  },
  profile: {
    width: 45,
    height: 45,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
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