"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const CelestialBodyCard = ({ body }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-gray-800 bg-opacity-70 text-white">
    <div className="h-64 overflow-hidden">
      <img 
        className="w-full h-full object-cover object-center"
        src={body.image} 
        alt={body.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
        }}
      />
    </div>
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{body.name}</div>
      <p className="text-gray-300 text-base mb-4">{body.description}</p>
      <div className="text-gray-400 text-sm">
        <p className="mb-1"><span className="font-semibold">Mass:</span> {body.mass}</p>
        <p className="mb-1"><span className="font-semibold">Radius:</span> {body.radius}</p>
        <p className="mb-1"><span className="font-semibold">Orbit:</span> {body.orbit}</p>
        <p className="mb-1"><span className="font-semibold">Temperature:</span> {body.temperature}</p>
        <p className="mb-1"><span className="font-semibold">Atmosphere:</span> {body.atmosphere}</p>
      </div>
    </div>
  </div>
);

const ShuffleHero = ({ onSearch, searchQuery, setSearchQuery }) => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto relative">
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
      <div className="relative w-full h-64">
        <Image 
          src="/bg.jpg" 
          alt="Space"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default function SolarSystem() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [nasaImageOfDay, setNasaImageOfDay] = useState(null);

  const celestialBodies = {
    sun: {
      name: 'Sun',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Sun_in_fog_in_Lysekil.jpg/330px-Sun_in_fog_in_Lysekil.jpg',
      description: 'The Sun is the star at the center of the Solar System.',
      mass: '1.989 × 10^30 kg',
      radius: '696,340 km',
      orbit: 'N/A (Center of the Solar System)',
      temperature: '5,500°C (surface), 15 million°C (core)',
      atmosphere: 'Composed of hydrogen and helium',
    },
    planets: [
      {
        name: 'Mercury',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/435px-Mercury_in_true_color.jpg',
        description: 'Mercury is the closest planet to the Sun.',
        mass: '3.301 × 10^23 kg',
        radius: '2,439.7 km',
        orbit: '88 days',
        temperature: '-180°C to 430°C',
        atmosphere: 'Thin, composed mainly of oxygen, sodium, and hydrogen',
      },
      {
        name: 'Venus',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Venus_2_Approach_Image.jpg/435px-Venus_2_Approach_Image.jpg',
        description: 'Venus is the second planet from the Sun.',
        mass: '4.867 × 10^24 kg',
        radius: '6,051.8 km',
        orbit: '225 days',
        temperature: '462°C (average)',
        atmosphere: 'Thick, composed mainly of carbon dioxide',
      },
      {
        name: 'Earth',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/435px-The_Blue_Marble_%28remastered%29.jpg',
        description: 'Earth is the third planet from the Sun and our home.',
        mass: '5.972 × 10^24 kg',
        radius: '6,371 km',
        orbit: '365.25 days',
        temperature: '-88°C to 58°C',
        atmosphere: 'Nitrogen (78%), Oxygen (21%), other gases (1%)',
      },
      {
        name: 'Mars',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png/435px-Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png',
        description: 'Mars is the fourth planet from the Sun.',
        mass: '0.641 × 10^24 kg',
        radius: '3,389.5 km',
        orbit: '687 days',
        temperature: '-140°C to 20°C',
        atmosphere: 'Thin, composed mainly of carbon dioxide',
      },
      {
        name: 'Jupiter',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Jupiter_New_Horizons.jpg/435px-Jupiter_New_Horizons.jpg',
        description: 'Jupiter is the largest planet in the Solar System.',
        mass: '1.898 × 10^27 kg',
        radius: '69,911 km',
        orbit: '12 years',
        temperature: '-145°C (cloud top)',
        atmosphere: 'Hydrogen (90%), Helium (10%)',
      },
      {
        name: 'Saturn',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/450px-Saturn_during_Equinox.jpg',
        description: 'Saturn is known for its prominent ring system.',
        mass: '5.683 × 10^26 kg',
        radius: '58,232 km',
        orbit: '29 years',
        temperature: '-178°C (average)',
        atmosphere: 'Hydrogen (96%), Helium (3%), other gases (1%)',
      },
      {
        name: 'Uranus',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Uranus_Voyager2_color_calibrated.png/435px-Uranus_Voyager2_color_calibrated.png',
        description: 'Uranus is the seventh planet from the Sun.',
        mass: '8.681 × 10^25 kg',
        radius: '25,362 km',
        orbit: '84 years',
        temperature: '-224°C (average)',
        atmosphere: 'Hydrogen (83%), Helium (15%), Methane (2%)',
      },
      {
        name: 'Neptune',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Neptune_Voyager2_color_calibrated.png/435px-Neptune_Voyager2_color_calibrated.png',
        description: 'Neptune is the eighth and farthest planet from the Sun.',
        mass: '1.024 × 10^26 kg',
        radius: '24,622 km',
        orbit: '165 years',
        temperature: '-218°C (average)',
        atmosphere: 'Hydrogen (80%), Helium (19%), Methane (1%)',
      },
    ],
    moon: {
      name: 'Moon',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/435px-FullMoon2010.jpg',
      description: 'The Moon is Earth\'s only natural satellite.',
      mass: '7.342 × 10^22 kg',
      radius: '1,737.4 km',
      orbit: '27.3 days (around Earth)',
      temperature: '-233°C to 123°C',
      atmosphere: 'Very thin, traces of helium, neon, and argon',
    },
  };

  useEffect(() => {
    const fetchNasaImageOfDay = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=hPMDXfQykh4DKfeHNFDz7zejco621qW9Pov7wfPk`
        );
        setNasaImageOfDay(response.data);
      } catch (error) {
        console.error('Error fetching NASA Image of the Day:', error);
      }
    };

    fetchNasaImageOfDay();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${encodeURIComponent(searchQuery)}`
      );
      const pages = response.data.query.search;
      if (pages.length > 0) {
        const pageId = pages[0].pageid;
        const contentResponse = await axios.get(
          `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&origin=*&pageids=${pageId}`
        );
        const content = contentResponse.data.query.pages[pageId].extract;
        setSearchResults(content);
      } else {
        setSearchResults('No results found. Please try another query.');
      }
    } catch (error) {
      console.error('Error searching Wikipedia:', error);
      setSearchResults('Sorry, I couldn\'t find information about that. Please try another query.');
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-900 text-white">
      <div className="fixed inset-0 z-0">
        <Canvas>
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
        </Canvas>
      </div>

      <div className="relative z-10">
        <ShuffleHero onSearch={handleSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="container mx-auto px-4 py-8">
          {searchResults && (
            <div className="mt-4 p-4 bg-gray-800 bg-opacity-70 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Search Results</h2>
              <p>{searchResults}</p>
            </div>
          )}

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Solar System</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[celestialBodies.sun, ...celestialBodies.planets, celestialBodies.moon].map((body, index) => (
                <CelestialBodyCard key={index} body={body} />
              ))}
            </div>
          </section>

          {nasaImageOfDay && (
            <section>
              <h2 className="text-3xl font-bold mb-4 text-center">NASA Image of the Day</h2>
              <div className="bg-gray-800 bg-opacity-70 rounded-lg overflow-hidden">
                <img src={nasaImageOfDay.url} alt={nasaImageOfDay.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{nasaImageOfDay.title}</h3>
                  <p className="text-sm">{nasaImageOfDay.explanation}</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}