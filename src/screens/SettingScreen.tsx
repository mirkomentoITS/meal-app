import React from 'react';

import { View, Text, Pressable, Switch, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import SettingRow from '../components/SettingRow';

import { AuthContext } from '../context/AuthContext';

import { theme } from '../theme/token';


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
              onPress={() => navigation.navigate("Profile")}
              accessibilityRole="button"
              accessibilityLabel="Back to profile">
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
                  onValueChange={() => handleToggle("tema")}
                  accessibilityLabel="Theme toggle"
                  accessible={true}>
                </Switch>}
            />
            <SettingRow 
              icon="music-note"
              value="Suono" 
              object={
                <Switch
                  value={settings.suono} 
                  onValueChange={() => handleToggle("suono")}
                  accessibilityLabel="Sound toggle"
                  accessible={true}>
                </Switch>}
            />
            <SettingRow 
              icon="vibration"
              value="Vibrazione" 
              object={
                <Switch
                  value={settings.vibrazione} 
                  onValueChange={() => handleToggle("vibrazione")}
                  accessibilityLabel="Vibration toggle"
                  accessible={true}>
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
                  onValueChange={() => handleToggle("notifiche")}
                  accessibilityLabel="App Notification toggle"
                  accessible={true}>
                </Switch>}
            />
            <SettingRow 
              icon="mark-email-unread"
              value="Notifiche Email" 
              object={
                <Switch
                  value={settings.email} 
                  onValueChange={() => handleToggle("email")}
                  accessibilityLabel="Newsletter toggle"
                  accessible={true}>
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
                  onValueChange={() => handleToggle("dati")}
                  accessibilityLabel="Data collection toggle"
                  accessible={true}>
                </Switch>}
            />
          </View> 

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
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,    
  },
  icon: {
    width: 45,
    height: 45,
    marginRight: theme.spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },  
  title: {
    fontSize: theme.typography.xl,
    fontWeight: "bold",
    color: theme.colors.text, 
  },
  label: {
    marginBottom: theme.spacing.xs,
    fontSize: theme.typography.md,
    fontWeight: "bold",
    color: theme.colors.text, 
  },
  group: {
    marginBottom: theme.spacing.md,    
    padding: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
  },
  button: {
    alignItems: "center",    
    marginTop: theme.spacing.md,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.accent,
    borderWidth: 1,
    borderRadius: theme.radius.xs,
    borderColor: theme.colors.text
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
});