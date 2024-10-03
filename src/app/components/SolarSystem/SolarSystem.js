"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FaArrowLeft, FaRocket } from 'react-icons/fa';
import Link from 'next/link';

const SolarSystem = () => {
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
          Solar System Explorer <FaRocket className="inline-block ml-2" />
        </motion.h1>

        <motion.div 
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <iframe 
            src="https://www.solarsystemscope.com/iframe" 
            width="100%" 
            height="500" 
            style={{ minWidth: "600px", minHeight: "400px", border: "2px solid #0f5c6e" }}
            title="Solar System Model"
          ></iframe>
        </motion.div>

        <motion.p 
          className="text-xl text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Explore our solar system in this interactive 3D model. 
          Zoom in and out, rotate, and click on planets to learn more about them.
        </motion.p>
      </div>
    </div>
  );
};

export default SolarSystem;