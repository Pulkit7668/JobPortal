import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const ChangeVisibility = () => {
  const [isLookingForJob, setIsLookingForJob] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLookingForJob((prevState) => !prevState);
  };

  const handleSaveChanges = () => {
    toast.success(`Status updated: ${isLookingForJob ? "Looking for a job" : "Not looking for a job"}`, {
      style: {
        backgroundColor: '#d4edda', // Light green
        color: '#155724', // Dark green text
      },
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100">
      <div className="bg-white p-5 rounded-lg shadow-md flex xs:w-[90%] md:w-[95%] lg:w-2/3">
        {/* Left Part */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-lg xs:hidden md:block">
          <h2 className="text-3xl font-bold mb-4">Keep Your Profile Updated</h2>
          <p className="text-lg text-center">Easily manage your job visibility to let recruiters know your status.</p>
          <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg">
            <p className="text-sm font-medium">Tip: Keep your profile visible to increase your chances of being noticed by recruiters.</p>
          </div>
        </div>

        {/* Right Part */}
        <div className="lg:w-1/2 h-full xs:p-2 md:p-8 md:ml-5 relative flex flex-col justify-center">
          <div className="flex items-center justify-between mb-10">
            {/* Heading with Gradient Text on Hover */}
            <h1 className="xs:text-xl md:text-3xl font-bold text-gray-800 group transition-all">
              <span className="group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-blue-500">
                Change Visibility
              </span>
            </h1>
            <FaTimes
              className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
              size={20}
              onClick={() => navigate("/")}
            />
          </div>
          <div className="flex items-center justify-between mb-10">
            <span className="xs:text-base xs:mr-7 md:mr-0 md:text-lg font-medium text-gray-700">
              {isLookingForJob ? "Currently looking for a job" : "Not looking for a job"}
            </span>
            <Switch
              checked={isLookingForJob}
              onChange={handleToggle}
              className={`${
                isLookingForJob ? "bg-blue-500" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
            >
              <span
                className={`${
                  isLookingForJob ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
              />
            </Switch>
          </div>

          <button
            onClick={handleSaveChanges}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition-transform transform hover:scale-105"
          >
            Save Changes
          </button>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
};

export default ChangeVisibility;
