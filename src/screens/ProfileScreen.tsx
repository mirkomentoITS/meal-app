import React from 'react';

import { View, ActivityIndicator, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { Avatar } from '../components/Avatar';

import { PlateCardGrid, Plate } from '../components/PlateCardGrid';
import { loadPlateById } from '../services/plate';

import { AuthContext } from '../context/AuthContext';
import { FavoriteContext } from '../context/FavoriteContext';

import { useWindowDimensions } from "react-native";

import { theme } from '../theme/token';


export default function ProfileScreen({ navigation }: any) {

  const [status, setStatus] = React.useState("idle");
  const [plateFav, setPlateFav] = React.useState<Plate[]>([]);

  const { user } = React.useContext(AuthContext); 
  const { favorites } = React.useContext(FavoriteContext);

  const { width } = useWindowDimensions();
  const isWide = width >= 475;


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
              onPress={() => navigation.navigate("Setting")}
              accessibilityRole="button"
              accessibilityLabel="Settings" 
              >
              <MaterialIcons
                name="settings" 
                size={45}
                color={"#fff"}
              />
            </Pressable>
          </View>

          <Text style={styles.title}>Piatti Preferiti</Text>
          
          <FlatList columnWrapperStyle={styles.list}
            key={isWide ? "wide" : "narrow"}
            numColumns={isWide ? 3 : 2}
            data={plateFav}
            keyExtractor={(plate) => plate.idMeal}
            renderItem={({ item : plate }) => 
              <PlateCardGrid
                plate={plate}
                onPress={() => navigation.navigate("Detail", { id: plate.idMeal })}>
              </PlateCardGrid> 
            }
            accessibilityLabel="Favorite meals grid"
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
    backgroundColor: theme.colors.primary,
  },
  indicator: {
    marginTop: 250,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,    
    gap: theme.spacing.md,
  },
  user: {
    fontSize: theme.typography.xl,
    fontWeight: "bold",
    color: theme.colors.text, 
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
    marginBottom: theme.spacing.xs,
    fontSize: theme.typography.lg,
    fontWeight: "bold",
    color: theme.colors.text, 
  },
  list: {
    justifyContent: "center",
    alignContent: "center",
    gap: theme.spacing.md,
  },
  retryButton: {
    width: 200,
    alignSelf: "center",
    alignItems: "center",    
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.xs,
  },
  retryText: {
    color: theme.colors.text,
    fontWeight: "600",
  },
  error: {
    marginTop: theme.spacing.xl,
    color: theme.colors.text,
    fontSize: theme.typography.md,   
    textAlign: "center",
  },
});