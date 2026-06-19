import EmptyStateCard from "@/components/cards/EmptyStateCard";
import PropertyCard from "@/components/cards/PropertyCard";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

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
            title="No pending offers"
            description="You don't have any pending buyback offers at the moment."
          />
        }
        contentContainerStyle={[
          { paddingBottom: 10 },
          properties.length === 0 && {
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          },
        ]}
      />
    </View>
  );
};

export default PendingPropertyOffers;
