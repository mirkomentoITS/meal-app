import React from 'react';

import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '../components/Avatar';

import { AuthContext } from '../context/AuthContext';


export default function ProfileScreen({ navigation }: any) {

  const { user, logout } = React.useContext(AuthContext); 

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
            <Avatar uri={user.avatarUri}/>
            <Text style={styles.name}>{user.name}</Text>
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
    padding: 16,
    backgroundColor: "#882323",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,    
    gap: 18,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff", 
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