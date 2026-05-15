import { AppText } from '@/components/AppText'
import PropertyCard from '@/components/cards/PropertyCard'
import { properties } from '@/lib/data'
import React from 'react'
import { FlatList, View } from 'react-native'

const allProperties = () => {
  return (
    <View style={{ flex: 1, borderWidth: 2, borderColor: "red" }}>
      <FlatList
        data={properties}
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
        ListEmptyComponent={<AppText>No properties</AppText>}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 20,  borderWidth: 2, borderColor: "red" }}
      />
    </View>
  )
}

export default allProperties 