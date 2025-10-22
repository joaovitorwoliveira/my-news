import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const preferencesService = {
  async saveUserPreferences(userId: string, categories: string[]) {
    try {
      const response = await api.patch(`/users/${userId}`, {
        preferences: {
          categories,
        },
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Erro ao salvar preferências:", error);
      return { success: false, message: "Erro ao salvar preferências" };
    }
  },

  async getUserPreferences(userId: string) {
    try {
      const response = await api.get(`/users/${userId}`);

      if (response.data && response.data.preferences) {
        return {
          success: true,
          preferences: response.data.preferences,
        };
      }

      return {
        success: true,
        preferences: { categories: [] },
      };
    } catch (error) {
      console.error("Erro ao buscar preferências:", error);
      return {
        success: false,
        message: "Erro ao buscar preferências",
        preferences: { categories: [] },
      };
    }
  },
};
