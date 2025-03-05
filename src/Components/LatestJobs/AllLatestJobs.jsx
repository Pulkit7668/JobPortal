import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Filter } from 'lucide-react';
import jobData from "./LatestJobData";
import TogglePage from "../TogglePage/TogglePage";
import FilterPanel from "../FilterPanel";

const AllLatestJobs = () => {
  const navigate = useNavigate();
  const [isTogglePageOpen, setIsTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    salaryRange: "Any",
    skills: [],
  });
  
  const [filteredJobs, setFilteredJobs] = useState(jobData);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  // Apply filters to jobs
  const applyFilters = useCallback((filterOptions) => {
    let result = [...jobData];
    
    // Filter by job type if any selected
    if (filterOptions.jobType.length > 0) {
      result = result.filter(job => 
        filterOptions.jobType.some(type => 
          job.type?.toLowerCase().includes(type.toLowerCase())
        )
      );
    }
    
    // Filter by experience level if any selected
    if (filterOptions.experienceLevel.length > 0) {
      result = result.filter(job => 
        filterOptions.experienceLevel.some(level => {
          if (level === "Entry Level" && job.experience.includes("0-2")) return true;
          if (level === "Mid Level" && job.experience.includes("3-5")) return true;
          if (level === "Senior" && job.experience.includes("5+")) return true;
          if (level === "Executive" && job.experience.includes("10+")) return true;
          return false;
        })
      );
    }
    
    // Filter by salary range if not "Any"
    if (filterOptions.salaryRange !== "Any") {
      result = result.filter(job => {
        const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ''));
        
        if (filterOptions.salaryRange === "0-30,000") {
          return jobSalary <= 30000;
        } else if (filterOptions.salaryRange === "30,000-60,000") {
          return jobSalary > 30000 && jobSalary <= 60000;
        } else if (filterOptions.salaryRange === "60,000-90,000") {
          return jobSalary > 60000 && jobSalary <= 90000;
        } else if (filterOptions.salaryRange === "90,000+") {
          return jobSalary > 90000;
        }
        return true;
      });
    }
    
    // Filter by skills if any selected
    if (filterOptions.skills.length > 0) {
      result = result.filter(job => 
        filterOptions.skills.some(skill => 
          job.skills.some((jobSkill) => 
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }
    
    setFilteredJobs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // Total number of pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setIsTogglePageOpen(true);
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Apply filters when they change
  useEffect(() => {
    applyFilters(filters);
  }, [filters, applyFilters]);

  return (
    <div className="mt-12 mb-10 xs:mx-5 relative">
      {/* Filter Panel */}
      <FilterPanel 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={applyFilters}
        filters={filters}
        setFilters={setFilters}
      />
      
      {/* Overlay when filter is open */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
      
      <div className="flex items-center justify-between mb-8 md:ml-10 lg:ml-20 md:mr-10 lg:mr-28">
        <div className="flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 mr-4"
        >
          <FaArrowLeft size={40} className="p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300" />
        </button>
        <h1 className="xs:text-2xl xs:font-extrabold md:text-3xl md:font-bold text-gray-800">All Latest Jobs</h1>
        </div>
        
        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="ml-4 flex items-center border border-black rounded-xl p-2 text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          <Filter size={24} className="mr-1" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* Active Filters Display */}
      {(filters.jobType.length > 0 || 
        filters.experienceLevel.length > 0 || 
        filters.salaryRange !== "Any" || 
        filters.skills.length > 0) && (
        <div className="flex flex-wrap gap-2 md:mx-10 lg:mx-24 mb-4">
          {filters.jobType.map(type => (
            <span key={type} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {type}
            </span>
          ))}
          {filters.experienceLevel.map(level => (
            <span key={level} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {level}
            </span>
          ))}
          {filters.salaryRange !== "Any" && (
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              {filters.salaryRange}
            </span>
          )}
          {filters.skills.map(skill => (
            <span key={skill} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
          <button 
            onClick={() => setFilters({
              jobType: [],
              experienceLevel: [],
              salaryRange: "Any",
              skills: [],
            })}
            className="text-red-600 hover:text-red-800 text-sm underline"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Job Listings */}
      <div className="grid lg:grid-cols-4 xs:grid-cols-1 gap-5 md:mx-10 lg:mx-24">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col bg-white rounded-xl shadow-md p-2 mb-4 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500">
                  {job.location}
                </p>
                <p className="text-xs text-gray-600">
                  Experience: <strong>{job.experience}</strong>
                </p>
                <p className="text-xs text-gray-600">
                  Salary: <strong>{job.salary}</strong>
                </p>
                <span className="text-xs text-gray-600">
                  Skills: <strong>{job.skills.join(", ")}</strong>
                </span>
              </div>

              {/* Buttons Container */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleApplyNow(job)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mb-2 w-full"
                >
                  Apply Now
                </button>
                <button className="text-blue-700 font-semibold w-full">
                  <Link
                    to={`/latest/job/${job.id}`}
                    className="px-3 py-2 text-sm font-semibold text-blue-700"
                  >
                    More Details
                  </Link>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-xl text-gray-600">No jobs match your filter criteria</p>
            <button 
              onClick={() => setFilters({
                jobType: [],
                experienceLevel: [],
                salaryRange: "Any",
                skills: [],
              })}
              className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredJobs.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
          >
            <FaChevronLeft size={12} />
          </button>
          <span className="px-4 py-2 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      )}

      {/* Toggle Page */}
      {isTogglePageOpen && (
        <TogglePage
          jobTitle={selectedJob?.title}
          onClose={() => setIsTogglePageOpen(false)}
        />
      )}
    </div>
  );
};

export default AllLatestJobs;
