import React, { useState } from "react";
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const FilterPanel = ({ isOpen, onClose, onApplyFilters, filters, setFilters }) => {
  const [easyApply, setEasyApply] = useState(filters.easyApply || false);
  const [datePosted, setDatePosted] = useState(filters.datePosted || "anytime");
  const [experienceLevel, setExperienceLevel] = useState(filters.experienceLevel || "All Levels");
  const [jobType, setJobType] = useState(filters.jobType || "All Types");
  const [location, setLocation] = useState(filters.location || "All Locations");
  const [nearbyLocation, setNearbyLocation] = useState(filters.nearbyLocation || "");
  const [industry, setIndustry] = useState(filters.industry || "All Industries");
  const [companySize, setCompanySize] = useState(filters.companySize || "All Sizes");
  
  const [expandedSections, setExpandedSections] = useState({
    easyApply: true,
    datePosted: true,
    experienceLevel: true,
    jobType: true,
    location: true,
    nearbyLocation: true,
    industry: true,
    companySize: true,
  });

  const handleApplyFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      easyApply,
      datePosted,
      experienceLevel,
      jobType,
      location,
      nearbyLocation,
      industry,
      companySize,
    }));
    onApplyFilters({
      ...filters,
      easyApply,
      datePosted,
      experienceLevel,
      jobType,
      location,
      nearbyLocation,
      industry,
      companySize,
    });
    onClose();
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ title, expanded, onToggle, children }) => (
    <div className="mb-4">
      <div 
        className="flex justify-between items-center cursor-pointer py-2 border-b border-gray-700"
        onClick={onToggle}
      >
        <h3 className="text-sm font-semibold text-gray-200">{title}</h3>
        {expanded ? 
          <ChevronUp size={16} className="text-gray-400" /> : 
          <ChevronDown size={16} className="text-gray-400" />
        }
      </div>
      {expanded && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Sidebar Filter Panel */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 border-r border-gray-700 overflow-y-auto transition-transform duration-300 ease-in-out z-40 w-64 md:w-72 mt-16 pb-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-300 hover:text-white transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Filters</h2>

          <FilterSection 
            title="Easy Apply" 
            expanded={expandedSections.easyApply}
            onToggle={() => toggleSection('easyApply')}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id="easyApply"
                checked={easyApply}
                onChange={(e) => setEasyApply(e.target.checked)}
                className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 rounded bg-gray-800"
              />
              <label htmlFor="easyApply" className="ml-2 block text-sm text-gray-300">
                Easy Apply
              </label>
            </div>
          </FilterSection>

          <FilterSection 
            title="Date Posted" 
            expanded={expandedSections.datePosted}
            onToggle={() => toggleSection('datePosted')}
          >
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="anytime"
                  name="datePosted"
                  value="anytime"
                  checked={datePosted === "anytime"}
                  onChange={(e) => setDatePosted(e.target.value)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 bg-gray-800"
                />
                <label htmlFor="anytime" className="ml-2 block text-sm text-gray-300">
                  Anytime
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="pastWeek"
                  name="datePosted"
                  value="past week"
                  checked={datePosted === "past week"}
                  onChange={(e) => setDatePosted(e.target.value)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 bg-gray-800"
                />
                <label htmlFor="pastWeek" className="ml-2 block text-sm text-gray-300">
                  Past Week
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="past24Hours"
                  name="datePosted"
                  value="past 24 hours"
                  checked={datePosted === "past 24 hours"}
                  onChange={(e) => setDatePosted(e.target.value)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 bg-gray-800"
                />
                <label htmlFor="past24Hours" className="ml-2 block text-sm text-gray-300">
                  Past 24 Hours
                </label>
              </div>
            </div>
          </FilterSection>

          <FilterSection 
            title="Experience Level" 
            expanded={expandedSections.experienceLevel}
            onToggle={() => toggleSection('experienceLevel')}
          >
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-200 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 w-full text-sm"
            >
              <option>All Levels</option>
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
              <option>Executive</option>
            </select>
          </FilterSection>

          <FilterSection 
            title="Job Type" 
            expanded={expandedSections.jobType}
            onToggle={() => toggleSection('jobType')}
          >
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-200 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 w-full text-sm"
            >
              <option>All Types</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
              <option>Internship</option>
              <option>Freelance</option>
            </select>
          </FilterSection>

          <FilterSection 
            title="Location" 
            expanded={expandedSections.location}
            onToggle={() => toggleSection('location')}
          >
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-200 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 w-full text-sm"
            >
              <option>All Locations</option>
              <option>Remote</option>
              <option>On-Site</option>
              <option>Hybrid</option>
            </select>
          </FilterSection>

          <FilterSection 
            title="Nearby Location" 
            expanded={expandedSections.nearbyLocation}
            onToggle={() => toggleSection('nearbyLocation')}
          >
            <input
              type="text"
              value={nearbyLocation}
              onChange={(e) => setNearbyLocation(e.target.value)}
              placeholder="Enter location"
              className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-200 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 w-full text-sm placeholder-gray-500"
            />
          </FilterSection>

          <FilterSection 
            title="Industry" 
            expanded={expandedSections.industry}
            onToggle={() => toggleSection('industry')}
          >
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-200 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 w-full text-sm"
            >
              <option>All Industries</option>
              <option>Tech</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Retail</option>
              <option>Manufacturing</option>
            </select>
          </FilterSection>

          <FilterSection 
            title="Company Size" 
            expanded={expandedSections.companySize}
            onToggle={() => toggleSection('companySize')}
          >
            <select
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-200 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 w-full text-sm"
            >
              <option>All Sizes</option>
              <option>1-10 Employees</option>
              <option>11-50 Employees</option>
              <option>51-200 Employees</option>
              <option>201-1000 Employees</option>
              <option>1000+ Employees</option>
            </select>
          </FilterSection>

          {/* Apply Filters Button */}
          <button
            onClick={handleApplyFilters}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md shadow-md transition w-full mt-4"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
