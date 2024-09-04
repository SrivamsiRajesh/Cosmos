"use client";
import React from 'react';

const CelestialBodyCard = ({ body }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
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
      <div className="font-bold text-xl mb-2 text-gray-800">{body.name}</div>
      <p className="text-gray-700 text-base mb-4">{body.description}</p>
      <div className="text-gray-600 text-sm">
        <p className="mb-1"><span className="font-semibold">Mass:</span> {body.mass}</p>
        <p className="mb-1"><span className="font-semibold">Radius:</span> {body.radius}</p>
        <p className="mb-1"><span className="font-semibold">Orbit:</span> {body.orbit}</p>
        <p className="mb-1"><span className="font-semibold">Temperature:</span> {body.temperature}</p>
        <p className="mb-1"><span className="font-semibold">Atmosphere:</span> {body.atmosphere}</p>
      </div>
    </div>
  </div>
);

export default function SolarSystem() {
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

  return (
    <main className="bg-gray-100 min-h-screen py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Solar System</h1>
      
      {/* Sun Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">The Sun</h2>
        <div className="flex justify-center">
          <CelestialBodyCard body={celestialBodies.sun} />
        </div>
      </section>

      {/* Planets Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">The Planets</h2>
        <div className="flex flex-wrap justify-center px-4">
          {celestialBodies.planets.map((planet, index) => (
            <CelestialBodyCard key={index} body={planet} />
          ))}
        </div>
      </section>

      {/* Moon Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">The Moon</h2>
        <div className="flex justify-center">
          <CelestialBodyCard body={celestialBodies.moon} />
        </div>
      </section>
    </main>
  );
}