// import React from "react";

// // Mock data for Indian recruiters
// const recruiters = [
//   {   
//     id: 1,
//     name: "Tata Consultancy Services (TCS)",
//     vacancies: 250,
//     location: "Mumbai, Maharashtra",
//   },
//   {
//     id: 2,
//     name: "Infosys",
//     vacancies: 200,
//     location: "Bengaluru, Karnataka",
//   },
//   {
//     id: 3,
//     name: "Wipro",
//     vacancies: 180,
//     location: "Noida, Uttar Pradesh",
//   },
//   {
//     id: 4,
//     name: "Tech Mahindra",
//     vacancies: 150,
//     location: "Pune, Maharashtra",
//   },
//   {
//     id: 5,
//     name: "HCL Technologies",
//     vacancies: 120,
//     location: "Noida, Uttar Pradesh",
//   },
//   {
//     id: 6,
//     name: "Accenture India",
//     vacancies: 100,
//     location: "Chennai, Tamil Nadu",
//   },
//   {
//     id: 7,
//     name: "Cognizant",
//     vacancies: 80,
//     location: "Kolkata, West Bengal",
//   },
//   {
//     id: 8,
//     name: "IBM India",
//     vacancies: 60,
//     location: "Bengaluru, Karnataka",
//   },
// ];

// // Sort recruiters by the number of vacancies (in descending order)
// const sortedRecruiters = recruiters.sort((a, b) => b.vacancies - a.vacancies);

// function TopRecruiters() {
//   return (
//     <div className="p-6 mx-20 mt-10">
//       <h2 className="text-2xl font-bold mb-4">Top Recruiters</h2>
//       {sortedRecruiters.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {sortedRecruiters.map((recruiter) => (
//             <div
//               key={recruiter.id}
//               className="p-4 border border-gray-200 rounded-lg hover:shadow-2xl transition-shadow duration-300"
//             >
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {recruiter.name}
//               </h3>
//               <p className="text-gray-600">{recruiter.location}</p>
//               <p className="text-sm text-gray-500">{recruiter.vacancies} Vacancies</p>
//               <button className="mt-3 text-blue-600  font-semibold">
//                 View Jobs
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No top recruiters available at the moment.</p>
//       )}
//       <div className="flex items-center justify-center">
//          <button className="mt-5 px-4 py-2 font-semibold bg-white text-black border border-black rounded-xl hover:bg-gray-50 transition duration-300">View More</button>
//       </div>
//     </div>
//   );
// }

// export default TopRecruiters;

import React from "react";

// Mock data for Indian recruiters with images
const recruiters = [
  {
    id: 1,
    name: "Tata Consultancy Services (TCS)",
    vacancies: 250,
    location: "Mumbai, Maharashtra",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXbUfVwV-mMkk3G3BGg2NOBo9cwqSMAmFevvl6Qf7R9-72RoOy8SKpybI&s",
  },
  {
    id: 2,
    name: "Infosys",
    vacancies: 200,
    location: "Bengaluru, Karnataka",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCz4Caygbm1OdRn3UCg-I-BFozHz7LihZeYiGqDxJF6wGGGepuVGGf4hw&s",
  },
  {
    id: 3,
    name: "Wipro",
    vacancies: 180,
    location: "Noida, Uttar Pradesh",
    image: "https://www.wipro.com/content/dam/wipro/social-icons/wipro_new_logo.svg",
  },
  {
    id: 4,
    name: "Tech Mahindra",
    vacancies: 150,
    location: "Pune, Maharashtra",
    image: "https://www.techmahindra.com/themes/custom/techm/techm_logo.svg",
  },
  {
    id: 5,
    name: "HCL Technologies",
    vacancies: 120,
    location: "Noida, Uttar Pradesh",
    image: "https://www.hcltech.com/themes/custom/hcltech/images/hcltech-new-logo.svg",
  },
  {
    id: 6,
    name: "Accenture India",
    vacancies: 100,
    location: "Chennai, Tamil Nadu",
    image: "data:image/jpeg;base64,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",
  },
  {
    id: 7,
    name: "Cognizant",
    vacancies: 80,
    location: "Kolkata, West Bengal",
    image: "https://cognizant.scene7.com/is/content/cognizant/COG-Logo-2022-1?fmt=png-alpha",
  },
  {
    id: 8,
    name: "IBM India",
    vacancies: 60,
    location: "Bengaluru, Karnataka",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png",
  },
];

// Sort recruiters by the number of vacancies (in descending order)
const sortedRecruiters = recruiters.sort((a, b) => b.vacancies - a.vacancies);

function TopRecruiters() {
  return (
    <div className="p-6 mx-20 mt-10">
      <h2 className="text-2xl font-bold mb-4">Top Recruiters</h2>
      {sortedRecruiters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedRecruiters.map((recruiter) => (
            <div
              key={recruiter.id}
              className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-2xl transition-shadow duration-300 flex items-center"
            >
              <img
                src={recruiter.image}
                alt={recruiter.name}
                className="w-20 h-20 mr-4 object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {recruiter.name}
                </h3>
                <p className="text-gray-600">{recruiter.location}</p>
                <p className="text-sm text-gray-500">{recruiter.vacancies} Vacancies</p>
                <button className="mt-3 text-blue-600 font-semibold">
                  View Jobs
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No top recruiters available at the moment.</p>
      )}
      <div className="flex items-center justify-center">
        <button className="mt-5 px-4 py-2 font-semibold text-black border border-black rounded-xl hover:bg-white transition duration-300">
          View More
        </button>
      </div>
    </div>
  );
}

export default TopRecruiters;
