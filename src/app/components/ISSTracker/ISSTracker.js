"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FaSpaceShuttle, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const ISSTracker = () => {
  const [issPosition, setIssPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchISSPosition = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        if (!response.ok) {
          throw new Error('Failed to fetch ISS position');
        }
        const data = await response.json();
        setIssPosition(data.iss_position);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchISSPosition();
    const interval = setInterval(fetchISSPosition, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Starry Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <Link href="/" className="absolute top-4 left-4 text-blue-400 hover:text-blue-300 transition-colors">
          <FaArrowLeft size={24} />
        </Link>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ISS Tracker <FaSpaceShuttle className="inline-block ml-2" />
        </motion.h1>

        <motion.div 
          className="bg-gray-800 bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {loading && <p className="text-white text-center">Loading ISS position...</p>}
          {error && <p className="text-red-500 text-center">Error: {error}</p>}
          {issPosition && (
            <div className="text-center">
              <p className="text-white text-xl mb-4">
                Current ISS Position:
              </p>
              <p className="text-white text-lg mb-2">
                Latitude: {parseFloat(issPosition.latitude).toFixed(4)}°
              </p>
              <p className="text-white text-lg mb-4">
                Longitude: {parseFloat(issPosition.longitude).toFixed(4)}°
              </p>
              <a 
                href={`https://www.google.com/maps/@${issPosition.latitude},${issPosition.longitude},3z`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors block mb-4"
              >
                View on Google Maps
              </a>
            </div>
          )}
          <a 
            href="https://spotthestation.nasa.gov/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors block text-center"
          >
            Get ISS sighting opportunities for your location
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ISSTracker;