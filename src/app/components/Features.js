"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Link from 'next/link';

export const Features = () => {
  return (
    <section
      className="relative mx-auto max-w-7xl px-4 py-12 text-white overflow-hidden"
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

      {/* Title Section - Centered */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold md:text-5xl mb-2">
          Discover the Universe 🌌
        </h2>
        <span className="text-slate-400 text-2xl md:text-3xl">with Cosmosile 🚀</span>
      </div>

      {/* Services Section */}
      <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
        <h2 className="mb-1 text-3xl font-extrabold leading-tight text-white text-center">
          Our Features 🌟
        </h2>
        <p className="mb-12 text-lg text-gray-300 text-center">
          Explore the cosmos with our cutting-edge tools and resources.
        </p>
        <div className="w-full">
          <div className="flex flex-col w-full mb-10 sm:flex-row">
            <ServiceCard
              title="Space Info 🌍"
              description="Embark on an exciting journey through the cosmos! Explore fascinating planets, uncover their unique characteristics, and learn about the mysteries that lie beyond our Earth. Whether you're a space enthusiast or a curious beginner, there's a universe of knowledge waiting for you."
              borderColor="border-indigo-500"
              bgColor="bg-indigo-500"
              textColor="text-indigo-500"
              direction="left"
              link="./components/PlanetInfo"
            />
            <ServiceCard
              title="Space News Feed 📰"
              description="Stay updated with the latest discoveries, missions, and breakthroughs in space exploration and astronomy."
              borderColor="border-purple-500"
              bgColor="bg-purple-500"
              textColor="text-purple-500"
              direction="right"
              link="./components/SpaceNews"
            />
          </div>
          <div className="flex flex-col w-full mb-10 sm:flex-row">
            <ServiceCard
              title="Space Events 🌠"
              description="Stay updated on upcoming celestial events and local astronomy gatherings that ignite your passion for space. Participate in engaging discussions, hands-on activities, and expert-led sessions."
              borderColor="border-blue-400"
              bgColor="bg-blue-400"
              textColor="text-blue-400"
              direction="left"
              link="./components/Gaze"
            />
            <ServiceCard
              title="Rocket Launches 🚀"
              description="Get the latest updates on space exploration, technology, and discoveries. Stay informed with news from NASA and other space agencies around the world."
              borderColor="border-yellow-400"
              bgColor="bg-yellow-400"
              textColor="text-yellow-400"
              direction="right"
              link="./components/RocketLaunches"
            />
          </div>
          {/* New feature cards */}
          <div className="flex flex-col w-full mb-10 sm:flex-row">
          <ServiceCard
  title="Solar System Explorer 🌌"
  description="Explore our solar system in this interactive 3D model. Zoom in and out, rotate, and click on planets to learn more about them."
  borderColor="border-blue-500"
  bgColor="bg-blue-500"
  textColor="text-blue-500"
  direction="left"
  link="./components/SolarSystem"
/>
            <ServiceCard
              title="Space Careers 👨‍🚀"
              description="Discover exciting career opportunities in the space industry. From aerospace engineering to astrobiology, explore the diverse fields that contribute to space exploration and find your place in the cosmos."
              borderColor="border-red-500"
              bgColor="bg-red-500"
              textColor="text-red-500"
              direction="right"
              link="./components/SpaceCareers"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, description, borderColor, bgColor, textColor, direction, link }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2, // Increased threshold for earlier triggering
  });

  const variants = {
    hidden: { opacity: 0, y: 20 }, // Changed from x to y for a simpler animation
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Reduced duration
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="w-full mb-10 sm:mb-0 sm:w-1/2"
    >
      <div className="relative h-full ml-0 mr-0 sm:mr-10">
        <span className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 ${bgColor} rounded-lg`}></span>
        <div
          className={`relative h-full p-5 bg-gray-800 border-2 ${borderColor} rounded-lg
            transition-all duration-300 ease-in-out
            hover:shadow-[0_0_15px_rgba(var(--tw-clr-${borderColor.split('-')[1]}),0.5)]
          `}
        >
          <Link href={link} className="block">
            <div className="flex items-center -mt-1">
              <h3 className="my-2 ml-3 text-lg font-bold text-white hover:underline">{title}</h3>
            </div>
            <p className={`mt-3 mb-1 text-xs font-medium ${textColor} uppercase`}>------------</p>
            <p className="mb-2 text-gray-300 hover:text-gray-100">{description}</p>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Features;