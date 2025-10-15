import { authService } from "@/services/auth";
import { preferencesService } from "@/services/preferences";
import { User } from "@/types/login/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

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

  const updateUserPreferences = async (categories: string[]) => {
    try {
      if (!user?.id) {
        return { success: false, message: "Usuário não encontrado" };
      }

      const result = await preferencesService.saveUserPreferences(
        user.id.toString(),
        categories
      );

      if (result.success) {
        const updatedUser = {
          ...user,
          preferences: {
            categories,
          },
        };

        setUser(updatedUser);
        await AsyncStorage.setItem("@auth_token", JSON.stringify(updatedUser));
      }

      return result;
    } catch (error) {
      console.error("Erro ao atualizar preferências:", error);
      return { success: false, message: "Erro ao atualizar preferências" };
    }
  };

  const refreshUserData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Erro ao recarregar dados do usuário:", error);
    }
  };

  const logout = async () => {
    try {
      console.log("Iniciando logout...");
      setIsLoading(true);
      setIsLoggedIn(false);
      setUser(null);

      const result = await authService.logout();
      console.log("Resultado do logout:", result);

      return result;
    } catch (error) {
      console.error("Erro durante logout:", error);
      setIsLoggedIn(false);
      setUser(null);
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
    updateUserPreferences,
    refreshUserData,
    logout,
  };
}
