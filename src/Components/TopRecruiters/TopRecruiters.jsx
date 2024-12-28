import React from "react";
import { recruitersData } from "./recruitersData";
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from "react-icons/fa6";

// Sort recruiters by the number of vacancies (in descending order)
const sortedRecruiters = recruitersData.sort((a, b) => b.vacancies - a.vacancies);

function TopRecruiters() {
  return (
    <div className="p-6 lg:mx-20 mt-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold">Top Recruiters</h2>
        <div className="flex items-center">
          <Link to="/recruiters/all" className="px-4 py-2  text-gray-800 hover:text-blue-600 transition-all duration-300">
            View More
          </Link>
          <FaCircleArrowRight size={20} />
        </div>
      </div>
      {sortedRecruiters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
          {sortedRecruiters.map((recruiter) => (
            <div
              key={recruiter.id}
              className="p-4 border border-gray-200 bg-white rounded-xl hover:shadow-2xl transition-shadow duration-300 flex"
            >
              <img
                src={recruiter.image}
                alt={recruiter.name}
                className="w-10 h-10 mr-4 object-contain"
              />
              <div>
                <h3 className="text-sm font-bold mt-2 mb-2 text-gray-800">
                  {recruiter.name}
                </h3>
                <p className="text-gray-600">{recruiter.location}</p>
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
    </div>
  );
}

export default TopRecruiters;