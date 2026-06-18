import React from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { loadPlateById } from '../services/Plate';


export default function DetailsScreen({ route }: any) {
  
  const navigation = useNavigation<any>();
  const id = route.params?.id;
  const [plate, setPlate] = React.useState<any>(null);


  async function getPlate () {
    try {
      const data = await loadPlateById(id);
      setPlate(data);
    } catch {
      setPlate(null);
    }
  };


  React.useEffect(() => {
    getPlate();
  }, [id]);


  if (!id) {
    return (
      <View style={styles.container}>
        <Text>Invalid route param</Text>
      </View>
    );
  }

  if (!plate) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  // mettere messaggi di errore
  

  return (
    <View style={styles.container}>

       {/*AGGIUNGERE IMMAGINE E SISTEMARE SCHERMATA*/}
      <Text style={styles.textProd}>{plate.strMeal}</Text>

      <Pressable style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </Pressable>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textProd: {
    marginBottom: 10,
    fontSize: 24, 
    fontWeight: "bold",
  },
  button: {
    width: 65,
    padding: 5,
    fontWeight: "600",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#e8e8e8",
    borderColor: "#000",
  },
});