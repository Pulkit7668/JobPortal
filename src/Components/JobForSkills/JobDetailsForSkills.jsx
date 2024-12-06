import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jobs } from "./JobData";
import { FaArrowLeft } from "react-icons/fa";

// Mock user profile skills
const userSkills = ["React", "JavaScript", "HTML", "CSS", "Node"];

// Function to filter jobs based on user's skills
const filterJobsBySkills = (jobs, userSkills) => {
  return jobs.filter((job) =>
    job.skills.some((skill) => userSkills.includes(skill))
  );
};

function JobDetailsForSkills() {
  const filteredJobs = filterJobsBySkills(jobs, userSkills);
  const navigate = useNavigate();

  return (
    <div className="p-6 mx-20 mt-10">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 mb-10"
      >
        <FaArrowLeft size={40} className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300" />
      </button>
      <h2 className="text-2xl font-bold mb-4">More Jobs for Your Skills</h2>
      {filteredJobs.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-full p-4 bg-white border border-gray-200 rounded-xl hover:shadow-blue-200 hover:shadow-lg hover:border-blue-700 transition-shadow duration-300 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <div className="mt-2">
                <span className="text-xs text-gray-600">
                  Skills: <strong>{job.skills.join(", ")}</strong>
                </span>
              </div>
              <div className="flex items-center justify-end">
                <div className="mt-3">
                  <button className="px-3 py-2 text-sm font-semibold text-blue-700">
                    Apply Now
                  </button>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/jobforskills/job/${job.id}`}
                    className="px-3 py-2 text-sm font-semibold text-blue-700"
                  >
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs available for your skills at the moment.</p>
      )}
    </div>
  );
}

export default JobDetailsForSkills;
