import { useState, useEffect, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
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
import jobData, { companyLogos } from "./LatestJobData"
import TogglePage from "../TogglePage/TogglePage"
import FilterPanel from "../FilterForJob/FilterPanel"
import { useAuth } from "../../Context/AuthContext"

const AllLatestJobs = () => {
  const navigate = useNavigate()
  const [isTogglePageOpen, setIsTogglePageOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(null)
  const [sortBy, setSortBy] = useState("sort-by")
  const { isAuthenticated } = useAuth()

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

  const [filteredJobs, setFilteredJobs] = useState(jobData)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 6

  // Get company logo
  const getCompanyLogo = (company) => {
    return companyLogos[company] || `/placeholder.svg?height=40&width=40&text=${encodeURIComponent(company)}`
  }

  // Get days ago
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

  // Apply filters to jobs
  const applyFilters = useCallback(
    (filterOptions) => {
      let result = [...jobData]

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
    [sortBy],
  )

  // Total number of pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

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

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Apply filters when they change
  useEffect(() => {
    applyFilters(filters)
  }, [filters, applyFilters])

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
            <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 mr-4">
              <FaArrowLeft
                size={40}
                className="p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
              />
            </button>
            <h1 className="xs:text-2xl xs:font-extrabold md:text-3xl md:font-bold text-gray-800">All Latest Jobs</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort By Dropdown */}
            <div className="hidden md:block">
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

            {/* Filter Button */}
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
        </div>

        {/* Sort By Dropdown - Mobile Only */}
        <div className="md:hidden mb-4 md:mx-10 lg:mx-24">
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
          <div className="flex flex-wrap gap-2 md:mx-10 lg:mx-24 mb-4">
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

        {/* Job Listings */}
        {currentJobs.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-blue-200 transition-shadow duration-300 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center mb-3">
                    <img
                      src={getCompanyLogo(job.company) || "/placeholder.svg"}
                      alt={`${job.company} logo`}
                      className="w-12 h-12 rounded-xl p-1 mr-3 object-contain border border-gray-200"
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
                <div className="mt-3 flex items-center gap-2">
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

                {/* Buttons Container */}
                <div className="flex items-center justify-between mt-4 border-t border-gray-200 pt-3">
                  <button
                    onClick={() => handleApplyNow(job)}
                    className={`px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ${isAuthenticated ? "" : "cursor-not-allowed"}`}
                    disabled={!isAuthenticated}
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
          <div className="col-span-full text-center py-10">
            <p className="text-xl text-gray-600">No jobs match your filter criteria</p>
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
              className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
        {/* Pagination Controls */}
        {filteredJobs.length > 0 && (
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
        )}

        {/* Toggle Page */}
        {isTogglePageOpen && <TogglePage jobTitle={selectedJob?.title} onClose={() => setIsTogglePageOpen(false)} />}
      </div>
    </div>
  )
}

export default AllLatestJobs

