import React from 'react';

import { View, ActivityIndicator, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { Avatar } from '../components/Avatar';

import { PlateCardGrid, Plate } from '../components/PlateCardGrid';
import { loadPlateById } from '../services/plate';

import { AuthContext } from '../context/AuthContext';
import { FavoriteContext } from '../context/FavoriteContext';


export default function ProfileScreen({ navigation }: any) {

  const [status, setStatus] = React.useState("idle");
  const [plateFav, setPlateFav] = React.useState<Plate[]>([]);

  const { user } = React.useContext(AuthContext); 
  const { favorites } = React.useContext(FavoriteContext);


  React.useEffect(() => {
    getPlates();
  }, [favorites]);
  
  
  async function getPlates () {
    setStatus("loading"); 
    try {                                                                   
      const favs = favorites.map((id : string) => loadPlateById(id));  
      const data = await Promise.all(favs);
      setPlateFav(data);
      setTimeout(() => setStatus("success"), 1000);
    } 
    catch {
      setStatus("error");
    }
  };


  if (status === "loading") {
    return (
      <View style={styles.container}>
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
        <Text style={styles.error}>Errore caricamento !</Text>
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
            <Avatar uri={user?.avatarUri}/>
            <Text style={styles.user}>{user?.name}</Text>
            
            <Pressable style={styles.icon}
              onPress={() => navigation.navigate("Setting")}>
              <MaterialIcons
                name="settings" 
                size={45}
                color={"#fff"}
              />
            </Pressable>
          </View>

          <Text style={styles.title}>Piatti Preferiti</Text>
          
          <FlatList columnWrapperStyle={styles.list}
            numColumns={2}
            data={plateFav}
            keyExtractor={(plate) => plate.idMeal}
            renderItem={({ item : plate }) => 
              <PlateCardGrid
                plate={plate}
                onPress={() => navigation.navigate("Detail", { id: plate.idMeal })}>
              </PlateCardGrid> }>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,    
    gap: 18,
  },
  user: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff", 
  },
  icon: {
    width: 45,
    height: 45,    
    justifyContent: "center",
    alignItems: "center",    
    marginLeft: 32,
    marginRight: 15,
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff", 
  },
  list: {
    justifyContent: "center",
    alignContent: "center",
    gap: 15,
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