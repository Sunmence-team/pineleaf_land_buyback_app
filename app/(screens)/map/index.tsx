import { AppText } from "@/components/AppText";
import { mapJsonStyle } from "@/lib/mapStyles";
import { getUserPropertiesMapCoordinatesService } from "@/services/propertiesServices";
import Feather from "@expo/vector-icons/Feather";
import { useQuery } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { useRef, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

const MapScreen = ({ isMini = false }: { isMini?: boolean }) => {
  const mapRef = useRef<MapView>(null);
  const mapSizeRef = useRef({ width: 0, height: 0 });
  const [initialPosition] = useState<Region>({
    latitude: 9.082,
    longitude: 8.6753,
    latitudeDelta: 12.0,
    longitudeDelta: 12.0,
  });

  const [currentRegion, setCurrentRegion] = useState<Region>(initialPosition);

    const handleMapReady = () => {
        if (mapRef.current) {
            mapRef.current.setMapBoundaries(
                { latitude: 14.0, longitude: 15.0 },
                { latitude: 4.0, longitude: 2.0 }
            );
        }
    };

  const [selectedEvent, setSelectedEvent] = useState(null);

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
        <AppText>Can't display your properties on the map right now...</AppText>
      ) : (
        <View className={`relative flex-1 w-full`}>
          <MapView
            ref={mapRef}
            style={{ width: "100%", height: "100%" }}
            provider="google"
            // googleMapId="yourStyledMapId"
            loadingBackgroundColor={"#F4F6F1"}
            loadingIndicatorColor={"#154A22"}
            onLayout={(e) => {
              const { width, height } = e.nativeEvent.layout;
              mapSizeRef.current = { width, height };
            }}
            initialRegion={initialPosition}
            minZoomLevel={5.0}
            showsCompass={false}
            onMapReady={handleMapReady}
            onRegionChangeComplete={(region) => setCurrentRegion(region)}
            customMapStyle={mapJsonStyle}
          >
            {mapCoordinates?.map((coord: any, index: number) => {
              const lat = Number(coord.x_coord);
              const lng = Number(coord.y_coord);

              return (
                <Marker
                  key={index}
                  title={coord.property_id}
                  description={coord.status}
                  coordinate={{ latitude: lat, longitude: lng }}
                  tracksViewChanges={false}
                  onPress={() => {
                    setSelectedEvent(coord);
                    mapRef.current?.animateToRegion(
                      {
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002,
                      },
                      400,
                    );
                  }}
                />
              );
            })}
          </MapView>
          <View
            className={`absolute ${isMini ? "bottom-2 right-3" : "bottom-10 right-5 shadow-md"} border border-black/20 bg-white rounded-xl p-1 flex-col gap-2`}
          >
            {isMini && (
              <Pressable
                onPress={() => router.push("/(screens)/map")}
                className="w-10 h-10 items-center justify-center border-b border-gray-100 active:bg-gray-100 rounded-t-lg"
              >
                <Feather
                  name="maximize"
                  size={isMini ? 20 : 24}
                  color="black"
                />
              </Pressable>
            )}
            <Pressable
              onPress={() => {
                mapRef.current?.animateToRegion(
                  {
                    ...currentRegion,
                    // Halving the deltas moves the camera closer
                    latitudeDelta: currentRegion.latitudeDelta / 2,
                    longitudeDelta: currentRegion.longitudeDelta / 2,
                  },
                  300,
                );
              }}
              className="w-10 h-10 items-center justify-center border-b border-gray-100 active:bg-gray-100 rounded-t-lg"
            >
              <Feather name="plus" size={isMini ? 20 : 24} color="black" />
            </Pressable>
            <Pressable
              onPress={() => {
                mapRef.current?.animateToRegion(
                  {
                    ...currentRegion,
                    // Doubling the deltas pushes the camera further away
                    latitudeDelta: currentRegion.latitudeDelta * 2,
                    longitudeDelta: currentRegion.longitudeDelta * 2,
                  },
                  300,
                );
              }}
              className="w-10 h-10 items-center justify-center active:bg-gray-100 rounded-b-lg"
            >
              <Feather name="minus" size={isMini ? 20 : 24} color="black" />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default MapScreen;
