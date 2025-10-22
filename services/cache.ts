import { NewsItem } from "@/types/news/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEYS = {
  LATEST_NEWS: "latest_news",
  TOP_HEADLINES: "top_headlines",
  SEARCH_RESULTS: "search_results",
} as const;

const CACHE_DURATION = {
  LATEST_NEWS: 30 * 60 * 1000, // 30 minutos
  TOP_HEADLINES: 30 * 60 * 1000, // 30 minutos
  SEARCH_RESULTS: 10 * 60 * 1000, // 10 minutos
} as const;

interface CacheData<T> {
  data: T;
  timestamp: number;
  key: string;
}

export class NewsCache {
  private static async setCache<T>(
    key: string,
    data: T,
    duration: number
  ): Promise<void> {
    try {
      const cacheData: CacheData<T> = {
        data,
        timestamp: Date.now(),
        key,
      };
      await AsyncStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error("Erro ao salvar no cache:", error);
    }
  }

  private static async getCache<T>(key: string): Promise<T | null> {
    try {
      const cached = await AsyncStorage.getItem(key);
      if (!cached) return null;

      const cacheData: CacheData<T> = JSON.parse(cached);
      const now = Date.now();
      const isExpired =
        now - cacheData.timestamp >
        CACHE_DURATION[key as keyof typeof CACHE_DURATION];

      if (isExpired) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.error("Erro ao ler do cache:", error);
      return null;
    }
  }

  static async setLatestNews(news: NewsItem[]): Promise<void> {
    await this.setCache(
      CACHE_KEYS.LATEST_NEWS,
      news,
      CACHE_DURATION.LATEST_NEWS
    );
  }

  static async getLatestNews(): Promise<NewsItem[] | null> {
    return await this.getCache<NewsItem[]>(CACHE_KEYS.LATEST_NEWS);
  }

  static async setTopHeadlines(news: NewsItem[], params: any): Promise<void> {
    const key = `${CACHE_KEYS.TOP_HEADLINES}_${JSON.stringify(params)}`;
    await this.setCache(key, news, CACHE_DURATION.TOP_HEADLINES);
  }

  static async getTopHeadlines(params: any): Promise<NewsItem[] | null> {
    const key = `${CACHE_KEYS.TOP_HEADLINES}_${JSON.stringify(params)}`;
    return await this.getCache<NewsItem[]>(key);
  }

  static async setSearchResults(
    news: NewsItem[],
    query: string
  ): Promise<void> {
    const key = `${CACHE_KEYS.SEARCH_RESULTS}_${query}`;
    await this.setCache(key, news, CACHE_DURATION.SEARCH_RESULTS);
  }

  static async getSearchResults(query: string): Promise<NewsItem[] | null> {
    const key = `${CACHE_KEYS.SEARCH_RESULTS}_${query}`;
    return await this.getCache<NewsItem[]>(key);
  }

  static async clearCache(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(CACHE_KEYS));

      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(
        (key) =>
          key.startsWith(CACHE_KEYS.TOP_HEADLINES) ||
          key.startsWith(CACHE_KEYS.SEARCH_RESULTS)
      );
      if (cacheKeys.length > 0) {
        await AsyncStorage.multiRemove(cacheKeys);
      }
    } catch (error) {
      console.error("Erro ao limpar cache:", error);
    }
  }

  static async getCacheInfo(): Promise<{
    latestNews: boolean;
    topHeadlines: number;
    searchResults: number;
  }> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const latestNews = keys.includes(CACHE_KEYS.LATEST_NEWS);
      const topHeadlines = keys.filter((key) =>
        key.startsWith(CACHE_KEYS.TOP_HEADLINES)
      ).length;
      const searchResults = keys.filter((key) =>
        key.startsWith(CACHE_KEYS.SEARCH_RESULTS)
      ).length;

      return {
        latestNews,
        topHeadlines,
        searchResults,
      };
    } catch (error) {
      console.error("Erro ao obter informações do cache:", error);
      return {
        latestNews: false,
        topHeadlines: 0,
        searchResults: 0,
      };
    }
  }
}
