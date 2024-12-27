// import React, { useState } from 'react';
// import { AiOutlineSearch } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';

// const skillsSuggestions = [
//   "JavaScript", "Python", "React", "Node.js", "Java", "SQL", "HTML", "CSS", "C++", "Ruby",
//   "Angular", "Vue.js", "TypeScript", "Docker", "Kubernetes", "GraphQL", "Machine Learning",
//   "AWS", "Azure", "Git", "Swift", "PHP", "Go", "C#", "Scala", "PHP", "SQL", "Linux"
// ];

// const locationSuggestions = [
//   "Mumbai", "Delhi", "New Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad", 
//   "Chandigarh", "Jaipur", "Noida", "Gurgaon", "Kochi", "Kolkata", "Lucknow", "Surat", "Indore",
//   "Bhubaneswar", "Vadodara", "Coimbatore", "Nagpur"
// ];

// function SearchInputBox() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [locationQuery, setLocationQuery] = useState("");
//   const [experienceQuery, setExperienceQuery] = useState("");
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//   const [filteredLocationSuggestions, setFilteredLocationSuggestions] = useState([]);
//   const navigate = useNavigate();

//   const handleSkillInputChange = (event) => {
//     const query = event.target.value;
//     setSearchQuery(query);
//     if (query.length > 0) {
//       const filtered = skillsSuggestions.filter((skill) =>
//         skill.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredSuggestions(filtered);
//     } else {
//       setFilteredSuggestions([]);
//     }
//   };

//   const handleLocationInputChange = (event) => {
//     const query = event.target.value;
//     setLocationQuery(query);
//     if (query.length > 0) {
//       const filtered = locationSuggestions.filter((location) =>
//         location.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredLocationSuggestions(filtered);
//     } else {
//       setFilteredLocationSuggestions([]);
//     }
//   };

//   const handleExperienceChange = (event) => {
//     setExperienceQuery(event.target.value);
//   };

//   const handleSkillSuggestionClick = (suggestion) => {
//     setSearchQuery(suggestion);
//     setFilteredSuggestions([]);
//   };

//   const handleLocationSuggestionClick = (suggestion) => {
//     setLocationQuery(suggestion);
//     setFilteredLocationSuggestions([]);
//   };

//   const handleSearchClick = () => {
//     navigate(`/job-results?search=${searchQuery}&location=${locationQuery}&experience=${experienceQuery}`);
//   };

//   return (
//     <main className="text-center mt-32 px-4 xs:hidden lg:block">
//       <h1 className="text-4xl font-bold text-gray-800">Find your dream job now</h1>
//       <p className="text-gray-600 mt-2">5 lakh+ jobs for you to explore</p>

//       <div className="mt-8 flex justify-center">
//         <div className="flex bg-white shadow-xl rounded-full h-[10vh] 2xl:h-[6vh] w-[60%] items-center border-2">
//           {/* Search Icon */}
//           <div className="flex items-center justify-center px-4 ml-2 text-gray-500">
//             <AiOutlineSearch size={30} />
//           </div>

//           {/* Input for Skills */}
//           <input
//             name="skill-search"
//             value={searchQuery}
//             onChange={handleSkillInputChange}
//             type="text"
//             placeholder="Enter skills"
//             className="flex-1 border-r border-gray-300 focus:outline-none"
//           />

//           {/* Dropdown for Experience */}
//           <select
//             name="experience"
//             value={experienceQuery}
//             onChange={handleExperienceChange}
//             className="px-4 py-4 text-gray-700 focus:outline-none"
//           >
//             <option value="">Select experience</option>
//             <option value="0">Fresher</option>
//             <option value="1">1 year</option>
//             <option value="2">2 years</option>
//             <option value="3">3 years</option>
//             <option value="4">4 years</option>
//             <option value="5">5 years</option>
//           </select>

//           {/* Input for Location */}
//           <input
//             name="location-search"
//             value={locationQuery}
//             onChange={handleLocationInputChange}
//             type="text"
//             placeholder="Enter location"
//             className="flex px-4 ml-2 border-l border-gray-300 focus:outline-none"
//           />

//           {/* Search Button */}
//           <button
//             className="bg-blue-600 text-white font-semibold px-8 py-2 rounded-full mr-5 hover:bg-blue-700"
//             onClick={handleSearchClick}
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Skills Suggestions List */}
//       {filteredSuggestions.length > 0 && (
//         <div className="absolute left-[25%] mt-[1px] bg-white shadow-md rounded-md">
//           <ul className="max-h-48 overflow-y-auto">
//             {filteredSuggestions.map((suggestion, index) => (
//               <li
//                 key={index}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => handleSkillSuggestionClick(suggestion)}
//               >
//                 {suggestion}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Location Suggestions List */}
//       {filteredLocationSuggestions.length > 0 && (
//         <div className="absolute right-[28%] w-[15vw] mt-[1px] bg-white shadow-md rounded-md">
//           <ul className="max-h-48 overflow-y-auto">
//             {filteredLocationSuggestions.map((suggestion, index) => (
//               <li
//                 key={index}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => handleLocationSuggestionClick(suggestion)}
//               >
//                 {suggestion}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </main>
//   );
// }

// export default SearchInputBox;

import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const skillsSuggestions = [
  "JavaScript", "Python", "React", "Node.js", "Java", "SQL", "HTML", "CSS", "C++", "Ruby",
  "Angular", "Vue.js", "TypeScript", "Docker", "Kubernetes", "GraphQL", "Machine Learning",
  "AWS", "Azure", "Git", "Swift", "PHP", "Go", "C#", "Scala", "PHP", "SQL", "Linux"
];

const locationSuggestions = [
  "Mumbai", "Delhi", "New Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad", 
  "Chandigarh", "Jaipur", "Noida", "Gurgaon", "Kochi", "Kolkata", "Lucknow", "Surat", "Indore",
  "Bhubaneswar", "Vadodara", "Coimbatore", "Nagpur"
];

function SearchInputBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [experienceQuery, setExperienceQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [filteredLocationSuggestions, setFilteredLocationSuggestions] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSkillInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = skillsSuggestions.filter((skill) =>
        skill.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleLocationInputChange = (event) => {
    const query = event.target.value;
    setLocationQuery(query);
    if (query.length > 0) {
      const filtered = locationSuggestions.filter((location) =>
        location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocationSuggestions(filtered);
    } else {
      setFilteredLocationSuggestions([]);
    }
  };

  const handleExperienceChange = (event) => {
    setExperienceQuery(event.target.value);
  };

  const handleSkillSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setFilteredSuggestions([]);
  };

  const handleLocationSuggestionClick = (suggestion) => {
    setLocationQuery(suggestion);
    setFilteredLocationSuggestions([]);
  };

  const handleSearchClick = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      setLoading(false); // Hide loader after 2 seconds
      navigate(`/job-results?search=${searchQuery}&location=${locationQuery}&experience=${experienceQuery}`);
    }, 2000); // Simulating a delay (2 seconds)
  };

  return (
    <main className="text-center mt-32 px-4 xs:hidden lg:block">
      <h1 className="text-4xl font-bold text-gray-800">Find your dream job now</h1>
      <p className="text-gray-600 mt-2">5 lakh+ jobs for you to explore</p>

      <div className="mt-8 flex justify-center">
        <div className="flex bg-white shadow-xl rounded-full h-[10vh] 2xl:h-[6vh] w-[60%] items-center border-2">
          {/* Search Icon */}
          <div className="flex items-center justify-center px-4 ml-2 text-gray-500">
            <AiOutlineSearch size={30} />
          </div>

          {/* Input for Skills */}
          <input
            name="skill-search"
            value={searchQuery}
            onChange={handleSkillInputChange}
            type="text"
            placeholder="Enter skills"
            className="flex-1 border-r border-gray-300 focus:outline-none"
          />

          {/* Dropdown for Experience */}
          <select
            name="experience"
            value={experienceQuery}
            onChange={handleExperienceChange}
            className="px-4 py-4 text-gray-700 focus:outline-none"
          >
            <option value="">Select experience</option>
            <option value="0">Fresher</option>
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3 years</option>
            <option value="4">4 years</option>
            <option value="5">5 years</option>
          </select>

          {/* Input for Location */}
          <input
            name="location-search"
            value={locationQuery}
            onChange={handleLocationInputChange}
            type="text"
            placeholder="Enter location"
            className="flex px-4 ml-2 border-l border-gray-300 focus:outline-none"
          />

          {/* Search Button */}
          <button
            className="bg-blue-600 text-white font-semibold px-8 py-2 rounded-full mr-5 hover:bg-blue-700"
            onClick={handleSearchClick}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="loader"></div> // Show the loader
            ) : (
              "Search"
            )}
          </button>
        </div>
      </div>

      {/* Skills Suggestions List */}
      {filteredSuggestions.length > 0 && (
        <div className="absolute left-[25%] mt-[1px] bg-white shadow-md rounded-md">
          <ul className="max-h-48 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSkillSuggestionClick(suggestion)}
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
  );
}

export default SearchInputBox;
