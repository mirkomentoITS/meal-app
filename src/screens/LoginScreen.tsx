import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, Text, TextInput, Pressable, Image, Platform, StyleSheet} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { validateLogin } from '../services/auth';


export default function LoginScreen() {

  const navigation = useNavigation<any>();
  
  const [email, setEmail] = React.useState(""); 
  const [password, setPassword] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const [status, setStatus] = React.useState("")
  
  const emailOK = email && email.includes("@");
  const passOK = password && !password.includes("password");
  const formOK = emailOK && passOK;
  

  function onLog() {

    setSubmit(true);
    if (!formOK) return;

    setStatus("loading");

    setTimeout(() => {   
      if (validateLogin(email, password)) {
        setStatus("success");
        navigation.navigate("Home");
      } 
      else {
        setStatus("error");
      }
    }, 2000);
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex : 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.imageWrapper}>
            <Image
              style={styles.photo}   // metti uri locale
              source={{ uri: "https://www.traveldailymedia.com/assets/2023/07/shutterstock_1435375889.jpg" }}
            />
          </View>

          <View style={styles.formWrapper}>  
            <MaterialIcons style={styles.icon}
              name="menu-book" 
              size={50}
            />

            <Text style={styles.title}>Welcome Back</Text>

            <TextInput 
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              placeholder='Email'
              style={styles.dataInput} 
            />

            <Text style={styles.errorMessage}>
              {submit && !emailOK && "Must include @"}
            </Text>

            <TextInput 
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              placeholder='Password'
              style={styles.dataInput} 
            />

            <Text style={styles.errorMessage}>
              {submit && !passOK && "Too Easy"}
            </Text>

            <Pressable 
              style={formOK ? styles.btn : styles.btnDisabled}
              onPress={onLog}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </Pressable>
 
            {submit && status === "loading" && 
              <Text style={styles.loadingText}>Loaing...</Text>}

            {submit && status === "success" && 
              <Text style={styles.successText}>Login succesful ✔</Text>}

            {submit && status === "error" && 
              <Text style={styles.errorText}>Invalid Credentials ✘</Text>}
          </View>  

        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    height: 270,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  formWrapper: {
   flex: 1,
   marginTop: -70,
   padding: 16,
   gap: 16,
   backgroundColor: "#882323",
   borderTopLeftRadius: 70,
   borderTopRightRadius: 70,
  },
  icon: {
   marginTop: 15,
   alignSelf: "center",
   color: "#fff",
  },
  title: { 
    marginBottom: 25,
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff"
  },
  dataInput: {    
    height: 48, 
    padding: 12,    
    backgroundColor: "#ffffff", 
    borderWidth: 1,
    borderColor: "#f66d38",
    borderRadius: 8,
    fontSize: 16,
    color: "#000000",
  },
  errorMessage: {
    marginTop: -12,
    fontSize: 12,
    fontWeight: "500",
    color: "#ffcccc",
  },
  btnDisabled: {
    height: 48,
    width: 480,  
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "#f66d38",
    opacity: 0.5,
  },
  btn: {
    height: 48,
    width: 480,  
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "#f66d38",
  },
  buttonText: {
    fontWeight: "600",
    color: "#ffffff",
    fontSize: 16,
  },
  loadingText: {
    fontSize: 14,
    color: "#ffeb3b",
    textAlign: "center",
    fontWeight: "500",
  },
  successText: {
    fontSize: 14,
    color: "#4caf50",
    textAlign: "center",
    fontWeight: "600",
  },
  errorText: {
    fontSize: 14,
    color: "#ff8585",
    textAlign: "center",
    fontWeight: "600",
  },
});