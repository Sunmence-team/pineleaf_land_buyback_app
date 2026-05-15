import AllProperties from "@/app/(screens)/(property)/list/allProperties"
import EligibleProperties from "@/app/(screens)/(property)/list/eligibleProperties"
import PendingPropertyOffers from "@/app/(screens)/(property)/list/pendingPropertyOffers"
import SearchBar from "@/components/SearchBar"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type StatusType = "all" | "eligible" | "pending";

const Properties = () => {
  const [status, setStatus] = React.useState<StatusType>("all");

  const tabs: { label: string; value: StatusType }[] = [
    { label: "All", value: "all" },
    { label: "Eligible", value: "eligible" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50" style={{ paddingHorizontal: 20 }}>
      <View className='mb-5'>
        <SearchBar
          placeholder='Search property'
          value=""
          onChangeText={() => { }}
        />
      </View>

      {/* Tabs */}
      <View className=" ">
        <View  className="bg-gray-300 rounded-xl flex-row w-full">
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
        <View className="border-2" style={{borderWidth: 2, borderColor: "red"}}>
          {status === "all" && <AllProperties />}
          {status === "eligible" && <EligibleProperties />}
          {status === "pending" && <PendingPropertyOffers />}
        </View>
      </View>
    </SafeAreaView>

  )
}

export default Properties