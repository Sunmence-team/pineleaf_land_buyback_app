import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

interface SelectOption {
  label: string;
  value: any;
}

interface MySelectProps {
  options: SelectOption[];
  onValueChange: (value: any) => void;
  value: any;
  placeholder: string;
  style?: any;
}

const SelectDropdownUtility = ({
  options,
  onValueChange,
  value,
  placeholder,
  style,
}: MySelectProps) => {
  const formattedOptions = options.map((option) => ({
    label: option.label,
    value: option.value,
  }));

  return (
    <RNPickerSelect
      items={formattedOptions}
      onValueChange={(val) => onValueChange(val)}
      value={value}
      darkTheme={true}
      doneText="Done"
      placeholder={{ label: placeholder, value: null }}
      style={style || pickerSelectStyles}
      useNativeAndroidPickerStyle={false}
      fixAndroidTouchableBug={true}
      touchableWrapperProps={{
        activeOpacity: 0.7,
      }}
      Icon={() => <Octicons name="chevron-down" size={20} color="gray" />}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#2F5318",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    paddingLeft: 10,
    height: 50,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#2F5318",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    paddingLeft: 10,
    height: 45,
  },
  iconContainer: {
    top: 13,
    right: 10,
  },
  placeholder: {
    color: "gray",
  },
});

export default SelectDropdownUtility;
