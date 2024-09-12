import { NextResponse } from "next/server";

const API_KEY = process.env.GNEWS_API_KEY;
const BASE_URL = "https://gnews.io/api/v4";

async function fetchNews(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("apikey", API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const max = parseInt(searchParams.get("max") || "10", 10);

  try {
    let news;
    const params = {
      lang: "en",
      country: "us",
      max,
      page,
    };

    switch (type) {
      case "latest":
        news = await fetchNews("/top-headlines", params);
        break;
      case "top":
        news = await fetchNews("/top-headlines", { ...params, topic: "world" });
        break;
      case "search":
        if (!query) {
          return NextResponse.json(
            { error: "Query parameter is required for search" },
            { status: 400 }
          );
        }
        news = await fetchNews("/search", { ...params, q: query });
        break;
      default:
        return NextResponse.json(
          { error: "Invalid type parameter" },
          { status: 400 }
        );
    }

    const formattedNews = news.articles.map((article) => ({
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      image: article.image,
      publishedAt: article.publishedAt,
      source: {
        name: article.source.name,
        url: article.source.url,
      },
    }));

    return NextResponse.json({
      articles: formattedNews,
      totalArticles: news.totalArticles,
      currentPage: page,
      pageSize: max,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
