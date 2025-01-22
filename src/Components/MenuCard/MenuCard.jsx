import React from "react";
import { useNavigate } from "react-router-dom";

const MenuCard = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="pt-5">
      <ul className="space-y-4">
        {/* Change Password */}
        <li
          className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          onClick={() => navigate("/change-password")}
        >
          Change Password
        </li>

        {/* Support Chat */}
        <li
          className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          onClick={() => navigate("/support-chat")}
        >
          Support Chat
        </li>

        {/* Change Visibility */}
        <li
          className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          onClick={() => navigate("/change-visibility")}
        >
          Change Visibility
        </li>

        {/* Set Job Preference */}
        <li
          className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          onClick={() => navigate("/set-job-preference")}
        >
          Set Job Preference
        </li>

        {/* About Us */}
        <li
          className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          onClick={() => navigate("/about-us")}
        >
          About Us
        </li>

        {/* Blocked Companies */}
        <li
          className="cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
          onClick={() => navigate("/blocked-companies")}
        >
          Blocked Companies
        </li>
      </ul>
    </div>
    </>
  );
};

export default MenuCard;
