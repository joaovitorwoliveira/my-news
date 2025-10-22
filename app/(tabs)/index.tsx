import React from "react";

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { NewsCard } from "@/components/NewsCard";
import { useAuth } from "@/hooks/useAuth";
import { useNews } from "@/hooks/useNews";
import { mockNews } from "@/utils/mockData";

export default function HomeScreen() {
  const { user } = useAuth();
  const { news, loading, error, refresh } = useNews();

  const displayNews = error ? mockNews : news;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greeting}>
          Bem-vindo ao MyNews, {user?.name || user?.email}!
        </Text>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
            <Text style={styles.errorSubtext}>
              Exibindo notícias de exemplo. Verifique sua conexão ou configure a
              API key.
            </Text>
          </View>
        )}

        <FlatList
          data={displayNews}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.feedContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
          ListHeaderComponent={() => (
            <View style={styles.feedHeader}>
              <Text style={styles.sectionTitle}>Últimas notícias</Text>
              <Text style={styles.sectionSubtitle}>
                {error
                  ? "Exibindo notícias de exemplo"
                  : "Acompanhe o que está acontecendo agora mesmo."}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              {loading ? (
                <>
                  <ActivityIndicator size="large" color="#2563eb" />
                  <Text style={styles.emptyText}>Carregando notícias...</Text>
                </>
              ) : (
                <Text style={styles.emptyText}>
                  Nenhuma notícia disponível no momento.
                </Text>
              )}
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
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 24,
  },
  errorContainer: {
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  errorText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400e",
    marginBottom: 4,
  },
  errorSubtext: {
    fontSize: 12,
    color: "#78350f",
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 12,
    textAlign: "center",
  },
});
