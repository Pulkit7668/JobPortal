import React from "react";

// Mock data for Indian recruiters
const recruiters = [
  {   
    id: 1,
    name: "Tata Consultancy Services (TCS)",
    vacancies: 250,
    location: "Mumbai, Maharashtra",
  },
  {
    id: 2,
    name: "Infosys",
    vacancies: 200,
    location: "Bengaluru, Karnataka",
  },
  {
    id: 3,
    name: "Wipro",
    vacancies: 180,
    location: "Noida, Uttar Pradesh",
  },
  {
    id: 4,
    name: "Tech Mahindra",
    vacancies: 150,
    location: "Pune, Maharashtra",
  },
  {
    id: 5,
    name: "HCL Technologies",
    vacancies: 120,
    location: "Noida, Uttar Pradesh",
  },
  {
    id: 6,
    name: "Accenture India",
    vacancies: 100,
    location: "Chennai, Tamil Nadu",
  },
  {
    id: 7,
    name: "Cognizant",
    vacancies: 80,
    location: "Kolkata, West Bengal",
  },
  {
    id: 8,
    name: "IBM India",
    vacancies: 60,
    location: "Bengaluru, Karnataka",
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
              className="p-4 border border-gray-200 rounded-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {recruiter.name}
              </h3>
              <p className="text-gray-600">{recruiter.location}</p>
              <p className="text-sm text-gray-500">{recruiter.vacancies} Vacancies</p>
              <button className="mt-3 text-blue-600  font-semibold">
                View Jobs
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No top recruiters available at the moment.</p>
      )}
      <div className="flex items-center justify-center">
         <button className="mt-5 px-4 py-2 font-semibold bg-white text-black border border-black rounded-xl hover:bg-gray-50 transition duration-300">View More</button>
      </div>
    </div>
  );
}

export default TopRecruiters;