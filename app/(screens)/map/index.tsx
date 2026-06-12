import { AppText } from "@/components/AppText"
import { getUserMapOptPropertiesService } from "@/services/propertiesServices";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { ActivityIndicator } from "react-native";
import MapView from "react-native-maps";

const MapScreen = () => {
    const mapRef = useRef<MapView>(null);
    const mapSizeRef = useRef({ width: 0, height: 0 });

    const { data, isLoading, error } = useQuery({
        queryKey: ["map-property-list"],
        queryFn: getUserMapOptPropertiesService,
    });

    console.log("map data: ", data)

    return (
        <>
            {
                isLoading ? (
                    <ActivityIndicator />
                ) : error ? (
                    <AppText>Can&apos;t display your properties on the map right now...</AppText>
                ) : (
                    <MapView 
                        ref={mapRef}
                        style={{ width: "100%", height: "100%" }}
                        onLayout={(e) => {
                            const { width, height } = e.nativeEvent.layout;
                            mapSizeRef.current = { width, height };
                        }}
                    />
                )
            }
        </>
    )
}

export default MapScreen;