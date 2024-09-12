import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import Link from "next/link";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            NewsHub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your daily dose of curated news
          </p>
        </section>

        <section className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl shadow-lg text-white">
            <h2 className="text-3xl font-bold mb-4">Top Headlines</h2>
            <p className="mb-6 text-blue-100">
              Dive into the most important stories shaping our world right now.
            </p>
            <Link href="/topnews" className="inline-block">
              <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-blue-100 transition-colors">
                Read Now
              </button>
            </Link>
          </div>
          <div className="flex-1 bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-xl shadow-lg text-white">
            <h2 className="text-3xl font-bold mb-4">Latest Updates</h2>
            <p className="mb-6 text-green-100">
              Stay ahead with real-time news updates as events unfold globally.
            </p>
            <Link href="/latestnews" className="inline-block">
              <button className="bg-white text-green-600 font-semibold py-2 px-6 rounded-full hover:bg-green-100 transition-colors">
                Get Updates
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
