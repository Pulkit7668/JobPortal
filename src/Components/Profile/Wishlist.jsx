import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";

function WishlistPage() {
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Example saved jobs (replace with actual data fetching)
    setSavedJobs([
      { id: 1, title: "Software Developer", company: "Tech Corp" },
      { id: 2, title: "UI/UX Designer", company: "Design Studio" },
      { id: 3, title: "Product Manager", company: "Productify" }
    ]);
  }, []);

  // Remove job from wishlist
  const removeJob = (id) => {
    setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-10 transition duration-300"
      >
        <FaArrowLeft size={40} className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300" />
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <ul className="space-y-4">
          {savedJobs.map((job) => (
            <li key={job.id} className="border-b pb-4 last:border-none">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">{job.title}</h3>
                  <p className="text-gray-500">{job.company}</p>
                </div>
                <div className="flex space-x-3">
                  {/* View Details Button */}
                  <button className="text-blue-600 hover:text-blue-800 transition duration-300">
                    View Details
                  </button>
                  {/* Remove Button */}
                  <button
                    onClick={() => removeJob(job.id)}
                    className="text-red-600 hover:text-red-800 transition duration-300"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WishlistPage;
