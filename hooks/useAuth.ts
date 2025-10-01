import { authService } from "@/services/auth";
import { User } from "@/types/login/types";
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
    logout,
  };
}
