import { AppText } from "@/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotificationType = {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
};

const notifications: NotificationType[] = [
  {
    id: "1",
    title: "Offer received",
    message:
      "Pineleaf phase 2 property offer of NGN2.3M will be ready for your review",
    time: "2mins",
    unread: true,
  },
  {
    id: "2",
    title: "Offer received",
    message:
      "Pineleaf phase 2 property offer of NGN2.3M will be ready for your review",
    time: "2mins",
    unread: true,
  },
];

type NotificationCardProps = {
  item: NotificationType;
};

const NotificationCard = ({ item }: NotificationCardProps) => {
  return (
    <View style={styles.notificationCard}>
      <View style={{ flex: 1 }}>
        <View style={styles.ola}>
          <AppText style={styles.title}>{item.title}</AppText>

          <AppText style={styles.time}>{item.time}</AppText>
        </View>

        <AppText style={styles.message}>{item.message}</AppText>
      </View>

      {item.unread && <View style={styles.dot} />}
    </View>
  );
};

const EmptyComponent = () => {
  return (
    <View style={styles.emptyWrapper}>
      <Ionicons name="notifications-outline" size={70} color="black" />

      <AppText style={styles.titleNote}>Your notifications live here</AppText>

      <AppText style={styles.textNote}>
        You will see updates about your properties and buyback progress here.
      </AppText>
    </View>
  );
};

const Alerts = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>

        <AppText style={styles.headerTitle}>Alerts</AppText>

        <View style={{ width: 24 }} />
      </View> */}

      <View style={styles.bigContainer}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationCard item={item} />}
          ListEmptyComponent={<EmptyComponent />}
          contentContainerStyle={[
            styles.contentContainer,
            notifications.length === 0 && {
              justifyContent: "center",
            },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F1",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerTitle: {
    fontSize: 25,
    fontFamily: " quickSemiBold",
  },

  bigContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 35,
    paddingHorizontal: 16,
    paddingTop: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 13,
    padding: 18,
    marginTop: 19,
    flexDirection: "row",
  },

  ola: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  title: {
    fontSize: 18,
    fontFamily: " quickSemiBold",
    flex: 1,
    color: "#000",
  },

  time: {
    fontSize: 15,
    color: "black",
    marginRight: 140,
  },

  message: {
    fontSize: 16,
    color: "BLACK",
    lineHeight: 22,
    marginTop: 2,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#00A428",
    marginLeft: 10,
    marginTop: 4,
  },

  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  titleNote: {
    fontSize: 24,
    fontFamily: " quickSemiBold",
    marginTop: 20,
    textAlign: "center",
  },

  textNote: {
    fontSize: 17,
    color: "#444",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 24,
  },
});
