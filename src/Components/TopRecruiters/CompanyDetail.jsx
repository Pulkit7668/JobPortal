import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { recruitersData } from "./recruitersData"

const CompanyDetails = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const { recruiterId } = useParams()
  const navigate = useNavigate()
  

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Find company data from recruitersData
  const [company, setCompany] = useState(null)
  const [currentRecruiterId, setCurrentRecruiterId] = useState(null)

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
        reviewCount: foundCompany.jobs?.length || 0,
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

  if (!company) {
    return <div className="p-5 text-center">Loading company details...</div>
  }

  return (
    <div className="max-w-full mx-10 bg-white border border-gray-200 shadow-sm mt-10">
      {/* Header section */}
      <div className="flex items-center p-5 border-b border-gray-200">
        <div className="mr-5">
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
        <div className="flex-grow">
          <h1 className="text-xl font-bold p-2.5 border border-gray-300 bg-gray-100">{company.name}</h1>
        </div>
        <div className="ml-5">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded font-semibold hover:bg-gray-50 transition-colors">
            + Review
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-gray-200">
        <div
          className={`px-5 py-4 cursor-pointer font-medium ${
            activeTab === "overview" ? "border-b-3 border-blue-600 text-blue-600" : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </div>
        <div
          className={`px-5 py-4 cursor-pointer font-medium ${
            activeTab === "reviews" ? "border-b-3 border-blue-600 text-blue-600" : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </div>
        <div
          className={`px-5 py-4 cursor-pointer font-medium ${
            activeTab === "jobs" ? "border-b-3 border-blue-600 text-blue-600" : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("jobs")}
        >
          Jobs
        </div>
      </div>

      {/* Tab content */}
      <div className="p-5">
        {activeTab === "overview" && (
          <div>
            <p className="text-gray-700 leading-relaxed mb-5">
              It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using 'Content here, content here', making it look like readable English.
            </p>

            {/* Company details */}
            <div className="border border-gray-300 mb-5">
              <div className="flex border-b border-gray-200 last:border-b-0">
                <div className="w-48 p-2.5 bg-gray-100 border-r border-gray-200 font-semibold">Website</div>
                <div className="flex-grow p-2.5">{company.details.website}</div>
              </div>
              <div className="flex border-b border-gray-200 last:border-b-0">
                <div className="w-48 p-2.5 bg-gray-100 border-r border-gray-200 font-semibold">Industry</div>
                <div className="flex-grow p-2.5">{company.details.industry}</div>
              </div>
              <div className="flex border-b border-gray-200 last:border-b-0">
                <div className="w-48 p-2.5 bg-gray-100 border-r border-gray-200 font-semibold">Company size</div>
                <div className="flex-grow p-2.5">{company.details.size}</div>
              </div>
              <div className="flex border-b border-gray-200 last:border-b-0">
                <div className="w-48 p-2.5 bg-gray-100 border-r border-gray-200 font-semibold">Headquarters</div>
                <div className="flex-grow p-2.5">{company.details.headquarters}</div>
              </div>
              <div className="flex border-b border-gray-200 last:border-b-0">
                <div className="w-48 p-2.5 bg-gray-100 border-r border-gray-200 font-semibold">Founded</div>
                <div className="flex-grow p-2.5">{company.details.founded}</div>
              </div>
            </div>

            {/* Interview difficulty */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">{company.interviewDifficulty}/5 Interview Difficulty level</h3>

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
                <div className="flex justify-between">
                  <div>
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
                  <div key={index} className="flex items-center mb-4">
                    <div className="w-12 font-bold">{source.percentage}%</div>
                    <div className="w-36">{source.method}</div>
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
              <div className="text-gray-700">{company.recommendRate}% would recommend to a friend</div>
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
              <div className="flex mb-4">
                <input
                  type="text"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-full text-sm"
                  placeholder="e.g. Consultant"
                />
                <div className="ml-2 px-3 py-2 border border-gray-300 rounded flex items-center cursor-pointer">
                  <span className="mr-1">⚙️</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
              <div className="font-bold mt-4">{company.reviewCount}K reviews</div>
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

                      <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
                        <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
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