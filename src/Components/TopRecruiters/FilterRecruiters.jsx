import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const FilterRecruiters = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    recruiterName: "",
    industryName: "",
    rating: "",
    isHiring: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filters applied:", filters);
    onClose(); // Close the sidebar after applying filters
  };

  const handleReset = () => {
    setFilters({
      recruiterName: "",
      industryName: "",
      rating: "",
      isHiring: "",
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full md:w-[50%] 2xl:w-[25%] bg-white md:rounded-r-2xl shadow-lg z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xs:w-full lg:w-96 p-5`}
      >
        <div>
          <div className="flex items-center justify-between pb-5">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Filter Recruiters</h3>
            <button
              className="text-gray-500 hover:text-gray-800"
              aria-label="Close sidebar"
              onClick={onClose}
            >
              <FaTimes size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Recruiter Name Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-4">Recruiter Name</label>
              <input
                type="text"
                name="recruiterName"
                value={filters.recruiterName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="Enter recruiter name"
              />
            </div>

            {/* Industry Name Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-4">Industry Name</label>
              <input
                type="text"
                name="industryName"
                value={filters.industryName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                placeholder="Enter industry name"
              />
            </div>

            {/* Ratings Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-4">Ratings</label>
              <select
                name="rating"
                value={filters.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="">Select Rating</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            {/* Currently Hiring Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-4">Currently Hiring</label>
              <select
                name="isHiring"
                value={filters.isHiring}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
              >
                <option value="">Select Option</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between space-x-4">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FilterRecruiters;
