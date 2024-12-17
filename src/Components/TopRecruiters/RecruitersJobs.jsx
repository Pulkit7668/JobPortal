import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recruitersData } from "./recruitersData";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";

function RecruitersJob() {
  const { recruiterId } = useParams();
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState({});

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prevSavedJobs) => ({
      ...prevSavedJobs,
      [jobId]: !prevSavedJobs[jobId],
    }));
  };

  // Find the recruiter data based on the ID
  const recruiter = recruitersData.find((r) => r.id === parseInt(recruiterId));

  if (!recruiter) {
    return <p>Recruiter not found.</p>;
  }

  return (
    <div className="p-6 lg:mx-20">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-10 transition duration-300"
      >
        <FaArrowLeft
          size={40}
          className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
        />
      </button>
      <h2 className="text-2xl font-bold mb-4">{recruiter.name} - Job Openings</h2>
      <p className="text-gray-600 mb-4">Location: {recruiter.location}</p>
      <p className="text-sm text-gray-500">{recruiter.vacancies} Vacancies Available</p>

      <div className="mt-6">
        {recruiter.jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {recruiter.jobs.map((job) => (
              <div
                key={job.jobId}
                className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-2xl transition-shadow duration-300 relative"
              >
                <h3 className="text-sm font-bold text-gray-800">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{job.description}</p>
                <p className="text-sm text-gray-600 mt-2">Experience: {job.experience}</p>
                <p className="text-sm text-gray-600">Salary: {job.salary}</p>
                <div className="flex items-center justify-end">
                  <button className="mt-3 text-blue-600 font-semibold">Apply Now</button>
                </div>

                {/* More Details Button */}
                <div className="absolute bottom-4 left-4">
                  <button
                    onClick={() => navigate(`/recruiters/${recruiterId}/jobs/${job.jobId}`)}
                    className="text-blue-600 font-semibold"
                  >
                    More Details
                  </button>
                </div>

                {/* Heart Icon for Wishlist */}
                <div
                  onClick={() => toggleSaveJob(job.jobId)}
                  className="absolute top-4 right-4 cursor-pointer text-xl hover:scale-110 transition-transform"
                >
                  {savedJobs[job.jobId] ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs available for this recruiter.</p>
        )}
      </div>
    </div>
  );
}

export default RecruitersJob;