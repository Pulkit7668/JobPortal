// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";

// function Searchpage() {
//   const [skill, setSkill] = useState("");
//   const [experience, setExperience] = useState("");
//   const [location, setLocation] = useState("");

//   const navigate = useNavigate();

//   const handleSearch = () => {
//     // Handle the search logic here (e.g., filter jobs or display search results)
//     console.log("Searching with: ", { skill, experience, location });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="text-blue-600 mb-10 transition duration-300"
//         aria-label="Go back"
//       >
//         <FaArrowLeft
//           size={40}
//           className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
//         />
//       </button>
//       <h2 className="text-2xl font-semibold mb-4">Search for Jobs</h2>
//       <form>
//         <div className="mb-4">
//           <label htmlFor="skill" className="block text-sm font-medium text-gray-700">
//             Skill
//           </label>
//           <input
//             id="skill"
//             type="text"
//             value={skill}
//             onChange={(e) => setSkill(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md"
//             placeholder="Enter skill"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
//             Experience
//           </label>
//           <input
//             id="experience"
//             type="text"
//             value={experience}
//             onChange={(e) => setExperience(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md"
//             placeholder="Enter experience level"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="location" className="block text-sm font-medium text-gray-700">
//             Location
//           </label>
//           <input
//             id="location"
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md"
//             placeholder="Enter location"
//           />
//         </div>

//         <div className="text-center">
//           <button
//             type="button"
//             onClick={handleSearch}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md"
//           >
//             Search
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Searchpage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";

// function SearchPage() {
//   const [skill, setSkill] = useState("");
//   const [experience, setExperience] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSearch = () => {
//     // Start loading state
//     setLoading(true);

//     // Simulate a search action (you can integrate API calls or filter logic)
//     setTimeout(() => {
//       console.log("Searching with: ", { skill, experience, location });
//       // Stop loading after search
//       setLoading(false);
//     }, 1000); // Simulate a delay
//   };

//   const handleClear = () => {
//     setSkill("");
//     setExperience("");
//     setLocation("");
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="text-blue-600 mb-10 transition duration-300"
//         aria-label="Go back"
//       >
//         <FaArrowLeft
//           size={40}
//           className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
//         />
//       </button>
//       <h2 className="text-2xl font-semibold mb-4">Search for Jobs</h2>

//       {/* Search Form */}
//       <form>
//         {/* Skill Input */}
//         <div className="mb-5">
//           <label htmlFor="skill" className="block mb-2 text-sm font-medium text-gray-700">
//           Skills / Designations / Companies
//           </label>
//           <input
//             id="skill"
//             type="text"
//             value={skill}
//             onChange={(e) => setSkill(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//             placeholder="Enter skills / designations / companies"
//           />
//         </div>

//         {/* Experience Input */}
//         <div className="mb-5">
//           <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-700">
//             Experience Level
//           </label>
//           <select
//             id="experience"
//             value={experience}
//             onChange={(e) => setExperience(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//           >
//             <option className='text-black font-semibold' value="">Select experience</option>
//             <option className='text-black font-semibold' value="0">Fresher</option>
//             <option className='text-black font-semibold' value="1">1 years</option>
//             <option className='text-black font-semibold' value="2">2 years</option>
//             <option className='text-black font-semibold' value="3">3 years</option>
//             <option className='text-black font-semibold' value="4">4 years</option>
//             <option className='text-black font-semibold' value="5">5 years</option>
//           </select>
//         </div>

//         {/* Location Input */}
//         <div className="mb-5">
//           <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700">
//             Location
//           </label>
//           <input
//             id="location"
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
//             placeholder="Enter location"
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="text-center">
//           <button
//             type="button"
//             onClick={handleSearch}
//             className={`bg-blue-600 text-white px-6 py-2 rounded-md ${
//               loading ? "cursor-wait opacity-50" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Searching..." : "Search"}
//           </button>
//           <button
//             type="button"
//             onClick={handleClear}
//             className="ml-4 text-blue-600 px-6 py-2 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-300"
//           >
//             Clear
//           </button>
//         </div>
//       </form>

//       {/* Suggestion/Results Section */}
//       {loading && (
//         <div className="mt-6 text-center text-gray-500">
//           <p>Searching for jobs...</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function SearchPage() {
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    // Start loading state
    setLoading(true);

    // Simulate a search action (you can integrate API calls or filter logic)
    setTimeout(() => {
      console.log("Searching with: ", { skill, experience, location });
      // Stop loading after search
      setLoading(false);
    }, 1000); // Simulate a delay
  };

  const handleClear = () => {
    setSkill("");
    setExperience("");
    setLocation("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-10 transition duration-300"
        aria-label="Go back"
      >
        <FaArrowLeft
          size={40}
          className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
        />
      </button>
      <h2 className="text-2xl font-semibold mb-4">Search for Jobs</h2>

      {/* Search Form */}
      <form>
        {/* Skill Input */}
        <div className="mb-5">
          <label htmlFor="skill" className="block mb-2 font-medium text-gray-700">
            Skills / Designations / Companies
          </label>
          <input
            id="skill"
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter skills / designations / companies"
          />
        </div>

        {/* Experience Input */}
        <div className="mb-5">
          <label htmlFor="experience" className="block mb-2 font-medium text-gray-700">
            Experience Level
          </label>
          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-40  py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option className='text-black font-semibold' value="">Select experience</option>
            <option className='text-black font-semibold' value="0">Fresher</option>
            <option className='text-black font-semibold' value="1">1 years</option>
            <option className='text-black font-semibold' value="2">2 years</option>
            <option className='text-black font-semibold' value="3">3 years</option>
            <option className='text-black font-semibold' value="4">4 years</option>
            <option className='text-black font-semibold' value="5">5 years</option>
          </select>
        </div>

        {/* Location Input */}
        <div className="mb-5">
          <label htmlFor="location" className="block mb-2 font-medium text-gray-700">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter location"
          />
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleSearch}
            className={`bg-blue-600 text-white px-6 py-2 rounded-md ${loading ? "cursor-wait opacity-50" : ""}`}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="ml-4 text-blue-600 px-6 py-2 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Suggestion/Results Section */}
      {loading && (
        <div className="mt-6 text-center text-gray-500">
          <p>Searching for jobs...</p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
