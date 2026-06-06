import { AppText } from "@/components/AppText";
import ProfileCard from "@/components/cards/ProfileCard";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const EditScreen = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(user?.first_name ?? "");
  const [lastName, setLastName] = useState(user?.last_name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const editProfileMutation = useMutation({
    mutationFn: (payload: {
      firstName: string;
      lastName: string;
      email: string;
    }) => editprofileService(payload),

    onSuccess: (response: any) => {
      Toast.show({
        type: "success",
        text1: response?.data?.message || "Profile changed successfully",
      });
      router.back()
    },

    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Profile Change Failed",
        text2:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
      return;
    },
  })

  const handleProfileEdit = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        <ProfileCard />

        <View style={styles.inputContainer}>
          <AppText style={styles.label}>First name</AppText>
          <TextInput
            placeholder="First name"
            placeholderTextColor="black"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <AppText style={styles.label}>Last name</AppText>
          <TextInput
            placeholder="Last name"
            placeholderTextColor="black"
            value={lastName}
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

        <TouchableOpacity style={styles.button}
          onPress={handleProfileEdit}
        >
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
    backgroundColor: "#F4F6F1",
    marginTop: 30
  },

  secondContainer: {
    height: Platform.select({
      ios: "90%",
      android: "98%"
    }),
    marginBottom: Platform.select({
      android: "100%",
    }),
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 35,
    padding: 16,
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
    height: 50,
    display: 'flex',
    alignItems: "center",
  },
});
