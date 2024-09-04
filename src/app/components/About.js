"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Spline from '@splinetool/react-spline/next';

const AboutUs = () => {
  return (
    <section id="aboutUs"
      className="relative mx-auto max-w-7xl px-4 py-16 overflow-hidden text-white"
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

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="mt-12 md:mt-0 h-[400px] md:h-[500px]"> {/* Adjust height as needed */}
            <Spline
              scene="https://prod.spline.design/6kgMAxRpTGW57i7c/scene.splinecode"
            />
          </div>
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">About Cosmosile</h2>
            <p className="mt-4 text-gray-300 text-lg">
              Cosmosile is your portal to the universe, designed to inspire wonder and curiosity about the cosmos. Our mission is to make space exploration and astronomy accessible to everyone, from casual stargazers to aspiring astrophysicists.
            </p>
            <p className="mt-4 text-gray-300 text-lg">
            Developed as part of a hackathon, Cosmosile is a project that aims to foster community engagement through innovative technology. This platform combines user-friendly features with essential resources to connect local residents, promote events, and encourage participation in community activities. My goal was to create a space where individuals can easily access information and collaborate, bringing the community closer together
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;