"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FiCheckSquare, FiX, FiCalendar } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Link from 'next/link';

const SlideInNotifications = ({ notifications, setNotifications }) => {
  const removeNotif = (id) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  return (
    <div className="flex flex-col gap-1 w-72 fixed top-2 right-2 z-50 pointer-events-none">
      <AnimatePresence>
        {notifications.map((n) => (
          <Notification removeNotif={removeNotif} {...n} key={n.id} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, removeNotif }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, []);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto"
    >
      <FiCheckSquare className="mt-0.5" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

const EventForm = ({ addNotification }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    eventDate: Yup.string().required("Event date and time is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", eventDate: "", description: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to submit form');
          }

          const data = await response.json();
          console.log('Success:', data);
          resetForm();
          addNotification("Event submitted successfully!");
        } catch (error) {
          console.error('Error:', error);
          addNotification(`Error submitting event: ${error.message}`);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white/80 shadow-lg rounded-lg p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-1">Name</label>
            <Field
              type="text"
              name="name"
              placeholder="Enter your name here"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-1">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Enter your email here"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="eventDate" className="block text-lg font-medium mb-1 flex items-center">
              Date and Time <FiCalendar className="ml-2" />
            </label>
            <Field
              type="datetime-local"
              name="eventDate"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
            <ErrorMessage name="eventDate" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium mb-1">Description</label>
            <Field
              as="textarea"
              name="description"
              rows="4"
              placeholder="Enter a brief description of the event"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          <Link href="/community-spaces" className="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 inline-block text-center">
            Check Out Community Spaces
          </Link>
        </Form>
      )}
    </Formik>
  );
};

const Gaze = () => {
  const [gradientDeg, setGradientDeg] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientDeg((prev) => (prev + 1) % 360);
    }, 50);

    const script = document.createElement('script');
    script.src = "https://nightsky.jpl.nasa.gov/js/nsn_search_widget.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.nsn_search_widget) {
        window.nsn_search_widget.init("nsn", {});
      }
    };

    return () => {
      clearInterval(interval);
      document.body.removeChild(script);
    };
  }, []);

  const addNotification = (text) => {
    const newNotif = {
      id: Math.random(),
      text: text,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const gradientStyle = {
    background: `linear-gradient(${gradientDeg}deg, #ff00ff, #00ffff, #ff00ff)`,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mx-auto my-8 max-w-7xl">
      <div className="bg-white/80 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Local Astronomy Events
        </h2>
        <div id="nsn" className="bg-gray-100 p-4 rounded-lg min-h-[350px]">
          {/* The NSN widget will be inserted here */}
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

      <div className="rounded-lg overflow-hidden" style={gradientStyle}>
        <div className="bg-black/70 p-6 h-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            Add Your Community Space Meeting
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Share your astronomy event with the community. Fill out the form below to add your meeting to our list of community spaces.
          </p>
          <EventForm addNotification={addNotification} />
        </div>
      </div>
      <SlideInNotifications notifications={notifications} setNotifications={setNotifications} />
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={5000} factor={4} fade speed={2} />
        </Canvas>
      </div>
      <main className="relative z-10 pt-24">
        <Gaze />
      </main>
    </div>
  );
};

export default App;