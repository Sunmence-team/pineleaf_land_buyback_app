// import { SelectDropdownUtility } from "@components/dropdown/SelectDropdownUtility";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditScreen = () => {
  const [accouNtame, accountame] = useState("");
  const [number, accountNumber] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account name</Text>
          <TextInput
            placeholder="Account name"
            placeholderTextColor="black"
            value={accouNtame}
            onChangeText={accountame}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account number</Text>
          <TextInput
            placeholder="Account number"
            placeholderTextColor="black"
            value={number}
            onChangeText={accountNumber}
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Account Type</Text>
            <TextInput
            placeholder="Account number"
            placeholderTextColor="black"
            value={number}
            onChangeText={accountNumber}
            keyboardType="email-address"
            style={styles.input}
          />

           {/* <SelectDropdownUtility
              placeholder="Select your desired role"
              options={[
                { label: "Realtor", value: "realtor" },
                { label: "Investor", value: "investor" },
                { label: "Both", value: "hybrid" },
              ]} 
            /> */}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
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
    height: "65%",
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingTop: 20,
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
    height: 60,
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
