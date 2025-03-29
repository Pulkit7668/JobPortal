// import React from "react";
// import { recruitersData } from "./recruitersData";
// import { Link } from 'react-router-dom';
// import { FaCircleArrowRight } from "react-icons/fa6";
// import { CiLocationOn } from "react-icons/ci";

// // Sort recruiters by the number of vacancies (in descending order)
// const sortedRecruiters = recruitersData.sort((a, b) => b.vacancies - a.vacancies);

// function TopRecruiters() {
//   return (
//     <div className="p-6 lg:mx-20 mt-10">
//       <div className="flex items-center justify-between mb-5">
//         <h2 className="text-2xl font-bold">Top Recruiters</h2>
//         <div className="flex items-center">
//           <Link to="/recruiters/all" className="mr-2 text-gray-800 hover:text-blue-600 transition-all duration-300">
//             View More
//           </Link>
//           <FaCircleArrowRight size={20} />
//         </div>
//       </div>
//       {sortedRecruiters.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
//           {sortedRecruiters.map((recruiter) => (
//             <div
//               key={recruiter.id}
//               className="p-4 border border-gray-200 bg-white rounded-xl hover:shadow-2xl transition-shadow duration-300 flex"
//             >
//               <img
//                 src={recruiter.image}
//                 alt={recruiter.name}
//                 className="w-10 h-10 mr-4 object-contain"
//               />
//               <div>
//                 <h3 className="text-sm font-bold mt-2 mb-2 text-gray-800">
//                   {recruiter.name}
//                 </h3>
//                 <div className="flex items-center mb-2">
//                   <CiLocationOn size={14} className="text-gray-500" />
//                   <p className="text-gray-600">{recruiter.location}</p>
//                 </div>
//                 <p className="text-sm text-gray-500">{recruiter.vacancies} Vacancies</p>
                
//                 <div className="flex items-center justify-between mt-3"> 
//                   {/* View Jobs Button */}
//                   <button className="mt-3 text-blue-600 font-semibold">
//                     <Link to={`/recruiters/jobs/${recruiter.id}`}>
//                       View Jobs
//                     </Link>
//                   </button>
                
//                   {/* Details Button */}
//                   <button className="mt-2 text-blue-600 font-semibold">
//                     <Link to={`/recruiters/details/${recruiter.id}`}>
//                       Details
//                     </Link>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No top recruiters available at the moment.</p>
//       )}
//     </div>
//   );
// }

// export default TopRecruiters;

import React from "react";
import { recruitersData } from "./recruitersData";
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";

// Sort recruiters by the number of vacancies (in descending order)
const sortedRecruiters = recruitersData.sort((a, b) => b.vacancies - a.vacancies);

function TopRecruiters() {
  return (
    <div className="p-4 md:p-6 lg:mx-20 mt-8 md:mt-10">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <h2 className="text-xl md:text-2xl font-bold">Top Recruiters</h2>
        <div className="flex items-center">
          <Link to="/recruiters/all" className="mr-2 text-gray-800 hover:text-blue-600 transition-all duration-300">
            View More
          </Link>
          <FaCircleArrowRight size={20} />
        </div>
      </div>
      {sortedRecruiters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-5">
          {sortedRecruiters.map((recruiter) => (
            <div
              key={recruiter.id}
              className="p-3 md:p-4 border border-gray-200 bg-white rounded-xl hover:shadow-2xl transition-shadow duration-300 flex"
            >
              <img
                src={recruiter.image}
                alt={recruiter.name}
                className="w-8 h-8 md:w-10 md:h-10 mr-3 md:mr-4 object-contain"
              />
              <div className="flex-1">
                <h3 className="text-sm md:text-sm font-bold mt-1 md:mt-2 mb-1 md:mb-2 text-gray-800">
                  {recruiter.name}
                </h3>
                <div className="flex items-center mb-1 md:mb-2">
                  <CiLocationOn size={12} className="text-gray-500" />
                  <p className="text-xs md:text-sm text-gray-600 ml-1">{recruiter.location}</p>
                </div>
                <p className="text-xs md:text-sm text-gray-500">{recruiter.vacancies} Vacancies</p>
                
                <div className="flex items-center justify-between mt-2 md:mt-3 space-x-2">
                  {/* View Jobs Button */}
                  <Link 
                    to={`/recruiters/jobs/${recruiter.id}`}
                    className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 text-blue-600 font-medium hover:bg-blue-50 rounded transition duration-300"
                  >
                    View Jobs
                  </Link>
                
                  {/* Details Button */}
                  <Link 
                    to={`/recruiters/details/${recruiter.id}`}
                    className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 text-blue-600 font-medium hover:bg-blue-50 rounded transition duration-300"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No top recruiters available at the moment.</p>
      )}
    </div>
  );
}

export default TopRecruiters;