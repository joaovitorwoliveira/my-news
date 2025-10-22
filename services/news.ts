import axios from "axios";
import { NewsCache } from "./cache";

import {
  EverythingParams,
  NewsAPIResponse,
  NewsItem,
  TopHeadlinesParams,
} from "@/types/news/types";
import { convertArticleToNewsItem } from "@/utils/news";

const NEWS_API_BASE_URL = process.env.EXPO_PUBLIC_NEWS_API_BASE_URL;
const NEWS_API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;

function handleNewsAPIError(error: any): never {
  if (error?.response?.data?.code === "rateLimited") {
    throw new Error(
      "Limite de requisições atingido. A conta gratuita da NewsAPI permite 100 requisições por 24h. Tente novamente mais tarde ou considere fazer upgrade para um plano pago."
    );
  }

  if (axios.isAxiosError(error)) {
    console.error("Erro ao buscar notícias:", error.response?.data);
  }

  throw error;
}

export async function getTopHeadlines(
  params: TopHeadlinesParams = {}
): Promise<NewsItem[]> {
  try {
    const cachedNews = await NewsCache.getTopHeadlines(params);
    if (cachedNews) {
      console.log("📦 Retornando notícias do cache");
      return cachedNews;
    }

    if (!NEWS_API_KEY) {
      console.error("❌ NEWS_API_KEY não encontrada!");
      throw new Error(
        "NEWS_API_KEY não encontrada. Configure a variável de ambiente."
      );
    }

    const defaultParams = {
      country: "br",
      pageSize: 20,
      ...params,
    };

    console.log("🌐 Fazendo requisição para NewsAPI...");
    const response = await axios.get<NewsAPIResponse>(
      `${NEWS_API_BASE_URL}/top-headlines`,
      {
        params: {
          ...defaultParams,
          apiKey: NEWS_API_KEY,
        },
      }
    );

    if (response.data.status === "ok") {
      const news = response.data.articles
        .filter((article) => article.title && article.description)
        .map(convertArticleToNewsItem);

      await NewsCache.setTopHeadlines(news, params);
      console.log("💾 Notícias salvas no cache");

      return news;
    }

    return [];
  } catch (error) {
    handleNewsAPIError(error);
  }
}

export async function searchNews(
  params: EverythingParams
): Promise<NewsItem[]> {
  try {
    const cachedNews = await NewsCache.getSearchResults(params.q);
    if (cachedNews) {
      console.log("📦 Retornando resultados de busca do cache");
      return cachedNews;
    }

    if (!NEWS_API_KEY) {
      throw new Error(
        "NEWS_API_KEY não encontrada. Configure a variável de ambiente."
      );
    }

    const defaultParams = {
      language: "pt",
      sortBy: "publishedAt" as const,
      pageSize: 20,
      ...params,
    };

    console.log("🔍 Fazendo busca na NewsAPI...");
    const response = await axios.get<NewsAPIResponse>(
      `${NEWS_API_BASE_URL}/everything`,
      {
        params: {
          ...defaultParams,
          apiKey: NEWS_API_KEY,
        },
      }
    );

    if (response.data.status === "ok") {
      const news = response.data.articles
        .filter((article) => article.title && article.description)
        .map(convertArticleToNewsItem);

      await NewsCache.setSearchResults(news, params.q);
      console.log("💾 Resultados de busca salvos no cache");

      return news;
    }

    return [];
  } catch (error) {
    handleNewsAPIError(error);
  }
}

export async function getLatestNews(): Promise<NewsItem[]> {
  try {
    const cachedNews = await NewsCache.getLatestNews();
    if (cachedNews) {
      console.log("📦 Retornando últimas notícias do cache");
      return cachedNews;
    }

    const headlines = await getTopHeadlines({
      country: "br",
      pageSize: 20,
    });
    if (headlines.length > 0) {
      await NewsCache.setLatestNews(headlines);
      console.log("💾 Últimas notícias salvas no cache");
      return headlines;
    }

    const today = new Date().toISOString().split("T")[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const portugueseNews = await searchNews({
      q: "brasil OR tecnologia OR economia OR política",
      language: "pt",
      from: weekAgo,
      to: today,
      sortBy: "publishedAt",
      pageSize: 20,
    });

    if (portugueseNews.length > 0) {
      return portugueseNews;
    }

    const usHeadlines = await getTopHeadlines({
      country: "us",
      pageSize: 20,
    });

    if (usHeadlines.length > 0) {
      return usHeadlines;
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    throw error;
  }
}
