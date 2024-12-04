import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const JobListing = ({ title, company, location, salary, type, experience, logo }) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="relative flex flex-col md:flex-row bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-xl transition-shadow duration-300">
      {/* Company Logo */}
      <div className="flex-shrink-0">
        <img
          src={logo}
          alt={`${company} logo`}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>

      {/* Job Details */}
      <div className="flex-grow mt-4 md:mt-0 md:ml-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{company}</p>
        <p className="text-gray-500 mt-1">
          📍 {location} | 💼 {type} | 🕒 {experience}
        </p>
        <p className="text-green-600 font-semibold mt-2">💰 {salary}</p>
      </div>

      {/* Apply Now Button */}
      <button className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
        Apply Now
      </button>

      {/* Save Job Icon */}
      <div
        onClick={toggleSaveJob}
        className="absolute top-4 right-4 cursor-pointer text-xl hover:scale-110 transition-transform"
      >
        {isSaved ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default JobListing;

