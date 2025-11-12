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
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4 pt-16 bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <Text className="text-base text-blue-600 font-semibold">← Voltar</Text>
        </TouchableOpacity>
      </View>

      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-64 bg-gray-200"
          resizeMode="cover"
        />
      )}

      <View className="p-5 bg-white">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-xs font-bold text-blue-600 uppercase tracking-wide">{category}</Text>
          <Text className="text-xs text-gray-400">{publishedAt}</Text>
        </View>

        <Text className="text-2xl font-bold text-gray-900 leading-8 mb-4">{title}</Text>

        <View className="flex-row flex-wrap gap-3 mb-5 pb-5 border-b border-gray-200">
          {source && <Text className="text-sm text-gray-600 font-semibold">📰 {source}</Text>}
          {author && <Text className="text-sm text-gray-500">✍️ {author}</Text>}
        </View>

        <Text className="text-base text-gray-700 leading-7 mb-6">{summary}</Text>

        {url && (
          <TouchableOpacity
            className="flex-row items-center justify-center bg-blue-600 py-4 px-6 rounded-xl mt-2"
            onPress={handleOpenOriginal}
          >
            <Text className="text-base font-bold text-white mr-2">Ler matéria completa</Text>
            <Text className="text-lg text-white font-bold">→</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
