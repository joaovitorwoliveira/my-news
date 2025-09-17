import { authService } from "@/services/auth";
import { router } from "expo-router";
import { useEffect, useState } from "react";

interface User {
  id?: number;
  email: string;
  name?: string;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      console.log("Verificando status de auth:", currentUser);
      setIsLoggedIn(!!currentUser);
      setUser(currentUser);
    } catch (error) {
      console.error("Erro ao verificar auth:", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("Iniciando logout...");
      setIsLoading(true);

      const result = await authService.logout();
      console.log("Resultado do logout:", result);

      if (result.success) {
        setIsLoggedIn(false);
        setUser(null);
        console.log("Estado limpo, redirecionando...");

        router.replace("/(auth)/login");
      }
      return result;
    } catch (error) {
      console.error("Erro durante logout:", error);
      return { success: false, message: "Erro durante o logout" };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoggedIn,
    isLoading,
    user,
    checkAuthStatus,
    logout,
  };
}
