import React, { useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { jobs } from "./JobDataForSkills";
import TogglePage from "../TogglePage/TogglePage";
import { useAuth } from "../../Context/AuthContext";

// Mock user profile skills
const userSkills = ["React", "JavaScript", "HTML", "CSS", "Docker"];

// Function to filter jobs based on user's skills
const filterJobsBySkills = (jobs, userSkills) => {
  return jobs.filter((job) =>
    job.skills.some((skill) => userSkills.includes(skill))
  );
};

function JobsForSkills() {
  const { isLoggedIn } = useAuth();
  const filteredJobs = filterJobsBySkills(jobs, userSkills);
  const jobsToShow = filteredJobs.slice(0, 8);
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="p-6 lg:mx-20 mt-10">
      {/* Heading and View More Alignment */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-2xl font-bold xs:text-lg">Jobs Matching Your Skills</h2>
        {filteredJobs.length > 4 && (
          <div className="flex items-center">
            <Link
              to={{ pathname: "/jobforskills", state: { jobs: filteredJobs } }}
              className="mr-2 text-gray-800 hover:text-blue-600 transition-all duration-300"
            >
              View more
            </Link>
            <FaCircleArrowRight size={20} className="text-black" />
          </div>
        )}
      </div>

      {jobsToShow.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobsToShow.map((job) => (
            <div
              key={job.id}
              className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600 mb-1">{job.company}</p>
              <div className="flex items-center">
                <CiLocationOn size={14} className="text-gray-500" />
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-600">
                  Experience: <strong>{job.experience}</strong>
                </p>
                <p className="text-xs text-gray-600">
                  Salary: <strong>{job.salary}</strong>
                </p>
                <span className="text-xs text-gray-600">
                  Skills: <strong>{job.skills.join(", ")}</strong>
                </span>
              </div>
              <div className="flex items-center xs:justify-evenly lg:justify-around md:justify-end">
                <div className="mt-3">
                  <button
                    onClick={() => handleApplyNow(job)}
                    className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
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

          {/* Toggle Page */}
          {isTogglePageOpen && (
            <TogglePage
              jobTitle={selectedJob?.title}
              onClose={() => setISTogglePageOpen(false)}
            />
          )}
        </div>
      ) : (
        <p>No jobs available for your skills at the moment.</p>
      )}
    </div>
  );
}

export default JobsForSkills;