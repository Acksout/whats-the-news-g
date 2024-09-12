"use client";

import React, { useState, useEffect } from "react";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalArticles, setTotalArticles] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/news?type=latest&page=${pageNum}&max=4`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTotalArticles(data.totalArticles);
      setHasMore(pageNum * 4 < data.totalArticles);
      return data.articles;
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page).then((articles) => setNews(articles));
  }, [page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const loadPrevious = () => {
    if (page > 1 && !loading) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Latest News</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {news.map((article, index) => (
            <NewsCard key={`${article.url}-${index}`} article={article} />
          ))}
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Button onClick={loadPrevious} disabled={loading || page === 1}>
            Previous
          </Button>
          <Button onClick={loadMore} disabled={loading || !hasMore}>
            Next
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Page {page} of {Math.ceil(totalArticles / 4)}
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default LatestNews;
