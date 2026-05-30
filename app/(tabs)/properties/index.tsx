import AllProperties from "@/app/(screens)/(property)/list/allProperties";
import EligibleProperties from "@/app/(screens)/(property)/list/eligibleProperties";
import PendingPropertyOffers from "@/app/(screens)/(property)/list/pendingPropertyOffers";
import ActionButton from "@/components/buttons/ActionButton";
import SearchBar from "@/components/SearchBar";
import { getUserPropertiesService } from "@/services/propertiesServices";
import { StatusType } from "@/lib/interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Properties = () => {
  const [status, setStatus] = useState<StatusType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { label: string; value: StatusType }[] = [
    { label: "All", value: "all" },
    { label: "Eligible", value: "eligible" },
    { label: "Pending", value: "pending" },
  ];

  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["userProperties", status, searchQuery],
    queryFn: ({ pageParam = 1 }) => {
      const params: any = { page: pageParam };
      if (status === "eligible") {
        params.status = "eligible";
      } else if (status === "pending") {
        params.status = "offer_sent";
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      return getUserPropertiesService(params);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data?.current_page;
      const lastPageNum = lastPage?.data?.last_page;
      return currentPage < lastPageNum ? currentPage + 1 : undefined;
    },
  });

  if (error) {
    return (
      <SafeAreaView className="flex-1 gap-4 justify-center items-center bg-[#F4F6F1]" style={{ padding: 20 }}>
        <Text className="text-gray-600 text-xl font-[quickMedium]">Failed to fetch properties</Text>
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

  console.log("data", data)
  const propertiesList = data?.pages?.flatMap((page) => page?.data?.data || []) || [];

  return (
    <View className="flex-1 bg-secondary" style={{ paddingHorizontal: 20 }}>
      <View className="my-5">
        <SearchBar
          placeholder="Search property..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <View className="flex-row w-full mb-2">
        {tabs.map((tab, index) => {
          const active = status === tab.value;

          return (
            <ActionButton
              key={index}
              action={() => setStatus(tab.value)}
              name={tab.label}
              optStyle={{
                backgroundColor: active ? "#154A22" : "transparent",
                paddingVertical: 2,
                flex: 1,
                borderRadius: 8,
                height: 40,
              }}
              optStyle2={{
                color: active ? "white" : "#4B5563",
                fontSize: 15,
                fontFamily: "quickSemiBold",
                textAlign: "center",
              }}
            />
          );
        })}
      </View>

      {/* Content */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#154A22" />
        </View>
      ) : (
        <View className="flex-1 pb-8">
          {status === "all" && (
            <AllProperties
              properties={propertiesList}
              refreshing={isFetching && !isFetchingNextPage}
              onRefresh={refetch}
              onEndReached={() => fetchNextPage()}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
          {status === "eligible" && (
            <EligibleProperties
              properties={propertiesList}
              refreshing={isFetching && !isFetchingNextPage}
              onRefresh={refetch}
              onEndReached={() => fetchNextPage()}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
          {status === "pending" && (
            <PendingPropertyOffers
              properties={propertiesList}
              refreshing={isFetching && !isFetchingNextPage}
              onRefresh={refetch}
              onEndReached={() => fetchNextPage()}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Properties;