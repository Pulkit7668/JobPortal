import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recruitersData } from "../../apis/recruitersData";
import { FaArrowLeft } from "react-icons/fa";

function RecruiterJobDetails() {
  const { recruiterId, jobId } = useParams();
  const navigate = useNavigate();
  
  // Find the recruiter based on the recruiterId
  const recruiter = recruitersData.find((r) => r.id === parseInt(recruiterId));

  // Find the job based on the jobId
  const job = recruiter ? recruiter.jobs.find((job) => job.jobId === parseInt(jobId)) : null;

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="p-6 lg:mx-20">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-6 hover:text-blue-700 transition duration-300"
      >
        <FaArrowLeft
          size={40}
          className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
        />
      </button>
      
      {/* Job Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h2>
      <p className="text-lg text-gray-700 mb-4">Experience: <span className="font-semibold">{job.experience}</span></p>
      <p className="text-lg text-gray-700 mb-4">Salary: <span className="font-semibold">{job.salary}</span></p>
      <p className="text-sm text-gray-600 mb-4">{job.description}</p>

      {/* Job Details Card */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
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

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Tools</h3>
          <ul className="list-disc pl-5">
            {job.tools.map((tool, index) => (
              <li key={index} className="text-sm text-gray-600 mb-2">{tool}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-8 flex justify-center md:justify-end">
        <button
          className="bg-blue-600 text-white py-3 px-8 font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default RecruiterJobDetails;