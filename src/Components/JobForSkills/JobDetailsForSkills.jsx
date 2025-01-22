import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jobs } from "./JobDataForSkills";
import TogglePage from "../TogglePage/TogglePage";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";

// Mock user profile skills
const userSkills = ["React", "JavaScript", "HTML", "CSS", "Node.js", "Express", "MongoDB", "Redux", "AWS", "Figma", "Sketch", "Adobe XD"];

// Function to filter jobs based on user's skills
const filterJobsBySkills = (jobs, userSkills) => {
  return jobs.filter((job) =>
    job.skills.some((skill) => userSkills.includes(skill))
  );
};

function JobDetailsForSkills() {
  const filteredJobs = filterJobsBySkills(jobs, userSkills);
  const navigate = useNavigate();
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // Number of jobs displayed per page

  // Calculate total pages and jobs for the current page
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  // Function for handling next and previous page clicks
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Debugging: Log to check filteredJobs and currentJobs
  console.log("Filtered Jobs:", filteredJobs);
  console.log("Current Jobs (Page " + currentPage + "):", currentJobs);

  return (
    <div className="p-6 lg:mx-20 mb-5 mt-10">
      <div className="flex items-center mb-10">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft
            size={35}
            className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
          />
        </button>
        <h2 className="text-2xl font-bold">More Jobs for Your Skills</h2>
      </div>

      {currentJobs.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-blue-200 transition-shadow duration-300 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600 mb-5">{job.company}</p>
              <div className="flex items-center">
                <CiLocationOn size={14} className="text-gray-500" />
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
              <div className="mt-2">
                <span className="text-xs text-gray-600">
                  Skills: <strong>{job.skills.join(", ")}</strong>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="mt-3">
                  <button
                    onClick={() => handleApplyNow(job)}
                    className="px-3 py-2 text-sm font-semibold text-blue-700"
                  >
                    Apply Now
                  </button>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/jobforskills/job/${job.id}`}
                    className="px-3 py-2 text-sm font-semibold text-blue-700"
                  >
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs available for your skills at the moment.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {/* Previous Button */}
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-full ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <FaChevronLeft size={15} />
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 text-sm border rounded-full ${
              currentPage === index + 1
                ? "bg-blue-700 text-white"
                : "bg-gray-200 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-full ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <FaChevronRight size={15} />
        </button>
      </div>

      {/* Toggle Page */}
      {isTogglePageOpen && (
        <TogglePage
          jobTitle={selectedJob?.title}
          onClose={() => setISTogglePageOpen(false)}
        />
      )}
    </div>
  );
}

export default JobDetailsForSkills;
