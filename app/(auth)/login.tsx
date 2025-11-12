import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth";
import { Redirect, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { Button, TextInput } from "../../components/ui";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { checkAuthStatus, isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.login(email, password);

      if (result.success) {
        await checkAuthStatus();
        router.replace("/(tabs)");
      } else {
        Alert.alert("Erro", result.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Ocorreu um erro inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-greige">
      <Image
        source={require("@/assets/images/logo-img.png")}
        className="self-center mb-5 w-24 h-24"
      />
      <Text className="text-3xl font-bold mb-8 text-center text-charcoal">
        Login
      </Text>
      <View className="w-full">
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <View className="mb-4">
          <Button
            title={isLoading ? "Entrando..." : "Entrar"}
            onPress={handleLogin}
            disabled={isLoading}
          />
        </View>

        <Button
          title="Não tem conta? Cadastre-se"
          variant="secondary"
          onPress={() => {
            router.push("/cadastro");
          }}
        />
      </View>
    </View>
  );
}
