import React from "react";
import { recruitersData } from "./recruitersData";
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";

// Sort recruiters by the number of vacancies (in descending order)
const sortedRecruiters = recruitersData.sort((a, b) => b.vacancies - a.vacancies);

function TopRecruiters() {
  return (
    <div className="p-4 sm:p-6 lg:mx-10 xl:mx-20 mt-6 lg:mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold">Top Companies</h2>
        <div className="flex items-center mt-2 sm:mt-0">
          <Link to="/recruiters/all" className="mr-2 text-gray-800 hover:text-blue-600 transition-all duration-300">
            View More
          </Link>
          <FaCircleArrowRight size={20} />
        </div>
      </div>
      {sortedRecruiters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                <p className="text-xs md:text-sm text-gray-500">{recruiter.industry}</p>
                
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