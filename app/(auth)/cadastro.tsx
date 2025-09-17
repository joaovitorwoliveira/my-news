import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth";
import { FormData, FormErrors } from "@/types/login/types";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "../../components/ui";

export default function SignUpScreen() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { checkAuthStatus, isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        await checkAuthStatus();
        router.replace("/(tabs)");
      } else {
        Alert.alert("Erro", result.message || "Erro ao realizar cadastro");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
      }}
      className="bg-gray-100"
    >
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
        Cadastro
      </Text>

      <View className="w-full">
        <TextInput
          label="Nome completo"
          value={formData.name}
          onChangeText={(value) => updateField("name", value)}
          placeholder="Digite seu nome completo"
          error={errors.name}
        />

        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(value) => updateField("email", value)}
          placeholder="Digite seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <TextInput
          label="Senha"
          value={formData.password}
          onChangeText={(value) => updateField("password", value)}
          placeholder="Digite sua senha"
          secureTextEntry
          error={errors.password}
        />

        <TextInput
          label="Confirmar senha"
          value={formData.confirmPassword}
          onChangeText={(value) => updateField("confirmPassword", value)}
          placeholder="Confirme sua senha"
          secureTextEntry
          error={errors.confirmPassword}
        />

        <Button
          title={isLoading ? "Cadastrando..." : "Cadastrar"}
          onPress={handleSignUp}
          disabled={isLoading}
          style={{ marginBottom: 16 }}
        />

        <Button
          title="Já tem conta? Faça login"
          variant="secondary"
          onPress={() => {
            router.push("/login");
          }}
        />
      </View>
    </ScrollView>
  );
}
