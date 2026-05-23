import { ActivityIndicator, Pressable, Text, TextStyle, View, ViewStyle } from "react-native";
import React from "react";

type IconElement = React.ReactElement<{ size?: number }>;

interface ActionButtonProps {
    action?: () => void;
    icon?: IconElement;
    name: string | null;
    optStyle?: ViewStyle | ViewStyle[];
    optStyle2?: TextStyle | TextStyle[];
    disabled?: boolean;
    loading?: boolean;
    iconSize?: number;
    hasBG?: boolean;
}

const ActionButton = ({ action, icon, name, optStyle, optStyle2, disabled, loading, iconSize, hasBG=true } : ActionButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={action}
      className={`px-3 rounded-lg disabled:opacity-50`}
      style={[
        {
          opacity: (loading || disabled) ? 0.7 : 1,
          minWidth: 0,
          height: 52,
          backgroundColor: hasBG ? "#154A22" : "transparent",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        },
        optStyle]}
    >
      {icon &&
        React.cloneElement(icon, {
          size: iconSize ?? icon.props.size,
        })}
      <Text
        style={[{
          fontSize: 18,
          textAlign: "center",
          color: hasBG ? "#F4F6F1" : "#154A22"
        }, optStyle2]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
      >{name}</Text>
      {loading && <ActivityIndicator size={"small"} color={hasBG ? "#F4F6F1" : "#154A22"} />}
    </Pressable>
  )
}

export default ActionButton;
