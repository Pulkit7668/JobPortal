import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import jobData from "./LatestJobData";
import TogglePage from "../TogglePage/TogglePage";

const AllLatestJobs = () => {
  const navigate = useNavigate();
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  // Total number of pages
  const totalPages = Math.ceil(jobData.length / jobsPerPage);

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobData.slice(indexOfFirstJob, indexOfLastJob);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="mt-12 mb-10 xs:mx-5">
      <div className="flex items-center mb-8 md:ml-10 lg:ml-20">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 mr-4"
        >
          <FaArrowLeft size={40} className="p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300" />
        </button>
        <h1 className="xs:text-2xl xs:font-extrabold md:text-3xl md:font-bold text-gray-800">All Latest Jobs</h1>
      </div>

      {/* Job Listings */}
      <div className="grid lg:grid-cols-4 xs:grid-cols-1 gap-5 md:mx-10 lg:mx-24">
        {currentJobs.map((job) => (
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
              <button
                
                className="text-blue-700 font-semibold w-full"
              >
               <Link
                    to={`/latest/job/${job.id}`}
                    className="px-3 py-2 text-sm font-semibold text-blue-700"
                >
                  More Details
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
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

      {/* Toggle Page */}
      {isTogglePageOpen && (
        <TogglePage
          jobTitle={selectedJob?.title}
          onClose={() => setISTogglePageOpen(false)}
        />
      )}
    </div>
  );
};

export default AllLatestJobs;