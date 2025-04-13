import React, { useState } from "react"
import { FaEllipsisV, FaBookmark, FaShareAlt, FaStar, FaCheckCircle } from "react-icons/fa"
import { BiCodeAlt } from "react-icons/bi";
import { LuHistory } from "react-icons/lu";
import { LuWallet } from "react-icons/lu";
import { FaCircleArrowRight } from "react-icons/fa6"
import { CiLocationOn } from "react-icons/ci"
import { Link, useNavigate } from "react-router-dom"
import { jobs, companyLogos } from "./JobDataForSkills"
import TogglePage from "../TogglePage/TogglePage"
import { useAuth } from "../../Context/AuthContext"

// Mock user profile skills
const userSkills = ["React", "JavaScript", "HTML", "CSS", "Docker"]

// Function to filter jobs based on user's skills
const filterJobsBySkills = (jobs, userSkills) => {
  return jobs.filter((job) => job.skills.some((skill) => userSkills.includes(skill)))
}

function JobsForSkills() {
  const { isLoggedIn } = useAuth()
  const filteredJobs = filterJobsBySkills(jobs, userSkills)
  const jobsToShow = filteredJobs.slice(0, 6)
  const [isTogglePageOpen, setIsTogglePageOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)
  const navigate = useNavigate();

  const handleApplyNow = (job) => {
    setSelectedJob(job)
    setIsTogglePageOpen(true)
  }

  const toggleMenu = (jobId) => {
    setMenuOpen(menuOpen === jobId ? null : jobId)
  }

  const handleSaveJob = (jobId) => {
    // Implement save job functionality
    console.log("Job saved:", jobId)
    setMenuOpen(null)
  }

  const handleShareJob = (jobId) => {
    // Implement share job functionality
    console.log("Job shared:", jobId)
    setMenuOpen(null)
  }

  const handleRateCompany = (companyName) => {
    // Implement rate company functionality
    console.log("Rating company:", companyName)
    setMenuOpen(null)
    navigate("/rate-company");
  }

  // Function to get company logo
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

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="p-4 sm:p-6 lg:mx-10 xl:mx-20 mt-6 lg:mt-10">
      {/* Heading and View More Alignment */}
      <div className="flex xs:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Jobs Matching Your Skills</h2>
        {filteredJobs.length > 4 && (
          <div className="flex items-center mt-2 sm:mt-0">
            <Link
              to={{ pathname: "/jobforskills", state: { jobs: filteredJobs } }}
              className="mr-2 text-gray-800 hover:text-blue-600 transition-all duration-300 text-sm sm:text-base"
            >
              View more
            </Link>
            <FaCircleArrowRight size={16} sm:size={20} className="text-black" />
          </div>
        )}
      </div>

      {jobsToShow.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {jobsToShow.map((job) => (
            <div
              key={job.id}
              className="p-3 sm:p-4 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between relative"
            >
              {/* Top row with days ago and menu icon */}
              <div className="flex justify-between items-center mb-2 sm:mb-3">
                <div className="flex items-center">
                  <img
                    src={getCompanyLogo(job.company) || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl mr-2 sm:mr-3 p-1 object-contain border border-gray-400"
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">{job.title}</h3>
                    <div className="flex items-center">
                      <p className="text-sm sm:text-base text-gray-600 mr-2">{job.company}</p>
                      {/* Verified Company Badge */}
                      {job.isVerified && (
                        <FaCheckCircle size={10} sm:size={12} className="text-green-500" title="Verified Company" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full mr-2">
                    {getDaysAgo(job.application_deadline)}
                  </span>
                  {/* Menu Icon */}
                  <div className="relative">
                    <button onClick={() => toggleMenu(job.id)} className="text-gray-500 hover:text-gray-700">
                      <FaEllipsisV />
                    </button>
                    {/* Dropdown Menu */}
                    {menuOpen === job.id && (
                      <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            onClick={() => handleSaveJob(job.id)}
                            className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <FaBookmark className="mr-2" /> Save Job
                          </button>
                          <button
                            onClick={() => handleShareJob(job.id)}
                            className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <FaShareAlt className="mr-2" /> Share Job
                          </button>
                          <button
                            onClick={() => handleRateCompany(job.company)}
                            className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
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
              <div className="flex items-center mb-1 sm:mb-2">
                <CiLocationOn size={14} sm:size={16} className="text-gray-500 mr-1" />
                <p className="text-xs sm:text-sm text-gray-500">{job.location}</p>
              </div>

              {/* Job Details */}
              <div className="mt-1 sm:mt-2 space-y-1">
                <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                  <LuHistory className="mr-1 text-gray-500" />
                  <span className="font-semibold mr-1">Experience:</span> {job.experience}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                  <LuWallet className="mr-1 text-gray-500"/> 
                  <span className="font-semibold mr-1">Salary:</span> {job.salary}
                </p>
              </div>

              {/* Skills */}
              <div className="mt-1 flex items-start gap-1">
                <BiCodeAlt className="text-gray-500" />
                <p className="text-xs sm:text-sm font-semibold text-gray-700">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs sm:text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-800"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="text-xs sm:text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                      +{job.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-200">
                <button
                  onClick={() => handleApplyNow(job)}
                  className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Apply Now
                </button>
                <Link
                  to={`/jobforskills/job/${job.id}`}
                  className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-blue-700 hover:underline"
                >
                  More Details
                </Link>
              </div>
            </div>
          ))}

          {/* Toggle Page */}
          {isTogglePageOpen && <TogglePage jobTitle={selectedJob?.title} onClose={() => setIsTogglePageOpen(false)} />}
        </div>
      ) : (
        <p className="text-sm sm:text-base">No jobs available for your skills at the moment.</p>
      )}
    </div>
  )
}

export default JobsForSkills