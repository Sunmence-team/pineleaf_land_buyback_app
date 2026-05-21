import EmptyState from '@/components/cards/EmptyStateCard'
import PropertyCard from '@/components/cards/PropertyCard'
import { properties } from '@/lib/data'
import React from 'react'
import { FlatList, Text, View } from 'react-native'

const AllProperties = () => {

  return (
    <View style={{ flex: 1 }} className='mt-3 rounded-xl border border-gray-300 bg-white p-3'>

      <FlatList
        data={properties}
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
        ListEmptyComponent={
          <EmptyState
            icon="bag-handle-outline"
            title="No properties yet"
            description="Start by adding a property to track its details and manage buyback when eligible"
          />
        }
        contentContainerStyle={{}}
      />
    </View>
  )
}

export default AllProperties 