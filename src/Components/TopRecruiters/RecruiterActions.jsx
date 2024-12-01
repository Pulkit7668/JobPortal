import React from "react";

// Mock recruiter actions data
const recruiterActions = {
  profileViews: 123, // Replace with actual data
  shortlisted: 15,   // Replace with actual data
};

function RecruiterActions() {
  return (
    <div className="p-6 mx-20 mt-10">
      <h2 className="text-2xl font-bold mb-4">Recruiter Actions</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border border-gray-200 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold">Profile Views</h3>
          <p className="text-blue-600 text-2xl font-bold">{recruiterActions.profileViews}</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold">Shortlisted</h3>
          <p className="text-blue-600 text-2xl font-bold">{recruiterActions.shortlisted}</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold">Resume</h3>
          <button
            onClick={() => alert("Download initiated")}
            className="mt-3 px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecruiterActions;

