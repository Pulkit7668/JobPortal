import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi"; // Importing FiArrowLeft for back icon
import { FaEye, FaListAlt, FaFileDownload } from "react-icons/fa";

const recruiterActions = {
  profileViews: 123,
  shortlisted: 15,
};

function RecruiterActions() {
  const navigate = useNavigate();

  return (
    <div className="p-8 mx-auto mt-10 w-[80%] bg-gray-50 rounded-lg shadow-lg">
      {/* Header Section with Back Button */}
      <div className="flex items-center mb-10 space-x-96">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 border-2 border-blue-600 rounded-full p-1 hover:bg-blue-600 hover:text-white transition duration-300"
        >
          <FiArrowLeft className="text-lg" size={30} />
        </button>
        <h2 className="text-4xl font-bold text-gray-800">Recruiter Actions</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Views */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:border-blue-500 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <FaEye size={28} className="text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-700">Profile Views</h3>
          </div>
          <p className="text-4xl font-bold text-blue-600 text-center">
            {recruiterActions.profileViews}
          </p>
        </div>

        {/* Shortlisted */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:border-blue-500 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <FaListAlt size={28} className="text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-700">Shortlisted</h3>
          </div>
          <p className="text-4xl font-bold text-blue-600 text-center">
            {recruiterActions.shortlisted}
          </p>
        </div>

        {/* Resume */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:border-blue-500 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <FaFileDownload size={28} className="text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-700">Resume</h3>
          </div>
          <button
            onClick={() => alert("Download initiated")}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecruiterActions;
