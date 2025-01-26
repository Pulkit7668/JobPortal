import React, { useState, useEffect } from "react";
import { recruitersData } from "./recruitersData";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaAngleDown } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import FilterRecruiters from "./FilterRecruiters";


function AllRecruiters() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recruitersPerPage = 8;

  // Filter panel visibility
  const [showFilter, setShowFilter] = useState(false);

  // Total number of pages
  const totalPages = Math.ceil(recruitersData.length / recruitersPerPage);

  // Get the recruiters for the current page
  const indexOfLastRecruiter = currentPage * recruitersPerPage;
  const indexOfFirstRecruiter = indexOfLastRecruiter - recruitersPerPage;
  const currentRecruiters = recruitersData.slice(indexOfFirstRecruiter, indexOfLastRecruiter);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
    <div className="p-6 lg:mx-20 mt-10">
      {/* Align Back button, Heading, and Filter button */}
      <div className="flex items-center justify-between mb-10">
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
        <h2 className="xs:text-2xl md:text-3xl font-bold">All Recruiters</h2>
        {/* Filter Button */}
        <button
          onClick={toggleFilter} // Toggle filter visibility
          className="flex items-center text-lg font-semibold text-gray-800 border border-black px-5 py-1 rounded-lg hover:bg-white transition duration-300"
          aria-label="Filter recruiters"
        >
          Filter
          <FaAngleDown className="ml-2" />
        </button>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div
          className="fixed top-0 left-0 w-1/3 h-full bg-white shadow-lg z-50 transition-transform transform ease-in-out"
          style={{ transform: showFilter ? "translateX(0)" : "translateX(-100%)" }}
        >
          <FilterRecruiters closeFilter={() => setShowFilter(false)} />
        </div>
      )}

      {currentRecruiters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentRecruiters.map((recruiter) => (
            <div
              key={recruiter.id}
              className="p-4 border border-gray-200 bg-white rounded-xl hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={recruiter.image || "default-avatar.jpg"}
                  alt={recruiter.name}
                  className="w-10 h-10 mr-4 object-contain rounded-full"
                />
                <div>
                  <h3 className="text-sm font-bold text-gray-800">{recruiter.name}</h3>
                  <div className="flex items-center">
                    <CiLocationOn size={14} className="text-gray-500" />
                    <p className="text-xs text-gray-500">{recruiter.location}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{recruiter.vacancies}</span> Vacancies
              </p>
              <div className="flex items-center justify-between">
                <Link
                  to={`/recruiters/jobs/${recruiter.id}`}
                  className="mt-4 font-semibold text-blue-600 rounded inline-block"
                >
                  View Jobs
                </Link>

                {/* Add a Details button */}
                <Link
                  to={`/recruiters/${recruiter.id}`}
                  className="mt-2 text-blue-600 font-semibold inline-block"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No recruiters available at the moment.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          <FaChevronLeft size={15} />
        </button>
        <span className="px-4 py-2 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          <FaChevronRight size={15} />
        </button>
      </div>
    </div>

    {/* Filter */}
    <FilterRecruiters isOpen={isFilterOpen} onClose={toggleFilter} />
    </>
  );
}

export default AllRecruiters;
