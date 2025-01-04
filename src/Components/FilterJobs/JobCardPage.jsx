// import React, { useEffect, useState } from 'react';
// import { filterJobData } from './FilterJobData';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';
// import TogglePage from '../TogglePage/TogglePage';

// const JobCategoryPage = ({ category }) => {
//   const jobs = filterJobData[category.toLowerCase()] || [];
//   const navigate = useNavigate();
//   const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     console.log('Category:', category);
//     console.log('Jobs:', jobs);
//   }, [category, jobs]);

//   const handleApplyNow = (job) => {
//     setSelectedJob(job);
//     setISTogglePageOpen(true);
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="p-6 lg:mx-20">
//       <div className="flex items-center mb-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-blue-600 transition duration-300"
//           aria-label="Go back"
//         >
//           <FaArrowLeft
//             size={40}
//             className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
//           />
//         </button>
//         <h2 className="text-2xl font-bold">{category} Job Listing</h2>
//       </div>
      
//       {jobs.length === 0 ? (
//         <p>No jobs available in this category.</p>
//       ) : (
//         <div className="flex flex-wrap gap-6">
//           {jobs.map((job) => (
//             <div
//               key={job.id}
//               className="p-4 w-full sm:w-[48%] lg:w-[30%] border border-gray-200 bg-white rounded-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               <h3 className="text-2xl mb-2 font-semibold text-gray-800">{job.title}</h3>
//               <p className="text-sm font-semibold text-gray-600">{job.company}</p>
//               <p className="text-sm font-semibold text-gray-500">
//                 {job.description.length > 100
//                   ? job.description.slice(0, 100) + '...'
//                   : job.description}
//               </p>

//               <div className="mt-4">
//                 <p className="text-sm text-gray-600">
//                   <strong>Location:</strong> {job.location}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Experience Required:</strong> {job.experience}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Salary:</strong> {job.salary}
//                 </p>
//               </div>

//               <div className="flex items-center justify-end">
//                 <button
//                   onClick={() => navigate(`/jobs/${category.toLowerCase()}/${job.id}`)}
//                   className="mt-4 mr-5 font-semibold text-blue-700"
//                 >
//                   More Details
//                 </button>
//                 <button
//                   onClick={() => handleApplyNow(job)}
//                   className="mt-4 font-semibold text-blue-700"
//                 >
//                   Apply Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       {isTogglePageOpen && (
//         <TogglePage
//           jobTitle={selectedJob?.title}
//           onClose={() => setISTogglePageOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default JobCategoryPage;


import React, { useEffect, useState } from 'react';
import { filterJobData } from './FilterJobData';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaCircle, FaDotCircle } from 'react-icons/fa';
import TogglePage from '../TogglePage/TogglePage';

const JobCategoryPage = ({ category }) => {
  const jobs = filterJobData[category.toLowerCase()] || [];
  const navigate = useNavigate();
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // Number of jobs to display per page
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('Category:', category);
    console.log('Jobs:', jobs);
  }, [category, jobs]);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="p-6 lg:mx-20">
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
        <h2 className="text-2xl font-bold">{category} Job Listing</h2>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs available in this category.</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-6">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 w-full sm:w-[48%] lg:w-[30%] border border-gray-200 bg-white rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl mb-2 font-semibold text-gray-800">{job.title}</h3>
                <p className="text-sm font-semibold text-gray-600">{job.company}</p>
                <p className="text-sm font-semibold text-gray-500">
                  {job.description.length > 100
                    ? job.description.slice(0, 100) + '...'
                    : job.description}
                </p>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Experience Required:</strong> {job.experience}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Salary:</strong> {job.salary}
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={() => navigate(`/jobs/${category.toLowerCase()}/${job.id}`)}
                    className="mt-4 mr-5 font-semibold text-blue-700"
                  >
                    More Details
                  </button>
                  <button
                    onClick={() => handleApplyNow(job)}
                    className="mt-4 font-semibold text-blue-700"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 border rounded-full ${
                currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'
              }`}
              aria-label="Previous page"
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border rounded-full ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
                aria-label={`Page ${index + 1}`}
              >
                {index + 1 === 1 || index + 1 === 2
                  ? index + 1
                  : currentPage === index + 1
                  ? <FaDotCircle />
                  : <FaCircle />}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 border rounded-full ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-blue-500 text-white'
              }`}
              aria-label="Next page"
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      )}

      {isTogglePageOpen && (
        <TogglePage
          jobTitle={selectedJob?.title}
          onClose={() => setISTogglePageOpen(false)}
        />
      )}
    </div>
  );
};

export default JobCategoryPage;
