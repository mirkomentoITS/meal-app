import React from 'react';
import { View, Text, Pressable, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


export interface Plate {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};


export function PlateCard ({ plate }: { plate: Plate }) {

  const navigation = useNavigation<any>(); 
  const [toggleFavorite, setToggleFavorite] = React.useState(false)

  return (
    <View style={styles.row}> 

      <Pressable style={styles.item} 
        onPress={() => navigation.navigate("Details", { id: plate.idMeal  })}>
        <Image style={styles.image} source={{ uri: plate.strMealThumb }} />
        <Text style={styles.textMeal}>{plate.strMeal}</Text>
      </Pressable>

      <Pressable style={styles.like}
        onPress={() => setToggleFavorite(prev => !prev)}>
        <MaterialIcons
          name={toggleFavorite ? "favorite" : "favorite-border"} 
          size={35}
          color="#fff"
        />
      </Pressable>

    </View>
  );
}


const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#8d8d8d94", 
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,    
    borderRadius: 8,
  },
  textMeal: {
    flex: 1,
    fontSize: 18,
    fontWeight: "400",
    color: "#ffffff", 
  },
  like: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  }
});