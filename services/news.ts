import { NewsAPIArticle, NewsAPIResponse, NewsItem } from "@/types/news/types";
import axios from "axios";

const NEWS_API_BASE_URL = "https://newsapi.org/v2";
const NEWS_API_KEY =
  process.env.EXPO_PUBLIC_NEWS_API_KEY || process.env.NEWS_API_KEY;

function formatPublishedDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMinutes < 60) {
    return `Há ${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"}`;
  } else if (diffInHours < 24) {
    return `Há ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`;
  } else if (diffInDays === 1) {
    return "Ontem";
  } else {
    return `Há ${diffInDays} dias`;
  }
}

function categorizeArticle(article: NewsAPIArticle): string {
  const title = article.title?.toLowerCase() || "";
  const description = article.description?.toLowerCase() || "";
  const source = article.source.name?.toLowerCase() || "";

  // Categorização simples baseada em palavras-chave
  if (
    title.includes("mercado") ||
    title.includes("ações") ||
    title.includes("bolsa") ||
    source.includes("bloomberg") ||
    source.includes("forbes")
  ) {
    return "Mercado";
  } else if (
    title.includes("tecnologia") ||
    title.includes("tech") ||
    title.includes("startup") ||
    title.includes("ia") ||
    title.includes("inteligência artificial") ||
    source.includes("techcrunch") ||
    source.includes("wired")
  ) {
    return "Tecnologia";
  } else if (
    title.includes("governo") ||
    title.includes("política") ||
    title.includes("eleição") ||
    description.includes("político")
  ) {
    return "Política";
  } else if (
    title.includes("sustentável") ||
    title.includes("energia") ||
    title.includes("inovação") ||
    title.includes("startup")
  ) {
    return "Inovação";
  } else if (
    title.includes("consumidor") ||
    title.includes("consumo") ||
    title.includes("marca")
  ) {
    return "Consumo";
  } else {
    return "Geral";
  }
}

function convertArticleToNewsItem(article: NewsAPIArticle): NewsItem {
  return {
    id: article.url,
    title: article.title,
    summary: article.description || article.content?.substring(0, 200) || "",
    category: categorizeArticle(article),
    publishedAt: formatPublishedDate(article.publishedAt),
    source: article.source.name,
    author: article.author || undefined,
    url: article.url,
    imageUrl: article.urlToImage || undefined,
  };
}

export interface TopHeadlinesParams {
  country?: string;
  category?: string;
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
}

export interface EverythingParams {
  q: string;
  searchIn?: "title" | "description" | "content";
  sources?: string;
  domains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  pageSize?: number;
  page?: number;
}

export async function getTopHeadlines(
  params: TopHeadlinesParams = {}
): Promise<NewsItem[]> {
  try {
    if (!NEWS_API_KEY) {
      throw new Error(
        "NEWS_API_KEY não encontrada. Configure a variável de ambiente."
      );
    }

    const defaultParams = {
      country: "br",
      pageSize: 20,
      ...params,
    };

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
      return response.data.articles
        .filter((article) => article.title && article.description)
        .map(convertArticleToNewsItem);
    }

    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao buscar notícias:", error.response?.data);
    }
    throw error;
  }
}

export async function searchNews(
  params: EverythingParams
): Promise<NewsItem[]> {
  try {
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
      return response.data.articles
        .filter((article) => article.title && article.description)
        .map(convertArticleToNewsItem);
    }

    return [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao buscar notícias:", error.response?.data);
    }
    throw error;
  }
}

export async function getLatestNews(): Promise<NewsItem[]> {
  try {
    const headlines = await getTopHeadlines({
      country: "br",
      pageSize: 20,
    });

    if (headlines.length > 0) {
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
