"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { recruitersData } from "./recruitersData"
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { CiLocationOn } from "react-icons/ci"
import TogglePage from "../TogglePage/TogglePage"
import FilterPanel from "../FilterForJob/FilterPanel"
import { Filter } from "lucide-react"
import { useAuth } from "../../Context/AuthContext"

function RecruitersJob() {
  const { recruiterId } = useParams()
  const navigate = useNavigate()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("sort-by")
  const { isAuthenticated } = useAuth()

  // Find recruiter data
  const recruiter = recruitersData.find((r) => r.id === Number.parseInt(recruiterId))

  // Get initial jobs for the recruiter
  const initialJobs = recruiter ? recruiter.jobs : []

  // Filter states
  const [filters, setFilters] = useState({
    easyApply: false,
    datePosted: "anytime",
    experienceLevel: "All Levels",
    jobType: "All Types",
    workType: "All Types",
    location: "All Locations",
    nearbyLocation: false,
    isVerified: false,
    industry: "All Industries",
    companySize: "All Sizes",
    selectedLocations: [],
  })

  const [filteredJobs, setFilteredJobs] = useState(initialJobs)

  // Apply filters to jobs
  const applyFilters = useCallback(
    (filterOptions) => {
      let result = recruiter ? [...recruiter.jobs] : []

      // Filter by easy apply
      if (filterOptions.easyApply) {
        result = result.filter((job) => job.easyApply === true)
      }

      // Filter by date posted
      if (filterOptions.datePosted !== "anytime") {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        result = result.filter((job) => {
          const postDate = new Date(job.posted_date)
          const diffTime = Math.abs(today - postDate)
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

          if (filterOptions.datePosted === "past 24 hours") {
            return diffDays <= 1
          } else if (filterOptions.datePosted === "past week") {
            return diffDays <= 7
          }
          return true
        })
      }

      // Filter by job type if any selected
      if (filterOptions.jobType !== "All Types") {
        result = result.filter((job) => job.type?.toLowerCase().includes(filterOptions.jobType.toLowerCase()))
      }

      // Filter by experience level if any selected
      if (filterOptions.experienceLevel !== "All Levels") {
        result = result.filter((job) => {
          if (filterOptions.experienceLevel === "Entry Level" && job.experience.includes("0-2")) return true
          if (filterOptions.experienceLevel === "Mid Level" && job.experience.includes("3-5")) return true
          if (filterOptions.experienceLevel === "Senior Level" && job.experience.includes("5+")) return true
          if (filterOptions.experienceLevel === "Executive" && job.experience.includes("10+")) return true
          return false
        })
      }

      // Filter by work type
      if (filterOptions.workType !== "All Types") {
        result = result.filter((job) => {
          if (filterOptions.workType === "Remote" && job.location.toLowerCase().includes("remote")) return true
          if (filterOptions.workType === "On-Site" && !job.location.toLowerCase().includes("remote")) return true
          if (filterOptions.workType === "Hybrid" && job.location.toLowerCase().includes("hybrid")) return true
          return false
        })
      }

      // Filter by selected locations (multiple)
      if (filterOptions.selectedLocations && filterOptions.selectedLocations.length > 0) {
        result = result.filter((job) => {
          return filterOptions.selectedLocations.some((location) =>
            job.location.toLowerCase().includes(location.toLowerCase()),
          )
        })
      }

      // Filter by nearby location
      if (filterOptions.nearbyLocation) {
        // In a real app, this would use geolocation
        // For now, just simulate nearby locations
        result = result.filter((job) =>
          ["New York", "San Francisco", "Chicago"].some((loc) =>
            job.location.toLowerCase().includes(loc.toLowerCase()),
          ),
        )
      }

      // Filter by verified companies
      if (filterOptions.isVerified) {
        result = result.filter((job) => job.isVerified === true)
      }

      // Filter by industry
      if (filterOptions.industry !== "All Industries") {
        result = result.filter((job) => job.industry?.toLowerCase().includes(filterOptions.industry.toLowerCase()))
      }

      // Filter by company size
      if (filterOptions.companySize !== "All Sizes") {
        result = result.filter((job) => job.companySize === filterOptions.companySize)
      }

      // Sort the results
      if (sortBy === "recent") {
        result.sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date))
      } else if (sortBy === "salary-high") {
        result.sort((a, b) => {
          const salaryA = Number.parseInt(a.salary.replace(/[^0-9]/g, ""))
          const salaryB = Number.parseInt(b.salary.replace(/[^0-9]/g, ""))
          return salaryB - salaryA
        })
      } else if (sortBy === "salary-low") {
        result.sort((a, b) => {
          const salaryA = Number.parseInt(a.salary.replace(/[^0-9]/g, ""))
          const salaryB = Number.parseInt(b.salary.replace(/[^0-9]/g, ""))
          return salaryA - salaryB
        })
      }

      setFilteredJobs(result)
      setCurrentPage(1)
    },
    [recruiter, sortBy],
  )

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 6

  // State for the toggle page (Apply Now modal)
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

  // Handle applying for a job (open Apply Now modal)
  const handleApplyNow = (job) => {
    setSelectedJob(job)
    setISTogglePageOpen(true)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  // Apply filters when they change
  useEffect(() => {
    applyFilters(filters)
  }, [filters, applyFilters])

  if (!recruiter) {
    return <p className="text-center text-red-500">Recruiter not found.</p>
  }

  // Calculate total number of pages for jobs
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

  // Handle page change for pagination
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="flex min-h-screen">
      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={applyFilters}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="flex-1 p-6 lg:ml-72 mb-5 mt-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="text-blue-600 transition duration-300">
              <FaArrowLeft
                size={40}
                className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
              />
            </button>
            <h2 className="text-2xl font-bold">{recruiter.name} - Job Openings</h2>
          </div>

          {/* Sort By Dropdown */}
          <div className="hidden md:block mb-4">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value)
                applyFilters(filters)
              }}
              className="bg-white border border-gray-300 px-3 py-2 rounded-md text-gray-700 shadow-sm focus:ring focus:ring-blue-500 text-sm"
            >
              <option value="sort-by">Sort By</option>
              <option value="relevance">Relevance</option>
              <option value="recent">Most Recent</option>
              <option value="salary-high">Salary (High to Low)</option>
              <option value="salary-low">Salary (Low to High)</option>
            </select>
          </div>

          {/* Filter Button for Mobile */}
          <div className="flex items-center xs:block lg:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="ml-4 flex items-center border border-black rounded-xl p-2 text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Filter size={24} className="mr-1" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Sort By Dropdown - Mobile Only */}
        <div className="md:hidden mb-4">
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value)
              applyFilters(filters)
            }}
            className="bg-white border border-gray-300 px-3 py-2 rounded-md text-gray-700 shadow-sm focus:ring focus:ring-blue-500 text-sm w-full"
          >
            <option value="sort-by">Sort By</option>
            <option value="relevance">Relevance</option>
            <option value="recent">Most Recent</option>
            <option value="salary-high">Salary (High to Low)</option>
            <option value="salary-low">Salary (Low to High)</option>
          </select>
        </div>

        <p className="text-gray-600 mb-4">Location: {recruiter.location}</p>
        <p className="text-sm text-gray-500">{recruiter.vacancies} Vacancies Available</p>

        {/* Active Filters Display */}
        {(filters.easyApply ||
          filters.datePosted !== "anytime" ||
          filters.experienceLevel !== "All Levels" ||
          filters.jobType !== "All Types" ||
          filters.workType !== "All Types" ||
          filters.nearbyLocation ||
          filters.isVerified ||
          filters.industry !== "All Industries" ||
          filters.companySize !== "All Sizes" ||
          (filters.selectedLocations && filters.selectedLocations.length > 0)) && (
          <div className="flex flex-wrap gap-2 mb-4 mt-4">
            {filters.easyApply && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Easy Apply</span>
            )}
            {filters.datePosted !== "anytime" && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{filters.datePosted}</span>
            )}
            {filters.experienceLevel !== "All Levels" && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                {filters.experienceLevel}
              </span>
            )}
            {filters.jobType !== "All Types" && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{filters.jobType}</span>
            )}
            {filters.workType !== "All Types" && (
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{filters.workType}</span>
            )}
            {filters.selectedLocations && filters.selectedLocations.length > 0 && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                Locations: {filters.selectedLocations.slice(0, 2).join(", ")}
                {filters.selectedLocations.length > 2 && ` +${filters.selectedLocations.length - 2}`}
              </span>
            )}
            {filters.nearbyLocation && (
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Nearby Location</span>
            )}
            {filters.isVerified && (
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">Verified Only</span>
            )}
            {filters.industry !== "All Industries" && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">{filters.industry}</span>
            )}
            {filters.companySize !== "All Sizes" && (
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">{filters.companySize}</span>
            )}
            <button
              onClick={() =>
                setFilters({
                  easyApply: false,
                  datePosted: "anytime",
                  experienceLevel: "All Levels",
                  jobType: "All Types",
                  workType: "All Types",
                  location: "All Locations",
                  nearbyLocation: false,
                  isVerified: false,
                  industry: "All Industries",
                  companySize: "All Sizes",
                  selectedLocations: [],
                })
              }
              className="text-red-600 hover:text-red-800 text-sm underline"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="mt-6">
          {currentJobs.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {currentJobs.map((job) => (
                <div
                  key={job.jobId}
                  className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-2xl transition-shadow duration-300 relative"
                >
                  <div>
                    <h3 className="text-2xl mb-2 font-semibold text-gray-800">{job.title}</h3>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center mb-2">
                      <CiLocationOn size={14} className="text-gray-500" />
                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      Experience: <strong>{job.experience || "Not specified"}</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      Salary: <strong>{job.salary || "Negotiable"}</strong>
                    </p>
                    <div className="mt-2">
                      <span className="text-xs text-gray-600">
                        Skills:{" "}
                        <strong>
                          {Array.isArray(job.skills) ? job.skills.join(", ") : String(job.skills || "N/A")}
                        </strong>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleApplyNow(job)}
                      className={`px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ${isAuthenticated ? "" : "cursor-not-allowed"}`}
                      disabled={!isAuthenticated}
                    >
                      Apply Now
                    </button>
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
            <p className="text-center text-gray-500">No jobs available for this recruiter.</p>
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
        {isTogglePageOpen && <TogglePage jobTitle={selectedJob?.title} onClose={() => setISTogglePageOpen(false)} />}
      </div>
    </div>
  )
}

export default RecruitersJob

