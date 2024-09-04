"use client";
import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const NewsArticle = ({ article, isLarge = false }) => (
  <div className={`bg-gray-800 bg-opacity-70 shadow-lg rounded-lg overflow-hidden ${isLarge ? 'h-full' : ''}`}>
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      <div 
        className={`bg-cover text-center overflow-hidden ${isLarge ? 'h-64' : 'h-40'}`}
        style={{ backgroundImage: `url(${article.image || '/placeholder-image.jpg'})` }}
      ></div>
    </a>
    <div className="p-4">
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`text-white font-bold ${isLarge ? 'text-2xl' : 'text-md'} hover:text-blue-400 transition duration-300`}
      >
        {article.title}
      </a>
      {isLarge && (
        <p className="text-gray-300 text-sm mt-2">{article.description}</p>
      )}
      <p className="text-gray-400 text-xs mt-2">{new Date(article.publishedAt).toLocaleDateString()}</p>
    </div>
  </div>
);

const SpaceNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = '4b48cd7e763f3bdaebd072f57e455fbb'; // Replace with your actual GNews API key
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent('space OR aerospace OR NASA OR SpaceX')}&lang=en&country=us&max=10&apikey=${API_KEY}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch news articles');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-2xl mt-10 text-white">Loading...</div>;
  if (error) return <div className="text-center text-2xl mt-10 text-red-500">{error}</div>;

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-900 text-white">
      <div className="fixed inset-0 z-0">
        <Canvas>
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
        </Canvas>
      </div>
      
      <div className="relative z-10 max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors mr-4">
            <FaArrowLeft size={24} />
          </Link>
          <h1 className="text-4xl md:text-6xl font-semibold text-white">Space & Aerospace News</h1>
        </div>
        <p className="text-lg text-gray-300 mb-8">
          Stay informed with the latest developments in space exploration and aerospace technology.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
          <div className="sm:col-span-5">
            {articles[0] && <NewsArticle article={articles[0]} isLarge={true} />}
          </div>

          <div className="sm:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.slice(1, 7).map((article, index) => (
              <NewsArticle key={index} article={article} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SpaceNews;