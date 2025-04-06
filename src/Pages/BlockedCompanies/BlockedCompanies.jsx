import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BlockedCompanies = () => {
  const navigate = useNavigate();

  // Mock data: Initially blocked companies
  const [blockedCompanies, setBlockedCompanies] = useState([
    { id: 1, name: "Tech Corp" },
    { id: 2, name: "Innovate Solutions" },
    { id: 3, name: "Future Enterprises" },
    { id: 4, name: "Future Enterprises" },
    { id: 5, name: "Future Enterprises" },
    { id: 6, name: "Future Enterprises" },
    { id: 7, name: "Future Enterprises" },
  ]);

  // Handle unblocking a company
  const handleUnblock = (id) => {
    const updatedCompanies = blockedCompanies.filter(
      (company) => company.id !== id
    );
    setBlockedCompanies(updatedCompanies);
  };

  return (
    <div className="mt-10 min-h-full bg-gray-100 p-6">
      <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Blocked Companies</h1>
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {blockedCompanies.length > 0 ? (
          <ul className="space-y-4">
            {blockedCompanies.map((company) => (
              <li
                key={company.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border"
              >
                <span className="text-gray-700 font-medium">
                  {company.name}
                </span>
                <button
                  onClick={() => handleUnblock(company.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Unblock
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have not blocked any companies.</p>
        )}
      </div>
    </div>
  );
};

export default BlockedCompanies;