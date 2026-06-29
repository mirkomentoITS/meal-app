import React from 'react';
import { Text, Pressable, Image, StyleSheet } from 'react-native';


export interface Plate {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

interface PlateCardProps {
  plate: Plate;
  onPress: () => void;
}


export function PlateCardGrid ({ plate, onPress }: PlateCardProps) {

  return (
    <Pressable style={styles.item} 
      onPress={onPress}>
      <Image style={styles.image} source={{ uri: plate.strMealThumb }} />
      <Text style={styles.textMeal}>{plate.strMeal}</Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    alignItems: "center",  
    width: "47%",
    height: 180,
    marginBottom: 15,
    backgroundColor: "#f66d38",
    borderWidth: 1,
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
  },
  textMeal: {
    margin: 5,
    fontSize: 18,
    fontWeight: "400",
    color: "#ffffff", 
  },
});