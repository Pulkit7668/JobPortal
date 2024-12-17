import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import jobsData from "../../apis/SearchData";

function SearchPage() {
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobResults, setJobResults] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [favoritedJobs, setFavoritedJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!skill && !experience && !location) {
      setJobResults([]);
    }
  }, [skill, experience, location]);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Searching with: ", { skill, experience, location });

      const filteredJobs = jobsData.filter((job) => {
        const matchesSkill = job.skills.some((skillItem) =>
          skillItem.toLowerCase().includes(skill.toLowerCase())
        );
        const matchesLocation = location
          ? job.location.toLowerCase().includes(location.toLowerCase())
          : true;
        const matchesExperience = experience
          ? job.experience === parseInt(experience)
          : true;

        return matchesSkill && matchesLocation && matchesExperience;
      });

      setJobResults(filteredJobs);
      setLoading(false);
    }, 1000);
  };

  const handleClear = () => {
    setSkill("");
    setExperience("");
    setLocation("");
    setJobResults([]);
    setSelectedJob(null);
  };

  const handleFavoriteClick = (jobTitle) => {
    setFavoritedJobs((prevFavorites) => {
      if (prevFavorites.includes(jobTitle)) {
        return prevFavorites.filter((title) => title !== jobTitle);
      } else {
        return [...prevFavorites, jobTitle];
      }
    });
  };

  const handleMoreDetails = (job) => {
    setSelectedJob(selectedJob === job ? null : job);
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
            className="w-40 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option className="text-black font-semibold" value="">Select experience</option>
            <option className="text-black font-semibold" value="0">Fresher</option>
            <option className="text-black font-semibold" value="1">1 year</option>
            <option className="text-black font-semibold" value="2">2 years</option>
            <option className="text-black font-semibold" value="3">3 years</option>
            <option className="text-black font-semibold" value="4">4 years</option>
            <option className="text-black font-semibold" value="5">5 years</option>
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

      {/* Results Section */}
      {loading && (
        <div className="mt-6 text-center text-gray-500">
          <p>Searching for jobs...</p>
        </div>
      )}

      {jobResults.length > 0 && (
        <motion.div
          className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {jobResults.map((job, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Heart Icon for Favorite */}
              <div
                onClick={() => handleFavoriteClick(job.title)}
                className="absolute top-5 right-5 cursor-pointer"
              >
                {favoritedJobs.includes(job.title) ? (
                  <FaHeart size={24} className="text-red-500" />
                ) : (
                  <FaRegHeart size={24} className="text-gray-500" />
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">{job.title}</h3>
              <p className="text-gray-600 mb-2"><strong>Skills:</strong> {job.skills.join(', ')}</p>
              <p className="text-gray-600 mb-2"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-600 mb-4"><strong>Experience:</strong> {job.experience} years</p>

              {/* Apply Button */}
              <motion.button
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md transition duration-300 hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>

              {/* More Details Button */}
              <motion.button
                onClick={() => handleMoreDetails(job)}
                className="mt-3 ml-5 text-blue-600 font-semibold hover:underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedJob === job ? "Hide Details" : "More Details"}
              </motion.button>

              {/* Job Details */}
              {selectedJob === job && (
                <motion.div
                  className="mt-4 text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <p><strong>Description:</strong> {job.description}</p>
                  <p><strong>Salary:</strong> {job.salary}</p>
                  <p><strong>Company:</strong> {job.company}</p>
                  <p><strong>Job Type:</strong> {job.jobType}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {jobResults.length === 0 && !loading && (
        <div className="mt-6 text-center text-gray-500">
          <p>No jobs found. Try refining your search.</p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
