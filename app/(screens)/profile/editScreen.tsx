import { AppText } from "@/components/AppText";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import {
  TextInput,
  View,
  StyleSheet
} from "react-native";

const EditScreen = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.inputContainer}>
          <AppText style={styles.label}>First name</AppText>
          <TextInput
            value={user?.first_name ?? ""}
            editable={false}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <AppText style={styles.label}>Last name</AppText>
          <TextInput
            value={user?.last_name ?? ""}
            editable={false}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <AppText style={styles.label}>Email address</AppText>
          <TextInput
            value={user?.email ?? ""}
            editable={false}
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F1",
    paddingTop: 20
  },

  secondContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 25,
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
    borderColor: "#EEEEEE",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    backgroundColor: "#F4F6F1",
    color: "#666666",
  },
});
