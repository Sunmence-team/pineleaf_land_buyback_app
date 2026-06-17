import { AppText } from "@/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View, Image } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserNotificationsService } from "@/services/notificationServices";
import { assets } from "@/assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionButton from "@/components/buttons/ActionButton";
import NotificationCard from "@/components/cards/NotificationCard";

const EmptyComponent = () => {
  return (
    <View style={styles.emptyWrapper}>
      <Image source={assets.alert} style={{ width: 150, height: 80 }} resizeMode="cover" />

      <AppText style={styles.titleNote}>Your notifications live here</AppText>

      <AppText style={styles.textNote}>
        You will see updates about your properties and buyback progress here.
      </AppText>
    </View>
  );
};

const Alerts = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["userNotifications"],
    queryFn: ({ pageParam = 1 }) => getUserNotificationsService({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data?.current_page;
      const lastPageNum = lastPage?.data?.last_page;
      return currentPage < lastPageNum ? currentPage + 1 : undefined;
    },
  });

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#154A22" />
      </View>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 gap-4 justify-center items-center bg-[#F4F6F1]" style={{ padding: 20 }}>
        <AppText className="text-gray-600 text-xl font-[quickMedium]">Failed to fetch alerts</AppText>
        <View className="w-full">
          <ActionButton
            name={"Retry"}
            action={refetch}
            disabled={isFetching || isLoading}
            optStyle={{
              height: 40
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const notificationsList = data?.pages?.flatMap((page) => page?.data?.data || []) || [];

  return (
    <View style={styles.container}>
      <View style={styles.bigContainer}>
        <FlatList
          data={notificationsList}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <NotificationCard item={item} />}
          ListEmptyComponent={<EmptyComponent />}
          refreshing={isFetching && !isFetchingNextPage}
          onRefresh={refetch}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={{ paddingVertical: 12, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="small" color="#154A22" />
              </View>
            ) : null
          }
          contentContainerStyle={[
            styles.contentContainer,
            notificationsList.length === 0 && {
              justifyContent: "center",
            },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F1",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bigContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  contentContainer: {
    gap: 12,
    paddingBottom: 20,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  titleNote: {
    fontSize: 24,
    fontFamily: "quickSemiBold",
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
