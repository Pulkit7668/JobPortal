// import React, { useState } from "react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";

// const JobListing = ({ title, company, location, salary, type, experience, logo }) => {
//   const [isSaved, setIsSaved] = useState(false);

//   const toggleSaveJob = () => {
//     setIsSaved(!isSaved);
//   };

//   return (
//     <div className="relative flex flex-col md:flex-row bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-xl transition-shadow duration-300">
//       {/* Company Logo */}
//       <div className="flex-shrink-0">
//         <img
//           src={logo}
//           alt={`${company} logo`}
//           className="w-16 h-16 rounded-full object-cover"
//         />
//       </div>

//       {/* Job Details */}
//       <div className="flex-grow mt-4 md:mt-0 md:ml-6">
//         <h2 className="text-xl font-bold text-gray-800">{title}</h2>
//         <p className="text-gray-600">{company}</p>
//         <p className="text-gray-500 mt-1">
//           📍 {location} | 💼 {type} | 🕒 {experience}
//         </p>
//         <p className="text-green-600 font-semibold mt-2">💰 {salary}</p>
//       </div>

//       {/* Apply Now Button */}
//       <button className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
//         Apply Now
//       </button>

//       {/* Save Job Icon */}
//       <div
//         onClick={toggleSaveJob}
//         className="absolute top-4 right-4 cursor-pointer text-xl hover:scale-110 transition-transform"
//       >
//         {isSaved ? (
//           <FaHeart className="text-red-500" />
//         ) : (
//           <FaRegHeart className="text-gray-400" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobListing;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import jobData from "./DummyData";

const JobListing = () => {
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
    <div className="container mt-12 mb-10">
      <h1 className="ml-24 mb-4 text-3xl font-bold">Job Opportunities</h1>
      <div className="grid grid-cols-2 gap-5 mx-24">
        <AnimatePresence mode="sync">
          {jobData.slice(0, visibleJobs).map((job) => (
            <motion.div
              key={job.id}
              className="relative flex flex-col md:flex-row bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-xl transition-shadow duration-300"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardAnimation}
              transition={{
                duration: 1,
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
              <button className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
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

export default JobListing;
