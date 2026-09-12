import React from 'react';

import { View, KeyboardAvoidingView, ScrollView, Text, Pressable, Image, TextInput, Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

import { AuthContext } from '../context/AuthContext';

import { theme } from '../theme/token';


export default function LoginScreen({ navigation }: any) {

  const [email, setEmail] = React.useState(""); 
  const [password, setPassword] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const [status, setStatus] = React.useState("");
  
  const emailOK = email && email.includes("@");
  const passOK = password && !password.includes("password");
  const formOK = emailOK && passOK;

  const { login } = React.useContext(AuthContext);


  function onLogin() {

    setSubmit(true);
    if (!formOK) return;

    setStatus("loading");

    const userOK = login(email, password);

    setTimeout(() => {   
      if (userOK) {
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
              style={styles.photo}   
              source={require('../assets/login-bg.jpg')}
              accessibilityLabel="Meals background photo"
            />
          </View>

          <View style={styles.formWrapper}>  
            <MaterialIcons style={styles.icon}
              name="menu-book" 
              size={50}
              accessibilityLabel="Menu book icon"
            />

            <Text style={styles.title}>Welcome Back</Text>

            <TextInput 
              value={email}
              onChangeText={setEmail}
              placeholder='Email'              
              autoCapitalize="none"
              style={styles.dataInput} 
              accessibilityLabel="Email input field"
              accessible={true}
            />

            <Text style={styles.errorMessage}>
              {submit && !emailOK && "Must include @"}
            </Text>

            <TextInput 
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              placeholder='Password'
              secureTextEntry={true}
              style={styles.dataInput} 
              accessibilityLabel="Password input field"
              accessible={true}
            />

            <Text style={styles.errorMessage}>
              {submit && !passOK && "Too Easy"}
            </Text>

            <Pressable 
              style={formOK ? styles.btn : styles.btnDisabled}
              onPress={onLogin}
              accessibilityRole="button"
              accessibilityLabel="Login button">
              <Text style={styles.buttonText}>LOGIN</Text>
            </Pressable>
 
            {submit && status === "loading" && 
              <Text style={styles.loadingText}>Loading...</Text>}

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
   padding: theme.spacing.md,
   gap: theme.spacing.md,
   backgroundColor: theme.colors.primary,
   borderTopLeftRadius: 70,
   borderTopRightRadius: 70,
  },
  icon: {
   marginTop: theme.spacing.md,
   alignSelf: "center",
   color: theme.colors.text,
  },
  title: { 
    marginBottom: theme.spacing.lg,
    alignSelf: "center",
    fontSize: theme.typography.xxl,
    fontWeight: "bold",
    color: theme.colors.text
  },
  dataInput: {    
    height: 48, 
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.text, 
    borderWidth: 1,
    borderColor: theme.colors.accent,
    borderRadius: theme.radius.xs,
    fontSize: theme.typography.md,
  },
  errorMessage: {
    marginTop: -12,
    fontSize: theme.typography.xs,
    fontWeight: "500",
    color: theme.colors.error,
  },
  btnDisabled: {
    height: 48,
    width: "100%",  
    paddingVertical: theme.spacing.xs,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: theme.radius.xs,
    backgroundColor: theme.colors.accent,
    opacity: 0.5,
  },
  btn: {
    height: 48,
    width: "100%",  
    paddingVertical: theme.spacing.xs,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: theme.radius.xs,
    backgroundColor: theme.colors.accent,
  },
  buttonText: {
    fontWeight: "600",
    color: theme.colors.text,
    fontSize: theme.typography.md,
  },
  loadingText: {
    fontSize: theme.typography.sm,
    color: theme.colors.warning,
    textAlign: "center",
    fontWeight: "500",
  },
  successText: {
    fontSize: theme.typography.sm,
    color: theme.colors.success,
    textAlign: "center",
    fontWeight: "600",
  },
  errorText: {
    fontSize: theme.typography.sm,
    color: theme.colors.error,
    textAlign: "center",
    fontWeight: "600",
  },
});