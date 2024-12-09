// import React from "react";
// import { recruitersData } from "./recruitersData";
// import { Link } from 'react-router-dom';

// // Sort recruiters by the number of vacancies (in descending order)
// const sortedRecruiters = recruitersData.sort((a, b) => b.vacancies - a.vacancies);

// function TopRecruiters() {
//   return (
//     <div className="p-6 mx-20 mt-10">
//       <h2 className="text-2xl font-bold mb-4">Top Recruiters</h2>
//       {sortedRecruiters.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {sortedRecruiters.map((recruiter) => (
//             <div
//               key={recruiter.id}
//               className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-2xl transition-shadow duration-300 flex"
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
//                 <p className="text-gray-600">{recruiter.location}</p>
//                 <p className="text-sm text-gray-500">{recruiter.vacancies} Vacancies</p>
//                 <button className="mt-3 text-blue-600 font-semibold">
//                   <Link to={`/recruiters/jobs/${recruiter.id}`}>
//                     View Jobs
//                   </Link>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No top recruiters available at the moment.</p>
//       )}
//       <div className="flex items-center justify-center">
//         <Link to="/recruiters/all" className="mt-5 px-4 py-2 font-semibold text-black border border-black rounded-xl hover:bg-white transition duration-300">
//           View More
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default TopRecruiters;

import React from "react";
import { recruitersData } from "./recruitersData";
import { Link } from "react-router-dom";

// Utility function to validate and sanitize data
const sanitizeString = (str) => String(str).replace(/[^a-zA-Z0-9\s.,-]/g, "");
const validateVacancies = (vacancies) => (Number.isInteger(vacancies) ? vacancies : 0);
const validateImageURL = (url) => {
  try {
    const parsedURL = new URL(url);
    return parsedURL.protocol === "http:" || parsedURL.protocol === "https:" ? url : "";
  } catch {
    return "";
  }
};

// Sanitize and validate recruitersData
const validatedRecruitersData = recruitersData.map((recruiter) => ({
  id: sanitizeString(recruiter.id),
  name: sanitizeString(recruiter.name),
  location: sanitizeString(recruiter.location),
  vacancies: validateVacancies(recruiter.vacancies),
  image: validateImageURL(recruiter.image),
}));

// Sort recruiters by the number of vacancies (in descending order)
const sortedRecruiters = validatedRecruitersData.sort((a, b) => b.vacancies - a.vacancies);

function TopRecruiters() {
  return (
    <div className="p-6 mx-20 mt-10">
      <h2 className="text-2xl font-bold mb-4">Top Recruiters</h2>
      {sortedRecruiters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedRecruiters.map((recruiter) => (
            <div
              key={recruiter.id}
              className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-2xl transition-shadow duration-300 flex"
            >
              <img
                src={recruiter.image}
                alt={sanitizeString(recruiter.name) || "Recruiter"}
                className="w-10 h-10 mr-4 object-contain"
              />
              <div>
                <h3 className="text-sm font-bold mt-2 mb-2 text-gray-800">
                  {sanitizeString(recruiter.name)}
                </h3>
                <p className="text-gray-600">{sanitizeString(recruiter.location)}</p>
                <p className="text-sm text-gray-500">{recruiter.vacancies} Vacancies</p>
                <button className="mt-3 text-blue-600 font-semibold">
                  <Link to={`/recruiters/jobs/${recruiter.id}`}>
                    View Jobs
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No top recruiters available at the moment.</p>
      )}
      <div className="flex items-center justify-center">
        <Link
          to="/recruiters/all"
          className="mt-5 px-4 py-2 font-semibold text-black border border-black rounded-xl hover:bg-white transition duration-300"
        >
          View More
        </Link>
      </div>
    </div>
  );
}

export default TopRecruiters;
