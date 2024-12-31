import React, { useState } from "react";
import jobData from "./JobOpportunitiesData";
import { FaCircleArrowRight } from "react-icons/fa6";
import TogglePage from "../TogglePage/TogglePage";
import { Link } from "react-router-dom";

const JobOpportunities = () => {
  const [visibleJobs] = useState(2);
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  const handleApplyNow = () => {
    setISTogglePageOpen(true);
  };

  return (
    <div className="mt-12 mb-10 xs:mx-5">
      <div className="flex items-center justify-between mb-5 lg:mx-24">
        <h2 className="text-2xl font-bold">Job Opportunities</h2>
        <div className="flex items-center">
          <Link
            to="/job-opportunities"
            className="mr-2 text-gray-800 hover:text-blue-600 transition-all duration-300"
          >
            View More
          </Link>
          <FaCircleArrowRight size={20} />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-5 md:mx-10 lg:mx-24">
        {jobData.slice(0, visibleJobs).map((job) => (
          <div
            key={job.id}
            className="relative flex xs:flex-col md:flex-row bg-white rounded-xl shadow-md p-4 mb-4 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex-shrink-0">
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="flex-grow mt-4 md:mt-0 md:ml-6">
              <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500 mt-1">
                📍 {job.location} | 💼 {job.type} | 🕒 {job.experience}
              </p>
              <p className="text-green-600 font-semibold mt-2">
                💰 {job.salary}
              </p>
            </div>

            {/* Apply Now Button */}
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => handleApplyNow()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
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

export default JobOpportunities;
