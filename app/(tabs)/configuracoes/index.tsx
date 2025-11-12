import { router } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useNews } from "@/hooks/useNews";

const AVAILABLE_CATEGORIES = [
  "Mercado",
  "Tecnologia",
  "Política",
  "Inovação",
  "Consumo",
  "Geral",
];

export default function ConfiguracoesScreen() {
  const { user, logout, updateUserPreferences } = useAuth();
  const { clearCache } = useNews();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isClearingCache, setIsClearingCache] = useState(false);

  useEffect(() => {
    if (user?.preferences?.categories) {
      setSelectedCategories(user.preferences.categories);
    }
  }, [user]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);

    try {
      const result = await updateUserPreferences(selectedCategories);

      if (result.success) {
        Alert.alert(
          "Sucesso!",
          "Suas preferências de categorias foram salvas com sucesso.",
          [{ text: "OK" }]
        );
        setShowPreferences(false);
      } else {
        Alert.alert(
          "Erro",
          result.message || "Erro ao salvar preferências. Tente novamente.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      Alert.alert(
        "Erro",
        "Erro inesperado ao salvar preferências. Tente novamente.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearCache = async () => {
    Alert.alert(
      "Limpar Cache",
      "Isso irá limpar todas as notícias em cache. Você precisará de conexão com a internet para carregar novas notícias. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            setIsClearingCache(true);
            try {
              await clearCache();
              Alert.alert(
                "Sucesso!",
                "Cache limpo com sucesso. As próximas notícias serão carregadas da internet.",
                [{ text: "OK" }]
              );
            } catch (error) {
              Alert.alert("Erro", "Erro ao limpar cache. Tente novamente.", [
                { text: "OK" },
              ]);
            } finally {
              setIsClearingCache(false);
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      console.log("Iniciando processo de logout...");
      const result = await logout();
      console.log("Resultado do logout na tela:", result);

      router.replace("/(auth)/login");

      if (!result.success) {
        setTimeout(() => {
          Alert.alert(
            "Aviso",
            "Logout realizado, mas houve um problema com a limpeza dos dados"
          );
        }, 500);
      }
    } catch (error) {
      console.error("Erro inesperado durante o logout:", error);

      router.replace("/(auth)/login");
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-5 pt-16 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900 mb-1">
          Configurações
        </Text>
        <Text className="text-sm text-gray-500">
          Gerencie sua conta e preferências
        </Text>
      </View>

      <View className="mt-5 px-5">
        <Text className="text-base font-semibold text-gray-700 mb-3">
          Conta
        </Text>
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="gap-1">
            <Text className="text-xs text-gray-500 uppercase font-semibold">
              Usuário conectado:
            </Text>
            <Text className="text-base text-gray-900 font-medium">
              {user?.name || user?.email}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-5 px-5">
        <Text className="text-base font-semibold text-gray-700 mb-3">
          Preferências
        </Text>
        <TouchableOpacity
          className="bg-white rounded-xl p-4 flex-row justify-between items-center shadow-sm"
          onPress={() => setShowPreferences(!showPreferences)}
        >
          <Text className="text-base font-semibold text-gray-700">
            {showPreferences ? "Ocultar" : "Gerenciar"} Categorias de Notícias
          </Text>
          <Text className="text-base text-gray-500">
            {showPreferences ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {showPreferences && (
          <View className="mt-4 bg-white rounded-xl p-5 shadow-sm">
            <Text className="text-sm text-gray-500 mb-5 leading-5">
              Selecione as categorias de notícias que você deseja acompanhar
            </Text>

            <View className="flex-row flex-wrap gap-3 mb-6">
              {AVAILABLE_CATEGORIES.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <TouchableOpacity
                    key={category}
                    className={`px-4 py-3 rounded-full border-2 ${
                      isSelected
                        ? "bg-blue-600 border-blue-600"
                        : "bg-gray-100 border-gray-200"
                    }`}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        isSelected ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="mb-6">
              <Text className="text-base font-semibold text-gray-700 mb-3">
                Categorias Selecionadas ({selectedCategories.length})
              </Text>
              {selectedCategories.length > 0 ? (
                <View className="flex-row flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <View
                      key={category}
                      className="bg-blue-100 px-3 py-2 rounded-2xl"
                    >
                      <Text className="text-xs font-semibold text-blue-800">
                        {category}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text className="text-sm text-gray-400 italic">
                  Nenhuma categoria selecionada
                </Text>
              )}
            </View>

            <TouchableOpacity
              className={`py-4 px-6 rounded-xl items-center justify-center ${
                isLoading ? "bg-gray-400" : "bg-blue-600"
              }`}
              onPress={handleSavePreferences}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-base font-bold text-white">
                  Salvar Preferências
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View className="mt-5 px-5">
        <Text className="text-base font-semibold text-gray-700 mb-3">
          Cache e Dados
        </Text>
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-sm text-gray-500 leading-5 mb-4">
            O cache armazena notícias temporariamente para reduzir o uso de
            dados e melhorar a velocidade de carregamento.
          </Text>
          <TouchableOpacity
            className={`py-3 px-5 rounded-lg items-center justify-center ${
              isClearingCache ? "bg-gray-400" : "bg-amber-500"
            }`}
            onPress={handleClearCache}
            disabled={isClearingCache}
          >
            {isClearingCache ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-sm font-semibold text-white">
                Limpar Cache
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-5 px-5 mb-5">
        <Text className="text-base font-semibold text-gray-700 mb-3">
          Ações
        </Text>
        <TouchableOpacity
          className="bg-red-500 py-4 px-6 rounded-xl items-center shadow-lg"
          onPress={handleLogout}
        >
          <Text className="text-white font-semibold text-base">
            Sair da Conta
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
