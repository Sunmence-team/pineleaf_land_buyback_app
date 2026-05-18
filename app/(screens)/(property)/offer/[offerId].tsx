import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Offer = () => {

    const { paramsId } = useLocalSearchParams()
  return (
    <View>
      <Text>offer:{paramsId} </Text>
    </View>
  )
}

export default Offer