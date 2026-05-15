import { ProfileCard } from "@/app/(tabs)/profile";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const editScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.secondContainer}>
          <ProfileCard />
        </View>
      </SafeAreaView>
    </>
  );
};

export default editScreen;

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
    paddingHorizontal: 16,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },
});




