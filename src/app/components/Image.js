"use client";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const Image = () => {
  const [nasaData, setNasaData] = useState(null);
  const color = useMotionValue("#13FFAA");

  useEffect(() => {
    const fetchNasaData = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=hPMDXfQykh4DKfeHNFDz7zejco621qW9Pov7wfPk`
        );
        const data = await response.json();
        setNasaData(data);
      } catch (error) {
        console.error("Error fetching NASA data:", error);
      }
    };

    fetchNasaData();

    // Animate the border color
    const colors = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];
    let index = 0;
    const intervalId = setInterval(() => {
      color.set(colors[index]);
      index = (index + 1) % colors.length;
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const borderColor = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 0px 15px ${color}`;

  return (
    <section
    className="relative mx-auto max-w-7xl px-4 pt-12 pb-0 text-white overflow-hidden"
      style={{
        background: "#020617", // Solid dark background
      }}
    >
      {/* Starry Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas>
          <Stars radius={50} count={5000} factor={4} fade speed={2} />
        </Canvas>
      </div>

      <div className="relative z-10 mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
          NASA Image of the Day
          <span className="text-slate-400"> Explore the cosmos</span>
        </h2>
      </div>

      <div className="container relative z-10 flex flex-col md:flex-row justify-between h-full max-w-6xl mx-auto xl:px-0 mt-5">
        <div className="md:w-1/2 pr-8">
          <h2 className="mb-4 text-3xl font-extrabold leading-tight text-white">
            {nasaData?.title || "Loading..."}
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            {nasaData?.explanation || "Fetching NASA data..."}
          </p>
        </div>
        <motion.div 
          className="md:w-1/2"
          style={{ border: borderColor, boxShadow }}
        >
          <div className="p-6 rounded-lg bg-gray-900 bg-opacity-70">
            {nasaData?.url && (
              <img
                src={nasaData.url}
                alt={nasaData.title}
                className="w-full h-auto rounded-lg"
              />
            )}
            <p className="mt-4 text-sm text-gray-300">
              Date: {nasaData?.date || "Loading..."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Image;