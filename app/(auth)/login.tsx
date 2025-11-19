import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth";
import { Redirect, router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Button, TextInput, Toast } from "../../components/ui";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { checkAuthStatus, isLoggedIn } = useAuth();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormFilled = email.trim().length > 0 && password.trim().length > 0;

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showToastMessage("Por favor, preencha todos os campos");
      return;
    }

    if (!isValidEmail(email)) {
      showToastMessage("Por favor, insira um email válido");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.login(email, password);

      if (result.success) {
        await checkAuthStatus();
        router.replace("/(tabs)");
      } else {
        showToastMessage(result.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      showToastMessage("Ocorreu um erro inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-greige">
      <Toast
        message={toastMessage}
        visible={showToast}
        onHide={() => setShowToast(false)}
      />
      <Image
        source={require("@/assets/images/logo-img.png")}
        className="self-center mb-5"
        style={{ width: 96, height: 96 }}
        resizeMode="contain"
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
            filled={isFormFilled}
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
