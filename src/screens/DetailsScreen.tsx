import React from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { fruits } from '../data/fruitData';


export default function DetailsScreen({ route }: any) {
  
  const navigation = useNavigation<any>();

  const id = route.params?.id;
  const fruit = fruits.find((p) => p.id === id);


  if (!id) {
    return (
      <View style={styles.container}>
        <Text>Invalid route param</Text>
      </View>
    );
  }

  if (!fruit) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }
  

  return (
    <View style={styles.container}>

      <Text style={styles.textProd}>{fruit?.name}</Text>

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