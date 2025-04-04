// import React, {useEffect} from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { recruitersData as companies } from './recruitersData';
// import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaTools, FaExternalLinkAlt } from 'react-icons/fa';

// const CompanyDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const company = companies.find(c => c.id.toString() === id);

//   if (!company) {
//     return <div className="text-center p-6 text-red-500 text-lg">Company not found.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 mt-10 mx-20">
//       <div className="flex items-center">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="text-blue-600 mb-6 hover:text-blue-700 transition duration-300"
//         >
//           <FaArrowLeft
//             size={40}
//             className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
//           />
//         </button>
//         <h1 className="text-4xl font-bold text-gray-800 mb-8">Company Details</h1>
//       </div>

//       {/* Company Card */}
//       <div className="w-full mx-auto bg-white shadow-lg rounded-xl p-6">
//         {/* Company Header */}
//         <div className="flex items-center space-x-4">
//           <img 
//             src={company.image} 
//             alt={company.name} 
//             className="w-16 h-16 object-contain rounded-lg"
//           />
//           <div>
//             <h2 className="text-3xl font-bold text-gray-800">{company.name}</h2>
//             <p className="text-gray-600">{company.industry}</p>
//           </div>
//         </div>

//         {/* Company Details */}
//         <div className="mt-4 space-y-3 text-gray-700">
//           <p className="text-lg">{company.description}</p>
          
//           <p className="flex items-center">
//             <FaMapMarkerAlt className="text-blue-600 mr-2" />
//             <strong>Headquarters:</strong> {company.headquarters}
//           </p>

//           <p className="flex items-center">
//             <FaCalendarAlt className="text-blue-600 mr-2" />
//             <strong>Founded:</strong> {company.founded}
//           </p>

//           <p className="flex items-center">
//             <FaTools className="text-blue-600 mr-2" />
//             <strong>Services:</strong> {company.services ? company.services.join(", ") : "N/A"}
//           </p>
//         </div>

//         {/* Website Link */}
//         <div className="mt-6">
//           <a 
//             href={company.website} 
//             target="_blank" 
//             rel="noopener noreferrer" 
//             className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
//           >
//             Visit Website <FaExternalLinkAlt className="ml-2" />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyDetail;


import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { recruitersData as companies } from "./recruitersData"
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBriefcase,
  FaGraduationCap,
  FaRupeeSign,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
} from "react-icons/fa"

const CompanyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedJob, setExpandedJob] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const company = companies.find((c) => c.id.toString() === id)

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Company Not Found</h2>
          <p className="text-gray-600 mb-4">The company you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const filteredJobs = company.jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleJobExpand = (jobId) => {
    if (expandedJob === jobId) {
      setExpandedJob(null)
    } else {
      setExpandedJob(jobId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-10 mx-20 p-6">
      {/* Header with back button */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-gray-700 hover:text-gray-900 focus:outline-none transition duration-300"
            aria-label="Go back"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-800 truncate">{company.name}</h1>
        </div>
      </header>

      {/* Company Overview */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md flex-shrink-0">
              <img src={company.image || "/placeholder.svg"} alt={company.name} className="w-24 h-24 object-contain" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold">{company.name}</h2>
              <div className="flex flex-col md:flex-row gap-4 mt-3 items-center md:items-start">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center">
                  <FaBriefcase className="mr-2" />
                  <span>{company.vacancies} Open Positions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Available Positions</h3>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title, skills, or description..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Job Cards */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.jobId} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="bg-gray-50 p-4 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleJobExpand(job.jobId)}
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{job.title}</h4>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-gray-500" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1 text-gray-500" />
                          {job.experience}
                        </div>
                        <div className="flex items-center">
                          <FaRupeeSign className="mr-1 text-gray-500" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                    <div>
                      {expandedJob === job.jobId ? (
                        <FaChevronUp className="text-gray-600" />
                      ) : (
                        <FaChevronDown className="text-gray-600" />
                      )}
                    </div>
                  </div>

                  {expandedJob === job.jobId && (
                    <div className="p-4 border-t border-gray-200">
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-700 mb-2">Description</h5>
                        <p className="text-gray-600">{job.description}</p>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-700 mb-2">Requirements</h5>
                        <p className="text-gray-600">{job.requirements}</p>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-700 mb-2">Skills</h5>
                        <p className="text-gray-600">{job.skills}</p>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-700 mb-2">Education</h5>
                        <div className="flex items-start">
                          <FaGraduationCap className="text-gray-500 mt-1 mr-2" />
                          <p className="text-gray-600">{job.education}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-700 mb-2">Responsibilities</h5>
                        <ul className="list-disc pl-5 text-gray-600">
                          {job.responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                          ))}
                        </ul>
                      </div>

                      <button className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">
                        Apply Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No jobs match your search criteria. Try different keywords.
            </div>
          )}
        </div>
      </section>

      {/* Company Location */}
      <section className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Company Location</h3>
          <div className="flex items-start">
            <FaMapMarkerAlt className="text-gray-700 mt-1 mr-3" />
            <div>
              <p className="text-gray-700 font-medium">{company.name}</p>
              <p className="text-gray-600">{company.location}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CompanyDetail

