import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { filterJobData } from './FilterJobData';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import TogglePage from '../TogglePage/TogglePage';

const FilterJobDetails = () => {
  const { category, jobId } = useParams();
  const navigate = useNavigate();
  const jobs = filterJobData[category.toLowerCase()] || [];
  
  const job = jobs.find((j) => j.id === parseInt(jobId));
  const [isSaved, setIsSaved] = useState(false);
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(job || null);

  // Check if the job is active based on the application deadline
  const isActive = selectedJob
    ? new Date(selectedJob.application_deadline) >= new Date()
    : false;

  const handleApplyNow = () => {
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

  if (!selectedJob) {
    return <p>Job not found</p>;
  }

  return (
    <div className="p-6 lg:mx-20">
      {/* Flex container for Back button and job title */}
      <div className="flex items-center mb-10">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 transition duration-300"
          aria-label="Go back"
        >
          <FaArrowLeft
            size={40}
            className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
          />
        </button>
      </div>

      {/* Flex container for job listings and job details */}
      <div className="flex lg:space-x-6">
        {/* Left Column: Job Listings */}
        <div className="w-1/4 pr-6 h-[10%] overflow-y-auto scrollable xs:hidden lg:block">
          <h3 className="text-xl font-bold mb-4">Job Listings</h3>
          <div className="flex flex-col gap-2">
            {jobs.map((jobItem) => (
              <div
                key={jobItem.id}
                className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800">{jobItem.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{jobItem.location}</p>
                <p className="text-gray-600 font-medium">Application Deadline: {jobItem.application_deadline}</p>
                <div className="flex items-center mt-3 justify-between">
                  <button
                    onClick={() => handleApplyNow(jobItem)}
                    className="px-3 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    disabled={!isActive}
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
        <div className="lg:w-3/4 xs:w-full bg-gray-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
            <div className="flex items-center space-x-4">
              {/* Status */}
              <p className={`font-semibold ${isActive ? 'text-green-600' : 'text-red-600'}`}>
                Status: {isActive ? 'Active' : 'Closed'}
              </p>
              {/* Heart Icon */}
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
          </div>
          <p className="text-lg font-semibold text-gray-600 mb-4">{selectedJob.company}</p>
          <p className="text-gray-800 mb-4">{selectedJob.description}</p>
          <p className="text-sm text-gray-600">
            <strong>Location:</strong> {selectedJob.location}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Experience Required:</strong> {selectedJob.experience}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Salary:</strong> {selectedJob.salary}
          </p>

          <div className="my-4">
            <h3 className="text-lg font-semibold text-gray-800">Responsibilities:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {selectedJob.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="my-4">
            <h3 className="text-lg font-semibold text-gray-800">Requirements:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {selectedJob.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="my-4">
            <h3 className="text-lg font-semibold text-gray-800">Perks:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {selectedJob.perks.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-gray-600">
            <strong>Application Deadline:</strong> {selectedJob.application_deadline}
          </p>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleApplyNow}
              className="px-6 py-2 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={!isActive}
            >
              Apply Now
            </button>
          </div>
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