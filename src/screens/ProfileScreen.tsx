import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


function Avatar ({ uri }: { uri: string }) {

  const [failed, setFailed] = React.useState(false);

  return (
    <View style={styles.avatar}>

      { failed ? ( 
        <Text style={{ textAlign: "center", lineHeight: 64 }}>?</Text>
      ) : (
        <Image
          source={{ uri }}
          style={{ width: 64, height: 64 }}
          onError={() => (setFailed(true))}
        />
      )}

    </View>
  );
}


export default function ProfileScreen() {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
       
          <Avatar uri="https://picsum.photos/64"/>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>LOGUT</Text>
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
  avatar: {
    width: 64,
    height: 64,
    marginBottom: 20,
    borderRadius: 32,
    overflow: "hidden",
    borderColor: "#fff",
    borderWidth: 1,
  },
  button: {
    alignItems: "center",    
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ff1302",
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