import React, { useState } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SetJobPreference = () => {
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!location || !jobType || !salaryRange) {
      toast.error('All fields are required!', {
        style: {
          backgroundColor: '#f8d7da', // Light red
          color: '#721c24',
        },
      });
      return; // Do not proceed if fields are empty
    }

    // If all fields are filled, show success toast
    toast.success('Job Preferences Saved Successfully!', {
      style: {
        backgroundColor: '#d4edda', // Light green
        color: '#155724',
      },
    });

    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="h-[80vh] bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[80vw] flex flex-col">
        {/* Top Part: Heading and Close Icon */}
        <div className="bg-indigo-500 text-white xs:text-lg text-3xl font-bold relative py-4 rounded-t-lg">
          <h1 className="ml-5">Set Job Preference</h1>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white"
            onClick={() => navigate("/")}
          >
            <IoCloseCircleSharp size={30} />
          </button>
        </div>

        {/* Bottom Part: Job Preferences Form */}
        <div className="flex-1 p-5">
          <form onSubmit={handleSubmit}>
            {/* Job Location */}
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Preferred Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter preferred location"
              />
            </div>

            {/* Job Type */}
            <div className="mb-4">
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
              <select
                id="jobType"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            {/* Salary Range */}
            <div className="mb-4">
              <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">Salary Range</label>
              <input
                type="text"
                id="salaryRange"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter salary range"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Save Preferences
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default SetJobPreference;
