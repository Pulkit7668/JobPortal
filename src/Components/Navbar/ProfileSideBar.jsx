import React from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaCogs, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";

function ProfileSidebar({ isOpen, onClose }) {
  const profileCompletion = 40; // Profile completion percentage (can be dynamic)

  // Define the color based on profile completion percentage
  const progressColor = profileCompletion >= 75 ? "#34D399" : "#F04141";

  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white rounded-l-3xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } w-96`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-bold">Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {/* Profile Picture */}
              <div className="w-16 h-16 rounded-full border-2 border-gray-50 flex items-center justify-center bg-gray-100">
                <img
                  src="https://static.naukimg.com/s/0/0/i/ni-gnb-revamped/userdp_v1.svg" // Replace with actual profile image URL
                  alt="Profile"
                  className="rounded-full w-[80%] h-[80%] object-cover"
                />
              </div>

              {/* Progress Circle */}
              <svg
                className="absolute top-0 left-0 w-16 h-16"
                viewBox="0 0 36 36"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke={progressColor} // Conditional color based on progress
                  strokeWidth="4"
                  strokeDasharray="97.39" // Circumference of the circle (2πr)
                  strokeDashoffset={`${
                    97.39 - (profileCompletion / 100) * 97.39
                  }`} // Adjust based on percentage
                  transform="rotate(-90 18 18)" // Rotate to start from the top
                />
              </svg>

              {/* Percentage Text */}
              <div className="absolute top-10 left-0 w-16 h-16 flex items-center justify-center">
                <span className="text-xs font-bold" style={{ color: progressColor }}>
                  {profileCompletion}%
                </span>
              </div>
            </div>

            {/* User Information */}
            <div>
              <h3 className="text-lg font-bold">Pulkit Gautam</h3>
              <p className="text-sm text-gray-500">
                B.Tech/B.E. Production/Industrial at Hi-Tech Institute of
                Engineering & Tech
              </p>
              <Link
                to="/update-profile"
                className="text-sm text-blue-600 hover:underline"
              >
                View & Update Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Performance */}
        <div className="p-4">
          <h4 className="text-sm font-bold text-gray-700">
            Your profile performance <span className="text-xs text-gray-400">(Last 90 days)</span>
          </h4>
          <div className="flex justify-between mt-3 bg-blue-50 p-3 rounded-lg">
            <div className="text-center">
              <h5 className="text-lg font-bold text-gray-700">0</h5>
              <p className="text-xs text-gray-500">Search Appearances</p>
              <Link
                to="/search-appearances"
                className="text-xs text-blue-600 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="border-l-2"></div>
            <div className="text-center">
              <h5 className="text-lg font-bold text-gray-700">0</h5>
              <p className="text-xs text-gray-500">Recruiter Actions</p>
              <Link
                to="/recruiter-actions"
                className="text-xs text-blue-600 hover:underline"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-3 text-sm">
          <div className="flex items-center space-x-3">
            <TfiMenuAlt size={16} className="text-gray-500" />
            <Link
              to="/career-guidance"
              className="block text-gray-700 hover:text-blue-600"
            >
              Career guidance
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <FaCogs size={16} className="text-gray-500" />
            <Link to="/settings" className="block text-gray-700 hover:text-blue-600">
              Settings
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <FaQuestionCircle size={16} className="text-gray-500" />
            <Link to="/faqs" className="block text-gray-700 hover:text-blue-600">
              FAQs
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <FaSignOutAlt size={16} className="text-gray-500" />
            <Link to="/logout" className="block text-gray-700 hover:text-blue-600">
              Logout
            </Link>
          </div>
          <div className="flex items-center space-x-3">
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSidebar;