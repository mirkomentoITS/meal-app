import React from 'react';
import { View, ActivityIndicator, Text, Pressable, FlatList, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PlateCard, Plate } from '../components/PlateCard';
import { loadPlates } from '../services/plate';


export default function HomeScreen() {

  const [status, setStatus] = React.useState("idle"); 
  const [plateData, setPlateData] = React.useState<Plate[]>([]);


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

  React.useEffect(() => {
    getPlates();
  }, []);


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


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Piatti italiani</Text>
    
      <FlatList
        data={plateData}
        keyExtractor={(plate) => plate.idMeal}
        renderItem={({ item : plate }) => <PlateCard plate={plate} />}
        contentContainerStyle={styles.list}
      />
    
    </View>
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