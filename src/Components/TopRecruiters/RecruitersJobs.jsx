// import { useState, useEffect, useCallback } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { recruitersData } from "./recruitersData"
// import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa"
// import { CiLocationOn } from "react-icons/ci"
// import TogglePage from "../TogglePage/TogglePage"
// import FilterPanel from "../FilterForJob/FilterPanel"
// import { Filter } from "lucide-react"
// import { useAuth } from "../../Context/AuthContext"

// function RecruitersJob() {
//   const { recruiterId } = useParams()
//   const navigate = useNavigate()
//   const [isFilterOpen, setIsFilterOpen] = useState(false)
//   const [sortBy, setSortBy] = useState("sort-by")
//   const { isAuthenticated } = useAuth()

//   // Find recruiter data
//   const recruiter = recruitersData.find((r) => r.id === Number.parseInt(recruiterId))

//   // Get initial jobs for the recruiter
//   const initialJobs = recruiter ? recruiter.jobs : []

//   // Filter states
//   const [filters, setFilters] = useState({
//     easyApply: false,
//     datePosted: "anytime",
//     experienceLevel: "All Levels",
//     jobType: "All Types",
//     workType: "All Types",
//     location: "All Locations",
//     nearbyLocation: false,
//     isVerified: false,
//     industry: "All Industries",
//     companySize: "All Sizes",
//     selectedLocations: [],
//   })

//   const [filteredJobs, setFilteredJobs] = useState(initialJobs)

//   // Apply filters to jobs
//   const applyFilters = useCallback(
//     (filterOptions) => {
//       let result = recruiter ? [...recruiter.jobs] : []

//       // Filter by easy apply
//       if (filterOptions.easyApply) {
//         result = result.filter((job) => job.easyApply === true)
//       }

//       // Filter by date posted
//       if (filterOptions.datePosted !== "anytime") {
//         const now = new Date()
//         const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

//         result = result.filter((job) => {
//           const postDate = new Date(job.posted_date)
//           const diffTime = Math.abs(today - postDate)
//           const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

//           if (filterOptions.datePosted === "past 24 hours") {
//             return diffDays <= 1
//           } else if (filterOptions.datePosted === "past week") {
//             return diffDays <= 7
//           }
//           return true
//         })
//       }

//       // Filter by job type if any selected
//       if (filterOptions.jobType !== "All Types") {
//         result = result.filter((job) => job.type?.toLowerCase().includes(filterOptions.jobType.toLowerCase()))
//       }

//       // Filter by experience level if any selected
//       if (filterOptions.experienceLevel !== "All Levels") {
//         result = result.filter((job) => {
//           if (filterOptions.experienceLevel === "Entry Level" && job.experience.includes("0-2")) return true
//           if (filterOptions.experienceLevel === "Mid Level" && job.experience.includes("3-5")) return true
//           if (filterOptions.experienceLevel === "Senior Level" && job.experience.includes("5+")) return true
//           if (filterOptions.experienceLevel === "Executive" && job.experience.includes("10+")) return true
//           return false
//         })
//       }

//       // Filter by work type
//       if (filterOptions.workType !== "All Types") {
//         result = result.filter((job) => {
//           if (filterOptions.workType === "Remote" && job.location.toLowerCase().includes("remote")) return true
//           if (filterOptions.workType === "On-Site" && !job.location.toLowerCase().includes("remote")) return true
//           if (filterOptions.workType === "Hybrid" && job.location.toLowerCase().includes("hybrid")) return true
//           return false
//         })
//       }

//       // Filter by selected locations (multiple)
//       if (filterOptions.selectedLocations && filterOptions.selectedLocations.length > 0) {
//         result = result.filter((job) => {
//           return filterOptions.selectedLocations.some((location) =>
//             job.location.toLowerCase().includes(location.toLowerCase()),
//           )
//         })
//       }

//       // Filter by nearby location
//       if (filterOptions.nearbyLocation) {
//         // In a real app, this would use geolocation
//         // For now, just simulate nearby locations
//         result = result.filter((job) =>
//           ["New York", "San Francisco", "Chicago"].some((loc) =>
//             job.location.toLowerCase().includes(loc.toLowerCase()),
//           ),
//         )
//       }

//       // Filter by verified companies
//       if (filterOptions.isVerified) {
//         result = result.filter((job) => job.isVerified === true)
//       }

//       // Filter by industry
//       if (filterOptions.industry !== "All Industries") {
//         result = result.filter((job) => job.industry?.toLowerCase().includes(filterOptions.industry.toLowerCase()))
//       }

//       // Filter by company size
//       if (filterOptions.companySize !== "All Sizes") {
//         result = result.filter((job) => job.companySize === filterOptions.companySize)
//       }

//       // Sort the results
//       if (sortBy === "recent") {
//         result.sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date))
//       } else if (sortBy === "salary-high") {
//         result.sort((a, b) => {
//           const salaryA = Number.parseInt(a.salary.replace(/[^0-9]/g, ""))
//           const salaryB = Number.parseInt(b.salary.replace(/[^0-9]/g, ""))
//           return salaryB - salaryA
//         })
//       } else if (sortBy === "salary-low") {
//         result.sort((a, b) => {
//           const salaryA = Number.parseInt(a.salary.replace(/[^0-9]/g, ""))
//           const salaryB = Number.parseInt(b.salary.replace(/[^0-9]/g, ""))
//           return salaryA - salaryB
//         })
//       }

//       setFilteredJobs(result)
//       setCurrentPage(1)
//     },
//     [recruiter, sortBy],
//   )

//   // States for pagination
//   const [currentPage, setCurrentPage] = useState(1)
//   const jobsPerPage = 6

//   // State for the toggle page (Apply Now modal)
//   const [isTogglePageOpen, setISTogglePageOpen] = useState(false)
//   const [selectedJob, setSelectedJob] = useState(null)

//   // Handle applying for a job (open Apply Now modal)
//   const handleApplyNow = (job) => {
//     setSelectedJob(job)
//     setISTogglePageOpen(true)
//   }

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [currentPage])

//   // Apply filters when they change
//   useEffect(() => {
//     applyFilters(filters)
//   }, [filters, applyFilters])

//   if (!recruiter) {
//     return <p className="text-center text-red-500">Recruiter not found.</p>
//   }

//   // Calculate total number of pages for jobs
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

//   // Get the jobs for the current page
//   const indexOfLastJob = currentPage * jobsPerPage
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob)

//   // Handle page change for pagination
//   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber)

//   return (
//     <div className="flex min-h-screen">
//       {/* Filter Panel */}
//       <FilterPanel
//         isOpen={isFilterOpen}
//         onClose={() => setIsFilterOpen(false)}
//         onApplyFilters={applyFilters}
//         filters={filters}
//         setFilters={setFilters}
//       />

//       <div className="flex-1 p-6 lg:ml-72 mb-5 mt-10">
//         <div className="flex items-center justify-between mb-10">
//           <div className="flex items-center">
//             <button onClick={() => navigate(-1)} className="text-blue-600 transition duration-300">
//               <FaArrowLeft
//                 size={40}
//                 className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
//               />
//             </button>
//             <h2 className="text-2xl font-bold">{recruiter.name} - Job Openings</h2>
//           </div>

//           {/* Sort By Dropdown */}
//           <div className="hidden md:block mb-4">
//             <select
//               value={sortBy}
//               onChange={(e) => {
//                 setSortBy(e.target.value)
//                 applyFilters(filters)
//               }}
//               className="bg-white border border-gray-300 px-3 py-2 rounded-md text-gray-700 shadow-sm focus:ring focus:ring-blue-500 text-sm"
//             >
//               <option value="sort-by">Sort By</option>
//               <option value="relevance">Relevance</option>
//               <option value="recent">Most Recent</option>
//               <option value="salary-high">Salary (High to Low)</option>
//               <option value="salary-low">Salary (Low to High)</option>
//             </select>
//           </div>

//           {/* Filter Button for Mobile */}
//           <div className="flex items-center xs:block lg:hidden">
//             <button
//               onClick={() => setIsFilterOpen(!isFilterOpen)}
//               className="ml-4 flex items-center border border-black rounded-xl p-2 text-blue-600 hover:text-blue-700 cursor-pointer"
//             >
//               <Filter size={24} className="mr-1" />
//               <span className="hidden sm:inline">Filter</span>
//             </button>
//           </div>
//         </div>

//         {/* Sort By Dropdown - Mobile Only */}
//         <div className="md:hidden mb-4">
//           <select
//             value={sortBy}
//             onChange={(e) => {
//               setSortBy(e.target.value)
//               applyFilters(filters)
//             }}
//             className="bg-white border border-gray-300 px-3 py-2 rounded-md text-gray-700 shadow-sm focus:ring focus:ring-blue-500 text-sm w-full"
//           >
//             <option value="sort-by">Sort By</option>
//             <option value="relevance">Relevance</option>
//             <option value="recent">Most Recent</option>
//             <option value="salary-high">Salary (High to Low)</option>
//             <option value="salary-low">Salary (Low to High)</option>
//           </select>
//         </div>

//         <p className="text-gray-600 mb-4">Location: {recruiter.location}</p>
//         <p className="text-sm text-gray-500">{recruiter.vacancies} Vacancies Available</p>

//         {/* Active Filters Display */}
//         {(filters.easyApply ||
//           filters.datePosted !== "anytime" ||
//           filters.experienceLevel !== "All Levels" ||
//           filters.jobType !== "All Types" ||
//           filters.workType !== "All Types" ||
//           filters.nearbyLocation ||
//           filters.isVerified ||
//           filters.industry !== "All Industries" ||
//           filters.companySize !== "All Sizes" ||
//           (filters.selectedLocations && filters.selectedLocations.length > 0)) && (
//           <div className="flex flex-wrap gap-2 mb-4 mt-4">
//             {filters.easyApply && (
//               <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Easy Apply</span>
//             )}
//             {filters.datePosted !== "anytime" && (
//               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">{filters.datePosted}</span>
//             )}
//             {filters.experienceLevel !== "All Levels" && (
//               <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
//                 {filters.experienceLevel}
//               </span>
//             )}
//             {filters.jobType !== "All Types" && (
//               <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">{filters.jobType}</span>
//             )}
//             {filters.workType !== "All Types" && (
//               <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">{filters.workType}</span>
//             )}
//             {filters.selectedLocations && filters.selectedLocations.length > 0 && (
//               <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
//                 Locations: {filters.selectedLocations.slice(0, 2).join(", ")}
//                 {filters.selectedLocations.length > 2 && ` +${filters.selectedLocations.length - 2}`}
//               </span>
//             )}
//             {filters.nearbyLocation && (
//               <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Nearby Location</span>
//             )}
//             {filters.isVerified && (
//               <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">Verified Only</span>
//             )}
//             {filters.industry !== "All Industries" && (
//               <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">{filters.industry}</span>
//             )}
//             {filters.companySize !== "All Sizes" && (
//               <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">{filters.companySize}</span>
//             )}
//             <button
//               onClick={() =>
//                 setFilters({
//                   easyApply: false,
//                   datePosted: "anytime",
//                   experienceLevel: "All Levels",
//                   jobType: "All Types",
//                   workType: "All Types",
//                   location: "All Locations",
//                   nearbyLocation: false,
//                   isVerified: false,
//                   industry: "All Industries",
//                   companySize: "All Sizes",
//                   selectedLocations: [],
//                 })
//               }
//               className="text-red-600 hover:text-red-800 text-sm underline"
//             >
//               Clear All
//             </button>
//           </div>
//         )}

//         <div className="mt-6">
//           {currentJobs.length > 0 ? (
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//               {currentJobs.map((job) => (
//                 <div
//                   key={job.jobId}
//                   className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-2xl transition-shadow duration-300 relative"
//                 >
//                   <div>
//                     <h3 className="text-2xl mb-2 font-semibold text-gray-800">{job.title}</h3>
//                   </div>
//                   <div className="mt-2">
//                     <div className="flex items-center mb-2">
//                       <CiLocationOn size={14} className="text-gray-500" />
//                       <p className="text-sm text-gray-500">{job.location}</p>
//                     </div>
//                     <p className="text-xs text-gray-600">
//                       Experience: <strong>{job.experience || "Not specified"}</strong>
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       Salary: <strong>{job.salary || "Negotiable"}</strong>
//                     </p>
//                     <div className="mt-2">
//                       <span className="text-xs text-gray-600">
//                         Skills:{" "}
//                         <strong>
//                           {Array.isArray(job.skills) ? job.skills.join(", ") : String(job.skills || "N/A")}
//                         </strong>
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-end">
//                     <button
//                       onClick={() => handleApplyNow(job)}
//                       className={`px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ${isAuthenticated ? "" : "cursor-not-allowed"}`}
//                       disabled={!isAuthenticated}
//                     >
//                       Apply Now
//                     </button>
//                   </div>
//                   <div className="absolute bottom-4 left-4">
//                     <button
//                       onClick={() => navigate(`/recruiters/${recruiterId}/jobs/${job.jobId}`)}
//                       className="text-blue-600 font-semibold"
//                     >
//                       More Detail
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">No jobs available for this recruiter.</p>
//           )}

//           {/* Pagination Controls with Icons */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-6 items-center">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
//               >
//                 <FaChevronLeft size={15} />
//               </button>
//               <span className="px-4 py-2 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
//               >
//                 <FaChevronRight size={15} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Toggle Page for Apply Now */}
//         {isTogglePageOpen && <TogglePage jobTitle={selectedJob?.title} onClose={() => setISTogglePageOpen(false)} />}
//       </div>
//     </div>
//   )
// }

// export default RecruitersJob


// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { recruitersData } from "./recruitersData"
// import { FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa"
// import { CiLocationOn } from "react-icons/ci"
// import TogglePage from "../TogglePage/TogglePage"
// import { useAuth } from "../../Context/AuthContext"

// function RecruitersJob() {
//   const { recruiterId } = useParams()
//   const navigate = useNavigate()
//   const [sortBy, setSortBy] = useState("sort-by")
//   const { isAuthenticated } = useAuth()

//   // Find recruiter data
//   const recruiter = recruitersData.find((r) => r.id === Number.parseInt(recruiterId))

//   // Get jobs for the recruiter
//   const [jobs, setJobs] = useState(recruiter ? recruiter.jobs : [])

//   // States for pagination
//   const [currentPage, setCurrentPage] = useState(1)
//   const [jobsPerPage, setJobsPerPage] = useState(6) // Will adjust based on screen size

//   // State for the toggle page (Apply Now modal)
//   const [isTogglePageOpen, setISTogglePageOpen] = useState(false)
//   const [selectedJob, setSelectedJob] = useState(null)

//   // Handle applying for a job (open Apply Now modal)
//   const handleApplyNow = (job) => {
//     setSelectedJob(job)
//     setISTogglePageOpen(true)
//   }

//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [currentPage])

//   // Adjust jobs per page based on screen size
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) { // Mobile (xs)
//         setJobsPerPage(4)
//       } else if (window.innerWidth < 1024) { // Tablet (md)
//         setJobsPerPage(6)
//       } else { // Desktop
//         setJobsPerPage(6)
//       }
//     }

//     // Set initial value
//     handleResize()

//     // Add event listener
//     window.addEventListener('resize', handleResize)

//     // Clean up
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   // Apply sorting when it changes
//   useEffect(() => {
//     if (!recruiter) return

//     const sortedJobs = [...recruiter.jobs]

//     // Sort the results
//     if (sortBy === "recent") {
//       sortedJobs.sort((a, b) => new Date(b.posted_date) - new Date(a.posted_date))
//     } else if (sortBy === "salary-high") {
//       sortedJobs.sort((a, b) => {
//         const salaryA = Number.parseInt(a.salary.replace(/[^0-9]/g, ""))
//         const salaryB = Number.parseInt(b.salary.replace(/[^0-9]/g, ""))
//         return salaryB - salaryA
//       })
//     } else if (sortBy === "salary-low") {
//       sortedJobs.sort((a, b) => {
//         const salaryA = Number.parseInt(a.salary.replace(/[^0-9]/g, ""))
//         const salaryB = Number.parseInt(b.salary.replace(/[^0-9]/g, ""))
//         return salaryA - salaryB
//       })
//     }

//     setJobs(sortedJobs)
//     setCurrentPage(1)
//   }, [recruiter, sortBy])

//   if (!recruiter) {
//     return <p className="text-center text-red-500">Recruiter not found.</p>
//   }

//   // Calculate total number of pages for jobs
//   const totalPages = Math.ceil(jobs.length / jobsPerPage)

//   // Get the jobs for the current page
//   const indexOfLastJob = currentPage * jobsPerPage
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage
//   const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob)

//   // Handle page change for pagination
//   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber)

//   return (
//     <div className="flex min-h-screen">
//       <div className="flex-1 p-4 md:p-6 mb-5 mt-5 md:mt-10">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-10 gap-4">
//           <div className="flex items-center">
//             <button onClick={() => navigate(-1)} className="text-blue-600 transition duration-300">
//               <FaArrowLeft
//                 size={30}
//                 className="mr-2 p-1.5 md:mr-3 md:p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
//               />
//             </button>
//             <h2 className="text-xl md:text-2xl font-bold">{recruiter.name} - Job Openings</h2>
//           </div>

//           {/* Sort By Dropdown */}
//           <div className="w-full md:w-auto">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="w-full md:w-auto bg-white border border-gray-300 px-3 py-2 rounded-md text-gray-700 shadow-sm focus:ring focus:ring-blue-500 text-sm"
//             >
//               <option value="sort-by">Sort By</option>
//               <option value="relevance">Relevance</option>
//               <option value="recent">Most Recent</option>
//               <option value="salary-high">Salary (High to Low)</option>
//               <option value="salary-low">Salary (Low to High)</option>
//             </select>
//           </div>
//         </div>

//         <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">Location: {recruiter.location}</p>
//         <p className="text-xs md:text-sm text-gray-500">{recruiter.vacancies} Vacancies Available</p>

//         <div className="mt-4 md:mt-6">
//           {currentJobs.length > 0 ? (
//             <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//               {currentJobs.map((job) => (
//                 <div
//                   key={job.jobId}
//                   className="p-3 md:p-4 border border-gray-200 bg-white rounded-lg hover:shadow-2xl transition-shadow duration-300 relative"
//                 >
//                   <div>
//                     <h3 className="text-lg md:text-xl lg:text-2xl mb-1 md:mb-2 font-semibold text-gray-800">{job.title}</h3>
//                   </div>
//                   <div className="mt-1 md:mt-2">
//                     <div className="flex items-center mb-1 md:mb-2">
//                       <CiLocationOn size={14} className="text-gray-500" />
//                       <p className="text-xs md:text-sm text-gray-500">{job.location}</p>
//                     </div>
//                     <p className="text-xs text-gray-600">
//                       Experience: <strong>{job.experience || "Not specified"}</strong>
//                     </p>
//                     <p className="text-xs text-gray-600">
//                       Salary: <strong>{job.salary || "Negotiable"}</strong>
//                     </p>
//                     <div className="mt-1 md:mt-2">
//                       <span className="text-xs text-gray-600">
//                         Skills:{" "}
//                         <strong>
//                           {Array.isArray(job.skills) ? job.skills.join(", ") : String(job.skills || "N/A")}
//                         </strong>
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between mt-3 md:mt-4">
//                     <button
//                       onClick={() => navigate(`/recruiters/${recruiterId}/jobs/${job.jobId}`)}
//                       className="text-blue-600 font-semibold text-sm md:text-base"
//                     >
//                       More Detail
//                     </button>
//                     <button
//                       onClick={() => handleApplyNow(job)}
//                       className={`px-3 py-1 md:px-5 md:py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 text-sm md:text-base ${isAuthenticated ? "" : "cursor-not-allowed"}`}
//                       disabled={!isAuthenticated}
//                     >
//                       Apply Now
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">No jobs available for this recruiter.</p>
//           )}

//           {/* Pagination Controls with Icons */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-4 md:mt-6 items-center">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
//               >
//                 <FaChevronLeft size={12} className="md:size-15" />
//               </button>
//               <span className="px-3 py-1 md:px-4 md:py-2 text-sm md:text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
//               >
//                 <FaChevronRight size={12} className="md:size-15" />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Toggle Page for Apply Now */}
//         {isTogglePageOpen && <TogglePage jobTitle={selectedJob?.title} onClose={() => setISTogglePageOpen(false)} />}
//       </div>
//     </div>
//   )
// }

// export default RecruitersJob

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
    console.log("Job saved:", jobId)
    setMenuOpen(null)
  }

  const handleShareJob = (jobId) => {
    if (!isAuthenticated) {
      alert("Please log in to share jobs.")
      return
    }
    console.log("Job shared:", jobId)
    setMenuOpen(null)
  }

  const handleRateCompany = (companyName) => {
    if (!isAuthenticated) {
      alert("Please log in to rate companies.")
      return
    }
    console.log("Rating company:", companyName)
    setMenuOpen(null)
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
                      <FaBriefcase className="mr-1" />
                      <span className="font-semibold mr-1">Experience:</span> {job.experience}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center">
                      <BiDollarCircle className="mr-1" />
                      <span className="font-semibold mr-1">Salary:</span> {job.salary}
                    </p>
                  </div>

                  <div className="mt-1 flex items-center gap-1">
                    <FaLightbulb className="text-gray-600" />
                    <p className="text-xs font-semibold text-gray-600">Skills:</p>
                    <div className="flex items-start gap-1">
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