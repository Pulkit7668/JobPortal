import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jobsData from './SearchData';
import { FaArrowLeft, FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TogglePage from "../TogglePage/TogglePage";

function JobResults() {
  const [jobResults, setJobResults] = useState([]);
  const [favoritedJobs, setFavoritedJobs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // Display 6 jobs per page
  
  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  // Calculate the number of pages
  const totalPages = Math.ceil(jobResults.length / jobsPerPage);

  // Get jobs for the current page
  const currentJobs = jobResults.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
        {currentJobs.length > 0 ? (
          currentJobs.map((job, index) => (
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
                <button onClick={() => handleApplyNow(job)} className="text-blue-700 mr-5">
                  Apply Now
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

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-5 mt-10">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1} 
          className="text-blue-600 disabled:text-gray-400"
        >
          <FaChevronLeft size={30} />
        </button>

        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className="text-blue-600 disabled:text-gray-400"
        >
          <FaChevronRight size={30} />
        </button>
      </div>

      {/* Toggle Page */}
      {isTogglePageOpen && (
        <TogglePage jobTitle={selectedJob?.title} onClose={() => setISTogglePageOpen(false)} />
      )}
    </div>
  );
}

export default JobResults;
