"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const Rocket = ({ position }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0];
      meshRef.current.position.y = position[1];
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], position[1], 0]}>
      <coneGeometry args={[0.5, 1.5, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

const Asteroid = ({ position, onCollision }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y -= 0.05;
      if (meshRef.current.position.y < -15) {
        onCollision();
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], position[1], 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

const RocketDodge = () => {
  const [rocketPosition, setRocketPosition] = useState([0, -10]);
  const [asteroids, setAsteroids] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setRocketPosition([Math.max(-10, rocketPosition[0] - 0.5), rocketPosition[1]]);
      } else if (e.key === 'ArrowRight') {
        setRocketPosition([Math.min(10, rocketPosition[0] + 0.5), rocketPosition[1]]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rocketPosition]);

  useFrame(() => {
    if (!gameOver) {
      setScore(prevScore => prevScore + 1);

      if (Math.random() < 0.02) {
        setAsteroids(prevAsteroids => [
          ...prevAsteroids,
          { id: Date.now(), position: [Math.random() * 20 - 10, 15] }
        ]);
      }

      setAsteroids(prevAsteroids =>
        prevAsteroids.filter(asteroid => {
          const dx = asteroid.position[0] - rocketPosition[0];
          const dy = asteroid.position[1] - rocketPosition[1];
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 1) {
            setGameOver(true);
            return false;
          }

          return asteroid.position[1] > -15;
        })
      );
    }
  });

  const restartGame = () => {
    setRocketPosition([0, -10]);
    setAsteroids([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="relative w-full h-screen">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} style={{ height: "100vh", width: "100vw" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <Rocket position={rocketPosition} />
        {asteroids.map(asteroid => (
          <Asteroid key={asteroid.id} position={asteroid.position} onCollision={() => {}} />
        ))}
      </Canvas>

      {/* Back button */}
      <div className="absolute top-4 left-4 text-white">
        <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
          <FaArrowLeft size={24} />
        </Link>
      </div>

      {/* Score display */}
      <div className="absolute top-4 right-4 text-white text-2xl">
        Score: {score}
      </div>

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Game Over</h2>
            <p className="text-2xl mb-4">Final Score: {score}</p>
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RocketDodge;