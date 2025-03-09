import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { 
  FaTimes, 
  FaKey, 
  FaComments, 
  FaInfoCircle, 
  FaBan,  
  FaSignOutAlt, 
  FaQuestionCircle,
  FaClipboardList, 
  FaUserShield, 
  FaFileContract
} from "react-icons/fa";

const MenuCard = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn, logout } = useAuth();

  const handleMenuClick = (path) => {
    onClose();
    navigate(path);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      toast.success("Logged out successfully!", {
        position: "top-center",
        style: {
          background: "#d4edda",
          color: "#155724",
        },
      });
      setLoading(false);
      setShowLogoutPopup(false);
      onClose();
      navigate("/"); // Redirect to home page after logout
    }, 2000);
  };

  return (
    <>
      <Toaster />
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full md:w-[50%] 2xl:w-[25%] bg-white md:rounded-r-2xl shadow-lg z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} xs:w-full lg:w-72 p-5`}
      >
        <div>
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

          {/* Menu Options */}
          <div className="flex flex-col items-start space-y-4 mt-5">
            <button
              onClick={() => handleMenuClick("/change-password")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaKey />
              <span>Change Password</span>
            </button>

            <button
              onClick={() => handleMenuClick("/support-chat")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaComments />
              <span>Support Chat</span>
            </button>

            <button
              onClick={() => handleMenuClick("/recruiter-chat")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaComments />
              <span>Recruiter Chat</span>
            </button>

            <button
              onClick={() => handleMenuClick("/about-us")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaInfoCircle />
              <span>About Us</span>
            </button>

            <button
              onClick={() => handleMenuClick("/blocked-companies")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaBan />
              <span>Blocked Companies</span>
            </button>

            <button
              onClick={() => handleMenuClick("/applied-jobs")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaClipboardList />
              <span>Applied Jobs</span>
            </button>

            <button
              onClick={() => handleMenuClick("/privacy-policy")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaUserShield />
              <span>Privacy & Policy</span>
            </button>

            <button
              onClick={() => handleMenuClick("/term-and-condition")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaFileContract />
              <span>Term & Condition</span>
            </button>

            <button
              onClick={() => handleMenuClick("/faq")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaQuestionCircle />
              <span>FAQs</span>
            </button>

          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-5 border-t-2 border-gray-200">
          <button
            onClick={() => setShowLogoutPopup(true)}
            className="flex items-center space-x-2 cursor-pointer text-xl ml-2 text-red-600 hover:text-red-800 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out w-full text-left"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to logout?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                {loading ? (
                  <div className="loader-red mx-auto"></div>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuCard;
