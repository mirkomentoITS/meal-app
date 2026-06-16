import React from 'react';
import { View, Text, Pressable, FlatList, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { fruits } from '../data/fruitData';


interface Fruit {
  id: string;
  name: string;
};


function Row({ item }: { item: Fruit }) {

  const navigation = useNavigation<any>();

  return (
    <Pressable style={styles.row} 
      onPress={() => navigation.navigate("Details", { id: item.id })}>
      <Text style={styles.text}>{item.name}</Text>
    </Pressable>
  );
}


export default function HomeScreen() {

  return (
    <View style={styles.container}>
    
      <FlatList
        data={fruits}
        keyExtractor={(item) => item.id}
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