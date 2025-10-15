import {
  EverythingParams,
  getLatestNews,
  getTopHeadlines,
  searchNews,
  TopHeadlinesParams,
} from "@/services/news";
import { NewsItem } from "@/types/news/types";
import { useCallback, useEffect, useState } from "react";

export interface UseNewsReturn {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  searchByKeyword: (keyword: string) => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
}

export function useNews(): UseNewsReturn {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const latestNews = await getLatestNews();
      setNews(latestNews);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao carregar notícias";
      setError(errorMessage);
      console.error("Erro ao buscar notícias:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchNews();
  }, [fetchNews]);

  const searchByKeyword = useCallback(async (keyword: string) => {
    try {
      setLoading(true);
      setError(null);

      const params: EverythingParams = {
        q: keyword,
        language: "pt",
        sortBy: "publishedAt",
        pageSize: 20,
      };

      const results = await searchNews(params);
      setNews(results);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao buscar notícias";
      setError(errorMessage);
      console.error("Erro ao buscar por palavra-chave:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterByCategory = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);

      const params: TopHeadlinesParams = {
        country: "br",
        category: category.toLowerCase() as any,
        pageSize: 20,
      };

      const results = await getTopHeadlines(params);
      setNews(results);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao filtrar notícias";
      setError(errorMessage);
      console.error("Erro ao filtrar por categoria:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    news,
    loading,
    error,
    refresh,
    searchByKeyword,
    filterByCategory,
  };
}
