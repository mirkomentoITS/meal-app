import React from 'react';
import { View, ActivityIndicator, Text, Pressable, Image, FlatList, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { loadPlates } from '../services/plate';


interface Plate {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};


function PlateCard ({ plate }: { plate: Plate }) {

  const navigation = useNavigation<any>();           // fai componente

  return (
    <Pressable style={styles.row} 
      onPress={() => navigation.navigate("Details", { id: plate.idMeal  })}>
      <Image style={styles.image} source={{ uri: plate.strMealThumb }}  />
      <Text style={styles.textMeal}>{plate.strMeal}</Text>
    </Pressable>
  );
}


export default function HomeScreen() {

  const [plateData, setPlateData] = React.useState<Plate[]>([]);
  const [status, setStatus] = React.useState("idle"); 


  async function load() {
    setStatus("loading");
    try {
      const data = await loadPlates();    
      setPlateData(data)                  
      setTimeout(() => setStatus("success"), 1000);    //elimina timeout
    } 
    catch {
      setStatus("error");          
    }
   }

  React.useEffect(() => {
    load();
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
        <Pressable style={styles.retryButton} onPress={() => load()}>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#ffffff", 
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#8d8d8d94", 
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  textMeal: {
    fontSize: 18,
    fontWeight: "400",
    color: "#ffffff", 
    flex: 1,
  },
  retryButton: {
    width: 200,
    alignSelf: "center",
    marginTop: 16,
    padding: 10,
    backgroundColor: "#f66d38",
    borderRadius: 8,
    alignItems: "center",
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