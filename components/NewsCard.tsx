import { NewsItem } from "@/types/news/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type NewsCardProps = {
  item: NewsItem;
};

export function NewsCard({ item }: NewsCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.timestamp}>{item.publishedAt}</Text>
      </View>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSummary}>{item.summary}</Text>
    </View>
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
  },
});
