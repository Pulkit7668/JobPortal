import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { recruitersData } from "./recruitersData"
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaEllipsisV, FaBookmark, FaShareAlt, FaStar, FaCheckCircle, FaLightbulb, FaBriefcase } from "react-icons/fa"
import { BiDollarCircle } from "react-icons/bi"
import { CiLocationOn } from "react-icons/ci"
import TogglePage from "../TogglePage/TogglePage"
import { useAuth } from "../../Context/AuthContext"

function RecruitersJob() {
  const { recruiterId } = useParams()
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState("sort-by")
  const { isAuthenticated } = useAuth()
  const [menuOpen, setMenuOpen] = useState(null)

  // Find recruiter data
  const recruiter = recruitersData.find((r) => r.id === Number.parseInt(recruiterId))

  // Get jobs for the recruiter
  const [jobs, setJobs] = useState(recruiter ? recruiter.jobs : [])

  // States for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [jobsPerPage, setJobsPerPage] = useState(6)

  // State for the toggle page (Apply Now modal)
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

  // Menu handlers
  const toggleMenu = (jobId) => {
    setMenuOpen(menuOpen === jobId ? null : jobId)
  }

  const handleSaveJob = (jobId) => {
    if (!isAuthenticated) {
      alert("Please log in to save jobs.")
      return
    }
    setMenuOpen(null)
  }

  const handleShareJob = (jobId) => {
    if (!isAuthenticated) {
      alert("Please log in to share jobs.")
      return
    }
    setMenuOpen(null)
  }

  const handleRateCompany = (companyName) => {
    if (!isAuthenticated) {
      alert("Please log in to rate companies.")
      return
    }
    setMenuOpen(null)
    navigate("/rate-company")
  }

  // Handle applying for a job (open Apply Now modal)
  const handleApplyNow = (job) => {
    setSelectedJob(job)
    setISTogglePageOpen(true)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  // Adjust jobs per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setJobsPerPage(4)
      } else if (window.innerWidth < 1024) {
        setJobsPerPage(6)
      } else {
        setJobsPerPage(6)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Apply sorting when it changes
  useEffect(() => {
    if (!recruiter) return

    const sortedJobs = [...recruiter.jobs]

    if (sortBy === "recent") {
      sortedJobs.sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date))
    } else if (sortBy === "salary-high") {
      sortedJobs.sort((a, b) => {
        const salaryA = Number.parseInt(a.salary.replace(/[^0-9]/g, ""))
        const salaryB = Number.parseInt(b.salary.replace(/[^0-9]/g, ""))
        return salaryB - salaryA
      })
    } else if (sortBy === "salary-low") {
      sortedJobs.sort((a, b) => {
        const salaryA = Number.parseInt(a.salary.replace(/[^0-9]/g, ""))
        const salaryB = Number.parseInt(b.salary.replace(/[^0-9]/g, ""))
        return salaryA - salaryB
      })
    }

    setJobs(sortedJobs)
    setCurrentPage(1)
  }, [recruiter, sortBy])

  if (!recruiter) {
    return <p className="text-center text-red-500">Recruiter not found.</p>
  }

  // Calculate total number of pages for jobs
  const totalPages = Math.ceil(jobs.length / jobsPerPage)

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage
  const indexOfFirstJob = indexOfLastJob - jobsPerPage
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob)

  // Handle page change for pagination
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber)

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
    <div className="flex min-h-screen">
      <div className="flex-1 p-4 md:p-6 mb-5 mt-5 md:mt-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-10 gap-4">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="text-blue-600 transition duration-300">
              <FaArrowLeft
                size={30}
                className="mr-2 p-1.5 md:mr-3 md:p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
              />
            </button>
            <h2 className="text-xl md:text-2xl font-bold">{recruiter.name} - Job Openings</h2>
          </div>

          <div className="w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto bg-white border border-gray-300 px-3 py-2 rounded-md text-gray-700 shadow-sm focus:ring focus:ring-blue-500 text-sm"
            >
              <option value="sort-by">Sort By</option>
              <option value="relevance">Relevance</option>
              <option value="recent">Most Recent</option>
              <option value="salary-high">Salary (High to Low)</option>
              <option value="salary-low">Salary (Low to High)</option>
            </select>
          </div>
        </div>

        <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Location: {recruiter.location}</p>
        <p className="text-xs md:text-sm text-gray-500">{recruiter.vacancies} Vacancies Available</p>

        <div className="mt-4 md:mt-6">
          {currentJobs.length > 0 ? (
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {currentJobs.map((job) => (
                <div
                  key={job.jobId}
                  className="flex flex-col bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <img
                        src={job.companyLogo || "/placeholder.svg"}
                        alt={`${recruiter.name} logo`}
                        className="w-12 h-12 rounded-xl p-1 mr-3 object-contain border border-gray-200"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                        <div className="flex items-center">
                          <p className="text-gray-600 mr-2">{recruiter.name}</p>
                          <FaCheckCircle size={12} className="text-green-500" title="Verified Company" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mr-2">
                        {getDaysAgo(job.posted_date)}
                      </span>
                      <div className="relative">
                        <button 
                          onClick={() => toggleMenu(job.jobId)} 
                          disabled={!isAuthenticated}
                          className={`text-gray-500 hover:text-gray-700 ${!isAuthenticated ? "cursor-not-allowed opacity-50" : ""}`}
                        >
                          <FaEllipsisV />
                        </button>
                        {menuOpen === job.jobId && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                              <button
                                onClick={() => handleSaveJob(job.jobId)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <FaBookmark className="mr-2" /> Save Job
                              </button>
                              <button
                                onClick={() => handleShareJob(job.jobId)}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              >
                                <FaShareAlt className="mr-2" /> Share Job
                              </button>
                              <button
                                onClick={() => handleRateCompany(recruiter.name)}
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
                      <FaBriefcase className="mr-1 text-blue-500"/>
                      <span className="font-semibold mr-1">Experience:</span> {job.experience}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <BiDollarCircle className="mr-1 text-green-500"/>
                      <span className="font-semibold mr-1">Salary:</span> {job.salary}
                    </p>
                  </div>

                  <div className="mt-1 flex items-start flex-row gap-1">
                    <FaLightbulb className="text-yellow-500"/>
                    <p className="text-xs font-semibold text-gray-600">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-gray-600">
                          {Array.isArray(job.skills) ? job.skills.join(", ") : String(job.skills || "N/A")}
                       </span>
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
                    <button
                      onClick={() => navigate(`/recruiters/${recruiterId}/jobs/${job.jobId}`)}
                      className="px-3 py-2 text-sm font-semibold text-blue-700 hover:underline"
                    >
                      More Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No jobs available for this recruiter.</p>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-4 md:mt-6 items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
              >
                <FaChevronLeft size={12} className="md:size-15" />
              </button>
              <span className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
              >
                <FaChevronRight size={12} className="md:size-15" />
              </button>
            </div>
          )}
        </div>

        {isTogglePageOpen && <TogglePage jobTitle={selectedJob?.title} onClose={() => setISTogglePageOpen(false)} />}
      </div>
    </div>
  )
}

export default RecruitersJob