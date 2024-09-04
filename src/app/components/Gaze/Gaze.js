"use client";
import React, { useEffect, useState } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Link from 'next/link';

const Navbar = () => {
  const [gradientDeg, setGradientDeg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientDeg((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const gradientStyle = {
    background: `linear-gradient(${gradientDeg}deg, #ff00ff, #00ffff, #ff00ff)`,
    padding: '2px', // This creates the border effect
  };

  return (
    <div style={gradientStyle} className="fixed top-0 left-0 right-0 rounded-b-lg z-50">
      <nav className="bg-gray-900/80 text-white rounded-full px-4 py-2 flex justify-center items-center space-x-6">
        <Link href="../../" className="hover:text-gray-400">Home</Link>
        <Link href="/about" className="hover:text-gray-400">About</Link>
        <Link href="/pricing" className="hover:text-gray-400">Pricing</Link>
        <button className="bg-gray-800 text-white px-4 py-1 rounded-full border border-gray-700 hover:bg-gray-700">
          Join waitlist
        </button>
      </nav>
    </div>
  );
};

const Layout = ({ children }) => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={5000} factor={4} fade speed={2} />
        </Canvas>
      </div>
      <Navbar />
      <main className="relative z-10 pt-24"> {/* Adjusted padding-top to create space below navbar */}
        {children}
      </main>
    </div>
  );
};

const Gaze = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://nightsky.jpl.nasa.gov/js/nsn_search_widget.js";
    script.async = true;
    script.onload = () => {
      if (window.nsn_search_widget) {
        window.nsn_search_widget.init("nsn", {
          zip: '86001',
          city: 'Flagstaff',
          state: 'AZ'
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="bg-white/80 shadow-lg rounded-lg p-6 max-w-xl mx-auto my-8">
      <style jsx>{`
        #nsn input::placeholder {
          color: #4B5563 !important;
        }
        #nsn select {
          color: #4B5563 !important;
        }
        body {
          margin: 0;
          padding: 0;
          background-color: #000;
        }
      `}</style>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Local Astronomy Events
      </h2>
      <div id="nsn" className="bg-gray-100 p-4 rounded-lg">
        {/* The widget will be inserted here */}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">How to Use:</h3>
        <ol className="list-decimal list-inside text-gray-700">
          <li>Enter your location in the widget above.</li>
          <li>Browse through the list of upcoming astronomy events.</li>
          <li>Click on an event for more details and registration information.</li>
        </ol>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Layout>
      <Gaze />
    </Layout>
  );
};

export default App;