import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jobsData from './SearchData';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';

function JobResults() {
  const [jobResults, setJobResults] = useState([]);
  const [favoritedJobs, setFavoritedJobs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');
    const locationQuery = queryParams.get('location');
    const experienceQuery = queryParams.get('experience');

    // Filter job results based on search query (skills), location query, and experience query
    const filteredJobs = jobsData.filter((job) => {
      const matchesSkill = job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchesLocation = locationQuery
        ? job.location.toLowerCase().includes(locationQuery.toLowerCase())
        : true;
      const matchesExperience = experienceQuery
        ? job.experience === parseInt(experienceQuery)
        : true;

      return matchesSkill && matchesLocation && matchesExperience;
    });
    setJobResults(filteredJobs);
  }, [location]);

  const handleFavoriteClick = (jobTitle) => {
    setFavoritedJobs((prevFavorites) => {
      if (prevFavorites.includes(jobTitle)) {
        return prevFavorites.filter((title) => title !== jobTitle);
      } else {
        return [...prevFavorites, jobTitle];
      }
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 mx-10">
      <div className='flex items-center justify-between mr-[45%]'>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-10 transition duration-300 hover:text-blue-800"
          aria-label="Go back"
        >
          <FaArrowLeft
            size={40}
            className="p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
          />
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Job Search</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobResults.length > 0 ? (
          jobResults.map((job, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
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

              {/* Apply and More Details Buttons */}
              <div className="flex items-center justify-end font-semibold">
                <button className="text-blue-700 mr-5">
                  Apply
                </button>
                <button 
                  onClick={() => navigate(`/job-details/${job.title.toLowerCase().replace(/\s+/g, '-')}`)} 
                  className="text-blue-700"
                >
                  More Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No jobs found</p>
        )}
      </div>
    </div>
  );
}

export default JobResults;
