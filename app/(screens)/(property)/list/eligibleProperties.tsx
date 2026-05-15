import { AppText } from "@/components/AppText";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/lib/data";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const eligibleProperties = () => {
  const eligibleProps = properties.filter((prop) => prop.status === "eligible");
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={eligibleProps}
        renderItem={({ item: property }) => (
          <PropertyCard
            key={property.id}
            title={property.title}
            status={property.status}
            date={property.date}
            plots={property.plots}
            price={property.price}
            totalPrice={property.totalPrice}
            onPress={() => console.log(property.title)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<AppText>No eligible properties</AppText>}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default eligibleProperties;
