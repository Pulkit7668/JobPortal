import React, { useState } from "react";
import jobData from "./LatestJobData";
import { FaCircleArrowRight } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import TogglePage from "../TogglePage/TogglePage";
import { Link } from "react-router-dom";

const LatestJob = () => {
  const [visibleJobs] = useState(8);
  const [isTogglePageOpen, setIsTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setIsTogglePageOpen(true);
  };

  return (
    <div className="mt-12 mb-10 xs:mx-5">
      <div className="flex items-center justify-between mb-5 lg:mx-24">
        <h2 className="text-2xl font-bold">Latest Jobs</h2>
        <div className="flex items-center">
          <Link
            to="/all-latest-jobs"
            className="mr-2 text-gray-800 hover:text-blue-600 transition-all duration-300"
          >
            View More
          </Link>
          <FaCircleArrowRight size={20} />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 xs:grid-cols-1 gap-5 md:mx-10 lg:mx-24">
        {jobData.slice(0, visibleJobs).map((job) => (
          <div
            key={job.id}
            className="flex flex-col bg-white rounded-xl shadow-md p-4 mb-4 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <div className="flex items-center">
                <CiLocationOn size={14} className="text-gray-500" />
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Experience: <strong>{job.experience}</strong>
              </p>
              <p className="text-xs text-gray-600">
                Salary: <strong>{job.salary}</strong>
              </p>
              <span className="text-xs text-gray-600">
                Skills: <strong>{job.skills.join(", ")}</strong>
              </span>
            </div>

            {/* Buttons at the bottom */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleApplyNow(job)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Apply Now
              </button>
              <Link
                to={`/latest/job/${job.id}`}
                className="px-3 py-2 text-sm font-semibold text-blue-700"
              >
                More Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Toggle Page */}
      {isTogglePageOpen && (
        <TogglePage
          jobTitle={selectedJob?.title}
          onClose={() => setIsTogglePageOpen(false)}
        />
      )}
    </div>
  );
};

export default LatestJob;
