import EmptyStateCard from "@/components/cards/EmptyStateCard";
import PropertyCard from "@/components/cards/PropertyCard";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";

const PendingPropertyOffers = ({
  properties,
  refreshing,
  onRefresh,
  onEndReached,
  isFetchingNextPage,
}: any) => {
  return (
    <View
      style={{ flex: 1, borderRadius: 20 }}
      className="mt-3 border border-gray-200 bg-white p-4"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={properties}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View className="py-4 justify-center items-center">
                <ActivityIndicator size="small" color="#154A22" />
              </View>
            ) : null
          }
          renderItem={({ item: property }) => (
            <PropertyCard
              key={property.id}
              {...property}
              onPress={() =>
                router.push(`/(screens)/(property)/view/${property.id}`)
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <EmptyStateCard
              icon="time-outline"
              title="No pending offers"
              description="You don't have any pending buyback offers at the moment."
            />
          }
        />
      </ScrollView>
    </View>
  );
};

export default PendingPropertyOffers;
