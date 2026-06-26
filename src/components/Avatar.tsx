import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


export function Avatar ({ uri }: { uri: string }) {

  const [failed, setFailed] = React.useState(false);

  return (
    <View style={styles.avatar}>

      { failed ? ( 
        <Text style={styles.failText}>?</Text>
      ) : (
        <Image
          source={{ uri }}
          style={styles.image}
          onError={() => (setFailed(true))}
        />
      )}

    </View>
  );
}


const styles = StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderColor: "#fff",
    borderWidth: 1,
  },
  failText: {
    textAlign: "center", 
    lineHeight: 64,
  },
  image: {
    width: 64, 
    height: 64,
 },
});