import React from 'react';
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


function Avatar ({ uri }: { uri: string }) {

  const [failed, setFailed] = React.useState(false);

  return (
    <View style={styles.avatarWrap}>

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


export default function App() {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex : 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
       
          <Avatar uri="https://picsum.photos/64"/>

          <Text style={styles.title}>Profile</Text>
          <Text>Clean layout with basic components</Text>  

          <Pressable 
            onPress={() => {console.log("you press btn")}} 
            style={({pressed}) => [styles.button, pressed && styles.buttonClicked]}>
            <Text style={styles.buttonText}>Tap</Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "600" },
  avatarWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
  },
  button: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  buttonClicked : {
    backgroundColor: "grey"
  },
  buttonText: { fontWeight: "600" },
});