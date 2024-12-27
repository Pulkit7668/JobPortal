import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CareerGuidancePage = () => {
  const [isAccordionOpen, setAccordionOpen] = useState(null);
  const navigate = useNavigate();

  const handleAccordionClick = (index) => {
    if (isAccordionOpen === index) {
      setAccordionOpen(null);
    } else {
      setAccordionOpen(index);
    }
  };

  return (
    <div className="bg-gray-50 p-6 lg:px-20 lg:py-10">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-12 flex items-center space-x-64"
      >
        <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 mb-10"
        >
            <FaArrowLeft size={40} className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300" />
        </button>
        <div className="text-center"> 
          <h2 className="text-3xl font-bold text-gray-800">Career Guidance</h2>
          <p className="text-lg text-gray-600 mt-2">
            Discover your ideal career path with expert guidance and resources to help you succeed.
          </p>
        </div>
      </motion.section>

      {/* Available Career Paths Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Explore Career Paths</h3>
        <div className="flex space-x-6">
          {/* Career Path Accordion */}
          <div className="bg-white shadow-lg rounded-lg p-4 w-1/3">
            <motion.div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => handleAccordionClick(1)}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-semibold text-gray-800">Software Development</h4>
              <FaArrowRight
                className={`transition-transform transform ${
                  isAccordionOpen === 1 ? "rotate-90" : ""
                }`}
              />
            </motion.div>
            {isAccordionOpen === 1 && (
              <p className="mt-2 text-gray-600">
                Software development offers a wide variety of job opportunities in coding, app development, and system design.
              </p>
            )}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4 w-1/3">
            <motion.div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => handleAccordionClick(2)}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-semibold text-gray-800">Data Science</h4>
              <FaArrowRight
                className={`transition-transform transform ${
                  isAccordionOpen === 2 ? "rotate-90" : ""
                }`}
              />
            </motion.div>
            {isAccordionOpen === 2 && (
              <p className="mt-2 text-gray-600">
                Explore the world of data analysis, machine learning, and artificial intelligence to help businesses make data-driven decisions.
              </p>
            )}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-4 w-1/3">
            <motion.div
              className="cursor-pointer flex justify-between items-center"
              onClick={() => handleAccordionClick(3)}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-semibold text-gray-800">Digital Marketing</h4>
              <FaArrowRight
                className={`transition-transform transform ${
                  isAccordionOpen === 3 ? "rotate-90" : ""
                }`}
              />
            </motion.div>
            {isAccordionOpen === 3 && (
              <p className="mt-2 text-gray-600">
                Digital marketing includes SEO, social media marketing, and content creation, helping businesses grow their online presence.
              </p>
            )}
          </div>
        </div>
      </motion.section>

      {/* Resources Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="p-8 rounded-lg mb-12"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Helpful Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card for Resources */}
          <motion.div
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-semibold text-gray-800">Top Career Tips</h4>
            <p className="text-gray-600 mt-2">
              Learn the essential career tips for success in your chosen field. Stay updated on industry trends and job market insights.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition duration-300">
              Read More <FaArrowRight className="ml-2" />
            </button>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-semibold text-gray-800">Free Online Courses</h4>
            <p className="text-gray-600 mt-2">
              Access a variety of free courses to improve your skills and gain the knowledge needed for your career.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition duration-300">
              Explore Courses <FaArrowRight className="ml-2" />
            </button>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-semibold text-gray-800">Industry Insights</h4>
            <p className="text-gray-600 mt-2">
              Stay informed with the latest trends and insights from various industries to make well-informed career decisions.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition duration-300">
              Get Insights <FaArrowRight className="ml-2" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Get Personal Guidance */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="text-center mb-12"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Get Personal Guidance</h3>
        <p className="text-lg text-gray-600 mb-4">
          Need one-on-one career advice? Fill out the form below, and we will help you navigate your career path.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">What People Say</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Testimonial Cards */}
          <motion.div
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow max-w-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600">
              "The career guidance helped me figure out which field was right for me. The resources provided were extremely helpful!"
            </p>
            <p className="mt-4 font-semibold text-gray-800">John Doe</p>
            <p className="text-gray-500 text-sm">Software Engineer</p>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow max-w-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600">
              "I was able to find an excellent online course and get the career path I wanted. It really made a difference!"
            </p>
            <p className="mt-4 font-semibold text-gray-800">Jane Smith</p>
            <p className="text-gray-500 text-sm">Data Scientist</p>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow max-w-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600">
              "I was unsure of which career to pursue, but the personalized guidance I received really opened my eyes to new possibilities."
            </p>
            <p className="mt-4 font-semibold text-gray-800">Sam Wilson</p>
            <p className="text-gray-500 text-sm">Marketing Professional</p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default CareerGuidancePage;
