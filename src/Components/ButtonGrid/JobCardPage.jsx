// import React from 'react';
// import { jobData } from './JobData';
// import { useNavigate  } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';

// const JobCategoryPage = ({ category }) => {
//   // Fetch the job listings based on the category
//   const jobs = jobData[category.toLowerCase()] || [];
//   const navigate = useNavigate();

//   return (
//     <div className="p-6">
//       <button
//         onClick={() => navigate(-1)}
//         className="text-blue-600 mb-10 transition duration-300"
//         aria-label="Go back"
//       >
//         <FaArrowLeft
//           size={40}
//           className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
//         />
//       </button>
//       <h2 className="text-2xl font-bold mb-4">{category} Job Listings</h2>
//       {jobs.length === 0 ? (
//         <p>No jobs available in this category.</p>
//       ) : (
//         <div className="flex flex-col gap-6">
//           {jobs.map((job) => (
//             <div
//               key={job.id}
//               className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               <h3 className="text-2xl mb-2 font-semibold text-gray-800">{job.title}</h3>
//               <p className="text-sm font-semibold text-gray-600">{job.company}</p>
//               <p className="text-sm font-semibold text-gray-500">{job.description}</p>
              
//               {/* Additional Details */}
//               <div className="mt-4">
//                 <p className="text-sm text-gray-600"><strong>Location:</strong> {job.location}</p>
//                 <p className="text-sm text-gray-600"><strong>Experience Required:</strong> {job.experience}</p>
//                 <p className="text-sm text-gray-600"><strong>Salary:</strong> {job.salary}</p>
//               </div>
              
//               <div className='flex items-center justify-end'>
//                 <button
//                  className="mt-4 mr-5 font-semibold text-blue-700"
//                 >
//                  More Details
//                 </button>
//                 <button
//                  className="mt-4 font-semibold text-blue-700"
//                 >
//                  Apply Job
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobCategoryPage;

import React from 'react';
import { jobData } from './JobData';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const JobCategoryPage = ({ category }) => {
  const jobs = jobData[category.toLowerCase()] || [];
  const navigate = useNavigate();

  return (
    <div className="p-6">
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
      <h2 className="text-2xl font-bold mb-4">{category} Job Listings</h2>
      {jobs.length === 0 ? (
        <p>No jobs available in this category.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl mb-2 font-semibold text-gray-800">{job.title}</h3>
              <p className="text-sm font-semibold text-gray-600">{job.company}</p>
              <p className="text-sm font-semibold text-gray-500">
                {job.description.length > 100 ? job.description.slice(0, 100) + "..." : job.description}
              </p>

              <div className="mt-4">
                <p className="text-sm text-gray-600"><strong>Location:</strong> {job.location}</p>
                <p className="text-sm text-gray-600"><strong>Experience Required:</strong> {job.experience}</p>
                <p className="text-sm text-gray-600"><strong>Salary:</strong> {job.salary}</p>
              </div>

              <div className='flex items-center justify-end'>
                <button
                  onClick={() => navigate(`/job/${job.id}`)}
                  className="mt-4 mr-5 font-semibold text-blue-700"
                >
                  More Details
                </button>
                <button
                  className="mt-4 font-semibold text-blue-700"
                >
                  Apply Job
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobCategoryPage;