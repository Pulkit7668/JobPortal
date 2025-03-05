import React, { useCallback, useEffect, useState } from "react"
import { filterJobData } from "./FilterJobData"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaCircle, FaDotCircle } from "react-icons/fa"
import { CiLocationOn } from "react-icons/ci"
import TogglePage from "../TogglePage/TogglePage"
import FilterPanel from "../FilterPanel"
import { Filter } from "lucide-react"

const JobCategoryPage = ({ category }) => {
  const navigate = useNavigate()
  const [isTogglePageOpen, setIsTogglePageOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 6
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Get initial jobs for the category
  const initialJobs = filterJobData[category.toLowerCase()] || []

  // filter states
  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    salaryRange: [],
    skills: [],
  })

  const [filteredJobs, setFilteredJobs] = useState(initialJobs)
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  // Apply filters to jobs
  const applyFilters = useCallback(
    (filterOptions) => {
      let result = [...initialJobs]

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

      // Filter by salary range if any selected
      if (filterOptions.salaryRange.length > 0) {
        result = result.filter((job) => {
          const jobSalary = Number.parseInt(job.salary.replace(/[^0-9]/g, ""))

          return filterOptions.salaryRange.some((range) => {
            if (range === "0-30,000") {
              return jobSalary <= 30000
            } else if (range === "30,000-60,000") {
              return jobSalary > 30000 && jobSalary <= 60000
            } else if (range === "60,000-90,000") {
              return jobSalary > 60000 && jobSalary <= 90000
            } else if (range === "90,000+") {
              return jobSalary > 90000
            }
            return true
          })
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
    },
    [initialJobs],
  )

  // Apply filters when they change
  useEffect(() => {
    applyFilters(filters)
  }, [filters, applyFilters])

  useEffect(() => {
    window.scrollTo(0, 0)
    console.log("Category:", category)
    console.log("Jobs:", filteredJobs)
  }, [category, filteredJobs])

  const handleApplyNow = (job) => {
    setSelectedJob(job)
    setIsTogglePageOpen(true)
  }

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <div className="p-6 lg:mx-20 mt-10">
      {/* Filter panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={setFilters}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Overlay when filter is open */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsFilterOpen(false)} />
      )}

      <div className="flex items-center mb-10 lg:mr-24">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-blue-600 transition duration-300" aria-label="Go back">
            <FaArrowLeft
              size={40}
              className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
            />
          </button>
          <h2 className="text-2xl font-bold">{category} Job Listing</h2>
        </div>
        {/* Filter Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="ml-auto flex items-center border border-black rounded-xl p-2 text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          <Filter size={24} className="mr-1" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {filteredJobs.length === 0 ? (
        <p>No jobs available in this category.</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-6">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 w-full sm:w-[48%] lg:w-[30%] border border-gray-200 bg-white rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl mb-2 font-semibold text-gray-800">{job.title}</h3>
                <p className="text-sm font-semibold text-gray-600">{job.company}</p>

                <div className="mt-2">
                  <div className="flex items-center mb-2">
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
                      Skills: <strong>{job.skills ? job.skills.join(", ") : "N/A"}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={() => navigate(`/jobs/${category.toLowerCase()}/${job.id}`)}
                    className="mt-4 mr-5 font-semibold text-blue-700"
                  >
                    More Details
                  </button>
                  <button onClick={() => handleApplyNow(job)} className="mt-4 font-semibold text-blue-700">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-4 py-2 border rounded-full ${
                  currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-blue-500 text-white"
                }`}
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded-full ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                  aria-label={`Page ${index + 1}`}
                >
                  {index + 1 === 1 || index + 1 === 2 || currentPage === index + 1 ? (
                    index + 1
                  ) : currentPage === index + 1 ? (
                    <FaDotCircle />
                  ) : (
                    <FaCircle />
                  )}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-4 py-2 border rounded-full ${
                  currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-blue-500 text-white"
                }`}
                aria-label="Next page"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {isTogglePageOpen && <TogglePage jobTitle={selectedJob?.title} onClose={() => setIsTogglePageOpen(false)} />}
    </div>
  )
}

export default JobCategoryPage

