import { useEffect, useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { jobs, companyLogos } from "./JobDataForSkills"
import TogglePage from "../TogglePage/TogglePage"
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaBookmark,
  FaShareAlt,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa"
import { CiLocationOn } from "react-icons/ci"
import { Filter } from "lucide-react"
import FilterPanel from "../FilterForJob/FilterPanel"

// Mock user profile skills
const userSkills = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "Redux",
  "AWS",
  "Figma",
  "Sketch",
  "Adobe XD",
]

function JobDetailsForSkills() {
  const navigate = useNavigate()
  const [isTogglePageOpen, setIsTogglePageOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(null)

  // Filter states
  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    salaryRange: "Any",
    skills: [],
  })

  const [filteredJobs, setFilteredJobs] = useState([])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 6

  // Apply filters to jobs
  const applyFilters = useCallback((filterOptions) => {
    let result = jobs.filter((job) => job.skills.some((skill) => userSkills.includes(skill)))

    // Filter by job type if any selected
    if (filterOptions.jobType.length > 0) {
      result = result.filter((job) =>
        filterOptions.jobType.some((type) => job.type?.toLowerCase().includes(type.toLowerCase())),
      )
    }

    // Filter by experience level if any selected
    if (filterOptions.experienceLevel.length > 0) {
      result = result.filter((job) =>
        filterOptions.experienceLevel.some((level) => {
          if (level === "Entry Level" && job.experience.includes("0-2")) return true
          if (level === "Mid Level" && job.experience.includes("3-5")) return true
          if (level === "Senior" && job.experience.includes("5+")) return true
          if (level === "Executive" && job.experience.includes("10+")) return true
          return false
        }),
      )
    }

    // Filter by salary range if not "Any"
    if (filterOptions.salaryRange !== "Any") {
      result = result.filter((job) => {
        const jobSalary = Number.parseInt(job.salary.replace(/[^0-9]/g, ""))

        if (filterOptions.salaryRange === "0-30,000") {
          return jobSalary <= 30000
        } else if (filterOptions.salaryRange === "30,000-60,000") {
          return jobSalary > 30000 && jobSalary <= 60000
        } else if (filterOptions.salaryRange === "60,000-90,000") {
          return jobSalary > 60000 && jobSalary <= 90000
        } else if (filterOptions.salaryRange === "90,000+") {
          return jobSalary > 90000
        }
        return true
      })
    }

    // Filter by skills if any selected
    if (filterOptions.skills.length > 0) {
      result = result.filter((job) =>
        filterOptions.skills.some((skill) =>
          job.skills.some((jobSkill) => jobSkill.toLowerCase().includes(skill.toLowerCase())),
        ),
      )
    }

    setFilteredJobs(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [])

  // Calculate total pages and jobs for the current page
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const startIndex = (currentPage - 1) * jobsPerPage
  const endIndex = startIndex + jobsPerPage
  const currentJobs = filteredJobs.slice(startIndex, endIndex)

  const handleApplyNow = (job) => {
    setSelectedJob(job)
    setIsTogglePageOpen(true)
  }

  const toggleMenu = (jobId) => {
    setMenuOpen(menuOpen === jobId ? null : jobId)
  }

  const handleSaveJob = (jobId) => {
    console.log("Job saved:", jobId)
    setMenuOpen(null)
  }

  const handleShareJob = (jobId) => {
    console.log("Job shared:", jobId)
    setMenuOpen(null)
  }

  const handleRateCompany = (companyName) => {
    console.log("Rating company:", companyName)
    setMenuOpen(null)
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

  // Function for handling next and previous page clicks
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  // Apply filters when they change
  useEffect(() => {
    applyFilters(filters)
  }, [filters, applyFilters])

  return (
    <div className="p-6 lg:mx-20 mb-5 mt-10 relative">
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
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800">
            <FaArrowLeft
              size={35}
              className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
            />
          </button>
          <h2 className="text-2xl font-bold">More Jobs for Your Skills</h2>
        </div>

        {/* Filter Button */}
        <div className="flex items-center xs:block lg:hidden">
          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="ml-4 flex items-center border border-black rounded-xl p-2 text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <Filter size={24} className="mr-1" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(filters.jobType.length > 0 ||
        filters.experienceLevel.length > 0 ||
        filters.salaryRange !== "Any" ||
        filters.skills.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.jobType.map((type) => (
            <span key={type} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {type}
            </span>
          ))}
          {filters.experienceLevel.map((level) => (
            <span key={level} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {level}
            </span>
          ))}
          {filters.salaryRange !== "Any" && (
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{filters.salaryRange}</span>
          )}
          {filters.skills.map((skill) => (
            <span key={skill} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
          <button
            onClick={() =>
              setFilters({
                jobType: [],
                experienceLevel: [],
                salaryRange: "Any",
                skills: [],
              })
            }
            className="text-red-600 hover:text-red-800 text-sm underline"
          >
            Clear All
          </button>
        </div>
      )}

      {currentJobs.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-blue-200 transition-shadow duration-300 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <img
                    src={getCompanyLogo(job.company) || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 rounded-xl mr-3 p-1 object-contain border border-gray-400"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                    <div className="flex items-center">
                      <p className="text-gray-600 mr-2">{job.company}</p>
                      {job.isVerified && (
                        <FaCheckCircle size={12} className="text-green-500" title="Verified Company" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mr-2">
                    {getDaysAgo(job.application_deadline)}
                  </span>
                  <div className="relative">
                    <button onClick={() => toggleMenu(job.id)} className="text-gray-500 hover:text-gray-700">
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
                <p className="text-xs text-gray-600 flex items-center">
                  <span className="font-semibold mr-1">Experience:</span> {job.experience}
                </p>
                <p className="text-xs text-gray-600 flex items-center">
                  <span className="font-semibold mr-1">Salary:</span> {job.salary}
                </p>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-xs font-semibold text-gray-700 mb-1">Skills:</p>
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
              <div className="flex items-center justify-between mt-4 border-t border-gray-200 pt-3">
                <button
                  onClick={() => handleApplyNow(job)}
                  className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Apply Now
                </button>
                <Link
                  to={`/jobforskills/job/${job.id}`}
                  className="px-3 py-2 text-sm font-semibold text-blue-700 hover:underline"
                >
                  More Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs available for your skills at the moment.</p>
      )}

      {/* Pagination */}
      {filteredJobs.length > 0 && (
        <div className="flex justify-center mt-6 space-x-2">
          {/* Previous Button */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center border rounded-full ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <FaChevronLeft size={15} />
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 flex items-center justify-center border rounded-full ${
                currentPage === index + 1 ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-blue-600 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 flex items-center justify-center border rounded-full ${
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <FaChevronRight size={15} />
          </button>
        </div>
      )}


      {/* Toggle Page */}
      {isTogglePageOpen && <TogglePage jobTitle={selectedJob?.title} onClose={() => setIsTogglePageOpen(false)} />}
    </div>
  )
}

export default JobDetailsForSkills


