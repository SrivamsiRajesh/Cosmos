"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FaArrowLeft, FaBriefcase, FaRocket } from 'react-icons/fa';
import Link from 'next/link';

const SpaceCareers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          'https://www.arbeitnow.com/api/job-board-api'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        // Filter jobs for space-related keywords and USA location
        const filteredJobs = data.data.filter(job => 
          job.location.toLowerCase().includes('united states') &&
          (job.title.toLowerCase().includes('space') ||
           job.title.toLowerCase().includes('aeronautical') ||
           job.title.toLowerCase().includes('drone') ||
           job.title.toLowerCase().includes('satellite') ||
           job.title.toLowerCase().includes('rocket'))
        );
        setJobs(filteredJobs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Starry Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link href="/" className="inline-block mb-6 text-blue-400 hover:text-blue-300 transition-colors">
          <FaArrowLeft size={24} />
        </Link>

        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Space Careers <FaRocket className="inline-block ml-2" />
        </motion.h1>

        <motion.p 
          className="text-xl text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Explore exciting opportunities in the space industry across the USA
        </motion.p>

        {loading && (
          <p className="text-center text-xl">Loading job listings...</p>
        )}

        {error && (
          <p className="text-center text-xl text-red-500">Error: {error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <motion.div 
              key={job.slug}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-400 mb-2">{job.company_name}</p>
              <p className="text-gray-400 mb-4">{job.location}</p>
              {job.remote && (
                <p className="text-green-400 mb-4">Remote</p>
              )}
              <a 
                href={job.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                <FaBriefcase className="mr-2" /> Apply Now
              </a>
            </motion.div>
          ))}
        </div>

        {jobs.length === 0 && !loading && !error && (
          <p className="text-center text-xl mt-8">No job listings found. Please check back later.</p>
        )}

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Explore More Resources</h2>
          <ul className="space-y-2">
            <li><a href="https://www.nasa.gov/careers" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">NASA Careers</a></li>
            <li><a href="https://www.spacex.com/careers" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">SpaceX Careers</a></li>
            <li><a href="https://www.blueorigin.com/careers" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Blue Origin Careers</a></li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SpaceCareers;