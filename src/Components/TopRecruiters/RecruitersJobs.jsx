import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recruitersData } from "./recruitersData";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import TogglePage from "../TogglePage/TogglePage";
import FilterPanel from "../FilterPanel";
import { Filter } from "lucide-react";

function RecruitersJob() {
  const { recruiterId } = useParams();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Find recruiter data
  const recruiter = recruitersData.find((r) => r.id === parseInt(recruiterId));

  // Get initial jobs for the recruiter
  const initialJobs = recruiter ? recruiter.jobs : [];

  // Filter states
  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    salaryRange: [],
    skills: [],
  });

  const [filteredJobs, setFilteredJobs] = useState(initialJobs);

  // Apply filters to jobs
  const applyFilters = useCallback(
    (filterOptions) => {
      let result = recruiter ? [...recruiter.jobs] : [];

      // Filter by job type if any selected
      if (filterOptions.jobType.length > 0) {
        result = result.filter((job) =>
          filterOptions.jobType.some((type) => job.type?.toLowerCase().includes(type.toLowerCase()))
        );
      }

      // Filter by experience level if any selected
      if (filterOptions.experienceLevel.length > 0) {
        result = result.filter((job) =>
          filterOptions.experienceLevel.some((level) => {
            if (level === "Entry Level" && job.experience.includes("0-2")) return true;
            if (level === "Mid Level" && job.experience.includes("3-5")) return true;
            if (level === "Senior" && job.experience.includes("5+")) return true;
            if (level === "Executive" && job.experience.includes("10+")) return true;
            return false;
          })
        );
      }

      // Filter by salary range if any selected
      if (filterOptions.salaryRange.length > 0) {
        result = result.filter((job) => {
          const jobSalary = Number.parseInt(job.salary.replace(/[^0-9]/g, ""));

          return filterOptions.salaryRange.some((range) => {
            if (range === "0-30,000") {
              return jobSalary <= 30000;
            } else if (range === "30,000-60,000") {
              return jobSalary > 30000 && jobSalary <= 60000;
            } else if (range === "60,000-90,000") {
              return jobSalary > 60000 && jobSalary <= 90000;
            } else if (range === "90,000+") {
              return jobSalary > 90000;
            }
            return true;
          });
        });
      }

      // Filter by skills if any selected
      if (filterOptions.skills.length > 0) {
        result = result.filter((job) =>
          filterOptions.skills.some((skill) =>
            job.skills.some((jobSkill) => jobSkill.toLowerCase().includes(skill.toLowerCase()))
          )
        );
      }

      setFilteredJobs(result);
      setCurrentPage(1); // Reset to first page when filters change
    },
    [recruiter]
  );

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4; // Adjust this value as needed

  // State for the toggle page (Apply Now modal)
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Handle applying for a job (open Apply Now modal)
  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (!recruiter) {
    return <p className="text-center text-red-500">Recruiter not found.</p>;
  }

  // Calculate total number of pages for jobs
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change for pagination
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 lg:mx-20 mt-10">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsFilterOpen(false)} />
      )}

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 transition duration-300"
          >
            <FaArrowLeft
              size={40}
              className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
            />
          </button>
          <h2 className="text-2xl font-bold">{recruiter.name} - Job Openings</h2>
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

      <p className="text-gray-600 mb-4">Location: {recruiter.location}</p>
      <p className="text-sm text-gray-500">{recruiter.vacancies} Vacancies Available</p>

      <div className="mt-6">
        {currentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {currentJobs.map((job) => (
              <div
                key={job.jobId}
                className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-2xl transition-shadow duration-300 relative"
              >
                <h3 className="text-2xl mb-2 font-semibold text-gray-800">{job.title}</h3>
                <div className="mt-2">
                  <div className="flex items-center mb-2">
                    <CiLocationOn size={14} className="text-gray-500" />
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                  <p className="text-xs text-gray-600">
                    Experience: <strong>{job.experience || "Not specified"}</strong>
                  </p>
                  <p className="text-xs text-gray-600">
                    Salary: <strong>{job.salary || "Negotiable"}</strong>
                  </p>
                  <div className="mt-2">
                    <span className="text-xs text-gray-600">
                      Skills: <strong>{Array.isArray(job.skills) ? job.skills.join(", ") : String(job.skills || "N/A")}</strong>
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button 
                    onClick={() => handleApplyNow(job)} 
                    className="mt-3 text-blue-600 font-semibold"
                  >
                    Apply Now
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <button
                    onClick={() => navigate(`/recruiters/${recruiterId}/jobs/${job.jobId}`)}
                    className="text-blue-600 font-semibold"
                  >
                    More Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No jobs available for this recruiter.</p>
        )}

        {/* Pagination Controls with Icons */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
            >
              <FaChevronLeft size={15} />
            </button>
            <span className="px-4 py-2 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
            >
              <FaChevronRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Toggle Page for Apply Now */}
      {isTogglePageOpen && (
        <TogglePage jobTitle={selectedJob?.title} onClose={() => setISTogglePageOpen(false)} />
      )}
    </div>
  );
}

export default RecruitersJob;