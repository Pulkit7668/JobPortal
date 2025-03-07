// import React, { useCallback, useEffect, useState } from "react"
// import { filterJobData } from "./FilterJobData"
// import { useNavigate } from "react-router-dom"
// import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaCircle, FaDotCircle } from "react-icons/fa"
// import { CiLocationOn } from "react-icons/ci"
// import TogglePage from "../TogglePage/TogglePage"
// import FilterPanel from "../FilterPanel"
// import { Filter } from "lucide-react"

// const JobCategoryPage = ({ category }) => {
//   const navigate = useNavigate()
//   const [isTogglePageOpen, setIsTogglePageOpen] = useState(false)
//   const [selectedJob, setSelectedJob] = useState(null)
//   const [currentPage, setCurrentPage] = useState(1)
//   const jobsPerPage = 6
//   const [isFilterOpen, setIsFilterOpen] = useState(false)

//   // Get initial jobs for the category
//   const initialJobs = filterJobData[category.toLowerCase()] || []

//   // filter states
//   const [filters, setFilters] = useState({
//     jobType: [],
//     experienceLevel: [],
//     salaryRange: [],
//     skills: [],
//   })

//   const [filteredJobs, setFilteredJobs] = useState(initialJobs)
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

//   // Apply filters to jobs
//   const applyFilters = useCallback(
//     (filterOptions) => {
//       let result = [...initialJobs]

//       // Filter by job type if any selected
//       if (filterOptions.jobType.length > 0) {
//         result = result.filter((job) =>
//           filterOptions.jobType.some((type) => job.type?.toLowerCase().includes(type.toLowerCase())),
//         )
//       }

//       // Filter by experience level if any selected
//       if (filterOptions.experienceLevel.length > 0) {
//         result = result.filter((job) =>
//           filterOptions.experienceLevel.some((level) => {
//             if (level === "Entry Level" && job.experience.includes("0-2")) return true
//             if (level === "Mid Level" && job.experience.includes("3-5")) return true
//             if (level === "Senior" && job.experience.includes("5+")) return true
//             if (level === "Executive" && job.experience.includes("10+")) return true
//             return false
//           }),
//         )
//       }

//       // Filter by salary range if any selected
//       if (filterOptions.salaryRange.length > 0) {
//         result = result.filter((job) => {
//           const jobSalary = Number.parseInt(job.salary.replace(/[^0-9]/g, ""))

//           return filterOptions.salaryRange.some((range) => {
//             if (range === "0-30,000") {
//               return jobSalary <= 30000
//             } else if (range === "30,000-60,000") {
//               return jobSalary > 30000 && jobSalary <= 60000
//             } else if (range === "60,000-90,000") {
//               return jobSalary > 60000 && jobSalary <= 90000
//             } else if (range === "90,000+") {
//               return jobSalary > 90000
//             }
//             return true
//           })
//         })
//       }

//       // Filter by skills if any selected
//       if (filterOptions.skills.length > 0) {
//         result = result.filter((job) =>
//           filterOptions.skills.some((skill) =>
//             job.skills.some((jobSkill) => jobSkill.toLowerCase().includes(skill.toLowerCase())),
//           ),
//         )
//       }

//       setFilteredJobs(result)
//       setCurrentPage(1) // Reset to first page when filters change
//     },
//     [initialJobs],
//   )

//   // Apply filters when they change
//   useEffect(() => {
//     applyFilters(filters)
//   }, [filters, applyFilters])

//   useEffect(() => {
//     window.scrollTo(0, 0)
//     console.log("Category:", category)
//     console.log("Jobs:", filteredJobs)
//   }, [category, filteredJobs])

//   const handleApplyNow = (job) => {
//     setSelectedJob(job)
//     setIsTogglePageOpen(true)
//   }

//   // Get the jobs for the current page
//   const indexOfLastJob = currentPage * jobsPerPage
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//     window.scrollTo(0, 0)
//   }

//   return (
//     <div className="p-6 lg:mx-20 mt-10">
//       {/* Filter panel */}
//       <FilterPanel
//         isOpen={isFilterOpen}
//         onClose={() => setIsFilterOpen(false)}
//         onApplyFilters={setFilters}
//         filters={filters}
//         setFilters={setFilters}
//       />

//       {/* Overlay when filter is open */}
//       {isFilterOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsFilterOpen(false)} />
//       )}

//       <div className="flex items-center mb-10 lg:mr-24">
//         <div className="flex items-center">
//           <button onClick={() => navigate(-1)} className="text-blue-600 transition duration-300" aria-label="Go back">
//             <FaArrowLeft
//               size={40}
//               className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
//             />
//           </button>
//           <h2 className="text-2xl font-bold">{category} Job Listing</h2>
//         </div>
//         {/* Filter Button */}
//         <button
//           onClick={() => setIsFilterOpen(true)}
//           className="ml-auto flex items-center border border-black rounded-xl p-2 text-blue-600 hover:text-blue-700 cursor-pointer"
//         >
//           <Filter size={24} className="mr-1" />
//           <span className="hidden sm:inline">Filter</span>
//         </button>
//       </div>

//       {filteredJobs.length === 0 ? (
//         <p>No jobs available in this category.</p>
//       ) : (
//         <>
//           <div className="flex flex-wrap gap-6">
//             {currentJobs.map((job) => (
//               <div
//                 key={job.id}
//                 className="p-4 w-full sm:w-[48%] lg:w-[30%] border border-gray-200 bg-white rounded-lg hover:shadow-xl transition-shadow duration-300"
//               >
//                 <h3 className="text-2xl mb-2 font-semibold text-gray-800">{job.title}</h3>
//                 <p className="text-sm font-semibold text-gray-600">{job.company}</p>

//                 <div className="mt-2">
//                   <div className="flex items-center mb-2">
//                     <CiLocationOn size={14} className="text-gray-500" />
//                     <p className="text-sm text-gray-500">{job.location}</p>
//                   </div>
//                   <p className="text-xs text-gray-600">
//                     Experience: <strong>{job.experience}</strong>
//                   </p>
//                   <p className="text-xs text-gray-600">
//                     Salary: <strong>{job.salary}</strong>
//                   </p>
//                   <div className="mt-2">
//                     <span className="text-xs text-gray-600">
//                       Skills: <strong>{job.skills ? job.skills.join(", ") : "N/A"}</strong>
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-end">
//                   <button
//                     onClick={() => navigate(`/jobs/${category.toLowerCase()}/${job.id}`)}
//                     className="mt-4 mr-5 font-semibold text-blue-700"
//                   >
//                     More Details
//                   </button>
//                   <button onClick={() => handleApplyNow(job)} className="mt-4 font-semibold text-blue-700">
//                     Apply Now
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="mt-6 flex justify-center gap-2">
//               <button
//                 disabled={currentPage === 1}
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 className={`px-4 py-2 border rounded-full ${
//                   currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-blue-500 text-white"
//                 }`}
//                 aria-label="Previous page"
//               >
//                 <FaChevronLeft />
//               </button>
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <button
//                   key={index + 1}
//                   onClick={() => handlePageChange(index + 1)}
//                   className={`px-4 py-2 border rounded-full ${
//                     currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
//                   }`}
//                   aria-label={`Page ${index + 1}`}
//                 >
//                   {index + 1 === 1 || index + 1 === 2 || currentPage === index + 1 ? (
//                     index + 1
//                   ) : currentPage === index + 1 ? (
//                     <FaDotCircle />
//                   ) : (
//                     <FaCircle />
//                   )}
//                 </button>
//               ))}
//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 className={`px-4 py-2 border rounded-full ${
//                   currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-blue-500 text-white"
//                 }`}
//                 aria-label="Next page"
//               >
//                 <FaChevronRight />
//               </button>
//             </div>
//           )}
//         </>
//       )}

//       {isTogglePageOpen && <TogglePage jobTitle={selectedJob?.title} onClose={() => setIsTogglePageOpen(false)} />}
//     </div>
//   )
// }

// export default JobCategoryPage

import { useCallback, useEffect, useState } from "react"
import { filterJobData } from "./FilterJobData"
import { companyLogos } from "./FilterJobData"
import { useNavigate } from "react-router-dom"
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaCircle,
  FaDotCircle,
  FaEllipsisV,
  FaBookmark,
  FaShareAlt,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa"
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
  const [menuOpen, setMenuOpen] = useState(null)

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
  }, [category, filteredJobs])

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
  }

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

      <div className="flex items-center mb-10">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between relative"
              >
                {/* Top row with days ago and menu icon */}
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
                        {/* Verified Company Badge */}
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
                    {/* Menu Icon */}
                    <div className="relative">
                      <button onClick={() => toggleMenu(job.id)} className="text-gray-500 hover:text-gray-700">
                        <FaEllipsisV />
                      </button>
                      {/* Dropdown Menu */}
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

                {/* Location */}
                <div className="flex items-center mb-2">
                  <CiLocationOn size={16} className="text-gray-500 mr-1" />
                  <p className="text-sm text-gray-500">{job.location}</p>
                </div>

                {/* Job Details */}
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-600 flex items-center">
                    <span className="font-semibold mr-1">Experience:</span> {job.experience}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center">
                    <span className="font-semibold mr-1">Salary:</span> {job.salary}
                  </p>
                </div>

                {/* Skills */}
                <div className="mt-3 flex items-center gap-2">
                  <p className="text-xs font-semibold text-gray-700">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {job.skills &&
                      job.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                          {skill}
                        </span>
                      ))}
                    {job.skills && job.skills.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        +{job.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleApplyNow(job)}
                    className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => navigate(`/jobs/${category.toLowerCase()}/${job.id}`)}
                    className="px-3 py-2 text-sm font-semibold text-blue-700 hover:underline"
                  >
                    More Details
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

