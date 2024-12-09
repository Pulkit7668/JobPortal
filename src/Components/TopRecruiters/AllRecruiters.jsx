import React from "react";
import { recruitersData } from "./recruitersData";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function AllRecruiters() {
  const navigate = useNavigate();

  return (
    <div className="p-6 mx-10 md:mx-20 mt-10">
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
      <h2 className="text-2xl font-bold mb-6">All Recruiters</h2>
      {recruitersData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recruitersData.map((recruiter) => (
            <div
              key={recruiter.id}
              className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={recruiter.image || "default-avatar.jpg"}
                  alt={recruiter.name}
                  className="w-10 h-10 mr-4 object-contain rounded-full"
                />
                <div>
                  <h3 className="text-sm font-bold text-gray-800">{recruiter.name}</h3>
                  <p className="text-xs text-gray-500">{recruiter.location}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{recruiter.vacancies}</span> Vacancies
              </p>
              <Link
                to={`/recruiters/jobs/${recruiter.id}`}
                className="mt-4 font-semibold text-blue-600 rounded inline-block"
              >
                View Jobs
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No recruiters available at the moment.</p>
      )}
    </div>
  );
}

export default AllRecruiters;

// import React from "react";
// import { recruitersData } from "./recruitersData";
// import { Link, useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";

// // Utility functions
// const sanitizeString = (str) => String(str).replace(/[^a-zA-Z0-9\s.,-]/g, "");
// const validateVacancies = (vacancies) => (Number.isInteger(vacancies) ? vacancies : 0);
// const validateImageURL = (url) => {
//   try {
//     const parsedURL = new URL(url);
//     return parsedURL.protocol === "http:" || parsedURL.protocol === "https:" ? url : "default-avatar.jpg";
//   } catch {
//     return "default-avatar.jpg";
//   }
// };

// // Sanitize and validate recruitersData
// const validatedRecruitersData = recruitersData.map((recruiter) => ({
//   id: sanitizeString(recruiter.id),
//   name: sanitizeString(recruiter.name),
//   location: sanitizeString(recruiter.location),
//   vacancies: validateVacancies(recruiter.vacancies),
//   image: validateImageURL(recruiter.image),
// }));

// function AllRecruiters() {
//   const navigate = useNavigate();

//   return (
//     <div className="p-6 mx-10 md:mx-20 mt-10">
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
//       <h2 className="text-2xl font-bold mb-6">All Recruiters</h2>
//       {validatedRecruitersData.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {validatedRecruitersData.map((recruiter) => (
//             <div
//               key={recruiter.id}
//               className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="flex items-center mb-4">
//                 <img
//                   src={validateImageURL(recruiter.image)}
//                   alt={sanitizeString(recruiter.name) || "Recruiter"}
//                   className="w-10 h-10 mr-4 object-contain rounded-full"
//                 />
//                 <div>
//                   <h3 className="text-sm font-bold text-gray-800">
//                     {sanitizeString(recruiter.name)}
//                   </h3>
//                   <p className="text-xs text-gray-500">{sanitizeString(recruiter.location)}</p>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-600">
//                 <span className="font-semibold">{recruiter.vacancies}</span> Vacancies
//               </p>
//               <Link
//                 to={`/recruiters/jobs/${recruiter.id}`}
//                 className="mt-4 font-semibold text-blue-600 rounded inline-block"
//               >
//                 View Jobs
//               </Link>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-center">No recruiters available at the moment.</p>
//       )}
//     </div>
//   );
// }

// export default AllRecruiters;
