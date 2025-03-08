import React, { useState } from "react";
import { Slider } from "@mui/material";
import { X } from "lucide-react";

const FilterPanel = ({ isOpen, onClose, onApplyFilters, filters, setFilters }) => {
  const [salary, setSalary] = useState(filters.salaryRange || [1200, 20000]);
  const [jobRole, setJobRole] = useState(filters.jobRole || "All Roles");
  const [location, setLocation] = useState(filters.location || "All Locations");
  const [jobType, setJobType] = useState(filters.jobType || "All Types");
  const [industry, setIndustry] = useState(filters.industry || "All Industries");
  const [experience, setExperience] = useState(filters.experience || "All Levels");
  const [companySize, setCompanySize] = useState(filters.companySize || "All Sizes");

  const handleApplyFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      salaryRange: salary,
      jobRole,
      location,
      jobType,
      industry,
      experience,
      companySize,
    }));
    onApplyFilters({
      ...filters,
      salaryRange: salary,
      jobRole,
      location,
      jobType,
      industry,
      experience,
      companySize,
    });
    onClose();
  };

  return (
    <>
      {/* Sidebar Filter Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-gray-900 text-white p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 md:static md:translate-x-0 md:w-full md:flex md:bg-transparent md:p-4 md:rounded-lg`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-300 hover:text-white transition"
          onClick={onClose}
        >
          <X size={28} />
        </button>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row gap-6 bg-gray-900 p-6 lg:rounded-2xl lg:shadow-lg lg:border lg:border-gray-700 w-full">
          <h2 className="text-lg font-semibold text-white tracking-wide md:hidden">Filter Jobs</h2>

          {/* Job Role */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-gray-300 text-sm">Job Role</label>
            <select
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-md text-white shadow-sm focus:ring focus:ring-blue-500 w-full"
            >
              <option>All Roles</option>
              <option>Designer</option>
              <option>Developer</option>
              <option>Manager</option>
              <option>Marketing</option>
              <option>Sales</option>
            </select>
          </div>

          {/* Work Location */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-gray-300 text-sm">Work Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-md text-white shadow-sm focus:ring focus:ring-blue-500 w-full"
            >
              <option>All Locations</option>
              <option>Remote</option>
              <option>On-Site</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Job Type */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-gray-300 text-sm">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-md text-white shadow-sm focus:ring focus:ring-blue-500 w-full"
            >
              <option>All Types</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Freelance</option>
            </select>
          </div>

          {/* Industry */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-gray-300 text-sm">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-md text-white shadow-sm focus:ring focus:ring-blue-500 w-full"
            >
              <option>All Industries</option>
              <option>Tech</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Retail</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-gray-300 text-sm">Experience Level</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-md text-white shadow-sm focus:ring focus:ring-blue-500 w-full"
            >
              <option>All Levels</option>
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
            </select>
          </div>

          {/* Company Size */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-gray-300 text-sm">Company Size</label>
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-4 py-2 rounded-md text-white shadow-sm focus:ring focus:ring-blue-500 w-full"
            >
              <option>All Sizes</option>
              <option>1-10 Employees</option>
              <option>11-50 Employees</option>
              <option>51-200 Employees</option>
              <option>201-1000 Employees</option>
              <option>1000+ Employees</option>
            </select>
          </div>

          {/* Salary Range Slider */}
          <div className="flex flex-col gap-2 px-6 py-2 bg-gray-800 border border-gray-700 rounded-xl shadow-md w-full">
            <label className="text-white text-sm font-semibold">Salary Range</label>
            <Slider
              value={salary}
              onChange={(e, newValue) => setSalary(newValue)}
              valueLabelDisplay="auto"
              min={1200}
              max={20000}
              step={500}
              sx={{
                color: "#3b82f6", // Blue color
                height: 6,
                "& .MuiSlider-track": {
                  backgroundColor: "#2563eb", // Darker blue track
                  height: 6,
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#4b5563", // Gray rail
                  height: 6,
                },
                "& .MuiSlider-thumb": {
                  width: 22,
                  height: 22,
                  backgroundColor: "#3b82f6",
                  border: "3px solid white",
                  boxShadow: "0 0 10px rgba(59,130,246,0.4)",
                  "&:hover": {
                    boxShadow: "0 0 12px rgba(59,130,246,0.7)",
                    transform: "scale(1.1)",
                  },
                  "&:focus, &:active": {
                    boxShadow: "0 0 14px rgba(59,130,246,0.9)",
                  },
                },
              }}
            />
            <div className="flex justify-between text-gray-300 text-sm font-medium mt-1">
              {/* Salary Range Display */}
              <p className="text-white text-sm">
                ₹{Array.isArray(salary) && salary[0] ? salary[0].toLocaleString() : "1,200"} - ₹
                {Array.isArray(salary) && salary[1] ? salary[1].toLocaleString() : "20,000"}
              </p>
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={handleApplyFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 rounded-md shadow-md transition mt-4"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;