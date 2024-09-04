"use client";
import React, { useState, useEffect } from 'react';

const NewsArticle = ({ article }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <img src={article.image || '/placeholder-image.jpg'} alt={article.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h2 className="font-bold text-xl mb-2 text-gray-800">{article.title}</h2>
      <p className="text-gray-600 text-sm mb-4">{article.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs">{new Date(article.publishedAt).toLocaleDateString()}</span>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Read More
        </a>
      </div>
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

  if (loading) return <div className="text-center text-2xl mt-10">Loading...</div>;
  if (error) return <div className="text-center text-2xl mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Space & Aerospace News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <NewsArticle key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default SpaceNews;