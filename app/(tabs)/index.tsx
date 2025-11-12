import React from "react";

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
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
    <View className="flex-1 bg-greige">
      <View className="flex-1 p-5">
        <Text className="text-2xl font-bold text-charcoal mb-6">
          Bem-vindo ao MyNews, {user?.name || user?.email}!
        </Text>

        {error && (
          <View className="bg-mint rounded-lg p-3 mb-4 border-l-4 border-slate">
            <Text className="text-sm font-semibold text-charcoal mb-1">
              ⚠️ {error}
            </Text>
            <Text className="text-xs text-charcoal opacity-80">
              Exibindo notícias de exemplo. Verifique sua conexão ou configure a
              API key.
            </Text>
          </View>
        )}

        <FlatList
          data={displayNews}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={refresh}
              tintColor="#586875"
            />
          }
          ListHeaderComponent={() => (
            <View className="mb-4">
              <Text className="text-xl font-bold text-charcoal mb-1">
                Últimas notícias
              </Text>
              <Text className="text-sm text-charcoal opacity-70">
                {error
                  ? "Exibindo notícias de exemplo"
                  : "Acompanhe o que está acontecendo agora mesmo."}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-16">
              {loading ? (
                <>
                  <ActivityIndicator size="large" color="#586875" />
                  <Text className="text-base text-charcoal opacity-70 mt-3 text-center">
                    Carregando notícias...
                  </Text>
                </>
              ) : (
                <Text className="text-base text-charcoal opacity-70 mt-3 text-center">
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
