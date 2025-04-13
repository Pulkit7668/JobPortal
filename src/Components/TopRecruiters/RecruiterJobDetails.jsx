import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recruitersData } from "./recruitersData";
import { companyLogos } from "./recruitersData";
import { FaArrowLeft, FaEllipsisV, FaBookmark, FaChevronLeft, FaChevronRight, FaBriefcase, FaLightbulb, FaCheckCircle, FaShareAlt, FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import TogglePage from "../TogglePage/TogglePage";
import { useAuth } from "../../Context/AuthContext"; 
import { BiCodeAlt, BiDollarCircle } from "react-icons/bi";
import { LuHistory, LuWallet } from "react-icons/lu";

function RecruiterJobDetails() {
  const { recruiterId, jobId } = useParams();
  const navigate = useNavigate();
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
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

    const toggleMenu = (jobId) => {
      setMenuOpen(menuOpen === jobId ? null : jobId)
    }
  
    const handleSaveJob = (jobId) => {
      if (!isAuthenticated) {
        alert("Please log in to save jobs.");
        login();
        return;
      }
      setMenuOpen(null);
    }
  
    const handleShareJob = (jobId) => {
      if (!isAuthenticated) {
        alert("Please log in to share jobs.");
        login();
        return;
      }
      setMenuOpen(null);
    }
  
    const handleRateCompany = (companyName) => {
      if (!isAuthenticated) {
        alert("Please log in to rate companies.");
        login();
        return;
      }
      setMenuOpen(null);
      navigate("/rate-company")
    }


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const getCompanyLogo = (company) => {
      return companyLogos[company] || `/placeholder.svg?height=40&width=40&text=${encodeURIComponent(company)}`
    }
  
    // Function to calculate days ago from a date string
    const getDaysAgo = (dateString) => {
      const today = new Date()
      const postDate = new Date(dateString)
      const diffTime = Math.abs(today - postDate)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
      if (diffDays === 0) return "Today"
      if (diffDays === 1) return "Yesterday"
      if (diffDays <= 30) return `${diffDays}d`
      if (diffDays <= 60) return "1m"
      return `${Math.floor(diffDays / 30)}m`
    }

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
    <div className="p-6 lg:mx-20 mt-10">
      <div className="flex items-center mb-10">
        <button onClick={() => navigate(-1)} className="text-blue-600 transition duration-300" aria-label="Go back">
          <FaArrowLeft
            size={40}
            className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
          />
        </button>
      </div>
      <div className="flex lg:space-x-6">
        {/* Left Column: Job List */}
        <div className="w-[30%] pr-6 h-[10%] overflow-y-auto scrollable xs:hidden lg:block">
          <h3 className="text-xl font-bold mb-4">Job Listings</h3>
          <div className="flex flex-col gap-4">
            {currentJobs.map((jobItem) => (
              <div
                key={jobItem.jobId}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between relative"
              >
                {/* <h3 className="text-lg font-semibold text-gray-800">{jobItem.title}</h3>
                <p className="text-sm text-gray-500">{recruiter.name}</p> */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-2">
                    <img
                      src={getCompanyLogo(jobItem.company) || "/placeholder.svg"}
                      alt={`${jobItem.company} logo`}
                      className="w-12 h-12 rounded-xl p-1 object-contain border border-gray-200"
                    />
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">{jobItem.title}</h3>
                      <div className="flex items-center">
                        <p className="text-gray-600 mr-2">{recruiter.name}</p>
                        {/* Verified Company Badge */}
                        {jobItem.isVerified && (
                          <FaCheckCircle size={12} className="text-green-500" title="Verified Company" />
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {getDaysAgo(jobItem.application_deadline)}
                  </span>
                </div>
                
                {/* Location */}
                <div className="flex items-center mb-2">
                  <CiLocationOn size={16} className="text-gray-500 mr-1" />
                  <p className="text-sm text-gray-500">{jobItem.location}</p>
                </div>

                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-600 flex items-center">
                    <LuHistory className="mr-1 text-gray-500" />
                    <span className="font-semibold mr-1">Experience:</span> {jobItem.experience}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center">
                    <LuWallet className="mr-1 text-gray-500"/> 
                    <span className="font-semibold mr-1">Salary:</span> {jobItem.salary}
                  </p>
                </div>

                {/* Skills */}
                <div className="mt-1 flex items-start flex-row gap-1">
                  <BiCodeAlt className="text-gray-500" />
                  <p className="text-xs font-semibold text-gray-600">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(jobItem.skills) ? jobItem.skills.map((skill, index) => (
                      <span key={index} className="text-xs text-gray-500">
                        {skill}
                      </span>
                    )) : (
                      <span className="text-xs text-gray-500">
                        {jobItem.skills}
                      </span>
                    )}
                  </div>
                  </div>
                

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleApplyNow()}
                    className={`px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ${isAuthenticated ? "" : "cursor-not-allowed"}`}
                    disabled={!isAuthenticated}
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleMoreDetailsClick(jobItem)}
                    className="text-sm text-blue-700 hover:underline"
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
        <div className="lg:w-2/3 xs:w-full bg-white border border-gray-200 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="md:text-2xl font-bold text-gray-800">{job.title}</h2>
              <div className="flex items-center">
                <p className="md:text-xl text-gray-600 mr-2">{recruiter.name}</p>
                            {/* Verified Company Badge
                            {selectedJob.isVerified && (
                              <FaCheckCircle size={14} className="text-green-500" title="Verified Company" />
                            )} */}
              </div>
            </div>
            <div className="flex items-center md:space-x-4">
              {/* Status */}
              <p className={`xs:text-xs md:text-base font-semibold ${isActive ? "text-green-600" : "text-red-600"}`}>
                Status: {isActive ? "Active" : "Closed"}
              </p>
              {/* Menu Icon */}
              <div className="relative">
                <button onClick={() => toggleMenu(job.id)} disabled={!isAuthenticated} className={`text-gray-500 hover:text-gray-700 ${!isAuthenticated ? "cursor-not-allowed opacity-50" : ""}`}>
                  <FaEllipsisV />
                </button>
                {/* Dropdown Menu */}
                {menuOpen === job.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      <button
                        onClick={() => handleSaveJob(selectedJob.id)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <FaBookmark className="mr-2" /> Save Job
                      </button>
                      <button
                        onClick={() => handleShareJob(selectedJob.id)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <FaShareAlt className="mr-2" /> Share Job
                      </button>
                      <button
                        onClick={() => handleRateCompany(selectedJob.company)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <FaStar className="mr-2" /> Rate Company
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Location */}
          <div className="flex items-center mb-4">
            <CiLocationOn size={18} className="text-gray-500 mr-1" />
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>

          <p className="text-lg text-gray-700 mb-4">{job.description}</p>

          {/* Job Details */}
          <div className="mt-2 space-y-1">
            <p className="text-md text-gray-600 flex items-center">        
              <span className="font-semibold mr-1">Experience:</span> {job.experience}
            </p>
            <p className="text-md text-gray-600 flex items-center">    
              <span className="font-semibold mr-1">Salary:</span> {job.salary}
            </p>
          </div>

          {/* Skills */}
          <div className="mt-1 mb-4 flex items-center gap-2">
            <p className="text-md text-gray-600">
              <strong>Skills: </strong>
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(job.skills) ? job.skills.map((skill, index) => (
                <span key={index} className="text-xs text-gray-500">
                  {skill}
                </span>
              )) : (
                <span className="text-xs text-gray-500">
                  {job.skills}
                </span>
              )}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="my-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Responsibilities:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {job.responsibilities &&
                job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>

          {/* Requirements */}
          {/* <div className="my-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {job.requirements && selectedJob.requirements.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div> */}

          {/* Application Deadline */}
          <p className="text-sm text-gray-600 mt-4">
            <strong>Application Deadline:</strong> {job.application_deadline}
          </p>

          {/* Apply Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleApplyNow}
              className={`px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ${isAuthenticated ? "" : "cursor-not-allowed"}`}
              disabled={!isActive}
            >
              Apply Now
            </button>
          </div>
        </div>
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

export default RecruiterJobDetails;