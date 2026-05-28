import AllProperties from "@/app/(screens)/(property)/list/allProperties"
import EligibleProperties from "@/app/(screens)/(property)/list/eligibleProperties"
import PendingPropertyOffers from "@/app/(screens)/(property)/list/pendingPropertyOffers"
import ActionButton from "@/components/buttons/ActionButton"
import SearchBar from "@/components/SearchBar"
import api from "@/helpers/axios"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { Text, View } from "react-native"

type StatusType = "all" | "eligible" | "pending";

interface propertiesProps {
  id: number;
  title: string;
  status: string;
  plot: number;
  price: string | number;
  totalPrice: string | number;
}

interface propertyResponse {
  data: propertiesProps[];
  total: number
  totalPages: number;
}

const Properties = () => {
  const [status, setStatus] = React.useState<StatusType>("all");

  const tabs: { label: string; value: StatusType }[] = [
    { label: "All", value: "all" },
    { label: "Eligible", value: "eligible" },
    { label: "Pending", value: "pending" },
  ];

  const fetchProperties = async (): Promise<propertyResponse[]> => {
    const response = await api.get('/user/properties');
    return response.data.data.data

  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties
  })

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading Properties...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Failed to fetch properties</Text>
      </View>
    )
  }

  const properties = data || []

  const eligibleProperties = properties?.filter(
    (item: any) => item.status === 'eligible'
  )

  const pendingProperties = properties?.filter(
    (item: any) => item.status === 'pending'
  )

  return (
    <View className="flex-1 bg-secondary " style={{ paddingHorizontal: 20 }}>
      <View className='my-5'>
        <SearchBar
          placeholder='Search property'
          value=""
          onChangeText={() => { }}
        />
      </View>

      {/* Tabs */}
      <View className="rounded-xl flex-row w-full">
        {tabs.map((tab, index) => {
          const active = status === tab.value;

          return (
            <ActionButton
              key={index}
              action={() => setStatus(tab.value)}
              name={tab.label}
              optStyle={{
                backgroundColor: active ? "#154A22" : "transparent",
                paddingVertical: 18,
                flex: 1,
              
              }}
              optStyle2={{
                color: active ? 'white' : 'black',
                fontSize: 16,
                fontFamily: 'semibold',
                textAlign: 'center'
              }}
            />
          );
        })}
      </View>

      {/* Content */}
      <View className="flex-1 pb-8">
        {status === "all" && <AllProperties data={properties} />}
        {status === "eligible" && <EligibleProperties data={eligibleProperties} />}
        {status === "pending" && <PendingPropertyOffers data={pendingProperties} />}
      </View>
    </View>

  )
}

export default Properties