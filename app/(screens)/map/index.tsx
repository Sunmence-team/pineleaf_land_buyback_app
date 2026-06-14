import { AppText } from "@/components/AppText";
import { mapJsonStyle } from "@/lib/mapStyles";
import { getUserPropertiesMapCoordinatesService } from "@/services/propertiesServices";
import Feather from "@expo/vector-icons/Feather";
import { useQuery } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { useRef, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

const MapScreen = ({ isMini = false }: { isMini?: boolean }) => {
  const {
    data: mapCoordinates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["map-property-list"],
    queryFn: getUserPropertiesMapCoordinatesService,
  });

  console.log("map mapCoordinates: ", JSON.stringify(mapCoordinates, null, 2));

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: !isMini,
          title: "Property Map",
        }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : error ? (
        <AppText>Can&apos;t display your properties on the map right now...</AppText>
      ) : (
        <View className={`relative flex-1 w-full`}>
          <ImageBackground
            source={require("@/assets/map-background.png")}
            className="absolute w-full h-full"
          />
            {mapCoordinates?.map((index:number) => {
                return (
                    <FaUsers />
                );
            })}
          </ImageBackground>
        </View>
      )}
    </>
  );
};

export default MapScreen;
