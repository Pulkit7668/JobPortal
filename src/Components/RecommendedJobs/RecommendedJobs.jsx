import React, { useState } from "react"
import { FaEllipsisV, FaBookmark, FaShareAlt, FaStar, FaCheckCircle } from "react-icons/fa"
import { FaCircleArrowRight } from "react-icons/fa6"
import { CiLocationOn } from "react-icons/ci"
import { Link } from "react-router-dom"
import TogglePage from "../TogglePage/TogglePage"
import jobData, { companyLogos } from "./RecommendedJobsData"
import { useAuth } from "../../Context/AuthContext"; 
import { BiCodeAlt } from "react-icons/bi"
import { LuHistory, LuWallet } from "react-icons/lu"

const RecommendedJobs = () => {
  const [visibleJobs] = useState(6)
  const [isTogglePageOpen, setIsTogglePageOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)
  const { isAuthenticated, login } = useAuth();

  const handleApplyNow = (job) => {
    setSelectedJob(job)
    setIsTogglePageOpen(true)
  }

  const toggleMenu = (jobId) => {
    setMenuOpen(menuOpen === jobId ? null : jobId)
  }

  const handleSaveJob = (jobId) => {
    if (!isAuthenticated) {
      alert("Please log in to save jobs.");
      login();
      return;
    }
    console.log("Job saved:", jobId);
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

  const getCompanyLogo = (company) => {
    return companyLogos[company] || `/placeholder.svg?height=40&width=40&text=${encodeURIComponent(company)}`
  }

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

  return (
    <div className="p-4 sm:p-6 lg:mx-10 xl:mx-20 mt-6 lg:mt-10">
      <div className="flex xs:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="xs:text-lg md:text-2xl font-bold">Recommended Jobs</h2>
        <div className="flex items-center">
          <Link to="/job-opportunities" className="mr-2 text-gray-800 hover:text-blue-600 transition-all duration-300">
            View More
          </Link>
          <FaCircleArrowRight size={20} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {jobData.slice(0, visibleJobs).map((job) => (
          <div
            key={job.id}
            className="p-3 sm:p-4 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between relative"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <img
                  src={getCompanyLogo(job.company) || "/placeholder.svg"}
                  alt={`${job.company} logo`}
                  className="w-12 h-12 rounded-xl p-1 mr-3 object-contain border border-gray-200"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                  <div className="flex items-center">
                    <p className="text-gray-600 mr-2">{job.company}</p>
                    {job.isVerified && <FaCheckCircle size={12} className="text-green-500" title="Verified Company" />}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mr-2">
                  {getDaysAgo(job.application_deadline)}
                </span>
                <div className="relative">
                  <button onClick={() => toggleMenu(job.id)} disabled={!isAuthenticated} className={`text-gray-500 hover:text-gray-700 ${!isAuthenticated ? "cursor-not-allowed opacity-50" : ""}`}>
                    <FaEllipsisV />
                  </button>
                  {menuOpen === job.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={() => handleSaveJob(job.id)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <FaBookmark className="mr-2" /> Save Job
                        </button>
                        <button
                          onClick={() => handleShareJob(job.id)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <FaShareAlt className="mr-2" /> Share Job
                        </button>
                        <button
                          onClick={() => handleRateCompany(job.company)}
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
            <div className="flex items-center mb-2">
              <CiLocationOn size={16} className="text-gray-500 mr-1" />
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-xs xs:text-sm text-gray-600 flex items-center">
                <LuHistory className="mr-1 text-gray-500" />
                <span className="font-semibold mr-1">Experience:</span> {job.experience}
              </p>
              <p className="text-xs xs:text-sm text-gray-600 flex items-center">
                <LuWallet className="mr-1 text-gray-500"/>  
                <span className="font-semibold mr-1">Salary:</span> {job.salary}
              </p>
            </div>
            <div className="mt-1 flex items-start gap-1">
              <BiCodeAlt className="text-gray-500" />
              <p className="text-xs xs:text-sm font-semibold text-gray-600 mb-1">Skills:</p>
              <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {skill}
                  </span>
                ))}
                {job.skills.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    +{job.skills.length - 3}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => handleApplyNow(job)}
                className={`px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ${isAuthenticated ? "" : "cursor-not-allowed"}`}
                disabled={!isAuthenticated}
              >
                Apply Now
              </button>
              <Link to={`/recommended/job/${job.id}`} className="px-3 py-2 text-sm font-semibold text-blue-700 hover:underline">
                More Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      {isTogglePageOpen && <TogglePage jobTitle={selectedJob?.title} onClose={() => setIsTogglePageOpen(false)} />}
    </div>
  )
}

export default RecommendedJobs
