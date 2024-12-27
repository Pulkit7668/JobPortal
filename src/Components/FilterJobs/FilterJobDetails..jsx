import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { filterJobData } from './FilterJobData';
import { FaArrowLeft } from 'react-icons/fa';
import TogglePage from '../TogglePage/TogglePage';

const FilterJobDetails = () => {
  const { category, jobId } = useParams();
  const navigate = useNavigate();
  const jobs = filterJobData[category.toLowerCase()] || [];
  const job = jobs.find((j) => j.id === parseInt(jobId));
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  if (!job) {
    return <p>Job not found</p>;
  }

  return (
    <div className="p-6 lg:mx-20">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-10 transition duration-300"
        aria-label="Go back"
      >
        <FaArrowLeft
          size={40}
          className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
        />
      </button>
      <div className="p-6 border border-gray-200 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
        <p className="text-lg font-semibold text-gray-600 mb-4">{job.company}</p>
        <p className="text-gray-800 mb-4">{job.description}</p>
        <p className="text-sm text-gray-600">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Experience Required:</strong> {job.experience}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Salary:</strong> {job.salary}
        </p>

        <div className="my-4">
          <h3 className="text-lg font-semibold text-gray-800">Responsibilities:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="my-4">
          <h3 className="text-lg font-semibold text-gray-800">Requirements:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {job.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="my-4">
          <h3 className="text-lg font-semibold text-gray-800">Perks:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {job.perks.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-gray-600">
          <strong>Application Deadline:</strong> {job.application_deadline}
        </p>

        <div className="flex justify-end">
          <button
            onClick={() => handleApplyNow(job)}
            className="mt-4 font-semibold text-blue-700"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Toggle Page */}
      {isTogglePageOpen && (
        <TogglePage
          jobTitle={selectedJob?.title}
          onClose={() => setISTogglePageOpen(false)}
        />
      )}
    </div>
  );
};

export default FilterJobDetails;
