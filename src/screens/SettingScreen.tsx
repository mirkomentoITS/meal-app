import React from 'react';

import { View, Text, Pressable, Switch, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import SettingRow from '../components/SettingRow';

import { AuthContext } from '../context/AuthContext';


interface Settings {
  tema: boolean;
  suono: boolean;
  vibrazione: boolean;
  notifiche: boolean;
  email: boolean;
  dati: boolean;
}


export default function SettingScreen({ navigation }: any) {

  const [settings, setSettings] = React.useState({
    tema: false,
    suono: false,
    vibrazione: false,
    notifiche: false,
    email: false,
    dati: false,
  });

  const handleToggle = (key: keyof Settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  }; 


  const { logout } = React.useContext(AuthContext); 

  function onLogout() {
    setTimeout(() => {   
      logout();
      navigation.replace("Login");
    }, 1000);
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>

          <View style={styles.header}>
            <Pressable style={styles.icon}
              onPress={() => navigation.navigate("Profile")}>
              <MaterialIcons
                name="arrow-circle-left" 
                size={45}
                color={"#fff"}
              />
            </Pressable>     
            
            <Text style={styles.title}>Impostazioni</Text>
          </View>

          <Text style={styles.label}>Applicazione</Text>
          <View style={styles.group}>
            <SettingRow 
              icon="palette"
              value="Tema" 
              object={
                <Switch
                  value={settings.tema} 
                  onValueChange={() => handleToggle("tema")}>
                </Switch>}
            />
            <SettingRow 
              icon="music-note"
              value="Suono" 
              object={
                <Switch
                  value={settings.suono} 
                  onValueChange={() => handleToggle("suono")}>
                </Switch>}
            />
            <SettingRow 
              icon="vibration"
              value="Vibrazione" 
              object={
                <Switch
                  value={settings.vibrazione} 
                  onValueChange={() => handleToggle("vibrazione")}>
                </Switch>}
            />            
          </View>

          <Text style={styles.label}>Notifiche</Text>
          <View style={styles.group}>
            <SettingRow 
              icon="notifications"
              value="Notifiche App" 
              object={
                <Switch
                  value={settings.notifiche} 
                  onValueChange={() => handleToggle("notifiche")}>
                </Switch>}
            />
            <SettingRow 
              icon="mark-email-unread"
              value="Notifiche Email" 
              object={
                <Switch
                  value={settings.email} 
                  onValueChange={() => handleToggle("email")}>
                </Switch>}
            />    
          </View> 

          <Text style={styles.label}>Altro</Text>
          <View style={styles.group}>

            <SettingRow 
              icon="thumbs-up-down"
              value="Raccolta Informazioni" 
              object={
                <Switch
                  value={settings.dati} 
                  onValueChange={() => handleToggle("dati")}>
                </Switch>}
            />
          </View> 

          <Pressable style={styles.button}
            onPress={onLogout}>
            <Text style={styles.buttonText}>LOGOUT</Text>
          </Pressable> 

          <Pressable style={styles.button}
            onPress={onLogout}>
            <Text style={styles.buttonText}>LOGOUT</Text>
          </Pressable>                   

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#882323",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,    
  },
  icon: {
    width: 45,
    height: 45,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },  
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff", 
  },
  label: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff", 
  },
  group: {
    marginBottom: 20,    
    padding: 10,
    backgroundColor: "#c64646",
    borderRadius: 15,
  },
  button: {
    alignItems: "center",    
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f66d38",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#fff"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});