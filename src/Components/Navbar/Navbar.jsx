import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import DropdownCard from "../DropdownCard/DropdownCard";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import ProfileSidebar from "../Profile/ProfileSideBar";
// import LoginPage from "../LoginPage/Loginpage";

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

const coursesData = [
  {
    items: [
      "Web Development",
      "Data Science",
      "Machine Learning",
      "Digital Marketing",
      "Cloud Computing",
      "Cyber Security",
    ],
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
  // const [isLoginOpen, setIsLoginOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleProfileSidebar = () => {
    setIsProfileSidebarOpen(!isProfileSidebarOpen);
  };

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  //   setIsLoginOpen(false); // Close the login modal after successful login
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };

  return (
    <>
      <header className="relative">
        <div className="flex lg:mx-24 xs:justify-between items-center px-6 xs:px-2 py-4">
          {/* Logo */}
          <div className="flex">
            <h1 className="text-4xl font-bold text-blue-600">UrLogo</h1>
          </div>
          {/* Navigation Links */}
          <nav className="md:space-x-6 lg:space-x-10 text-gray-700 relative lg:right-32">
            <div className="group md:inline-block relative font-semibold xs:hidden">
              <NavLink
                className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1"
              >
                Prepare
              </NavLink>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <DropdownCard data={prepareData} />
              </div>
            </div>
            <div className="group md:inline-block relative font-semibold xs:hidden">
              <NavLink
                className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1"
              >
                Courses
              </NavLink>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <DropdownCard data={coursesData} />
              </div>
            </div>
            <div className="group md:inline-block relative font-semibold xs:hidden">
              <NavLink
                className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1"
              >
                Opportunities
              </NavLink>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <DropdownCard data={opportunitiesData} />
              </div>
            </div>
          </nav>

          {/* Right: Search Icon, Notification, and User Icon */}
          <div className="flex items-center md:space-x-6 xs:space-x-4">
            {/* Search Icon */}
            <div className="relative xs:block lg:hidden">
              <Link to="/search">
                <FaSearch className="text-gray-600 text-xl cursor-pointer" size={20} />
              </Link>
            </div>

            {/* Notification Icon */}
            {/* {isLoggedIn && ( */}
              <div
                className="relative"
                onMouseEnter={() => setIsNotificationHovered(true)}
                onMouseLeave={() => setIsNotificationHovered(false)}
              >
                <Link to="/notifications">
                  <FaBell className="text-gray-600 text-xl cursor-pointer" size={24} />
                </Link>
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
            {/* )} */}

            {/* User Icon */}
            {/* {isLoggedIn && ( */}
              <div
                className="border-2 rounded-full cursor-pointer"
                onClick={toggleProfileSidebar}
              >
                <FaUserCircle className="text-gray-300 text-xl" size={35} />
              </div>
            {/* )} */}

            {/* Login Button */}
            {/* {!isLoggedIn && (
              <div>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-2 text-black font-medium border-2 border-black rounded-xl"
                >
                  Login
                </button>
              </div>
            )} */}
          </div>
        </div>
      </header>

      {/* Profile Sidebar */}
      <ProfileSidebar isOpen={isProfileSidebarOpen} onClose={toggleProfileSidebar} />

      {/* Login Page
      <LoginPage
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin} // Pass the login handler here
      /> */}
    </>
  );
}

export default Navbar;
