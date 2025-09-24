import { NewsCard } from "@/components/NewsCard";
import { useAuth } from "@/hooks/useAuth";
import { mockNews } from "@/utils/mockData";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greeting}>
          Bem-vindo ao MyNews, {user?.name || user?.email}!
        </Text>

        <FlatList
          data={mockNews}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feedContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={styles.feedHeader}>
              <Text style={styles.sectionTitle}>Últimas notícias</Text>
              <Text style={styles.sectionSubtitle}>
                Acompanhe o que está acontecendo agora mesmo.
              </Text>
            </View>
          )}
          renderItem={({ item }) => <NewsCard item={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
    // Para compensar a status bar
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 24,
  },
  feedContent: {
    paddingBottom: 40,
  },
  feedHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
});
