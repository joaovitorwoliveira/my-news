import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  filled?: boolean;
}

export function Button({
  title,
  variant = "primary",
  size = "medium",
  disabled,
  filled = false,
  ...props
}: ButtonProps) {
  const getButtonClasses = () => {
    let classes = "rounded-lg items-center justify-center ";

    if (variant === "primary") {
      classes += filled ? "bg-charcoal " : "bg-slate ";
    } else {
      classes += "bg-transparent border-2 border-slate ";
    }

    if (size === "small") {
      classes += "px-4 py-2 ";
    } else if (size === "large") {
      classes += "px-8 py-4 ";
    } else {
      classes += "px-6 py-3 ";
    }

    if (disabled) {
      classes += "bg-mint border-mint opacity-60 ";
    }

    return classes;
  };

  const getTextClasses = () => {
    let classes = "text-base font-semibold ";

    if (variant === "primary") {
      classes += "text-white ";
    } else {
      classes += "text-charcoal ";
    }

    if (disabled) {
      classes += "text-charcoal opacity-60 ";
    }

    return classes;
  };

  return (
    <TouchableOpacity
      className={getButtonClasses()}
      disabled={disabled}
      {...props}
    >
      <Text className={getTextClasses()}>{title}</Text>
    </TouchableOpacity>
  );
}
