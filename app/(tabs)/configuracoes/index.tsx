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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

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
    <ScrollView className="flex-1 bg-greige">
      <View className="p-5 pt-16 bg-cream border-b border-mint">
        <Text className="text-2xl font-bold text-charcoal mb-1">
          Configurações
        </Text>
        <Text className="text-sm text-charcoal opacity-70">
          Gerencie sua conta e preferências
        </Text>
      </View>

      <View className="mt-5 px-5">
        <Text className="text-base font-semibold text-charcoal mb-3">
          Conta
        </Text>
        <View className="bg-cream rounded-xl p-4 shadow-sm border border-greige">
          <View className="gap-1">
            <Text className="text-xs text-charcoal opacity-70 uppercase font-semibold">
              Usuário conectado:
            </Text>
            <Text className="text-base text-charcoal font-medium">
              {user?.name || user?.email}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-5 px-5">
        <Text className="text-base font-semibold text-charcoal mb-3">
          Preferências
        </Text>
        <TouchableOpacity
          className="bg-cream rounded-xl p-4 flex-row justify-between items-center shadow-sm border border-greige"
          onPress={() => setShowPreferences(!showPreferences)}
        >
          <Text className="text-base font-semibold text-charcoal">
            {showPreferences ? "Ocultar" : "Gerenciar"} Categorias de Notícias
          </Text>
          <Text className="text-base text-slate">
            {showPreferences ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {showPreferences && (
          <View className="mt-4 bg-cream rounded-xl p-5 shadow-sm border border-greige">
            <Text className="text-sm text-charcoal opacity-80 mb-5 leading-5">
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
                        ? "bg-slate border-slate"
                        : "bg-greige border-mint"
                    }`}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        isSelected ? "text-white" : "text-charcoal"
                      }`}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View className="mb-6">
              <Text className="text-base font-semibold text-charcoal mb-3">
                Categorias Selecionadas ({selectedCategories.length})
              </Text>
              {selectedCategories.length > 0 ? (
                <View className="flex-row flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <View
                      key={category}
                      className="bg-mint px-3 py-2 rounded-2xl"
                    >
                      <Text className="text-xs font-semibold text-charcoal">
                        {category}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text className="text-sm text-charcoal opacity-60 italic">
                  Nenhuma categoria selecionada
                </Text>
              )}
            </View>

            <TouchableOpacity
              className={`py-4 px-6 rounded-xl items-center justify-center ${
                isLoading ? "bg-mint opacity-60" : "bg-slate"
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

      <View className="mt-5 px-5 mb-5">
        <Text className="text-base font-semibold text-charcoal mb-3">
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
