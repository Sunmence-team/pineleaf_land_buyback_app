import SearchBar from "@/components/SearchBar"
import { Pressable, View, Text } from "react-native"
import React, { useState } from "react"
import AllProperties from "@/app/(screens)/(property)/list/allProperties"
import EligibleProperties from "@/app/(screens)/(property)/list/eligibleProperties"
import PendingPropertyOffers from "@/app/(screens)/(property)/list/pendingPropertyOffers"

type StatusType = "all" | "eligible" | "pending";

const Properties = () => {
  const [status, setStatus] = React.useState<StatusType>("all");

  const tabs: { label: string; value: StatusType }[] = [
    { label: "All", value: "all" },
    { label: "Eligible", value: "eligible" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <View className='my-5'>
        <SearchBar
          placeholder='Search property'
          value=""
          onChangeText={() => { }}
        />
      </View>

      {/* Tabs */}
      <View className="flex-1 justify-center items-center px-5 ">
        <View  className="bg-gray-300 rounded-xl p-2 flex-row w-full">
          {tabs.map((tab, index) => {
            const active = status === tab.value;

            return (
              <Pressable
                key={index}
                onPress={() => setStatus(tab.value)}
                style={{
                  backgroundColor: active ? "#154A22" : "transparent",
                  marginTop: 20,
                  marginLeft: 18,
                  paddingVertical: 18,
                  
                }}
                className="flex-1 py-5 rounded-lg mx-1 items-center justify-center"
              
              >
                <Text
                style={{
                  color: active ? 'white' : 'black',
                  fontSize: 16,
                  fontFamily: 'semibold',
                  textAlign: 'center'
                }}
                  
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Content */}
        <View className="">
          {status === "all" && <AllProperties />}
          {status === "eligible" && <EligibleProperties />}
          {status === "pending" && <PendingPropertyOffers />}
        </View>
      </View>
    </View>

  )
}

export default Properties