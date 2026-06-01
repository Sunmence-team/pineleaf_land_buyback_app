import EmptyStateCard from "@/components/cards/EmptyStateCard";
import PropertyCard from "@/components/cards/PropertyCard";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

const AllProperties = ({
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
            onPress={() => router.push(`/(screens)/(property)/view/${property.id}`)}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <EmptyStateCard
            icon="bag-handle-outline"
            title="No properties yet"
            description="Start by adding a property to track its details and manage buyback when eligible"
          />
        }
      />
    </View>
  );
};

export default AllProperties;
