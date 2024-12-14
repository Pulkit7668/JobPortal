import React from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaRegHeart, FaCogs, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";

function ProfileSidebar({ isOpen, onClose }) {
  const profileCompletion = 40;

  const progressColor = profileCompletion >= 75 ? "#34D399" : "#F04141";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full md:w-[50%] bg-white md:rounded-l-3xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} sm:w-[80%] lg:w-96`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-bold">Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close sidebar">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-gray-50 flex items-center justify-center bg-gray-100">
                <img
                  src="https://static.naukimg.com/s/0/0/i/ni-gnb-revamped/userdp_v1.svg"
                  alt="Profile picture of Pulkit Gautam"
                  className="rounded-full w-[80%] h-[80%] object-cover"
                />
              </div>
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
                  stroke={progressColor}
                  strokeWidth="4"
                  strokeDasharray="97.39"
                  strokeDashoffset={`${
                    97.39 - (profileCompletion / 100) * 97.39
                  }`}
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <div className="absolute top-10 left-0 w-16 h-16 flex items-center justify-center">
                <span className="text-xs font-bold" style={{ color: progressColor }}>
                  {profileCompletion}%
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold">Pulkit Gautam</h3>
              <p className="text-sm text-gray-500">
                B.Tech/B.E. Production/Industrial at Hi-Tech Institute of Engineering & Tech
              </p>
              <Link
                to=""
                className="text-sm text-blue-600 hover:underline"
              >
                View & Update Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h4 className="text-sm font-bold text-gray-700">
            Your profile performance <span className="text-xs text-gray-400">(Last 90 days)</span>
          </h4>
          <div className="flex justify-between mt-3 bg-blue-50 p-3 rounded-lg">
            <div className="text-center ml-8">
              <h5 className="text-lg font-bold text-gray-700">0</h5>
              <p className="text-xs text-gray-500">Search Appearances</p>
              <Link
                to=""
                className="text-xs text-blue-600 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="border-l-2"></div>
            <div className="text-center mr-8">
              <h5 className="text-lg font-bold text-gray-700">0</h5>
              <p className="text-xs text-gray-500">Recruiter Actions</p>
              <Link
                to=""
                className="text-xs text-blue-600 hover:underline"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3 text-sm">
          <div className="flex items-center space-x-3">
            <TfiMenuAlt size={16} className="text-gray-500" />
            <Link
              to=""
              className="block text-gray-700 hover:text-blue-600"
            >
              Career guidance
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <FaRegHeart size={16} className="text-gray-500" />
            <Link to="" className="block text-gray-700 hover:text-blue-600">
              Wishlist
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <FaCogs size={16} className="text-gray-500" />
            <Link to="" className="block text-gray-700 hover:text-blue-600">
              Settings
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <FaQuestionCircle size={16} className="text-gray-500" />
            <Link to="" className="block text-gray-700 hover:text-blue-600">
              FAQs
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <FaSignOutAlt size={16} className="text-gray-500" />
            <Link to="" className="block text-gray-700 hover:text-blue-600">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSidebar;