import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const result = await logout();

      if (result.success) {
        router.replace("/(auth)/login");
      } else {
        Alert.alert("Erro", result.message || "Erro ao fazer logout");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro inesperado durante o logout");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.welcomeText}>
          Bem-vindo ao MyNews, {user?.name || user?.email}!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    paddingTop: 60, // Para compensar a status bar
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1f2937",
  },
  welcomeText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
});
