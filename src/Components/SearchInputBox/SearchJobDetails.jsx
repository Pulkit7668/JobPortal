import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobsData from './SearchData';
import { FaArrowLeft } from 'react-icons/fa';

function SearchJobDetails() {
  const { jobTitle } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const job = jobsData.find(
      (job) => job.title.toLowerCase().replace(/\s+/g, '-') === jobTitle
    );
    setJobDetails(job);
  }, [jobTitle]);

  if (!jobDetails) {
    return (
      <div className="min-h-screen py-10 px-4 mx-10 text-center">
        <p className="text-gray-500">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 mx-10">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-10 transition duration-300 hover:text-blue-800"
        aria-label="Go back"
      >
        <FaArrowLeft
          size={40}
          className="p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
        />
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">{jobDetails.title}</h3>
        <p className="text-gray-600 mb-2"><strong>Skills:</strong> {jobDetails.skills.join(', ')}</p>
        <p className="text-gray-600 mb-2"><strong>Location:</strong> {jobDetails.location}</p>
        <p className="text-gray-600 mb-4"><strong>Experience:</strong> {jobDetails.experience} years</p>

        <h4 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h4>
        <p className="text-gray-600 mb-4">{jobDetails.description}</p>

        <h4 className="text-xl font-semibold text-gray-800 mb-2">Salary Range</h4>
        <p className="text-gray-600 mb-4">{jobDetails.salary}</p>

        <h4 className="text-xl font-semibold text-gray-800 mb-2">Company</h4>
        <p className="text-gray-600 mb-4">{jobDetails.company}</p>

        <h4 className="text-xl font-semibold text-gray-800 mb-2">Job Type</h4>
        <p className="text-gray-600 mb-4">{jobDetails.jobType}</p>

        {/* Apply Button */}
        <div className="flex justify-end">
          <button  
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md transition duration-300 hover:bg-blue-700"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchJobDetails;
