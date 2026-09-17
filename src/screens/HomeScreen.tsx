import React from 'react';

import { View, ActivityIndicator, Text, Pressable, TextInput, FlatList, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { PlateCardList, Plate } from '../components/PlateCardList';
import { loadPlates } from '../services/plate';

import { FavoriteContext } from '../context/FavoriteContext';

import { theme } from '../theme/token';


export default function HomeScreen({ route, navigation }: any) {

  const area = route.params?.area;

  const [status, setStatus] = React.useState("idle"); 
  const [plateData, setPlateData] = React.useState<Plate[]>([]);

  const [search, setSearch] = React.useState(""); 

  const { favorites, toggleFavorite } = React.useContext(FavoriteContext);


  React.useEffect(() => {
    getPlates();
  }, [area]);


  async function getPlates() {
    setStatus("loading");
    try {
      const data = await loadPlates(area);    
      setPlateData(data)                  
      setTimeout(() => setStatus("success"), 1000);
    } 
    catch {
      setStatus("error");          
    }
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

    if (filtered.length === 0) {
      setPlateData([]);
      setStatus("empty");
      return;
    }

    setPlateData(filtered);
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
        <Text style={styles.errorText}>Errore caricamento !</Text>
        <Pressable style={styles.retryButton} onPress={() => getPlates()}>
          <Text style={styles.retryText}>Riprova</Text>
        </Pressable>
      </View>
    );
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.title}>Piatti italiani</Text>

            <Pressable style={styles.icon}
              onPress={() => navigation.navigate("Profile")}
              accessibilityRole="button"
              accessibilityLabel="Go to profile">
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
              accessibilityLabel="Search meals input"
              accessible={true}
            />
          </View>

          {status === "empty" && 
            <Text style={styles.emptyText}>Nessun piatto trovato ...</Text>}

          <FlatList contentContainerStyle={styles.list}
            data={plateData}
            keyExtractor={(plate) => plate.idMeal}
            renderItem={({ item : plate }) => 
              <PlateCardList
                plate={plate}
                onPress={() => navigation.navigate("Detail", { id: plate.idMeal })}
                isFavorite={favorites.includes(plate.idMeal)}
                onToggleFav={() => toggleFavorite(plate.idMeal)}>
              </PlateCardList> 
            }
            accessibilityLabel="Meals list"
            accessible={true}>
          </FlatList>
  
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.primary,
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
    fontSize: theme.typography.xl,
    fontWeight: "bold",
    color: theme.colors.text, 
  },
  icon: {
    width: 45,
    height: 45,
    marginRight: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.text,
    borderRadius: theme.radius.sm,
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: theme.typography.md,
  },  
  emptyText: {
    alignSelf: "center",
    color: theme.colors.text,
    fontSize: theme.typography.md,
  },
  list: {
    paddingBottom: theme.spacing.md,
  },  
  errorText: {
    marginTop: theme.spacing.xl,
    color: theme.colors.text,
    fontSize: theme.typography.md,   
    textAlign: "center",
  },
  retryButton: {
    width: 200,
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    alignSelf: "center",
    alignItems: "center",    
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.xs,
  },
  retryText: {
    color: theme.colors.text,
    fontWeight: "600",
  },
});