import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { FiArrowUpLeft } from "react-icons/fi";

const SearchPage = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const suggestedRoles = [
    "Back End Developer",
    "Full Stack Engineer",
    "Frontend Engineer",
    "Mobile Engineer",
    "iOS Developer"
  ];

  return (
    <>
    {isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      ></div>
    )}
    <div
      className={`fixed top-0 right-0 h-full md:w-[50%] 2xl:w-[25%] bg-gray-900 md:rounded-l-3xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} xs:w-full lg:w-96`}
    >
    <div className="text-white flex flex-col items-center p-6">
      {/* Heading with Close Icon */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Job Search</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FaTimes size={20} />
        </button>
      </div>
      {/* Search Bar */}
      <div className="w-full max-w-2xl p-2 flex items-center gap-3 border-b-2 border-gray-600 focus-within:border-white transition-all duration-300">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-lg"
          placeholder="Search by title, skill, or company"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Location */}
      <div className="w-full max-w-2xl p-2 flex items-center gap-3 mt-4 border-b-2 border-gray-600 focus-within:border-white transition-all duration-300">
        <FaMapMarkerAlt className="text-gray-400" />
        <input
          type="text"
          placeholder="Enter Location"
          className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-lg"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Suggested Searches */}
      <div className="w-full max-w-2xl mt-6">
        <p className="text-gray-400 mb-3">Try searching for</p>
        <ul>
          {suggestedRoles.map((role, index) => (
            <li key={index} className="flex items-center justify-between gap-3 py-2 cursor-pointer hover:text-blue-400">
              <div className="flex items-center gap-3">
                <FaSearch className="text-gray-400" />
                <span>{role}</span>
              </div>
              <FiArrowUpLeft size={20} className="text-gray-400 font-bold" />
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    </>
  );
};

export default SearchPage;
