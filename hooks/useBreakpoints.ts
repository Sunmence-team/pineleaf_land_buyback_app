import { useWindowDimensions } from "react-native";

export const useBreakpoints = () => {
  const { width, height } = useWindowDimensions();

  const isSmaller = width <= 320;
  const isSmall = width > 320 && width < 359;
  const isNormal = width >= 369 && width < 393;
  const isMedium = width >= 380 && width < 600;
  const isTablet = width >= 600;
  const isLargeTablet = width >= 900;

  return {
    width,
    height,

    isSmaller,
    isSmall,
    isMedium,
    isTablet,
    isLargeTablet,

    breakpoint: isSmaller
        ? "smaller"
        : isSmall
            ? "small"
            : isNormal
                ? "normal"
                : isMedium
                    ? "medium"
                    : isTablet
                        ? "tablet"
                        : "largeTablet",
  };
};