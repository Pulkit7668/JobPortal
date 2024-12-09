// import React from "react";
// import { FaCircleArrowRight } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import { jobs } from "./JobData";

// // Mock user profile skills
// const userSkills = ["React", "JavaScript", "HTML", "CSS"];

// // Function to filter jobs based on user's skills
// const filterJobsBySkills = (jobs, userSkills) => {
//   return jobs.filter((job) =>
//     job.skills.some((skill) => userSkills.includes(skill))
//   );
// };

// function JobsForSkills() {
//   const filteredJobs = filterJobsBySkills(jobs, userSkills);
//   const jobsToShow = filteredJobs.slice(0, 4);

//   return (
//     <div className="p-6 mx-20 mt-10">
//       <h2 className="text-2xl font-bold mb-4">Jobs Matching Your Skills</h2>
//       {jobsToShow.length > 0 ? (
//         <div className="flex flex-wrap gap-6">
//           {jobsToShow.map((job) => (
//             <div
//               key={job.id}
//               className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
//             >
//               <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
//               <p className="text-gray-600">{job.company}</p>
//               <p className="text-sm text-gray-500">{job.location}</p>
//               <div className="mt-2">
//                 <span className="text-xs text-gray-600">
//                   Skills: <strong>{job.skills.join(", ")}</strong>
//                 </span>
//               </div>
//               <div className="flex items-center justify-around">
//                 <div className="mt-3">
//                   <button className="px-3 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
//                     Apply Now
//                   </button>
//                 </div>
//                 <div className="mt-3">
//                   <Link
//                     to={`jobforskills/job/${job.id}`}
//                     className="px-3 py-2 text-sm font-semibold text-blue-700"
//                   >
//                     More Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {filteredJobs.length > 4 && (
//             <div className="flex items-center justify-center mb-5 cursor-pointer">
//               <Link
//                 to="/jobforskills"
//                 className="mr-2 hover:text-blue-600 transition duration-300"
//               >
//                 View more
//               </Link>
//               <FaCircleArrowRight size={24} />
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>No jobs available for your skills at the moment.</p>
//       )}
//     </div>
//   );
// }

// export default JobsForSkills;

import React from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { jobs } from "./JobData";

// Mock user profile skills
const userSkills = ["React", "JavaScript", "HTML", "CSS"];

// Function to filter jobs based on user's skills
const filterJobsBySkills = (jobs, userSkills) => {
  return jobs.filter((job) =>
    job.skills.some((skill) => userSkills.includes(skill))
  );
};

function JobsForSkills() {
  const filteredJobs = filterJobsBySkills(jobs, userSkills);
  const jobsToShow = filteredJobs.slice(0, 4);

  return (
    <div className="p-6 mx-20 mt-10">
      <h2 className="text-2xl font-bold mb-4">Jobs Matching Your Skills</h2>
      {jobsToShow.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {jobsToShow.map((job) => (
            <div
              key={job.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <div className="mt-2">
                <span className="text-xs text-gray-600">
                  Skills: <strong>{job.skills.join(", ")}</strong>
                </span>
              </div>
              <div className="flex items-center justify-around">
                <div className="mt-3">
                  <button className="px-3 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                    Apply Now
                  </button>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/jobforskills/job/${job.id}`} // Added `/` to the link path
                    className="px-3 py-2 text-sm font-semibold text-blue-700"
                  >
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {filteredJobs.length > 4 && (
            <div className="flex items-center justify-center mb-5 cursor-pointer">
              <Link
                to={{ pathname: "/jobforskills", state: { jobs: filteredJobs } }} // Passing filtered jobs state
                className="mr-2 hover:text-blue-600 transition duration-300"
              >
                View more
              </Link>
              <FaCircleArrowRight size={24} />
            </div>
          )}
        </div>
      ) : (
        <p>No jobs available for your skills at the moment.</p>
      )}
    </div>
  );
}

export default JobsForSkills;
