import React from 'react';

import { View, ScrollView, ActivityIndicator, Text, Image, Pressable, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { loadPlateById } from '../services/plate';

import { theme } from '../theme/token';


export default function DetailsScreen({ route, navigation }: any) {

  const id = route.params?.id;

  const [status, setStatus] = React.useState("idle");
  const [plate, setPlate] = React.useState<any>(null);


  React.useEffect(() => {
    getPlate();
  }, [id]);


  async function getPlate() {
    setStatus("loading");
    try {
      const data = await loadPlateById(id);
      setPlate(data);
      setTimeout(() => setStatus("success"), 1000);
    } 
    catch {
      setPlate(null);
      setStatus("error");
    }
  };


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

  // metti preferiti

  return (
    <SafeAreaProvider>
      <SafeAreaView  style={{ flex: 1 }}>
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
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back to home">
            <Text style={styles.buttonText}>Go back</Text>
          </Pressable>
      
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  indicator: {
    marginTop: 250,
  },
  name: {
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.xxl,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  photo: {
    width: "100%",
    height: 250,
    marginBottom: theme.spacing.md,    
    borderRadius: theme.radius.sm,
  },
  infoTitle: {
    margin: theme.spacing.xs,
    fontSize: theme.typography.lg,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  infoText: {
    margin: theme.spacing.sm,
    fontSize: theme.typography.md,
    color: theme.colors.accent
  },
  instructionTitle: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,    
    fontSize: theme.typography.lg,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  instructionText: {
    marginBottom: theme.spacing.lg,    
    fontSize: theme.typography.sm,
    color: theme.colors.muted,
    lineHeight: 22,
  },
  button: {
    alignItems: "center",    
    marginTop: theme.spacing.md,
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.xs,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.typography.md,
    fontWeight: "600",
  },
  retryButton: {
    alignItems: "center",    
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.xs,
  },
  retryText: {
    color: theme.colors.text,
    fontWeight: "600",
  },
  error: {
    color: theme.colors.text,
    fontSize: theme.typography.md,
  },
});