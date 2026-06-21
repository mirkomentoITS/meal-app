import React from 'react';
import { View, ScrollView, ActivityIndicator, Text, Image, Pressable, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { loadPlateById } from '../services/plate';


export default function DetailsScreen({ route }: any) {

  const navigation = useNavigation<any>();
  const id = route.params?.id;

  const [plate, setPlate] = React.useState<any>(null);
  const [status, setStatus] = React.useState("idle");


  async function getPlate () {
    setStatus("loading");
    try {
      const data = await loadPlateById(id);
      setPlate(data);
      setTimeout(() => setStatus("success"), 1000);    //elimina timeout
    } 
    catch {
      setPlate(null);
      setStatus("error");
    }
  };

  React.useEffect(() => {
    getPlate();
  }, [id]);


  if (!id || typeof id !== "string") {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Invalid route param</Text>
      </View>
    );
  }

  if (status == "loading") {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.indicator}
          size="large" 
          color="#ffffff" 
        />
      </View>
    );
  }

  if (status === "error" || !plate) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Errore nel caricamento</Text>
        <Pressable style={styles.retryButton} onPress={() => getPlate()}>
          <Text style={styles.retryText}>Riprova</Text>
        </Pressable>
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>

      <Text style={styles.name}>{plate.strMeal}</Text>

      <Image style={styles.photo}
        source={{ uri: plate.strMealThumb }}  
      />

      <Text style={styles.infoTitle}>Category : 
        <Text style={styles.infoText}>
          {plate.strCategory}
        </Text>
      </Text>

      <Text style={styles.infoTitle}>Area : 
        <Text style={styles.infoText}>
          {plate.strArea}
        </Text>
      </Text>

      <Text style={styles.instructionTitle}>Istruzioni</Text>
      <Text style={styles.instructionText}>{plate.strInstructions}</Text>

      <Pressable style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go back</Text>
      </Pressable>

    </ScrollView>
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
  name: {
    marginBottom: 16,
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  photo: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    margin: 3,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  infoText: {
    margin: 7,
    fontSize: 16,
    color: "#fab005"
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 16,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: "#f0f0f0",
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#c92a2a",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  retryButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "#c92a2a",
    borderRadius: 8,
    alignItems: "center",
  },
  retryText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  error: {
    color: "#ffffff",
    fontSize: 16,
  },
});