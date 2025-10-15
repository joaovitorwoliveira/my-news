import { NewsItem } from "@/types/news/types";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.timestamp}>{item.publishedAt}</Text>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSummary} numberOfLines={3}>
        {item.summary}
      </Text>
      {item.source && <Text style={styles.source}>📰 {item.source}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563eb",
    textTransform: "uppercase",
  },
  timestamp: {
    fontSize: 12,
    color: "#9ca3af",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  cardSummary: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
    marginTop: 4,
  },
});
