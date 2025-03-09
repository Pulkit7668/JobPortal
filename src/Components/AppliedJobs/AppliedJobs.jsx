"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown, ChevronUp, X, Eye, Trash, ArrowLeft } from "lucide-react"

const AppliedJobs = () => {
  // Sample data for applied jobs
  const [appliedJobs, setAppliedJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp Ltd.",
      location: "New York, NY",
      salary: "$80,000 - $100,000",
      appliedDate: "2025-03-01",
      status: "Pending Review",
      description: "Frontend developer position focusing on React and modern JavaScript frameworks.",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "San Francisco, CA",
      salary: "$90,000 - $110,000",
      appliedDate: "2025-02-28",
      status: "Interview Scheduled",
      description: "UI/UX designer role creating intuitive user interfaces for web and mobile applications.",
    },
    {
      id: 3,
      title: "React Developer",
      company: "InnovateX Pvt Ltd.",
      location: "Austin, TX",
      salary: "$85,000 - $105,000",
      appliedDate: "2025-02-25",
      status: "Rejected",
      description: "React developer position building complex web applications with modern state management.",
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "WebSolutions Inc.",
      location: "Chicago, IL",
      salary: "$95,000 - $120,000",
      appliedDate: "2025-02-20",
      status: "Pending Review",
      description: "Full stack developer role working with React, Node.js, and MongoDB.",
    },
    {
      id: 5,
      title: "JavaScript Engineer",
      company: "CodeMasters",
      location: "Seattle, WA",
      salary: "$90,000 - $115,000",
      appliedDate: "2025-02-15",
      status: "Interview Scheduled",
      description: "JavaScript engineer position focusing on frontend frameworks and performance optimization.",
    },
    {
      id: 6,
      title: "JavaScript Engineer",
      company: "CodeMasters",
      location: "Seattle, WA",
      salary: "$90,000 - $115,000",
      appliedDate: "2025-02-15",
      status: "Interview Scheduled",
      description: "JavaScript engineer position focusing on frontend frameworks and performance optimization.",
    },
    {
      id: 7,
      title: "JavaScript Engineer",
      company: "CodeMasters",
      location: "Seattle, WA",
      salary: "$90,000 - $115,000",
      appliedDate: "2025-02-15",
      status: "Interview Scheduled",
      description: "JavaScript engineer position focusing on frontend frameworks and performance optimization.",
    },
    {
      id: 8,
      title: "JavaScript Engineer",
      company: "CodeMasters",
      location: "Seattle, WA",
      salary: "$90,000 - $115,000",
      appliedDate: "2025-02-15",
      status: "Interview Scheduled",
      description: "JavaScript engineer position focusing on frontend frameworks and performance optimization.",
    },
    {
      id: 9,
      title: "JavaScript Engineer",
      company: "CodeMasters",
      location: "Seattle, WA",
      salary: "$90,000 - $115,000",
      appliedDate: "2025-02-15",
      status: "Interview Scheduled",
      description: "JavaScript engineer position focusing on frontend frameworks and performance optimization.",
    },
    {
      id: 10,
      title: "JavaScript Engineer",
      company: "CodeMasters",
      location: "Seattle, WA",
      salary: "$90,000 - $115,000",
      appliedDate: "2025-02-15",
      status: "Interview Scheduled",
      description: "JavaScript engineer position focusing on frontend frameworks and performance optimization.",
    },
  ])

  // State for interactive features
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortConfig, setSortConfig] = useState({ key: "appliedDate", direction: "desc" })
  const [selectedJob, setSelectedJob] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Handle sorting
  const requestSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Handle job deletion/withdrawal
  const handleWithdraw = (id) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      setAppliedJobs(appliedJobs.filter((job) => job.id !== id))
      if (selectedJob && selectedJob.id === id) {
        setSelectedJob(null)
      }
    }
  }

  // Filter and sort jobs
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = [...appliedJobs]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((job) => job.status === statusFilter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })

    return filtered
  }, [appliedJobs, searchTerm, statusFilter, sortConfig])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedJobs.length / itemsPerPage)
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedJobs.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedJobs, currentPage])

  // Get unique statuses for filter dropdown
  const statuses = ["All", ...new Set(appliedJobs.map((job) => job.status))]

  return (
    <div className="mx-auto mt-5 p-10">
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        <span>Back</span>
      </button>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Applied Jobs</h2>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search jobs or companies..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setSearchTerm("")}>
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <div className="w-full md:w-48">
          <select
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Jobs table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border-b cursor-pointer" onClick={() => requestSort("title")}>
                  <div className="flex items-center">
                    Job Title
                    {sortConfig.key === "title" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </th>
                <th className="p-3 border-b cursor-pointer" onClick={() => requestSort("company")}>
                  <div className="flex items-center">
                    Company
                    {sortConfig.key === "company" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  className="p-3 border-b cursor-pointer hidden md:table-cell"
                  onClick={() => requestSort("appliedDate")}
                >
                  <div className="flex items-center">
                    Applied Date
                    {sortConfig.key === "appliedDate" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </th>
                <th className="p-3 border-b cursor-pointer" onClick={() => requestSort("status")}>
                  <div className="flex items-center">
                    Status
                    {sortConfig.key === "status" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      ))}
                  </div>
                </th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{job.title}</td>
                    <td className="p-3">{job.company}</td>
                    <td className="p-3 hidden md:table-cell">{job.appliedDate}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === "Pending Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : job.status === "Interview Scheduled"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button
                          className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                          onClick={() => setSelectedJob(job)}
                          title="View details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                          onClick={() => handleWithdraw(job.id)}
                          title="Withdraw application"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    No applied jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Job details modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedJob.title}</h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setSelectedJob(null)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-lg font-medium">{selectedJob.company}</p>
                  <p className="text-gray-600">{selectedJob.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Salary Range</p>
                    <p className="font-medium">{selectedJob.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Applied On</p>
                    <p className="font-medium">{selectedJob.appliedDate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                      selectedJob.status === "Pending Review"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedJob.status === "Interview Scheduled"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedJob.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Job Description</p>
                  <p className="mt-1">{selectedJob.description}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setSelectedJob(null)}
                >
                  Close
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={() => {
                    handleWithdraw(selectedJob.id)
                    setSelectedJob(null)
                  }}
                >
                  Withdraw Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppliedJobs

