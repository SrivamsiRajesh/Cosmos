"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const FAQ = () => {
  const faqs = [
    {
      question: "What can I do on Cosmosile?",
      answer: "Cosmosile offers interactive star maps, space news, virtual tours of celestial bodies, and educational resources about astronomy and space exploration."
    },
    {
      question: "Do I need any special equipment to use Cosmosile?",
      answer: "No special equipment is needed! Cosmosile is designed to be accessible to everyone with an internet connection and a device (computer, tablet, or smartphone)."
    },
    {
      question: "Is Cosmosile suitable for children?",
      answer: "Yes! Cosmosile offers content for all ages, from beginner-friendly explanations to more advanced topics for space enthusiasts of all levels."
    },
    {
      question: "How often is the content updated?",
      answer: "Our space news feed is updated daily, while our educational content and virtual tours are regularly expanded and improved."
    },
    {
      question: "Can I contribute to Cosmosile?",
      answer: "We welcome contributions from space enthusiasts! Contact us to learn about opportunities to share your knowledge or astrophotography."
    }
  ];

  return (
    <section
      className="relative w-full px-6 pb-8 -mt-1 overflow-hidden"
      style={{
        background: "#020617",
      }}
    >
      {/* Starry Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas>
          <Stars radius={50} count={5000} factor={4} fade speed={2} />
        </Canvas>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="flex flex-col items-center">
          <h2 className="mt-5 text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
          {faqs.map((faq, index) => (
            <div className="py-5" key={index}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-white">
                  <span>{faq.question}</span>
                  <span className="transition">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-gray-200">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;