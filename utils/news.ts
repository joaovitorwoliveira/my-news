import { NewsAPIArticle, NewsItem } from "@/types/news/types";
import { formatPublishedDate } from "./formats";

export function categorizeArticle(article: NewsAPIArticle): string {
  const title = article.title?.toLowerCase() || "";
  const description = article.description?.toLowerCase() || "";
  const source = article.source.name?.toLowerCase() || "";

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

export function convertArticleToNewsItem(article: NewsAPIArticle): NewsItem {
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
