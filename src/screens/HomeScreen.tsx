import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { loadPlates } from '../services/Plate';


interface Plate {
  idMeal: string;
  strMeal: string;
};


function Row({ item }: { item: Plate }) {

  const navigation = useNavigation<any>();

  return (
    <Pressable style={styles.row} 
      onPress={() => navigation.navigate("Details", { id: item.idMeal })}>
      <Text style={styles.text}>{item.strMeal}</Text>
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
      setStatus("error");
    }
   }

  React.useEffect(() => {
    load();
  }, []);


  return (
    <View style={styles.container}>
    
      <FlatList
        data={plateData}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => <Row item={item} />}
        contentContainerStyle={styles.list}
      />
    
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    height: 40,
    padding: 5,
    marginBottom: 8,
    justifyContent: "center",
    backgroundColor: "#b7e2f0",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#000",
  },
  text: {
    fontWeight: "600",
  },
});