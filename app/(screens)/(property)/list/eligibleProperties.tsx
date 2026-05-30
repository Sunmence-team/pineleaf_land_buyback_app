import EmptyStateCard from "@/components/cards/EmptyStateCard";
import PropertyCard from "@/components/cards/PropertyCard";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

const EligibleProperties = ({ properties, refreshing, onRefresh, onEndReached, isFetchingNextPage }: any) => {
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
            onPress={() => console.log(property.property?.name || property.name || "Property")}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <EmptyStateCard
            icon="checkmark-circle-outline"
            title="No eligible properties"
            description="You don't have any properties currently eligible for buyback. We will notify you when one becomes eligible."
          />
        }
      />
    </View>
  );
};

export default EligibleProperties;
