import React, { useEffect, useState, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import { jobs } from "./JobDataForSkills"
import TogglePage from "../TogglePage/TogglePage"
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { CiLocationOn } from "react-icons/ci"
import { Filter } from "lucide-react"
import FilterPanel from "../FilterPanel"

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
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
      
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
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
        
        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="ml-4 flex items-center border border-black rounded-xl p-2 text-blue-600 hover:text-blue-700 curspr-pointer"
        >
          <Filter size={24} className="mr-1" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* Active Filters Display */}
      {(filters.jobType.length > 0 || 
        filters.experienceLevel.length > 0 || 
        filters.salaryRange !== "Any" || 
        filters.skills.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.jobType.map(type => (
            <span key={type} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {type}
            </span>
          ))}
          {filters.experienceLevel.map(level => (
            <span key={level} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {level}
            </span>
          ))}
          {filters.salaryRange !== "Any" && (
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              {filters.salaryRange}
            </span>
          )}
          {filters.skills.map(skill => (
            <span key={skill} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
          <button 
            onClick={() => setFilters({
              jobType: [],
              experienceLevel: [],
              salaryRange: "Any",
              skills: [],
            })}
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
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600 mb-5">{job.company}</p>
              <div className="flex items-center">
                <CiLocationOn size={14} className="text-gray-500" />
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
              <p className="text-xs text-gray-600">
                Experience: <strong>{job.experience}</strong>
              </p>
              <p className="text-xs text-gray-600">
                Salary: <strong>{job.salary}</strong>
              </p>
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
      {filteredJobs.length > 0 && (
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
      )}

      {/* Toggle Page */}
      {isTogglePageOpen && (
        <TogglePage
          jobTitle={selectedJob?.title}
          onClose={() => setIsTogglePageOpen(false)}
        />
      )}
    </div>
  );
}

export default JobDetailsForSkills

