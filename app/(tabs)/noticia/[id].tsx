import { Button } from "@/components/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NoticiaDetalhe() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const {
    title,
    summary,
    category,
    publishedAt,
    source,
    author,
    url,
    imageUrl,
  } = params as {
    title: string;
    summary: string;
    category: string;
    publishedAt: string;
    source?: string;
    author?: string;
    url?: string;
    imageUrl?: string;
  };

  const handleOpenOriginal = () => {
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <ScrollView className="flex-1 bg-greige">
      <View className="p-4 pt-16 bg-cream">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <Text className="text-base text-slate font-semibold">← Voltar</Text>
        </TouchableOpacity>
      </View>

      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-64 bg-mint"
          resizeMode="cover"
        />
      )}

      <View className="p-5 bg-cream">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xs font-bold text-slate uppercase tracking-wide">
            {category}
          </Text>
          <Text className="text-xs text-charcoal opacity-70">
            {publishedAt}
          </Text>
        </View>

        <Text className="text-2xl font-bold text-charcoal leading-8 mb-4">
          {title}
        </Text>

        <View className="flex-row flex-wrap gap-3 mb-5 pb-5 border-b border-mint">
          {source && (
            <Text className="text-sm text-charcoal opacity-80 font-semibold">
              📰 {source}
            </Text>
          )}
          {author && (
            <Text className="text-sm text-charcoal opacity-70">
              ✍️ {author}
            </Text>
          )}
        </View>

        <Text className="text-base text-charcoal opacity-90 leading-7 mb-6">
          {summary}
        </Text>

        {url && (
          <View className="mt-2">
            <Button
              title="Ler matéria completa →"
              onPress={handleOpenOriginal}
              variant="primary"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
