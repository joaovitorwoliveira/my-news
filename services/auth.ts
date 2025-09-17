import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

interface User {
  id?: number;
  email: string;
  password: string;
  name?: string;
}

export const AUTH_TOKEN_KEY = "@auth_token";

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await api.get("/users", {
        params: { email, password },
      });

      if (response.data.length > 0) {
        const user = response.data[0];
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(user));
        return { success: true, user };
      }

      return { success: false, message: "Credenciais inválidas" };
    } catch (error) {
      return { success: false, message: "Ocorreu um erro" };
    }
  },

  async signup(userData: User) {
    try {
      const existingUser = await api.get("/users", {
        params: { email: userData.email },
      });

      if (existingUser.data.length > 0) {
        return { success: false, message: "Email já registrado" };
      }

      const response = await api.post("/users", userData);

      const user = response.data;

      await AsyncStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(user));
      return { success: true, user };
    } catch (error) {
      return { success: false, message: "Ocorreu um erro durante o registro" };
    }
  },

  async logout() {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);

      const checkToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

      if (checkToken === null) {
        return { success: true };
      } else {
        return { success: false, message: "Erro ao remover token" };
      }
    } catch (error) {
      return { success: false, message: "Erro durante o logout" };
    }
  },

  async getCurrentUser() {
    try {
      const userData = await AsyncStorage.getItem(AUTH_TOKEN_KEY);

      if (userData) {
        const parsedUser = JSON.parse(userData);

        return parsedUser;
      }

      return null;
    } catch (error) {
      return null;
    }
  },
};
