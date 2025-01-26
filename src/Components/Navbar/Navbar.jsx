import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import DropdownCard from "../DropdownCard/DropdownCard";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import ProfileSidebar from "../Profile/ProfileSideBar";
import MenuCard from "../MenuCard/MenuCard";

const subscriptionPlan = [
  {
    items: ["Basic Plan", "Premium Plan", "Pro Plan"]
  }
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
      "Application status",
      "Saved jobs",
    ],
  },
];

function Navbar() {
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [isNotificationHovered, setIsNotificationHovered] = useState(false);
  const [isMenuCardOpen, setIsMenuCardOpen] = useState(false);

  const toggleProfileSidebar = () => {
    setIsProfileSidebarOpen(!isProfileSidebarOpen);
  };

  const toggleMenuCard = () => {
    setIsMenuCardOpen(!isMenuCardOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-gray-50 shadow-lg z-50">
        <div className="flex lg:mx-24 xs:justify-between items-center px-6 xs:px-2 py-4">
          {/* Logo */}
          <div className="flex">
            {/* Menu Icon */}
            <div className="flex items-center lg:-ml-16 lg:mr-6">
              <BiMenuAltLeft
                size={35}
                className="text-gray-600 cursor-pointer"
                onClick={toggleMenuCard}
              />
            </div>
            {/* Logo with Link to Home */}
            <Link to="/" className="text-4xl font-bold text-blue-600">
              UrLogo
            </Link>
          </div>
          {/* Navigation Links */}
          <nav className="md:space-x-6 lg:ml-48 lg:space-x-10 text-gray-700 relative lg:right-32">
            <div className="group md:inline-block relative font-semibold xs:hidden">
              <NavLink className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1">
                Subscription Plan
              </NavLink>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <DropdownCard data={subscriptionPlan} />
              </div>
            </div>
            <div className="group md:inline-block relative font-semibold xs:hidden">
              <NavLink className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1">
                Courses
              </NavLink>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <DropdownCard data={coursesData} />
              </div>
            </div>
            <div className="group md:inline-block relative font-semibold xs:hidden">
              <NavLink className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1">
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

      {/* Add this section with adjusted spacing */}
      <section className="mt-0">
        <div className="flex items-center justify-center py-6">
          {/* Search bar and buttons go here */}
        </div>
      </section>

      {/* Profile Sidebar */}
      <ProfileSidebar isOpen={isProfileSidebarOpen} onClose={toggleProfileSidebar} />

      {/* Sliding MenuCard */}
      <MenuCard isOpen={isMenuCardOpen} onClose={toggleMenuCard} />
    </>
  );
}

export default Navbar;

// import React, { useState } from "react";
// import LoginForm from "../LoginPage/LoginPage"; // Adjust the path as necessary

// const Navbar = () => {
//   const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

//   const toggleLoginForm = () => {
//     setIsLoginFormOpen((prev) => !prev);
//   };

//   return (
//     <>
//       <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
//         {/* Logo */}
//         <div className="text-2xl font-bold text-gray-800">Website Logo</div>

//         {/* Buttons */}
//         <div className="flex items-center space-x-4">
//           <button
//             className="border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-100 transition"
//             onClick={toggleLoginForm}
//           >
//             Login
//           </button>
//           <button
//             className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
//           >
//             Register
//           </button>
//         </div>
//       </nav>

//       {/* Render LoginForm when open */}
//       {isLoginFormOpen && <LoginForm onClose={toggleLoginForm} />}
//     </>
//   );
// };

// export default Navbar;
