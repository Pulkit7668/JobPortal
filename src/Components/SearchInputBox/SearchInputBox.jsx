import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

// Expanded job suggestions list
const jobSuggestions = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "Graphic Designer",
  "Marketing Specialist",
  "Sales Manager",
  "Business Analyst", 
  "HR Manager",
  "Project Manager",
  "Quality Assurance Engineer",
  "Business Development Executive",
  "Full Stack Developer",
  "Android Developer",
  "iOS Developer",
  "Web Developer",
  "Cloud Engineer",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "AI Specialist",
  "Data Analyst",
  "Content Writer",
  "SEO Specialist",
  "Network Administrator",
  "System Administrator",
  "Digital Marketing Manager",
  "Financial Analyst",
  "Software Tester",
  "Video Editor",
  "Social Media Manager",
  "Operations Manager",
  "Account Manager",
  "Technical Support Engineer",
  "Database Administrator",
  "Salesforce Developer",
  "Cyber Security Specialist",
  "Blockchain Developer",
  "Product Designer",
  "Customer Support Executive",
  "Game Developer",
  "AR/VR Developer",
  "E-commerce Manager",
  "Cloud Solutions Architect",
  "SAP Consultant",
];

// Location suggestions specifically for cities in India
const locationSuggestions = [
  "New Delhi",
  "Mumbai",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Surat",
  "Noida",
  "Lucknow",
  "Indore",
  "Patna",
  "Bhopal",
  "Visakhapatnam",
  "Vadodara",
  "Coimbatore",
  "Nagpur",
];
function SearchInputBox() {
    const [searchQuery, setSearchQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [filteredLocationSuggestions, setFilteredLocationSuggestions] = useState([]);
  
    // Handle input change and filter job suggestions
    const handleJobInputChange = (event) => {
      const query = event.target.value;
      setSearchQuery(query);
  
      // Filter job suggestions based on the query
      if (query.length > 0) {
        const filtered = jobSuggestions.filter((job) =>
          job.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSuggestions(filtered);
      } else {
        setFilteredSuggestions([]);
      }
    };
  
    // Handle location input change and filter location suggestions
    const handleLocationInputChange = (event) => {
      const query = event.target.value;
      setLocationQuery(query);
  
      // Filter location suggestions based on the query
      if (query.length > 0) {
        const filtered = locationSuggestions.filter((location) =>
          location.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredLocationSuggestions(filtered);
      } else {
        setFilteredLocationSuggestions([]);
      }
    };
  
    // Handle suggestion click for job
    const handleJobSuggestionClick = (suggestion) => {
      setSearchQuery(suggestion);
      setFilteredSuggestions([]);
    };
  
    // Handle suggestion click for location
    const handleLocationSuggestionClick = (suggestion) => {
      setLocationQuery(suggestion);
      setFilteredLocationSuggestions([]);
    };
  
    return (
        <>
        {/* Hero Section */}
        <main className="text-center mt-32 px-4">
          <h1 className="text-4xl font-bold text-gray-800">Find your dream job now</h1>
          <p className="text-gray-600 mt-2">5 lakh+ jobs for you to explore</p>
  
          {/* Search Bar */}
          <div className="mt-8 flex justify-center">
            <div className="flex bg-white shadow-xl rounded-full h-[10vh] w-[60%] items-center border-2">
              {/* Search Icon */}
              <div className="flex items-center justify-center px-4 ml-2 text-gray-500">
                <AiOutlineSearch size={30} />
              </div>
  
              {/* Input for Skills */}
              <input
                value={searchQuery}
                onChange={handleJobInputChange}
                type="text"
                placeholder="Enter skills / designations / companies"
                className="flex-1 border-r border-gray-300 focus:outline-none"
              />
  
              {/* Dropdown for Experience */}
              <select
                className="px-4 py-4 text-gray-700 focus:outline-none"
              >
                <option className='text-black font-semibold' value="">Select experience</option>
                <option className='text-black font-semibold' value="0">Fresher</option>
                <option className='text-black font-semibold' value="1">1 years</option>
                <option className='text-black font-semibold' value="2">2 years</option>
                <option className='text-black font-semibold' value="3">3 years</option>
                <option className='text-black font-semibold' value="4">4 years</option>
                <option className='text-black font-semibold' value="5">5 years</option>
              </select>
  
              {/* Input for Location */}
              <input
                value={locationQuery}
                onChange={handleLocationInputChange}
                type="text"
                placeholder="Enter location"
                className="flex px-4 ml-2 border-l border-gray-300 focus:outline-none"
              />
  
              {/* Search Button */}
              <button className="bg-blue-600 text-white font-semibold px-8 py-2 rounded-full mr-5 hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>
  
          {/* Job Suggestions List */}
          {filteredSuggestions.length > 0 && (
            <div className="absolute left-[25%] mt-[1px] bg-white shadow-md rounded-md">
              <ul className="max-h-48 overflow-y-auto">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleJobSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
  
          {/* Location Suggestions List */}
          {filteredLocationSuggestions.length > 0 && (
            <div className="absolute right-[28%] w-[15vw] mt-[1px] bg-white shadow-md rounded-md">
              <ul className="max-h-48 overflow-y-auto">
                {filteredLocationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
        </>
    );
}

export default SearchInputBox