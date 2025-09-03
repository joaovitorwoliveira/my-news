import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { Button, TextInput } from "../../components/ui";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    }, 2000);
  };

  return (
    <View className="flex-1 justify-center px-5 bg-gray-100">
      <Image
        source={require("@/assets/images/logo-img.png")}
        style={{
          alignSelf: "center",
          marginBottom: 20,
          width: 100,
          height: 100,
        }}
      />
      <Text className="text-3xl font-bold mb-8 text-center text-gray-800">
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

        <Button
          title={isLoading ? "Entrando..." : "Entrar"}
          onPress={handleLogin}
          disabled={isLoading}
          style={{ marginBottom: 16 }}
        />

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
