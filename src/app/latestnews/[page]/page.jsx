"use client";

import React, { useState, useEffect } from "react";
import NewsCard from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useParams, useRouter } from "next/navigation";

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(25);
  const params = useParams();
  const router = useRouter();
  const page = parseInt(params.page) || 1;

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news?type=latest&page=1&max=100`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setNews(data.articles);
      setTotalPages(Math.min(25, Math.ceil(data.totalArticles / 4)));
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const displayedNews = news.slice((page - 1) * 4, page * 4);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !loading) {
      router.push(`/latestnews/${newPage}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Latest News</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {displayedNews.map((article, index) => (
            <NewsCard key={`${article.url}-${index}`} article={article} />
          ))}
        </div>
        <div className="mt-8 flex justify-center space-x-2">
          <Button
            onClick={() => changePage(page - 1)}
            disabled={page === 1 || loading}
          >
            Previous
          </Button>
          <Button
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages || loading}
          >
            Next
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Page {page} of {totalPages}
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default LatestNews;
