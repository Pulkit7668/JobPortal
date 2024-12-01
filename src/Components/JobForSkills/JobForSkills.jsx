import React from "react";
import { FaCircleArrowRight } from "react-icons/fa6";

// Mock job data (In a real scenario, this data will be fetched from an API)
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    skills: ["React", "JavaScript", "HTML", "CSS"],
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Dev Solutions",
    location: "New York, NY",
    skills: ["Node.js", "JavaScript", "MongoDB", "Express"],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Innovatech",
    location: "San Francisco, CA",
    skills: ["React", "Node.js", "JavaScript", "MongoDB"],
  },
  {
    id: 4,
    title: "Web Developer",
    company: "Webify",
    location: "Remote",
    skills: ["HTML", "CSS", "JavaScript"],
  },
];

// Mock user profile skills
const userSkills = ["React", "JavaScript", "HTML", "CSS"]; // Example skills from user's profile

// Function to check if the job matches the user's skills
const filterJobsBySkills = (jobs, userSkills) => {
  return jobs.filter((job) =>
    job.skills.some((skill) => userSkills.includes(skill))
  );
};

function JobsForSkills() {
  const filteredJobs = filterJobsBySkills(jobs, userSkills);

  return (
    <div className="p-6 mx-20 mt-10">
       <h2 className="text-2xl font-bold mb-4">Jobs Matching Your Skills</h2>
      {filteredJobs.length > 0 ? (
        <div className="flex flex-wrap space-x-8">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4 border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <div className="mt-2">
                <span className="text-xs text-gray-600">
                  Skills:{" "}
                  <strong>{job.skills.join(", ")}</strong>
                </span>
              </div>
              <div className="mt-3">
              <button className="px-3 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                Apply Now
              </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center mb-5 cursor-pointer">
           <p className="mr-2 hover:text-blue-600 transition duration-300">View more</p>
           <FaCircleArrowRight size={24} />
          </div>
        </div>
      ) : (
        <p>No jobs available for your skills at the moment.</p>
      )}
    </div>
  );
}

export default JobsForSkills;

