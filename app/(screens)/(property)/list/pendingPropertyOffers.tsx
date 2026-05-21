import { AppText } from '@/components/AppText'
import PropertyCard from '@/components/cards/PropertyCard'
import { properties } from '@/lib/data'
import React from 'react'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const pendingPropertyOffers = () => {
  const pendingProps = properties.filter((prop) => prop.status === 'offer_sent' || prop.status === 'pending')
  
  return (
    <SafeAreaView style={{ flex: 1 }} className='mt-3 rounded-xl border border-gray-300 bg-white p-3'>
      <FlatList
        data={pendingProps}
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
        ListEmptyComponent={<AppText>No pending offers</AppText>}
        contentContainerStyle={{}}
      />
    </SafeAreaView>
  )
}

export default pendingPropertyOffers