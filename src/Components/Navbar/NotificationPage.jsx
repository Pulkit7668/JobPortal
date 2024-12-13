import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function NotificationPage() {
    const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
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
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      
      {/* Notification List */}
      <div className="space-y-4">
        <div className="p-4 bg-white shadow-md rounded-md">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold">Recommended jobs</h4>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
              14 New
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Frontend Developer</p>
        </div>

        <div className="p-4 bg-white shadow-md rounded-md">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold">Pending Actions</h4>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
              13 Actions
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Update Senior Secondary School Details</p>
        </div>

        <div className="p-4 bg-white shadow-md rounded-md">
          <h4 className="text-sm font-bold">Recruiter Searches</h4>
          <p className="text-sm text-gray-500 mt-1">New recruiter searches available.</p>
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
