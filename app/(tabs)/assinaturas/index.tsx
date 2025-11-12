import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { NewsCard } from "@/components/NewsCard";
import { useAuth } from "@/hooks/useAuth";
import { useNews } from "@/hooks/useNews";
import { mockNews } from "@/utils/mockData";

export default function AssinaturasScreen() {
  const { user, refreshUserData } = useAuth();
  const { news, loading, error, refresh } = useNews();
  const hasRefreshedRef = useRef(false);
  const lastRefreshTimeRef = useRef(0);

  const displayNews = error ? mockNews : news;

  useFocusEffect(
    useCallback(() => {
      const now = Date.now();
      const timeSinceLastRefresh = now - lastRefreshTimeRef.current;
      const REFRESH_COOLDOWN = 30000; // 30 segundos

      if (
        (!hasRefreshedRef.current || timeSinceLastRefresh > REFRESH_COOLDOWN) &&
        !loading
      ) {
        console.log("🔄 Fazendo refresh na tela de assinaturas");
        refresh();
        refreshUserData();
        hasRefreshedRef.current = true;
        lastRefreshTimeRef.current = now;
      } else {
        console.log("⏭️ Pulando refresh - muito recente ou já carregando");
      }
    }, [refresh, refreshUserData, loading])
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

  const handleManualRefresh = useCallback(() => {
    console.log("🔄 Refresh manual iniciado");
    hasRefreshedRef.current = false;
    lastRefreshTimeRef.current = 0;
    refresh();
  }, [refresh]);

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-1 p-5">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">Suas Assinaturas</Text>
          <Text className="text-base text-gray-500 leading-6">
            {hasPreferences
              ? `Notícias das suas categorias favoritas (${user?.preferences?.categories?.length} categorias)`
              : "Configure suas preferências para ver notícias personalizadas"}
          </Text>
        </View>

        {!hasPreferences ? (
          <View className="flex-1 items-center justify-center py-16 px-5">
            <Text className="text-xl font-bold text-gray-700 mb-3 text-center">
              Configure suas preferências de categorias
            </Text>
            <Text className="text-base text-gray-500 text-center leading-6 mb-6">
              Para ver notícias personalizadas aqui, vá em Configurações →
              Preferências e selecione as categorias que você deseja acompanhar.
            </Text>
            <TouchableOpacity
              className="bg-blue-600 py-3 px-6 rounded-lg"
              onPress={() => router.push("/(tabs)/configuracoes")}
            >
              <Text className="text-base font-semibold text-white">Ir para Configurações</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredNews}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={handleManualRefresh}
              />
            }
            ListEmptyComponent={() => (
              <View className="flex-1 items-center justify-center py-16 px-5">
                {loading ? (
                  <>
                    <ActivityIndicator size="large" color="#2563eb" />
                    <Text className="text-base text-gray-500 text-center leading-6 mb-6">Carregando notícias...</Text>
                  </>
                ) : (
                  <>
                    <Text className="text-xl font-bold text-gray-700 mb-3 text-center">
                      Nenhuma notícia encontrada
                    </Text>
                    <Text className="text-base text-gray-500 text-center leading-6 mb-6">
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
          <View className="bg-yellow-100 rounded-lg p-3 mt-4 border-l-4 border-yellow-500">
            <Text className="text-sm font-semibold text-yellow-800 mb-1">⚠️ {error}</Text>
            <Text className="text-xs text-yellow-900">
              Exibindo notícias de exemplo. Verifique sua conexão ou configure a
              API key.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
