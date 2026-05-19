import { ProfileCard } from "@/app/(tabs)/profile";
import { AppText } from "@/components/AppText";
import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditScreen = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        <ProfileCard />

        <View style={styles.inputContainer}>
          <AppText style={styles.label}>First name</AppText>
          <TextInput
            placeholder="First name"
            placeholderTextColor="black"
            value={firstname}
            onChangeText={setFirstName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <AppText style={styles.label}>Last name</AppText>
          <TextInput
            placeholder="Last name"
            placeholderTextColor="black"
            value={lastname}
            onChangeText={setLastName}
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <AppText style={styles.label}>Email address</AppText>
          <TextInput
            placeholder="Email address"
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <AppText style={styles.buttonText}>Confirm changes</AppText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  secondContainer: {
    height: Platform.select({
      ios: "90%",
      android: "98%",
    }),
    marginBottom: Platform.select({
      android: "100%",
    }),
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 35,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 20,
    marginBottom: 12,
    color: "black",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 60,
    fontSize: 16,
    backgroundColor: "",
  },

  button: {
    backgroundColor: "#144520",
    height: Platform.select({
      ios: 60,
      android: 53,
    }),
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
