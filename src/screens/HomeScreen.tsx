import React from 'react';
import { View, Text, Pressable, Image, FlatList, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { loadPlates } from '../services/Plate';


interface Plate {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};


function PlateCard ({ plate }: { plate: Plate }) {

  const navigation = useNavigation<any>();

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
      setStatus("success");             
    } 
    catch {
      setStatus("error");          // gestire stati <text ...
    }
   }

  React.useEffect(() => {
    load();
  }, []);


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
    fontSize: 16,
    fontWeight: "400",
    color: "#ffffff", 
    flex: 1,
  },
});