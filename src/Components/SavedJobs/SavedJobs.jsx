import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaTrash } from "react-icons/fa";

const SavedJobs = () => {
  const navigate = useNavigate();

  // Mock data: Initially saved jobs
  const [savedJobs, setSavedJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "Tech Corp", location: "New York, NY" },
    { id: 2, title: "Backend Engineer", company: "Innovate Solutions", location: "San Francisco, CA" },
    { id: 3, title: "UI/UX Designer", company: "Creative Minds", location: "Remote" },
  ]);

  // Handle removing a saved job
  const handleRemoveJob = (id) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== id);
    setSavedJobs(updatedJobs);
  };

  return (
    <div className="mt-10 h-full bg-gray-100 p-6">
      <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Saved Jobs</h1>
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <FaTimes size={24} />
          </button>
        </div>
        {savedJobs.length > 0 ? (
          <ul className="space-y-4">
            {savedJobs.map((job) => (
              <li
                key={job.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{job.title}</h3>
                  <p className="text-sm text-gray-600">
                    {job.company} - {job.location}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveJob(job.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Remove job"
                >
                  <FaTrash size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have not saved any jobs.</p>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
