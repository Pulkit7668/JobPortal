import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recruitersData } from "./recruitersData";
import { FaArrowLeft, FaEllipsisV, FaBookmark, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiOutlineStar, AiOutlineExclamationCircle } from "react-icons/ai";
import { RiCloseCircleLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import TogglePage from "../TogglePage/TogglePage";
import { useAuth } from "../../Context/AuthContext"; 

function RecruiterJobDetails() {
  const { recruiterId, jobId } = useParams();
  const navigate = useNavigate();
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const { isAuthenticated } = useAuth();
  
  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  const handleMoreDetailsClick = (jobItem) => {
    setSelectedJob(jobItem);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Check if the job is active based on the application deadline
  const isActive = selectedJob
    ? new Date(selectedJob.application_deadline) >= new Date()
    : false;

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find the recruiter based on the recruiterId
  const recruiter = recruitersData.find((r) => r.id === parseInt(recruiterId));

  if (!recruiter) {
    return <p>Recruiter not found.</p>;
  }

  // Use selectedJob state to render the right column job details
  const job = selectedJob || recruiter.jobs.find((job) => job.jobId === parseInt(jobId));

  if (!job) {
    return <p>Job not found.</p>;
  }

  const totalPages = Math.ceil(recruiter.jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = recruiter.jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-6 hover:text-blue-700 transition duration-300 lg:ml-24 xs:ml-5 xs:mt-10 lg:mt-10"
      >
        <FaArrowLeft
          size={40}
          className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
        />
      </button>
      <div className="flex p-6 lg:mx-20">
        {/* Left Column: Job List */}
        <div className="w-1/4 pr-6 h-full overflow-y-auto scrollable xs:hidden lg:block">
          <h3 className="text-xl font-bold mb-4">Job Listings</h3>
          <div className="flex flex-col gap-2">
            {currentJobs.map((jobItem) => (
              <div
                key={jobItem.jobId}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800">{jobItem.title}</h3>
                <p className="text-sm text-gray-500">{recruiter.name}</p>
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
                    Skills: <strong>{Array.isArray(jobItem.skills) ? jobItem.skills.join(", ") : jobItem.skills}</strong>
                  </span>
                </div>
                <div className="flex items-center mt-3 justify-between">
                  <button
                    onClick={() => handleApplyNow(jobItem)}
                    className={`px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ${isAuthenticated ? "" : "cursor-not-allowed"}`}
                    disabled={!isAuthenticated}
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

        {/* Right Column: Job Details */}
        <div className="lg:w-2/3 h-full bg-gray-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h2>
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
                <div className="absolute xs:top-64 xs:right-10 lg:top-48 lg:right-4 p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
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
          <p className="text-lg text-gray-700 mb-4"><span className="font-semibold">{recruiter.name}</span></p>
          <div className="flex items-center mb-2">
            <CiLocationOn size={14} className="text-gray-500" />
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
          <p className="text-sm text-gray-600 mb-4">{job.description}</p>
          <p className="text-md text-gray-600 mb-2">
            <strong>Experience: </strong>{job.experience}
          </p>
          <p className="text-md text-gray-600 mb-4">
            <strong>Salary: </strong>{job.salary}
          </p>

          <div className="mb-6">
            <div className="mb-6">
              <p className="text-sm text-gray-600"><strong>Skills: </strong>{job.skills}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Responsibilities</h3>
              <ul className="list-disc pl-5">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="text-sm text-gray-600 mb-2">{responsibility}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Requirements</h3>
              <p className="text-sm text-gray-600">{job.requirements}</p>
            </div>

            <p className="font-semibold text-gray-700 mt-4">
              Application Deadline: {job.application_deadline}
            </p>
          </div>

          {/* Apply Button */}
          <div className="mt-8 flex justify-center md:justify-end">
            <button
              onClick={() => handleApplyNow(job)}
              className={`px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ${isAuthenticated ? "" : "cursor-not-allowed"}`}
              disabled={!isAuthenticated}
            >
              Apply Now
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
      </div>
    </>
  );
}

export default RecruiterJobDetails;