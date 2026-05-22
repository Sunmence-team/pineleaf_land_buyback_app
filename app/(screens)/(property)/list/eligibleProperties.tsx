import { AppText } from "@/components/AppText";
import PropertyCard from "@/components/cards/PropertyCard";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const eligibleProperties = ({ data }: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }} className='mt-3 rounded-xl border border-gray-300 bg-white p-3'>
      <FlatList
        data={data}
        renderItem={({ item: property }) => (
          <PropertyCard
            key={property.id}
            id={property.id}
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
        contentContainerStyle={{ }}
      />
    </SafeAreaView>
  );
};

export default eligibleProperties;
