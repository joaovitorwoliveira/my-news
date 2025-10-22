export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  source?: string;
  author?: string;
  url?: string;
  imageUrl?: string;
};

export type NewsAPISource = {
  id: string | null;
  name: string;
};

export type NewsAPIArticle = {
  source: NewsAPISource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export type NewsAPIResponse = {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
};

export type NewsAPIError = {
  status: string;
  code: string;
  message: string;
};

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
