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
  ...props
}: CustomTextInputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-base font-medium mb-2 text-charcoal">
          {label}
        </Text>
      )}
      <RNTextInput
        className={`border-2 rounded-lg px-4 py-3 text-base bg-cream ${
          error ? "border-red-400" : "border-mint"
        }`}
        placeholderTextColor="#586875"
        {...props}
      />
      {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}
    </View>
  );
}
