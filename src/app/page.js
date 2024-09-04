import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Image from './components/Image';
import AboutUs from './components/About';
import FAQ from './components/FAQ';

const Home = () => {
  return (
    <main className="bg-[#020617] min-h-screen">
    <Hero className="mb-12" />
    <AboutUs className="mb-12" />
    <Features className="mb-12" />
    <Image className="mb-12" />
    <FAQ />
  </main>
  );
};

export default Home;