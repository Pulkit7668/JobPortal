import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEllipsisV, FaBookmark, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";
import { AiOutlineStar, AiOutlineExclamationCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import jobs from "./RecommendedJobsData";
import TogglePage from "../TogglePage/TogglePage";

function RecommendedJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(jobs.find((job) => job.id === parseInt(id)) || null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Total number of pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Check if the job is active based on the application deadline
  const isActive = selectedJob
    ? new Date(selectedJob.application_deadline) >= new Date()
    : false;

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  const handleMoreDetailsClick = (jobItem) => {
    setSelectedJob(jobItem);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedJob]);

  if (!selectedJob) {
    return <p>Job not found.</p>;
  }

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 md:ml-5 lg:ml-24 xs:ml-5 lg:mt-10 xs:mt-10"
      >
        <FaArrowLeft size={40} className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300" />
      </button>
      <div className="flex lg:mx-20 p-6">
        {/* Left Section: Job Listings with Scrollbar */}
        <div className="w-1/4 pr-6 h-[10%] overflow-y-auto scrollable xs:hidden lg:block">
          <h3 className="text-xl font-bold mb-4">Job Listings</h3>
          <div className="flex flex-col gap-2">
            {currentJobs.map((jobItem) => (
              <div
                key={jobItem.id}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800">{jobItem.title}</h3>
                <p className="text-gray-600 mb-1">{jobItem.company}</p>
                <div className="flex items-center mb-2">
                  <CiLocationOn size={14} className="text-gray-500" />
                  <p className="text-sm text-gray-500">{jobItem.location}</p>
                </div>
                <p className="text-xs text-gray-600">
                  Experience: <strong>{jobItem.experience}</strong>
                </p>
                <p className="text-xs text-gray-600">
                  Salary: <strong>{jobItem.salary}</strong>
                </p>
                <div className="mt-2">
                  <span className="text-xs text-gray-600">
                    Skills: <strong>{jobItem.skills.join(", ")}</strong>
                  </span>
                </div>
                <div className="flex items-center mt-3 justify-between">
                  <button
                    onClick={() => handleApplyNow(jobItem)}
                    className="px-3 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    disabled={!isActive}
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleMoreDetailsClick(jobItem)}
                    className="text-sm text-blue-700"
                  >
                    More Details
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
        </div>

        {/* Right Section: Job Details */}
        <div className="lg:w-2/3 h-full bg-gray-50 p-6 rounded-lg shadow-md">
          {/* Title, Status */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="md:text-2xl font-bold mr-1">{selectedJob.title}</h2>
            <div className="flex items-center space-x-4">
              {/* Status */}
              <p className={`xs:text-xs md:text-base font-semibold ${isActive ? "text-green-600" : "text-red-600"}`}>
                Status: {isActive ? "Active" : "Closed"}
              </p>
              {/* Menu Icon */}
              <button onClick={handleMenuToggle} className="cursor-pointer">
                <FaEllipsisV size={20} className="text-gray-600 hover:text-blue-600" />
              </button>
              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute xs:top-52 xs:right-10 lg:top-44 lg:right-4 p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 border-b border-gray-200 pb-2 cursor-pointer">
                      <FaBookmark size={16} className="text-gray-600" />
                      <span>Save Job</span>
                    </li>
                    <li className="flex items-center space-x-2 border-b border-gray-200 pb-2 cursor-pointer">
                      <RiCloseCircleLine size={16} className="text-gray-600" />
                      <span>Block Company</span>
                    </li>
                    <li className="flex items-center space-x-2 border-b border-gray-200 pb-2 cursor-pointer">
                      <AiOutlineStar size={16} className="text-gray-600" />
                      <span>Review Company</span>
                    </li>
                    <li className="flex items-center space-x-2 cursor-pointer">
                      <AiOutlineExclamationCircle size={16} className="text-gray-600" />
                      <span>Report Job/Company</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <p className="text-xl text-gray-600 mb-1">{selectedJob.company}</p>
          <p className="text-sm text-gray-500 mb-4">{selectedJob.location}</p>
          <p className="text-lg text-gray-700 mb-4">{selectedJob.description}</p>

          <p className="text-md text-gray-600 mb-2">
            <strong>Experience: </strong>{selectedJob.experience}
          </p>
          <p className="text-md text-gray-600 mb-4">
            <strong>Salary: </strong>{selectedJob.salary}
          </p>

          <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
          <ul className="list-disc pl-5 mb-4">
            {selectedJob.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mb-2">Requirements</h3>
          <ul className="list-disc pl-5">
            {selectedJob.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>

          <p className="font-semibold text-gray-700 mt-10">
            Application Deadline: {selectedJob.application_deadline}
          </p>

          {/* Apply Now button */}
          <div className="flex justify-end xs:mt-5 md:mt-0">
            <button
              onClick={() => handleApplyNow(selectedJob)}
              className="px-6 py-2 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={!isActive}
            >
              Apply Now
            </button>
          </div>

          {/* Toggle Page */}
          {isTogglePageOpen && (
            <TogglePage jobTitle={selectedJob?.title} onClose={() => setISTogglePageOpen(false)} />
          )}
        </div>
      </div>
    </>
  );
}

export default RecommendedJobDetails;