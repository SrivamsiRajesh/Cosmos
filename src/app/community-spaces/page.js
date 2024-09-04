"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CommunitySpaceCard = ({ space }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 m-4">
    <h2 className="text-xl font-bold mb-2">{space.name}</h2>
    <p className="text-gray-600 mb-2">Email: {space.email}</p>
    <p className="text-gray-600 mb-2">Date and Time: {new Date(space.eventDate).toLocaleString()}</p>
    <p className="text-gray-700">{space.description}</p>
  </div>
);

const CommunitySpaces = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch community spaces');
        }
        const data = await response.json();
        setSpaces(data);
      } catch (error) {
        console.error('Error fetching community spaces:', error);
      }
    };

    fetchSpaces();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Community Spaces</h1>
      <Link href="/" className="mb-4 inline-block text-blue-500 hover:text-blue-700">
        ← Back to Home
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spaces.map((space) => (
          <CommunitySpaceCard key={space._id} space={space} />
        ))}
      </div>
    </div>
  );
};

export default CommunitySpaces;