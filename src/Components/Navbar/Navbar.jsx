import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DropdownCard from "../DropdownCard/DropdownCard";
import { FaBell, FaUserCircle } from "react-icons/fa";
import ProfileSidebar from "../Profile/ProfileSideBar";

const prepareData = [
  {
    items: [
      "Pathfinder",
      "NCAT",
      "Expert speak",
      "Resume maker",
      "Personalised interview Q/A",
      "Career guidance",
    ],
  },
];

const participateData = [
  {
    items: ["Contests", "All India NCAT", "Naukri Campus Young Turks"],
  },
];

const opportunitiesData = [
  {
    items: [
      "Recommended jobs",
      "Job invites",
      "Jobs from alerts",
      "Application status",
      "Saved jobs",
    ],
  },
];

function Navbar() {
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [isNotificationHovered, setIsNotificationHovered] = useState(false);

  const toggleProfileSidebar = () => {
    setIsProfileSidebarOpen(!isProfileSidebarOpen);
  };

  return (
    <>
      <header className="relative">
        <div className="flex justify-around items-center px-6 py-4">
          {/* Logo */}
          <div className="flex">
            <h1 className="text-4xl font-bold text-blue-600">UrLogo</h1> 
          </div>
          {/* Navigation Links */}
          <nav className="space-x-10 text-gray-700 relative right-32">
            <div className="group inline-block relative font-semibold">
              <NavLink
                to="/prepare"
                className={({ isActive }) =>
                  `hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1 ${
                    isActive ? "text-blue-600 border-b-2" : ""
                  }`
                }
              >
                Prepare
              </NavLink>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <DropdownCard data={prepareData} />
              </div>
            </div>
            <div className="group inline-block relative font-semibold">
              <NavLink
                to="/participate"
                className={({ isActive }) =>
                  `hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1 ${
                    isActive ? "text-blue-600 border-b-2" : ""
                  }`
                }
              >
                Participate
              </NavLink>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <DropdownCard data={participateData} />
              </div>
            </div>
            <div className="group inline-block relative font-semibold">
              <NavLink
                to="/opportunities"
                className={({ isActive }) =>
                  `hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1 ${
                    isActive ? "text-blue-600 border-b-2" : ""
                  }`
                }
              >
                Opportunities
              </NavLink>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <DropdownCard data={opportunitiesData} />
              </div>
            </div>
          </nav>

          {/* Right: Notification, and User Icon */}
          <div className="flex items-center space-x-6">
            <div
              className="relative"
              onMouseEnter={() => setIsNotificationHovered(true)}
              onMouseLeave={() => setIsNotificationHovered(false)}
            >
              <FaBell className="text-gray-600 text-xl cursor-pointer" size={24} />
              {isNotificationHovered && (
                <div className="absolute right-0 mt-2 w-80 cursor-pointer bg-white shadow-lg rounded-lg">
                  <div className="p-4">
                    <div className="py-2 border-b">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold">Recommended jobs</h4>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          14 New
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Frontend Developer</p>
                    </div>
                    <div className="py-2 border-b">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold">Pending Actions</h4>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          13 Actions
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Update Senior Secondary School Details
                      </p>
                    </div>
                    <div className="py-2">
                      <h4 className="text-sm font-bold">Recruiter Searches</h4>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Icon */}
            <div
              className="border-2 rounded-full cursor-pointer"
              onClick={toggleProfileSidebar}
            >
              <FaUserCircle className="text-gray-300 text-xl" size={35} />
            </div>
          </div>
        </div>
      </header>

      {/* Profile Sidebar */}
      <ProfileSidebar isOpen={isProfileSidebarOpen} onClose={toggleProfileSidebar} />
    </>
  );
}

export default Navbar;