import React from 'react';

import { View, ActivityIndicator, Text, Pressable, TextInput, FlatList, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';


export default function SettingScreen({ navigation }: any) {


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
  
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 15,
    backgroundColor: "#882323",
  },

});