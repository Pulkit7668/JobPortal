import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recruitersData } from "./recruitersData";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TogglePage from "../TogglePage/TogglePage";

function RecruitersJob() {
  const { recruiterId } = useParams();
  const navigate = useNavigate();
  
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

  // Find the recruiter data based on the ID
  const recruiter = recruitersData.find((r) => r.id === parseInt(recruiterId));

  if (!recruiter) {
    return <p>Recruiter not found.</p>;
  }

  // Calculate total number of pages for jobs
  const totalPages = Math.ceil(recruiter.jobs.length / jobsPerPage);
  
  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = recruiter.jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change for pagination
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 lg:mx-20 mt-10">
      {/* Flex container for Back button and job title */}
      <div className="flex items-center mb-10">
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
                <h3 className="text-sm font-bold text-gray-800">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{job.description}</p>
                <p className="text-sm text-gray-600 mt-2">Experience: {job.experience}</p>
                <p className="text-sm text-gray-600">Salary: {job.salary}</p>
                <div className="flex items-center justify-end">
                  <button onClick={() => handleApplyNow(job)} className="mt-3 text-blue-600 font-semibold">Apply Now</button>
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
          <p>No jobs available for this recruiter.</p>
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
