"use client";
import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const LaunchCard = ({ launch }) => {
  const [countdown, setCountdown] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const launchDate = new Date(launch.window_start);
      const timeRemaining = launchDate - now;

      if (timeRemaining < 0) {
        setCountdown('Launched');
        clearInterval(interval);
      } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [launch.window_start]);

  return (
    <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg bg-gray-900 bg-opacity-70 m-4 overflow-hidden shadow-md w-full max-w-2xl mx-auto">
      <img 
        src={imageError ? '/placeholder.jpg' : launch.image} 
        alt={launch.name} 
        className="w-full md:w-1/2 h-48 md:h-auto object-cover" 
        onError={() => setImageError(true)}
      />
      <div className="p-4 w-full md:w-1/2">
        <h2 className="text-xl font-semibold text-white mb-2">{launch.name}</h2>
        <p className="text-sm text-gray-300 mb-1">{launch.launch_service_provider.name}</p>
        <p className="text-3xl font-mono text-white mb-2">{countdown}</p>
        <p className="text-sm text-gray-300 mb-2">Launch D&T: {new Date(launch.window_start).toLocaleString()}</p>
        <p className="text-sm text-gray-300 mb-1">Location: {launch.pad.location.name}</p>
        <p className="text-sm text-gray-300 mb-1">Mission type: {launch.mission?.type || 'N/A'}</p>
      </div>
    </div>
  );
};

const RocketLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&offset=0/?mode=detailed')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setLaunches(data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching launch data:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-900 text-white">
      <div className="fixed inset-0 z-0">
        <Canvas>
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
        </Canvas>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors mr-4">
            <FaArrowLeft size={24} />
          </Link>
          <h1 className="text-4xl md:text-6xl font-semibold text-white">Upcoming Rocket Launches</h1>
        </div>
        <p className="text-lg text-gray-300 mb-4 text-center">
          Stay updated with the latest rocket launches and countdowns to your favorite missions.
        </p>
        
        {isLoading && <p className="text-center text-white">Loading launches...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        
        <div className="space-y-4">
          {launches.map(launch => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default RocketLaunches;