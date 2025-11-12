import { NewsItem } from "@/types/news/types";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type NewsCardProps = {
  item: NewsItem;
};

export function NewsCard({ item }: NewsCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/(tabs)/noticia/[id]",
      params: {
        id: item.id,
        title: item.title,
        summary: item.summary,
        category: item.category,
        publishedAt: item.publishedAt,
        source: item.source || "",
        author: item.author || "",
        url: item.url || "",
        imageUrl: item.imageUrl || "",
      },
    });
  };

  return (
    <TouchableOpacity
      className="bg-cream rounded-xl p-4 mb-4 shadow-sm border border-greige"
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between mb-2">
        <Text className="text-xs font-semibold text-slate uppercase">
          {item.category}
        </Text>
        <Text className="text-xs text-charcoal opacity-70">
          {item.publishedAt}
        </Text>
      </View>
      <Text className="text-base font-bold text-charcoal mb-2">
        {item.title}
      </Text>
      <Text
        className="text-sm text-charcoal opacity-80 leading-5 mb-2"
        numberOfLines={3}
      >
        {item.summary}
      </Text>
      {item.source && (
        <Text className="text-xs text-charcoal opacity-70 font-medium mt-1">
          📰 {item.source}
        </Text>
      )}
    </TouchableOpacity>
  );
}
