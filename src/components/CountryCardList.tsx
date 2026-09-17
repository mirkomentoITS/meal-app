import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CountryFlag from "react-native-country-flag";


export interface Country {
  id: string;
  name: string;
  area: string;
};

interface CountryCardProps {
  country: Country;
  onPress: () => void;
}


export function CountryCardList ({ country, onPress }: CountryCardProps) {

  return (

    <Pressable style={styles.item} 
      onPress={onPress}>
      <CountryFlag 
        isoCode={country.id}
        size={20}
      />
      <Text style={styles.name}>{country.name}</Text>
      <MaterialIcons
        name={"keyboard-arrow-right"} 
        size={25}
        color="#fff"
      />
    </Pressable>

  );
}


const styles = StyleSheet.create({
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    gap: 15,
    backgroundColor: "#00000066",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontWeight: "400",
    color: "#ffffff", 
  },
});