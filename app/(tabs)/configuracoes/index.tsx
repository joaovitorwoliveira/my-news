import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
        <Text style={styles.subtitle}>Gerencie sua conta e preferências</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>
        <View style={styles.card}>
          <View style={styles.userInfo}>
            <Text style={styles.userLabel}>Usuário conectado:</Text>
            <Text style={styles.userName}>{user?.name || user?.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferências</Text>
        <TouchableOpacity
          style={styles.preferencesButton}
          onPress={() => setShowPreferences(!showPreferences)}
        >
          <Text style={styles.preferencesButtonText}>
            {showPreferences ? "Ocultar" : "Gerenciar"} Categorias de Notícias
          </Text>
          <Text style={styles.preferencesButtonIcon}>
            {showPreferences ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>

        {showPreferences && (
          <View style={styles.preferencesContainer}>
            <Text style={styles.preferencesSubtitle}>
              Selecione as categorias de notícias que você deseja acompanhar
            </Text>

            <View style={styles.categoriesGrid}>
              {AVAILABLE_CATEGORIES.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      isSelected && styles.categoryChipSelected,
                    ]}
                    onPress={() => toggleCategory(category)}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        isSelected && styles.categoryChipTextSelected,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.selectedContainer}>
              <Text style={styles.selectedTitle}>
                Categorias Selecionadas ({selectedCategories.length})
              </Text>
              {selectedCategories.length > 0 ? (
                <View style={styles.selectedGrid}>
                  {selectedCategories.map((category) => (
                    <View key={category} style={styles.selectedChip}>
                      <Text style={styles.selectedChipText}>{category}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.emptyText}>
                  Nenhuma categoria selecionada
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.saveButton,
                isLoading && styles.saveButtonDisabled,
              ]}
              onPress={handleSavePreferences}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.saveButtonText}>Salvar Preferências</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  userInfo: {
    gap: 4,
  },
  userLabel: {
    fontSize: 12,
    color: "#6b7280",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  userName: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  preferencesButton: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  preferencesButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  preferencesButtonIcon: {
    fontSize: 16,
    color: "#6b7280",
  },
  preferencesContainer: {
    marginTop: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  preferencesSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
    lineHeight: 20,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  categoryChip: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  categoryChipSelected: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  categoryChipTextSelected: {
    color: "white",
  },
  selectedContainer: {
    marginBottom: 24,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  selectedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectedChip: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  selectedChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1e40af",
  },
  emptyText: {
    fontSize: 14,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
  },
  saveButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
});
