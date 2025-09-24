import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ConfiguracoesScreen() {
  const { user, logout } = useAuth();

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
});
