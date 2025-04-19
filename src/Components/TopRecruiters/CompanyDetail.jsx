// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { recruitersData } from "./recruitersData"
// import { AiOutlineExclamationCircle } from "react-icons/ai"

// const CompanyDetails = () => {
//   const [activeTab, setActiveTab] = useState("overview")
//   const { recruiterId } = useParams()
//   const navigate = useNavigate()
//   const [showMenu, setShowMenu] = useState(false)
//   const [reviewFilter, setReviewFilter] = useState("all")
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     window.scrollTo(0, 0)

//     // Check if screen is mobile
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }

//     // Initial check
//     checkMobile()

//     // Add resize listener
//     window.addEventListener("resize", checkMobile)

//     // Cleanup
//     return () => window.removeEventListener("resize", checkMobile)
//   }, [])

//   // Find company data from recruitersData
//   const [company, setCompany] = useState(null)
//   const [currentRecruiterId, setCurrentRecruiterId] = useState(null)

//   // Sample reviews data
//   const reviews = [
//     {
//       id: 1,
//       title: "Great place to work",
//       rating: 5,
//       author: "Former Employee - Software Engineer",
//       date: "Jan 15, 2023",
//       pros: "Good work-life balance, great benefits, supportive management",
//       cons: "Career growth can be slow in some departments",
//       isGood: true,
//     },
//     {
//       id: 2,
//       title: "Challenging but rewarding",
//       rating: 4,
//       author: "Current Employee - Product Manager",
//       date: "Mar 22, 2023",
//       pros: "Innovative projects, competitive salary, learning opportunities",
//       cons: "High pressure environment, long hours during release cycles",
//       isGood: true,
//     },
//     {
//       id: 3,
//       title: "Disappointing experience",
//       rating: 2,
//       author: "Former Employee - Marketing Specialist",
//       date: "Feb 10, 2023",
//       pros: "Good location, nice office space",
//       cons: "Poor management, lack of direction, limited growth opportunities",
//       isGood: false,
//     },
//     {
//       id: 4,
//       title: "Toxic workplace culture",
//       rating: 1,
//       author: "Former Employee - Customer Support",
//       date: "Apr 5, 2023",
//       pros: "Decent pay for the industry",
//       cons: "Toxic management, unrealistic expectations, no work-life balance",
//       isGood: false,
//     },
//     {
//       id: 5,
//       title: "Great benefits but stressful",
//       rating: 3,
//       author: "Current Employee - Data Analyst",
//       date: "May 18, 2023",
//       pros: "Excellent benefits, good pay, interesting projects",
//       cons: "High stress environment, poor communication between departments",
//       isGood: false,
//     },
//     {
//       id: 6,
//       title: "Excellent company culture",
//       rating: 5,
//       author: "Current Employee - HR Manager",
//       date: "Jun 7, 2023",
//       pros: "Supportive environment, good work-life balance, great team",
//       cons: "Some processes could be more efficient",
//       isGood: true,
//     },
//   ]

//   // Filter reviews based on selection
//   const filteredReviews =
//     reviewFilter === "all"
//       ? reviews
//       : reviewFilter === "good"
//         ? reviews.filter((review) => review.isGood)
//         : reviews.filter((review) => !review.isGood)

//   useEffect(() => {
//     // If recruiterId is provided in URL, use it, otherwise default to first company
//     const id = recruiterId ? Number.parseInt(recruiterId) : 1
//     setCurrentRecruiterId(id)

//     const foundCompany = recruitersData.find((r) => r.id === id)

//     if (foundCompany) {
//       setCompany({
//         id: foundCompany.id,
//         name: foundCompany.name,
//         logo: foundCompany.image,
//         rating: 3.4, // Default rating if not available in data
//         reviewCount: 6000, // Changed to match the 6k mentioned
//         recommendRate: 55,
//         interviewDifficulty: 3.1,
//         ceo: {
//           name: "John Smith", // Default CEO info
//           image: "/images/ceo.png",
//           approvalRate: 58,
//         },
//         details: {
//           website: "www.example.com",
//           industry: "Technology",
//           size: foundCompany.vacancies + "+ employees",
//           headquarters: foundCompany.location,
//           founded: 1985,
//         },
//         subratings: [
//           { name: "Diversity and inclusion", score: 3.6 },
//           { name: "Career opportunities", score: 3.3 },
//           { name: "Compensation and benefits", score: 3.3 },
//           { name: "Culture and values", score: 3.1 },
//           { name: "Work/life balance", score: 3.1 },
//           { name: "Senior management", score: 2.9 },
//         ],
//         ratingDistribution: [
//           { stars: 5, percentage: 22 },
//           { stars: 4, percentage: 24 },
//           { stars: 3, percentage: 29 },
//           { stars: 2, percentage: 12 },
//           { stars: 1, percentage: 12 },
//         ],
//         interviewExperience: {
//           positive: 63,
//           neutral: 23,
//           negative: 14,
//         },
//         interviewSources: [
//           { method: "Applied online", percentage: 72 },
//           { method: "In person", percentage: 12 },
//           { method: "Employee referral", percentage: 5 },
//         ],
//         jobs: foundCompany.jobs || [],
//       })
//     }
//   }, [recruiterId])

//   // Generate star rating display
//   const renderStars = (rating) => {
//     const stars = []
//     const fullStars = Math.floor(rating)
//     const hasHalfStar = rating % 1 >= 0.5

//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(
//           <span key={i} className="text-green-600">
//             ★
//           </span>,
//         )
//       } else if (i === fullStars + 1 && hasHalfStar) {
//         stars.push(
//           <span key={i} className="text-green-600">
//             ★
//           </span>,
//         )
//       } else {
//         stars.push(
//           <span key={i} className="text-gray-300">
//             ☆
//           </span>,
//         )
//       }
//     }

//     return stars
//   }

//   if (!company) {
//     return <div className="p-5 text-center">Loading company details...</div>
//   }

//   return (
//     <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 bg-white border border-gray-200 shadow-sm mt-4 sm:mt-6 md:mt-10">
//       {/* Header section */}
//       <div className="flex flex-col sm:flex-row items-center p-4 sm:p-5 border-b border-gray-200">
//         <div className="mb-4 sm:mb-0 sm:mr-5">
//           <div className="w-16 h-16 border border-gray-300 flex items-center justify-center bg-gray-100 text-gray-600 overflow-hidden">
//             {company.logo ? (
//               <img
//                 src={company.logo || "/placeholder.svg"}
//                 alt={company.name}
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               "logo"
//             )}
//           </div>
//         </div>
//         <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
//           <h1 className="text-xl font-bold p-2.5 border border-gray-300 bg-gray-100 w-full">{company.name}</h1>
//         </div>
//         <div className="sm:ml-5">
//           <button className="px-4 py-2 bg-white border border-gray-300 rounded font-semibold hover:bg-gray-50 transition-colors w-full sm:w-auto">
//             + Review
//           </button>
//         </div>
//       </div>

//       {/* Navigation tabs */}
//       <div className="flex overflow-x-auto border-b border-gray-200">
//         <div
//           className={`px-3 sm:px-5 py-3 sm:py-4 cursor-pointer font-medium whitespace-nowrap ${
//             activeTab === "overview" ? "border-b-3 border-blue-600 text-blue-600" : "hover:bg-gray-50"
//           }`}
//           onClick={() => setActiveTab("overview")}
//         >
//           Overview
//         </div>
//         <button
//           className={`px-3 sm:px-5 py-3 sm:py-4 cursor-pointer font-medium whitespace-nowrap ${
//             activeTab === "reviews" ? "border-b-3 border-blue-600 text-blue-600" : "hover:bg-gray-50"
//           }`}
//           onClick={() => navigate("/rate-company")}
//         >
//           Reviews
//         </button>
//         <div
//           className={`px-3 sm:px-5 py-3 sm:py-4 cursor-pointer font-medium whitespace-nowrap ${
//             activeTab === "jobs" ? "border-b-3 border-blue-600 text-blue-600" : "hover:bg-gray-50"
//           }`}
//           onClick={() => setActiveTab("jobs")}
//         >
//           Jobs
//         </div>
//       </div>

//       {/* Tab content */}
//       <div className="p-4 sm:p-5">
//         {activeTab === "overview" && (
//           <div>
//             <p className="text-gray-700 leading-relaxed mb-5">
//               It is a long established fact that a reader will be distracted by the readable content of a page when
//               looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
//               letters, as opposed to using 'Content here, content here', making it look like readable English.
//             </p>

//             {/* Company details */}
//             <div className="border border-gray-300 mb-5 overflow-hidden">
//               <div className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0">
//                 <div className="w-full sm:w-48 p-2.5 bg-gray-100 sm:border-r border-gray-200 font-semibold">
//                   Website
//                 </div>
//                 <div className="flex-grow p-2.5">{company.details.website}</div>
//               </div>
//               <div className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0">
//                 <div className="w-full sm:w-48 p-2.5 bg-gray-100 sm:border-r border-gray-200 font-semibold">
//                   Industry
//                 </div>
//                 <div className="flex-grow p-2.5">{company.details.industry}</div>
//               </div>
//               <div className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0">
//                 <div className="w-full sm:w-48 p-2.5 bg-gray-100 sm:border-r border-gray-200 font-semibold">
//                   Company size
//                 </div>
//                 <div className="flex-grow p-2.5">{company.details.size}</div>
//               </div>
//               <div className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0">
//                 <div className="w-full sm:w-48 p-2.5 bg-gray-100 sm:border-r border-gray-200 font-semibold">
//                   Headquarters
//                 </div>
//                 <div className="flex-grow p-2.5">{company.details.headquarters}</div>
//               </div>
//               <div className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0">
//                 <div className="w-full sm:w-48 p-2.5 bg-gray-100 sm:border-r border-gray-200 font-semibold">
//                   Founded
//                 </div>
//                 <div className="flex-grow p-2.5">{company.details.founded}</div>
//               </div>
//             </div>

//             {/* Interview difficulty */}
//             <div className="mt-8">
//               <div className="flex items-end gap-1 mb-2">
//                 <span className="text-4xl sm:text-5xl font-semibold">{company.interviewDifficulty}</span>
//                 <span className="text-sm sm:text-base text-gray-600 flex items-center">
//                   /5 difficulty
//                   <span className="ml-1 cursor-pointer">
//                     {" "}
//                     <AiOutlineExclamationCircle />
//                   </span>
//                 </span>
//               </div>

//               {/* Interview experience */}
//               <div className="mt-8">
//                 <h3 className="text-lg font-semibold mb-4">Interview experience</h3>
//                 <div className="flex h-5 w-full mb-2">
//                   <div
//                     className="bg-green-600 h-full"
//                     style={{ width: `${company.interviewExperience.positive}%` }}
//                   ></div>
//                   <div
//                     className="bg-gray-500 h-full"
//                     style={{ width: `${company.interviewExperience.neutral}%` }}
//                   ></div>
//                   <div
//                     className="bg-red-500 h-full"
//                     style={{ width: `${company.interviewExperience.negative}%` }}
//                   ></div>
//                 </div>
//                 <div className="flex flex-col sm:flex-row justify-between text-sm sm:text-base">
//                   <div className="mb-2 sm:mb-0">
//                     <span className="text-green-600 font-bold">{company.interviewExperience.positive}%</span> Positive
//                   </div>
//                   <div>
//                     Negative <span className="text-red-500 font-bold">{company.interviewExperience.negative}%</span>
//                   </div>
//                 </div>
//               </div>

//               {/* How others got an interview */}
//               <div className="mt-8">
//                 <h3 className="text-lg font-semibold mb-4">How others got an interview</h3>
//                 {company.interviewSources.map((source, index) => (
//                   <div key={index} className="flex flex-col sm:flex-row sm:items-center mb-4">
//                     <div className="w-full sm:w-12 font-bold mb-1 sm:mb-0">{source.percentage}%</div>
//                     <div className="w-full sm:w-36 mb-1 sm:mb-0">{source.method}</div>
//                     <div className="flex-grow h-5 bg-gray-100">
//                       <div className="h-full bg-gray-700" style={{ width: `${source.percentage}%` }}></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === "reviews" && (
//           <div>
//             {/* Overall rating */}
//             <div className="flex flex-col items-center mb-8">
//               <div className="text-5xl font-bold text-green-600">{company.rating}</div>
//               <div className="my-2 text-2xl space-x-1">{renderStars(company.rating)}</div>
//               <div className="text-gray-700 text-center">{company.recommendRate}% would recommend to a friend</div>
//             </div>

//             {/* Ratings distribution */}
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold mb-4">Ratings distribution</h3>
//               {company.ratingDistribution.map((item, index) => (
//                 <div key={index} className="flex items-center mb-2">
//                   <div className="w-16">{item.stars} stars</div>
//                   <div className="flex-grow h-4 bg-gray-100 mx-4">
//                     <div className="h-full bg-gray-700" style={{ width: `${item.percentage}%` }}></div>
//                   </div>
//                   <div className="w-10">{item.percentage}%</div>
//                 </div>
//               ))}
//             </div>

//             {/* Reviews by job title */}
//             <div className="mt-8">
//               <h3 className="text-lg font-semibold mb-4">Reviews by job title</h3>
//               <div className="flex flex-col sm:flex-row mb-4">
//                 <input
//                   type="text"
//                   className="flex-grow px-4 py-2 border border-gray-300 rounded-full text-sm mb-2 sm:mb-0"
//                   placeholder="e.g. Consultant"
//                 />
//                 <div className="relative sm:ml-2">
//                   <div
//                     className="px-3 py-2 border border-gray-300 rounded flex items-center justify-center sm:justify-start cursor-pointer"
//                     onClick={() => setShowMenu(!showMenu)}
//                   >
//                     <span className="mr-1">⚙️</span>
//                     <span className="font-medium">5</span>
//                   </div>
//                   {showMenu && (
//                     <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//                       <div
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => {
//                           setReviewFilter("all")
//                           setShowMenu(false)
//                         }}
//                       >
//                         All reviews
//                       </div>
//                       <div
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => {
//                           setReviewFilter("good")
//                           setShowMenu(false)
//                         }}
//                       >
//                         Recent good
//                       </div>
//                       <div
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => {
//                           setReviewFilter("bad")
//                           setShowMenu(false)
//                         }}
//                       >
//                         Recent bad
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="font-bold mt-4">{company.reviewCount} reviews</div>
//             </div>

//             {/* Reviews list */}
//             <div className="mt-6 space-y-6">
//               {filteredReviews.map((review) => (
//                 <div key={review.id} className="border border-gray-200 rounded-lg p-4">
//                   <div className="flex flex-col sm:flex-row justify-between items-start">
//                     <div className="mb-2 sm:mb-0">
//                       <h4 className="text-lg font-semibold">{review.title}</h4>
//                       <div className="flex items-center mt-1">
//                         <div className="text-xl text-green-600 mr-2">{renderStars(review.rating)}</div>
//                       </div>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {review.author} - {review.date}
//                       </p>
//                     </div>
//                     <div className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium">
//                       {review.isGood ? "Positive" : "Negative"}
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <div className="mb-3">
//                       <h5 className="font-semibold text-green-600">Pros</h5>
//                       <p className="text-sm mt-1">{review.pros}</p>
//                     </div>
//                     <div>
//                       <h5 className="font-semibold text-red-600">Cons</h5>
//                       <p className="text-sm mt-1">{review.cons}</p>
//                     </div>
//                   </div>

//                   <div className="mt-4 pt-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between">
//                     <div className="text-sm text-gray-500 mb-2 sm:mb-0">Was this review helpful?</div>
//                     <div className="flex space-x-2">
//                       <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Yes</button>
//                       <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">No</button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "jobs" && (
//           <div>
//             {/* Display jobs directly from the company data */}
//             <div className="py-4">
//               <h3 className="text-xl font-semibold mb-6">Available Jobs at {company.name}</h3>

//               {company.jobs && company.jobs.length > 0 ? (
//                 <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//                   {company.jobs.map((job) => (
//                     <div
//                       key={job.jobId}
//                       className="flex flex-col bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
//                     >
//                       <div className="flex justify-between items-start mb-3">
//                         <div>
//                           <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
//                           <p className="text-gray-600">{company.name}</p>
//                         </div>
//                       </div>

//                       <div className="flex items-center mb-2">
//                         <svg
//                           className="w-4 h-4 text-gray-500 mr-1"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                           ></path>
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                           ></path>
//                         </svg>
//                         <p className="text-sm text-gray-500">{job.location}</p>
//                       </div>

//                       <div className="mt-2 space-y-1">
//                         <p className="text-xs text-gray-600 flex items-center">
//                           <svg
//                             className="w-3 h-3 text-gray-500 mr-1"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                             ></path>
//                           </svg>
//                           <span className="font-semibold mr-1">Experience:</span> {job.experience}
//                         </p>
//                         <p className="text-xs text-gray-600 flex items-center">
//                           <svg
//                             className="w-3 h-3 text-gray-500 mr-1"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             ></path>
//                           </svg>
//                           <span className="font-semibold mr-1">Salary:</span> {job.salary}
//                         </p>
//                       </div>

//                       <div className="mt-1 flex items-start flex-row gap-1">
//                         <svg
//                           className="w-3 h-3 text-gray-500 mt-0.5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
//                           ></path>
//                         </svg>
//                         <p className="text-xs font-semibold text-gray-600">Skills:</p>
//                         <div className="flex flex-wrap gap-1">
//                           <span className="text-xs text-gray-600">
//                             {Array.isArray(job.skills) ? job.skills.join(", ") : String(job.skills || "N/A")}
//                           </span>
//                         </div>
//                       </div>

//                       <p className="text-xs text-gray-600 mt-2 line-clamp-2">{job.description}</p>

//                       <div className="flex flex-col sm:flex-row justify-between mt-4 pt-3 border-t border-gray-200">
//                         <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 mb-2 sm:mb-0">
//                           Apply Now
//                         </button>
//                         <button className="px-3 py-2 text-sm font-semibold text-blue-700 hover:underline">
//                           More Details
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-center text-gray-500">No jobs available for this company.</p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CompanyDetails


"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { recruitersData } from "./recruitersData"
import { AiOutlineExclamationCircle } from "react-icons/ai"

const CompanyDetails = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const { recruiterId } = useParams()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [reviewFilter, setReviewFilter] = useState("all")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)

    // Check if screen is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Find company data from recruitersData
  const [company, setCompany] = useState(null)
  const [currentRecruiterId, setCurrentRecruiterId] = useState(null)

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      title: "Great place to work",
      rating: 5,
      author: "Former Employee - Software Engineer",
      date: "Jan 15, 2023",
      pros: "Good work-life balance, great benefits, supportive management",
      cons: "Career growth can be slow in some departments",
      isGood: true,
    },
    {
      id: 2,
      title: "Challenging but rewarding",
      rating: 4,
      author: "Current Employee - Product Manager",
      date: "Mar 22, 2023",
      pros: "Innovative projects, competitive salary, learning opportunities",
      cons: "High pressure environment, long hours during release cycles",
      isGood: true,
    },
    {
      id: 3,
      title: "Disappointing experience",
      rating: 2,
      author: "Former Employee - Marketing Specialist",
      date: "Feb 10, 2023",
      pros: "Good location, nice office space",
      cons: "Poor management, lack of direction, limited growth opportunities",
      isGood: false,
    },
    {
      id: 4,
      title: "Toxic workplace culture",
      rating: 1,
      author: "Former Employee - Customer Support",
      date: "Apr 5, 2023",
      pros: "Decent pay for the industry",
      cons: "Toxic management, unrealistic expectations, no work-life balance",
      isGood: false,
    },
    {
      id: 5,
      title: "Great benefits but stressful",
      rating: 3,
      author: "Current Employee - Data Analyst",
      date: "May 18, 2023",
      pros: "Excellent benefits, good pay, interesting projects",
      cons: "High stress environment, poor communication between departments",
      isGood: false,
    },
    {
      id: 6,
      title: "Excellent company culture",
      rating: 5,
      author: "Current Employee - HR Manager",
      date: "Jun 7, 2023",
      pros: "Supportive environment, good work-life balance, great team",
      cons: "Some processes could be more efficient",
      isGood: true,
    },
  ]

  // Filter reviews based on selection
  const filteredReviews =
    reviewFilter === "all"
      ? reviews
      : reviewFilter === "good"
        ? reviews.filter((review) => review.isGood)
        : reviews.filter((review) => !review.isGood)

  useEffect(() => {
    // If recruiterId is provided in URL, use it, otherwise default to first company
    const id = recruiterId ? Number.parseInt(recruiterId) : 1
    setCurrentRecruiterId(id)

    const foundCompany = recruitersData.find((r) => r.id === id)

    if (foundCompany) {
      setCompany({
        id: foundCompany.id,
        name: foundCompany.name,
        logo: foundCompany.image,
        rating: 3.4, // Default rating if not available in data
        reviewCount: 6000, // Changed to match the 6k mentioned
        recommendRate: 55,
        interviewDifficulty: 3.1,
        ceo: {
          name: "John Smith", // Default CEO info
          image: "/images/ceo.png",
          approvalRate: 58,
        },
        details: {
          website: "www.example.com",
          industry: "Technology",
          size: foundCompany.vacancies + "+ employees",
          headquarters: foundCompany.location,
          founded: 1985,
        },
        subratings: [
          { name: "Diversity and inclusion", score: 3.6 },
          { name: "Career opportunities", score: 3.3 },
          { name: "Compensation and benefits", score: 3.3 },
          { name: "Culture and values", score: 3.1 },
          { name: "Work/life balance", score: 3.1 },
          { name: "Senior management", score: 2.9 },
        ],
        ratingDistribution: [
          { stars: 5, percentage: 22 },
          { stars: 4, percentage: 24 },
          { stars: 3, percentage: 29 },
          { stars: 2, percentage: 12 },
          { stars: 1, percentage: 12 },
        ],
        interviewExperience: {
          positive: 63,
          neutral: 23,
          negative: 14,
        },
        interviewSources: [
          { method: "Applied online", percentage: 72 },
          { method: "In person", percentage: 12 },
          { method: "Employee referral", percentage: 5 },
        ],
        jobs: foundCompany.jobs || [],
      })
    }
  }, [recruiterId])

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="text-green-600">
            ★
          </span>,
        )
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="text-green-600">
            ★
          </span>,
        )
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ☆
          </span>,
        )
      }
    }

    return stars
  }

  // Handle navigation to rate company page
  const handleNavigateToRateCompany = () => {
    navigate("/rate-company")
  }

  if (!company) {
    return <div className="p-5 text-center">Loading company details...</div>
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 bg-white border border-gray-200 shadow-sm mt-4 sm:mt-6 md:mt-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-center p-4 sm:p-5 border-b border-gray-200">
        <div className="mb-4 sm:mb-0 sm:mr-5">
          <div className="w-16 h-16 border border-gray-300 flex items-center justify-center bg-gray-100 text-gray-600 overflow-hidden">
            {company.logo ? (
              <img
                src={company.logo || "/placeholder.svg"}
                alt={company.name}
                className="w-full h-full object-contain"
              />
            ) : (
              "logo"
            )}
          </div>
        </div>
        <div className="flex-grow text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-xl font-bold p-2.5 border border-gray-300 bg-gray-100 w-full">{company.name}</h1>
        </div>
        <div className="sm:ml-5">
          <button
            className="px-4 py-2 bg-white border border-gray-300 rounded font-semibold hover:bg-gray-50 transition-colors w-full sm:w-auto"
            onClick={handleNavigateToRateCompany}
          >
            + Review
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200">
        <div
          className={`px-3 sm:px-5 py-3 sm:py-4 cursor-pointer font-medium whitespace-nowrap ${
            activeTab === "overview" ? "border-b-3 border-blue-600 text-blue-600" : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </div>
        <div
          className={`px-3 sm:px-5 py-3 sm:py-4 cursor-pointer font-medium whitespace-nowrap ${
            activeTab === "reviews" ? "border-b-3 border-blue-600 text-blue-600" : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </div>
        <div
          className={`px-3 sm:px-5 py-3 sm:py-4 cursor-pointer font-medium whitespace-nowrap ${
            activeTab === "jobs" ? "border-b-3 border-blue-600 text-blue-600" : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("jobs")}
        >
          Jobs
        </div>
      </div>

      {/* Tab content */}
      <div className="p-4 sm:p-5">
        {activeTab === "overview" && (
          <div>
            <p className="text-gray-700 leading-relaxed mb-5">
              It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using 'Content here, content here', making it look like readable English.
            </p>

            {/* Company details */}
            <div className="border border-gray-300 mb-5 overflow-hidden">
              <div className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0">
                <div className="w-full sm:w-48 p-2.5 bg-gray-100 sm:border-r border-gray-200 font-semibold">
                  Website
                </div>
                <div className="flex-grow p-2.5">{company.details.website}</div>
              </div>
              <div className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0">
                <div className="w-full sm:w-48 p-2.5 bg-gray-100 sm:border-r border-gray-200 font-semibold">
                  Industry
                </div>
                <div className="flex-grow p-2.5">{company.details.industry}</div>
              </div>
              <div className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0">
                <div className="w-full sm:w-48 p-2.5 bg-gray-100 sm:border-r border-gray-200 font-semibold">
                  Company size
                </div>
                <div className="flex-grow p-2.5">{company.details.size}</div>
              </div>
              <div className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0">
                <div className="w-full sm:w-48 p-2.5 bg-gray-100 sm:border-r border-gray-200 font-semibold">
                  Headquarters
                </div>
                <div className="flex-grow p-2.5">{company.details.headquarters}</div>
              </div>
              <div className="flex flex-col sm:flex-row border-b border-gray-200 last:border-b-0">
                <div className="w-full sm:w-48 p-2.5 bg-gray-100 sm:border-r border-gray-200 font-semibold">
                  Founded
                </div>
                <div className="flex-grow p-2.5">{company.details.founded}</div>
              </div>
            </div>

            {/* Interview difficulty */}
            <div className="mt-8">
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl sm:text-5xl font-semibold">{company.interviewDifficulty}</span>
                <span className="text-sm sm:text-base text-gray-600 flex items-center">
                  /5 difficulty
                  <span className="ml-1 cursor-pointer">
                    {" "}
                    <AiOutlineExclamationCircle />
                  </span>
                </span>
              </div>

              {/* Interview experience */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Interview experience</h3>
                <div className="flex h-5 w-full mb-2">
                  <div
                    className="bg-green-600 h-full"
                    style={{ width: `${company.interviewExperience.positive}%` }}
                  ></div>
                  <div
                    className="bg-gray-500 h-full"
                    style={{ width: `${company.interviewExperience.neutral}%` }}
                  ></div>
                  <div
                    className="bg-red-500 h-full"
                    style={{ width: `${company.interviewExperience.negative}%` }}
                  ></div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between text-sm sm:text-base">
                  <div className="mb-2 sm:mb-0">
                    <span className="text-green-600 font-bold">{company.interviewExperience.positive}%</span> Positive
                  </div>
                  <div>
                    Negative <span className="text-red-500 font-bold">{company.interviewExperience.negative}%</span>
                  </div>
                </div>
              </div>

              {/* How others got an interview */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">How others got an interview</h3>
                {company.interviewSources.map((source, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center mb-4">
                    <div className="w-full sm:w-12 font-bold mb-1 sm:mb-0">{source.percentage}%</div>
                    <div className="w-full sm:w-36 mb-1 sm:mb-0">{source.method}</div>
                    <div className="flex-grow h-5 bg-gray-100">
                      <div className="h-full bg-gray-700" style={{ width: `${source.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {/* Overall rating */}
            <div className="flex flex-col items-center mb-8">
              <div className="text-5xl font-bold text-green-600">{company.rating}</div>
              <div className="my-2 text-2xl space-x-1">{renderStars(company.rating)}</div>
              <div className="text-gray-700 text-center">{company.recommendRate}% would recommend to a friend</div>
            </div>

            {/* Ratings distribution */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Ratings distribution</h3>
              {company.ratingDistribution.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="w-16">{item.stars} stars</div>
                  <div className="flex-grow h-4 bg-gray-100 mx-4">
                    <div className="h-full bg-gray-700" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                  <div className="w-10">{item.percentage}%</div>
                </div>
              ))}
            </div>

            {/* Reviews by job title */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Reviews by job title</h3>
              <div className="flex flex-col sm:flex-row mb-4">
                <input
                  type="text"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-full text-sm mb-2 sm:mb-0"
                  placeholder="e.g. Consultant"
                />
                <div className="relative sm:ml-2">
                  <div
                    className="px-3 py-2 border border-gray-300 rounded flex items-center justify-center sm:justify-start cursor-pointer"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <span className="mr-1">⚙️</span>
                    <span className="font-medium">5</span>
                  </div>
                  {showMenu && (
                    <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setReviewFilter("all")
                          setShowMenu(false)
                        }}
                      >
                        All reviews
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setReviewFilter("good")
                          setShowMenu(false)
                        }}
                      >
                        Recent good
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setReviewFilter("bad")
                          setShowMenu(false)
                        }}
                      >
                        Recent bad
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="font-bold mt-4">{company.reviewCount} reviews</div>
            </div>

            {/* Reviews list */}
            <div className="mt-6 space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start">
                    <div className="mb-2 sm:mb-0">
                      <h4 className="text-lg font-semibold">{review.title}</h4>
                      <div className="flex items-center mt-1">
                        <div className="text-xl text-green-600 mr-2">{renderStars(review.rating)}</div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {review.author} - {review.date}
                      </p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium">
                      {review.isGood ? "Positive" : "Negative"}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-3">
                      <h5 className="font-semibold text-green-600">Pros</h5>
                      <p className="text-sm mt-1">{review.pros}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-600">Cons</h5>
                      <p className="text-sm mt-1">{review.cons}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between">
                    <div className="text-sm text-gray-500 mb-2 sm:mb-0">Was this review helpful?</div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Yes</button>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">No</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div>
            {/* Display jobs directly from the company data */}
            <div className="py-4">
              <h3 className="text-xl font-semibold mb-6">Available Jobs at {company.name}</h3>

              {company.jobs && company.jobs.length > 0 ? (
                <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {company.jobs.map((job) => (
                    <div
                      key={job.jobId}
                      className="flex flex-col bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                          <p className="text-gray-600">{company.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center mb-2">
                        <svg
                          className="w-4 h-4 text-gray-500 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </div>

                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-gray-600 flex items-center">
                          <svg
                            className="w-3 h-3 text-gray-500 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <span className="font-semibold mr-1">Experience:</span> {job.experience}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center">
                          <svg
                            className="w-3 h-3 text-gray-500 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <span className="font-semibold mr-1">Salary:</span> {job.salary}
                        </p>
                      </div>

                      <div className="mt-1 flex items-start flex-row gap-1">
                        <svg
                          className="w-3 h-3 text-gray-500 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          ></path>
                        </svg>
                        <p className="text-xs font-semibold text-gray-600">Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs text-gray-600">
                            {Array.isArray(job.skills) ? job.skills.join(", ") : String(job.skills || "N/A")}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">{job.description}</p>

                      <div className="flex flex-col sm:flex-row justify-between mt-4 pt-3 border-t border-gray-200">
                        <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 mb-2 sm:mb-0">
                          Apply Now
                        </button>
                        <button className="px-3 py-2 text-sm font-semibold text-blue-700 hover:underline">
                          More Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No jobs available for this company.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompanyDetails
