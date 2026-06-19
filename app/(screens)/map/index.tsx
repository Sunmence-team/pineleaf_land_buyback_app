import { assets } from "@/assets/assets";
import { AppText } from "@/components/AppText";
import StatusCard from "@/components/cards/StatusCard";
import { getStatusTheme } from "@/helpers/statusTheme";
import { getUserPropertiesMapCoordinatesService } from "@/services/propertiesServices";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  View,
} from "react-native";

const MapScreen = ({
  isMini = false,
  filter,
}: {
  isMini?: boolean;
  filter?: "all" | "mine" | "eligible";
}) => {
  const [selectedCoordId, setSelectedCoordId] = useState<number | null>(null);
  const [activeFilterState] = useState<
    "all" | "mine" | "eligible"
  >("all");

  const activeFilter = filter !== undefined ? filter : activeFilterState;

  // const headerDropdownStyle = {
  //   inputIOS: {
  //     fontSize: 14,
  //     paddingVertical: 4,
  //     paddingHorizontal: 8,
  //     borderWidth: 1,
  //     borderColor: "#2F5318",
  //     borderRadius: 6,
  //     color: "black",
  //     paddingRight: 24,
  //     paddingLeft: 8,
  //     height: 32,
  //     backgroundColor: "#fff",
  //   },
  //   inputAndroid: {
  //     fontSize: 14,
  //     paddingHorizontal: 8,
  //     paddingVertical: 2,
  //     borderWidth: 1,
  //     borderColor: "#2F5318",
  //     borderRadius: 6,
  //     color: "black",
  //     paddingRight: 24,
  //     paddingLeft: 8,
  //     height: 30,
  //     backgroundColor: "#fff",
  //   },
  //   iconContainer: {
  //     top: 5,
  //     right: 6,
  //   },
  //   placeholder: {
  //     color: "gray",
  //   },
  // };

  const {
    data: mapCoordinates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["map-property-list", activeFilter],
    queryFn: () =>
      getUserPropertiesMapCoordinatesService({ filter: activeFilter }),
  });

  // Generate deterministic coordinate placements so markers stay in position across renders
  const positionedCoordinates = useMemo(() => {
    if (!mapCoordinates || !Array.isArray(mapCoordinates)) return [];
    return mapCoordinates.map((coord: any) => {
      const seedX = Math.sin(coord.id * 7823.43) * 0.5 + 0.5;
      const seedY = Math.cos(coord.id * 1489.87) * 0.5 + 0.5;

      // Map to safe screen padding boundaries (8% to 88% width, 12% to 82% height)
      const left = 8 + seedX * 80;
      const top = 12 + seedY * 70;

      return {
        ...coord,
        left: `${left}%`,
        top: `${top}%`,
        leftPercent: left,
        topPercent: top,
      };
    });
  }, [mapCoordinates]);

  // const handleFilterChange = (filter: "all" | "mine" | "eligible") => {
  //   setActiveFilterState(filter);
  //   setSelectedCoordId(null);
  // };

  return (
    <View style={{ width: "100%", flex: 1 }}>
      {!isMini && (
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "",
            // headerLeft: () => (
            //   <View className="flex-row items-center gap-2 pl-1">
            //     <Pressable onPress={() => router.back()} className="p-1">
            //       <Ionicons name="chevron-back" size={24} color="#000" />
            //     </Pressable>
            //     <View style={{ width: 170 }}>
            //       <SelectDropdownUtility
            //         options={[
            //           { label: "All Properties", value: "all" },
            //           { label: "My Properties", value: "mine" },
            //           { label: "Eligible Buybacks", value: "eligible" },
            //         ]}
            //         value={activeFilter}
            //         onValueChange={(val) => {
            //           if (val) handleFilterChange(val as "all" | "mine" | "eligible");
            //         }}
            //         placeholder="Filter Map"
            //         style={headerDropdownStyle}
            //       />
            //     </View>
            //   </View>
            // ),
          }}
        />
      )}
      {isLoading ? (
        <View className="flex-1 items-center justify-center bg-[#F4F6F1]">
          <ActivityIndicator size="large" color="#154A22" />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center bg-[#F4F6F1] p-6">
          <AppText className="text-base text-gray-600 text-center font-quickMedium">
            Can&apos;t display your properties on the map right now...
          </AppText>
        </View>
      ) : (
        <View
          className="relative flex-1 w-full"
          style={{ width: "100%", flex: 1 }}
        >
          <Pressable
            onPress={() => setSelectedCoordId(null)}
            className="absolute w-full h-full"
          >
            <ImageBackground source={assets.mapBg} className="w-full h-full">
              {positionedCoordinates.map((coord: any) => {
                const colors = getStatusTheme(coord.eligibility);
                const isSelected = selectedCoordId === coord.id;

                // Calculate dynamic positioning style for the tooltip and triangle pointer to prevent screen clipping
                const tooltipBgColor = "#ffffff"; // Change this variable to customize the background color of the tooltip and triangle pointer
                
                const tooltipStyle: any = {
                  backgroundColor: tooltipBgColor,
                };
                const triangleStyle: any = {
                  position: "absolute",
                  width: 0,
                  height: 0,
                  borderLeftWidth: 6,
                  borderLeftColor: "transparent",
                  borderRightWidth: 6,
                  borderRightColor: "transparent",
                };

                if (isSelected) {
                  const isNearTop = coord.topPercent < 25;
                  const isNearLeft = coord.leftPercent < 25;
                  const isNearRight = coord.leftPercent > 75;

                  // Vertical position selection
                  if (isNearTop) {
                    tooltipStyle.top = 40;
                    triangleStyle.top = -6;
                    triangleStyle.borderBottomWidth = 6;
                    triangleStyle.borderBottomColor = tooltipBgColor;
                  } else {
                    tooltipStyle.bottom = 40;
                    triangleStyle.bottom = -6;
                    triangleStyle.borderTopWidth = 6;
                    triangleStyle.borderTopColor = tooltipBgColor;
                  }

                  // Horizontal position selection
                  if (isNearLeft) {
                    tooltipStyle.left = -8;
                    triangleStyle.left = 18;
                  } else if (isNearRight) {
                    tooltipStyle.right = -8;
                    triangleStyle.right = 18;
                  } else {
                    // Center the tooltip relative to the marker
                    tooltipStyle.left = -74;
                    triangleStyle.left = 84;
                  }
                }

                return (
                  <View
                    key={coord.id}
                    style={{
                      position: "absolute",
                      left: coord.left,
                      top: coord.top,
                      zIndex: isSelected ? 100 : 10,
                    }}
                    className="items-center justify-center"
                  >
                    <Pressable
                      onPress={() =>
                        setSelectedCoordId(isSelected ? null : coord.id)
                      }
                      style={({ pressed }) => ({
                        transform: [{ scale: pressed ? 0.95 : 1 }],
                      })}
                    >
                      <View
                        className={`w-8 h-8 rounded-full items-center justify-center border-2 border-white shadow-md`}
                        style={{
                          backgroundColor: colors.hex,
                        }}
                      >
                        <FontAwesome5 name="user" size={14} color={"#fff"} />
                      </View>
                    </Pressable>

                    {/* Tooltip detail overlay */}
                    {isSelected && (
                      <View 
                        style={tooltipStyle}
                        className="absolute p-3 rounded-xl w-[180px] border border-white/20 shadow-lg items-center"
                      >
                        <View className="flex flex-col gap-1.5 w-full">
                          <AppText
                            className="text-[12px] text-black"
                            style={{
                              fontFamily: "quickMedium"
                            }}
                            numberOfLines={1}
                          >
                            {coord.user_name}
                          </AppText>
                          <View className="flex-row justify-between items-center border-b border-white/10 pb-1.5">
                            <AppText className="text-[10px]  uppercase font-semibold">
                              Plots
                            </AppText>
                            <AppText
                              className="text-[12px] font-quickBold max-w-[110px]"
                              numberOfLines={1}
                            >
                              {coord.plot_numbers}
                            </AppText>
                          </View>
                          <StatusCard currentStatus={coord.eligibility} />
                        </View>
                        {/* Triangle Pointer */}
                        <View style={triangleStyle} className="w-0 h-0" />
                      </View>
                    )}
                  </View>
                );
              })}
            </ImageBackground>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default MapScreen;
