import { AppText } from "@/components/AppText";
import ProfileCard from "@/components/cards/ProfileCard";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { editprofileService } from "@/services/profileServices";
import { showSuccessToast, showErrorToast } from "@/helpers/toast";

const EditScreen = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showSuccessToast(response?.message || "Profile changed successfully");
      router.back();
    },

    onError: (error: any) => {
      showErrorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Profile change failed"
      );
    },
  });

  const handleProfileEdit = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      showErrorToast("First name, last name, and email are required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      showErrorToast("Please enter a valid email address");
      return;
    }

    editProfileMutation.mutate({
      firstName,
      lastName,
      email,
    });
  };

  return (
    <View style={styles.container}>
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
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleProfileEdit}
          disabled={editProfileMutation.isPending}
        >
          {editProfileMutation.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <AppText style={styles.buttonText}>Confirm changes</AppText>
          )}
        </TouchableOpacity>
      </View>
    </View>
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
