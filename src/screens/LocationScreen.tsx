import React from 'react';

import { View, Text, Pressable, TextInput, FlatList, Linking, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { CountryCardList, Country } from '../components/CountryCardList';
import { countries } from '../data/countries';

import { locationRequest, getCountry } from '../services/location';

import { theme } from '../theme/token';


export default function LocationScreen({ navigation }: any) {

  type RequestStatus = "unknown"|"denied"|"granted";
  const [permission, setPermission] = React.useState<RequestStatus>("unknown");

  const [countryData, setCountryData] = React.useState<Country[]>(countries);
  const [search, setSearch] = React.useState(""); 


  async function askLocation() {
    const result = await locationRequest();
    setPermission(result);

    if (result === "granted") {
      const country = await getCountry();
      const find = countries.find(c => c.id === country);
      navigation.navigate("Home", { area: find?.area })
    }
  }


  async function searchCountry() {
    const q = search.toLowerCase().trim();

    if (!q) {
      setCountryData(countryData);
      return;
    }

    const filtered = countryData.filter(country =>
      country.name.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      setCountryData([]);
      return;
    }

    setCountryData(filtered);
  }


  // permesso non gestito
  // fare come in homescreen ?

 
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
 
          <MaterialCommunityIcons style={styles.icon}
            name="chef-hat" 
            size={50}
          />
 
          <Text style={styles.title}>
            Scegli il tuo paese
          </Text>

          <Text style={styles.subtitle}>
            Seleziona il tuo paese di origine o utilizza
            la posizione per vedere le ricette locali
          </Text>

          <Pressable style={styles.positionButton}
            onPress={askLocation}>
            <MaterialIcons style={styles.iconLocation}
              name="location-on" 
              size={23} 
              color={"#fff"}
            />
            <Text style={styles.positionButtonText}>Usa la mia posizione</Text>
            <MaterialIcons style={styles.iconAim} 
              name="my-location" 
              size={22} 
              color={"#fff"}
            />
          </Pressable>

          <View style={styles.search}>
            <MaterialIcons name="search" size={18} color="#fff" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={searchCountry}
              autoCapitalize="none"
              placeholder="Cerca un paese..."
              placeholderTextColor="#fff"
              style={styles.textInput}
            />
          </View>

          <FlatList contentContainerStyle={styles.list}
            data={countryData}
            keyExtractor={(country) => country.id}
            renderItem={({ item : country }) => 
              <CountryCardList
                country={country}
                onPress={() => navigation.navigate("Home", { area: country.area })}
                >
              </CountryCardList> 
            }
            accessibilityLabel="Country list"
            accessible={true}>
          </FlatList>

          <Pressable style={styles.settingsButton}
            onPress={() => Linking.openSettings()}>
            <MaterialIcons name="settings" size={30} color={"#fff"}/>
            <Text style={styles.settingsButtonText}>Impostazioni</Text>
          </Pressable>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
  },
  icon: {
    alignSelf: "center", 
    marginTop: theme.spacing.sm,
    color: theme.colors.text,
  },
  title: { 
    alignSelf: "center",  
    marginBottom: theme.spacing.xs,
    fontSize: theme.typography.xxl,
    fontWeight: "bold",
    color: theme.colors.text
  },
  subtitle: { 
    width: 300,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.md,
    textAlign: "center",
    color: theme.colors.text
  }, 
  positionButton: {
    flexDirection: "row",
    alignItems: "center",    
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.error,
    borderRadius: theme.radius.sm,
  },
  positionButtonText: {
    color: theme.colors.text,
    fontSize: theme.typography.md,
    fontWeight: "600",
  },
  iconLocation: {
    marginRight: theme.spacing.sm
  },
  iconAim: {
   marginLeft: "auto"
  },
  search: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.error,
    borderRadius: theme.radius.md,
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: theme.typography.md,
    color: theme.colors.input,
  },  
  list: {
    gap: 5,
    paddingBottom: theme.spacing.md,
  }, 
  settingsButton: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.error,
    borderRadius: theme.radius.md,
  },
  settingsButtonText: {
    fontSize: theme.typography.md,
    color: theme.colors.input,
  }
});