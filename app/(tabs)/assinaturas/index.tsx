import { NewsCard } from "@/components/NewsCard";
import { useAuth } from "@/hooks/useAuth";
import { useNews } from "@/hooks/useNews";
import { mockNews } from "@/utils/mockData";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AssinaturasScreen() {
  const { user, refreshUserData } = useAuth();
  const { news, loading, error, refresh } = useNews();

  const displayNews = error ? mockNews : news;

  useFocusEffect(
    useCallback(() => {
      refresh();
      refreshUserData();
    }, [refresh, refreshUserData])
  );

  const filteredNews = useMemo(() => {
    if (
      !user?.preferences?.categories ||
      user.preferences.categories.length === 0
    ) {
      return [];
    }

    return displayNews.filter((newsItem) =>
      user.preferences!.categories!.includes(newsItem.category)
    );
  }, [displayNews, user?.preferences?.categories]);

  const hasPreferences =
    user?.preferences?.categories && user.preferences.categories.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Suas Assinaturas</Text>
          <Text style={styles.subtitle}>
            {hasPreferences
              ? `Notícias das suas categorias favoritas (${user?.preferences?.categories?.length} categorias)`
              : "Configure suas preferências para ver notícias personalizadas"}
          </Text>
        </View>

        {!hasPreferences ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              Configure suas preferências de categorias
            </Text>
            <Text style={styles.emptyText}>
              Para ver notícias personalizadas aqui, vá em Configurações →
              Preferências e selecione as categorias que você deseja acompanhar.
            </Text>
            <TouchableOpacity style={styles.configButton}>
              <Text style={styles.configButtonText}>Ir para Configurações</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredNews}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.feedContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={refresh} />
            }
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                {loading ? (
                  <>
                    <ActivityIndicator size="large" color="#2563eb" />
                    <Text style={styles.emptyText}>Carregando notícias...</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.emptyTitle}>
                      Nenhuma notícia encontrada
                    </Text>
                    <Text style={styles.emptyText}>
                      Não há notícias disponíveis para suas categorias
                      selecionadas no momento.
                    </Text>
                  </>
                )}
              </View>
            )}
            renderItem={({ item }) => <NewsCard item={item} />}
          />
        )}

        {error && hasPreferences && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
            <Text style={styles.errorSubtext}>
              Exibindo notícias de exemplo. Verifique sua conexão ou configure a
              API key.
            </Text>
          </View>
        )}
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
  },
  feedContent: {
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  configButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  configButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  errorContainer: {
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
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
});
