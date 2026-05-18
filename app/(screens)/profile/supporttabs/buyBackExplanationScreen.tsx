import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const buyBackExplanationScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.secondContainer}>
            <View style={styles.thirdContainer}>

            </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default buyBackExplanationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },

  secondContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 35,
    paddingHorizontal: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  thirdContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15 ,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
});
