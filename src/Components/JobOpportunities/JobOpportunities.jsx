import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import jobData from "./JobOpportunitiesData";

const JobOpportunities = () => {
  const [visibleJobs, setVisibleJobs] = useState(2);
  const [isSaved, setIsSaved] = useState({});

  const toggleSaveJob = (id) => {
    setIsSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Animation variants for the job card
  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleViewMore = () => {
    setVisibleJobs((prev) => Math.min(prev + 2, jobData.length));
  };

  const handleViewLess = () => {
    setVisibleJobs((prev) => Math.max(prev - 10, 2));
  };

  return (
    <div className="mt-12 mb-10 xs:mx-5">
      <h1 className="md:ml-10 lg:ml-24 mb-4 text-3xl font-bold">Job Opportunities</h1>
      <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-5 md:mx-10 lg:mx-24">
        <AnimatePresence mode="sync">
          {jobData.slice(0, visibleJobs).map((job) => (
            <motion.div
              key={job.id}
              className="relative flex xs:flex-col md:flex-row bg-white rounded-xl shadow-md p-4 mb-4 hover:shadow-xl transition-shadow duration-300"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardAnimation}
              transition={{
                duration: 0.3 ,
                ease: "easeOut",
              }}
            >
              <div className="flex-shrink-0">
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <div className="flex-grow mt-4 md:mt-0 md:ml-6">
                <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500 mt-1">
                  📍 {job.location} | 💼 {job.type} | 🕒 {job.experience}
                </p>
                <p className="text-green-600 font-semibold mt-2">
                  💰 {job.salary}
                </p>
              </div>
              <button className="md:absolute md:bottom-4 xs:right-2 md:right-4 xs:mt-5 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Apply Now
              </button>
              <div
                onClick={() => toggleSaveJob(job.id)}
                className="absolute top-4 right-4 cursor-pointer text-xl hover:scale-110 transition-transform"
              >
                {isSaved[job.id] ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-400" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-4">
        {visibleJobs < jobData.length && (
          <button
            onClick={handleViewMore}
            className="mt-5 px-4 py-2 font-semibold text-black border border-black rounded-xl hover:bg-white transition duration-300"
          >
            View More
          </button>
        )}
        {visibleJobs > 2 && (
          <button
            onClick={handleViewLess}
            className="mt-5 px-4 py-2 font-semibold text-black border border-black rounded-xl hover:bg-white transition duration-300"
          >
            View Less
          </button>
        )}
      </div>
    </div>
  );
};

export default JobOpportunities;