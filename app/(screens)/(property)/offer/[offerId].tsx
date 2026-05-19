import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

type StatusType = "eligible" | "not_eligible" | "offer_sent" | "completed" | "pending";

const Offer = ({ status }: { status: StatusType }) => {

  const statusStyles = {
    eligible: "bg-fadedGreen text-primary",
    not_eligible: "bg-red-100 text-red-600",
    offer_sent: "bg-blue-100 offerText",
    completed: "bg-gray-200 text-gray-700",
    pending: "bg-yellow-100 text-yellow-700"
  };

  const statusLabel = {
    eligible: "Eligible",
    not_eligible: "Not Eligible",
    offer_sent: "Offer Sent",
    completed: "Completed",
    pending: 'Pending'
  };

  const { paramsId } = useLocalSearchParams()

  return (
    <ScrollView className='"flex-1 bg-white  border border-gray-200 rounded-lg p-4 mb-4 w-full '>
      <View className='mt-5 border border-gray-300 rounded-lg p-4'>
        <View className="flex-row justify-between ">
          <View className="mb-4">
            <Text className="text-xl font-medium mb-2">Pineleaf Phase 2</Text>
          </View>

          <View
            className={`px-3 py-1 rounded-lg ${statusStyles[status]}`}
          >
            <Text className="text-xs font-medium">
              {statusLabel[status]}
            </Text>
          </View>
        </View>

        <View className='flex-row justify-between mb-4'>
          <View>
            <Text className='text-lg font-medium'>Plot</Text>
            <Text className='text-lg'>3</Text>
          </View>
          <View>
            <Text className='text-lg font-medium'>Purchased value</Text>
            <Text className='text-lg'>₦5,500,000</Text>
          </View>
        </View>

        <View className='flex-row justify-between'>
          <View>
            <Text className='text-lg font-medium'>Purchse Date</Text>
            <Text className='text-lg'>15 Jan 2022</Text>
          </View>
          <View>
            <Text className='text-lg font-medium'>Plot numbers</Text>
            <Text className='text-lg'>PL-204 to 206</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Offer;