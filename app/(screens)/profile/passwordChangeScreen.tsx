import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/AppText";

const ChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.thirdContainer}>
          <AppText style={styles.label}>Old password</AppText>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter old password"
              placeholderTextColor="black"
              secureTextEntry={!showOldPassword}
              value={oldPassword}
              onChangeText={setOldPassword}
              style={styles.input}
            />

            <TouchableOpacity
              onPress={() => setShowOldPassword(!showOldPassword)}
            >
              <Ionicons
                name={showOldPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <AppText style={styles.label}>New password</AppText>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter new password"
              placeholderTextColor="black"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
            />

            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <Ionicons
                name={showNewPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <AppText style={styles.label}>Re-type password</AppText>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Re-type password"
              placeholderTextColor="black"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />

            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button}>
            <AppText style={styles.buttonText}>Save changes</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  secondContainer: {
    height: Platform.select({
      ios: "68%",
      android: "75%",
    }),
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  thirdContainer: {
    marginTop: 25,
  },

  label: {
    fontSize: 20,
    marginBottom: 12,
    color: "black",
    fontFamily: "quickSemiBold",
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 60,
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    fontSize: 18,
    borderColor: "#ccc",
    color: "#000",
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
