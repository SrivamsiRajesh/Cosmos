"use client";
import React, { useState, useEffect } from 'react';

const LaunchCard = ({ launch }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const launchDate = new Date(launch.window_start);
      const timeRemaining = launchDate - now;

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [launch.window_start]);

  return (
    <div className="flex border border-gray-300 rounded-lg bg-gray-900 m-4 overflow-hidden shadow-md w-full max-w-2xl mx-auto">
      <img src={launch.image} alt={launch.name} className="w-1/2 object-cover" />
      <div className="p-4 w-1/2">
        <h2 className="text-xl font-semibold text-white mb-2">{launch.name}</h2>
        <p className="text-sm text-gray-300 mb-1">{launch.launch_service_provider.name}</p>
        <p className="text-3xl font-mono text-white mb-2">{countdown}</p>
        <p className="text-sm text-gray-300 mb-2">Launch D&T: {new Date(launch.window_start).toLocaleString()}</p>
        <p className="text-sm text-gray-300 mb-1">Location: {launch.pad.location.name}</p>
        <p className="text-sm text-gray-300 mb-1">Mission type: {launch.mission?.type || 'N/A'}</p>


        <div className="flex items-center mt-2">
        
        </div>
      </div>
    </div>
  );
};

const RocketLaunches = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&offset=0/?mode=detailed')
      .then(response => response.json())
      .then(data => setLaunches(data.results))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center text-white my-6">Upcoming Rocket Launches</h1>
      <div className="space-y-4">
        {launches.map(launch => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
    </div>
  );
};

export default RocketLaunches;
