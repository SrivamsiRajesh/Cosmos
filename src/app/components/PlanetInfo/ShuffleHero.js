import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const ShuffleHero = ({ onSearch, searchQuery, setSearchQuery }) => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto relative">
      {/* Starry Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
        <Stars radius={50} count={5000} factor={4} fade speed={2} />
        </Canvas>
      </div>

      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors mr-2">
            <FaArrowLeft size={20} />
          </Link>
          <span className="text-xs md:text-sm text-blue-400 font-medium">
            Explore the Cosmos
          </span>
        </div>
        <h3 className="text-4xl md:text-6xl font-semibold text-white">
          Discover the Wonders of Space
        </h3>
        <p className="text-base md:text-lg text-gray-300 my-4 md:my-6">
          Embark on a journey through the universe, uncover celestial mysteries, and explore the vastness of space.
        </p>
        <form onSubmit={onSearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for space topics..."
            className="w-full px-4 py-2 rounded-l-lg focus:outline-none text-gray-800"
          />
          <button type="submit" className="bg-blue-500 text-white font-medium py-2 px-4 rounded-r-lg transition-all hover:bg-blue-600 active:scale-95">
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default ShuffleHero;