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
import jobData, { companyLogos } from "./RecommendedJobsData"
import TogglePage from "../TogglePage/TogglePage"
import FilterPanel from "../FilterForJob/FilterPanel"

const AllRecommendedJobs = () => {
  const navigate = useNavigate()
  const [isTogglePageOpen, setIsTogglePageOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(null)

  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    salaryRange: [0, Infinity],  // Salary ko open-ended rakho
    skills: [],
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
  const applyFilters = useCallback((filterOptions) => {
    let result = [...jobData];
  
    // Filter by salary range
    result = result.filter((job) => {
      const jobSalaryMatch = job.salary.match(/\d+/g); // Sirf numbers extract karo
      const jobSalary = jobSalaryMatch ? parseInt(jobSalaryMatch[0]) : 0;
      
      return (
        jobSalary >= filterOptions.salaryRange[0] && 
        jobSalary <= filterOptions.salaryRange[1]
      );
    });
  
    setFilteredJobs(result);
    setCurrentPage(1); // Reset pagination
  }, []);
  

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

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Apply filters when they change
  useEffect(() => {
    applyFilters(filters);
    console.log("Filtered Jobs: ", filteredJobs); // Debugging ke liye
  }, [filters, applyFilters]);
  

  return (
    <div className="mt-12 mb-10 xs:mx-5 relative">
      {/* FilterPanel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters)
          applyFilters(newFilters)
        }}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Overlay when filter is open */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsFilterOpen(false)} />
      )}

      <div className="flex items-center justify-between mb-8 md:ml-10 lg:ml-20 md:mr-10 lg:mr-28">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 mr-4">
            <FaArrowLeft
              size={40}
              className="p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
            />
          </button>
          <h1 className="xs:text-2xl xs:font-extrabold md:text-3xl md:font-bold">All Recommended Jobs</h1>
        </div>

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
        <div className="flex flex-wrap gap-2 md:mx-10 lg:mx-24 mb-4">
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

      {/* Job Listings */}
      {currentJobs.length > 0 ? (
        <div className="grid lg:grid-cols-3 xs:grid-cols-1 gap-5 md:mx-10 lg:mx-24">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col bg-white rounded-xl shadow-md p-4 mb-4 hover:shadow-xl transition-shadow duration-300"
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
                    {job.isVerified && <FaCheckCircle size={12} className="text-green-500" title="Verified Company" />}
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
              <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
                <button
                  onClick={() => handleApplyNow(job)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 w-full mr-2"
                >
                  Apply Now
                </button>
                <Link
                  to={`/recommended/job/${job.id}`}
                  className="px-3 py-2 text-sm font-semibold text-blue-700 text-center w-full hover:underline"
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
                jobType: [],
                experienceLevel: [],
                salaryRange: "Any",
                skills: [],
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
  )
}

export default AllRecommendedJobs