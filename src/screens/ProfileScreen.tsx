import React from 'react';

import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '../components/Avatar';

import { PlateCardGrid, Plate } from '../components/PlateCardGrid';
import { loadPlateById } from '../services/plate';

import { AuthContext } from '../context/AuthContext';
import { FavoriteContext } from '../context/FavoriteContext';


export default function ProfileScreen({ navigation }: any) {

  const [status, setStatus] = React.useState("idle");
  const [plateFav, setPlateFav] = React.useState<Plate[]>([]);

  const { user, logout } = React.useContext(AuthContext); 
  const { favorites } = React.useContext(FavoriteContext);


  React.useEffect(() => {
    getPlates();
  }, [favorites]);
  
  
  async function getPlates () {
    setStatus("loading"); 
    try {                                                                   // gestisci status
      const favs = favorites.map((id : string) => loadPlateById(id));   // nome promises cambia
      const data = await Promise.all(favs);
      setPlateFav(data);
      setTimeout(() => setStatus("success"), 1000);
    } 
    catch {
      setStatus("error");
    }
  };


  function onLogout() {
    setTimeout(() => {   
      logout();
      navigation.replace("Login");
    }, 1000);
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
       
          <View style={styles.header}>
            <Avatar uri={user.avatarUri}/>
            <Text style={styles.user}>{user.name}</Text>
          </View>

          <Text style={styles.title}>Piatti italiani</Text>
          
          <FlatList columnWrapperStyle={styles.list}
            numColumns={2}
            data={plateFav}
            keyExtractor={(plate) => plate.idMeal}
            renderItem={({ item : plate }) => 
              <PlateCardGrid
                plate={plate}
                onPress={() => navigation.navigate("Details", { id: plate.idMeal })}>
              </PlateCardGrid> }>
          </FlatList>

          <Pressable style={styles.button}
            onPress={onLogout}>
            <Text style={styles.buttonText}>LOGOUT</Text>
          </Pressable>

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,    
    gap: 18,
  },
  user: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff", 
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
  button: {
    alignItems: "center",    
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f74232",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#fff"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});