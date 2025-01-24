import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const MenuCard = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full md:w-[50%] 2xl:w-[25%] bg-white md:rounded-l-3xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:w-[80%] lg:w-72 p-5`}
      >
        <div className="flex items-center justify-between pb-5">
          <h3 className="text-xl font-semibold text-gray-700">User Menu</h3>
          <button
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close sidebar"
            onClick={onClose}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Ensure buttons are under the heading */}
        <div className="flex flex-col items-start space-y-4 mt-5">
          {/* Change Password */}
          <button
            onClick={() => handleMenuClick("/change-password")}
            className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          >
            Change Password
          </button>

          {/* Support Chat */}
          <button
            onClick={() => handleMenuClick("/support-chat")}
            className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          >
            Support Chat
          </button>

          {/* Change Visibility */}
          <button
            onClick={() => handleMenuClick("/change-visibility")}
            className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          >
            Change Visibility
          </button>

          {/* Set Job Preference */}
          <button
            onClick={() => handleMenuClick("/set-job-preference")}
            className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          >
            Set Job Preference
          </button>

          {/* About Us */}
          <button
            onClick={() => handleMenuClick("/about-us")}
            className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          >
            About Us
          </button>

          {/* Blocked Companies */}
          <button
            onClick={() => handleMenuClick("/blocked-companies")}
            className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          >
            Blocked Companies
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuCard;
