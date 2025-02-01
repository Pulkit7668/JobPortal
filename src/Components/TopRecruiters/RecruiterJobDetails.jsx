import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recruitersData } from "./recruitersData";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import TogglePage from "../TogglePage/TogglePage";

function RecruiterJobDetails() {
  const { recruiterId, jobId } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  const handleMoreDetailsClick = (jobItem) => {
    setSelectedJob(jobItem);
  };

  const toggleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find the recruiter based on the recruiterId
  const recruiter = recruitersData.find((r) => r.id === parseInt(recruiterId));

  if (!recruiter) {
    return <p>Recruiter not found.</p>;
  }

  // Use selectedJob state to render the right column job details
  const job = selectedJob || recruiter.jobs.find((job) => job.jobId === parseInt(jobId));

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-6 hover:text-blue-700 transition duration-300 lg:ml-24 xs:ml-5 xs:mt-10 lg:mt-10"
      >
        <FaArrowLeft
          size={40}
          className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
        />
      </button>
      <div className="flex p-6 lg:mx-20">
        {/* Left Column: Job List */}
        <div className="w-1/4 pr-6 h-full overflow-y-auto scrollable xs:hidden lg:block">
          <h3 className="text-xl font-bold mb-4">Job Listings</h3>
          <div className="flex flex-col gap-2">
            {recruiter.jobs.map((jobItem) => (
              <div
                key={jobItem.jobId}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800">{jobItem.title}</h3>
                <p className="text-sm text-gray-500">{jobItem.location}</p>
                <p className="text-gray-600 font-medium">Skills: {jobItem.skills}</p>
                <div className="flex items-center mt-3 justify-between">
                  <button
                    onClick={() => handleApplyNow(jobItem)}
                    className="px-3 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleMoreDetailsClick(jobItem)}
                    className="text-sm text-blue-700"
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Job Details */}
        <div className="lg:w-[70%] h-full bg-gray-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h2>
            <div
              onClick={toggleSaveJob}
              className="cursor-pointer transition-all duration-300"
            >
              {isSaved ? (
                <FaHeart size={24} className="text-red-500" />
              ) : (
                <FaRegHeart size={24} className="text-gray-400" />
              )}
            </div>
          </div>
          <p className="text-lg text-gray-700 mb-4">Experience: <span className="font-semibold">{job.experience}</span></p>
          <p className="text-lg text-gray-700 mb-4">Salary: <span className="font-semibold">{job.salary}</span></p>
          <p className="text-sm text-gray-600 mb-4">{job.description}</p>

          <div className="mb-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Requirements</h3>
              <p className="text-sm text-gray-600">{job.requirements}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Skills</h3>
              <p className="text-sm text-gray-600">{job.skills}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Education</h3>
              <p className="text-sm text-gray-600">{job.education}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Responsibilities</h3>
              <ul className="list-disc pl-5">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="text-sm text-gray-600 mb-2">{responsibility}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-8 flex justify-center md:justify-end">
            <button
              onClick={() => handleApplyNow(job)}
              className="bg-blue-600 text-white py-2 px-4 font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Apply Now
            </button>
          </div>

          {/* Toggle Page */}
          {isTogglePageOpen && (
            <TogglePage
              jobTitle={selectedJob?.title}
              onClose={() => setISTogglePageOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default RecruiterJobDetails;
