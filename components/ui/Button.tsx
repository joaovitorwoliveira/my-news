import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

export function Button({
  title,
  variant = "primary",
  size = "medium",
  style,
  disabled,
  ...props
}: ButtonProps) {
  const getButtonClasses = () => {
    let classes = "rounded-lg items-center justify-center ";

    if (variant === "primary") {
      classes += "bg-[#020202] ";
    } else {
      classes += "bg-transparent border border-[#020202] ";
    }

    if (size === "small") {
      classes += "px-4 py-2 ";
    } else if (size === "large") {
      classes += "px-8 py-4 ";
    } else {
      classes += "px-6 py-3 ";
    }

    if (disabled) {
      classes += "bg-gray-400 border-gray-400 ";
    }

    return classes;
  };

  const getTextClasses = () => {
    let classes = "text-base font-semibold ";

    if (variant === "primary") {
      classes += "text-white ";
    } else {
      classes += "text-gray-500 ";
    }

    if (disabled) {
      classes += "text-gray-600 ";
    }

    return classes;
  };

  return (
    <TouchableOpacity
      className={getButtonClasses()}
      disabled={disabled}
      style={style}
      {...props}
    >
      <Text className={getTextClasses()}>{title}</Text>
    </TouchableOpacity>
  );
}
