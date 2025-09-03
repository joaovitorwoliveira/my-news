import React from "react";
import {
  TextInput as RNTextInput,
  Text,
  TextInputProps,
  View,
} from "react-native";

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function TextInput({
  label,
  error,
  style,
  ...props
}: CustomTextInputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-base font-medium mb-2 text-gray-800">
          {label}
        </Text>
      )}
      <RNTextInput
        className={`border border-gray-300 rounded-lg px-4 py-3 text-base bg-white ${
          error ? "border-red-400" : ""
        }`}
        placeholderTextColor="#999"
        style={style}
        {...props}
      />
      {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}
    </View>
  );
}
