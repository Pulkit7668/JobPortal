import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function NotificationPage() {
    const navigate = useNavigate();

    return (
        <div className="mx-auto p-6 mt-10">
            <button
                onClick={() => navigate(-1)}
                className="text-blue-600 mb-10 flex items-center gap-2 hover:text-blue-700 transition duration-300"
                aria-label="Go back"
            >
                <FaArrowLeft size={20} />
                <span className="text-lg">Back</span>
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notifications</h2>

            {/* Notification List */}
            <div className="space-y-4 cursor-pointer">
                {/* Recommended Jobs Notification */}
                <div className="p-5 bg-white shadow-lg rounded-md flex justify-between items-start hover:bg-gray-50 transition duration-300">
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-gray-700">Recommended jobs</h4>
                        <p className="text-sm text-gray-500 mt-1">Frontend Developer</p>
                    </div>
                    <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full flex items-center justify-center">
                        14 New
                    </span>
                </div>

                {/* Pending Actions Notification */}
                <div className="p-5 bg-white shadow-lg rounded-md flex justify-between items-start hover:bg-gray-50 transition duration-300">
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-gray-700">Pending Actions</h4>
                        <p className="text-sm text-gray-500 mt-1">Update Senior Secondary School Details</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-600 text-xs px-3 py-1 rounded-full flex items-center justify-center">
                        13 Actions
                    </span>
                </div>

                {/* Recruiter Searches Notification */}
                <div className="p-5 bg-white shadow-lg rounded-md flex justify-between items-start hover:bg-gray-50 transition duration-300">
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-gray-700">Recruiter Searches</h4>
                        <p className="text-sm text-gray-500 mt-1">New recruiter searches available.</p>
                    </div>
                    <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full flex items-center justify-center">
                        5 New
                    </span>
                </div>

                {/* Job Application Updates Notification */}
                <div className="p-5 bg-white shadow-lg rounded-md flex justify-between items-start hover:bg-gray-50 transition duration-300">
                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-gray-700">Job Application Updates</h4>
                        <p className="text-sm text-gray-500 mt-1">Your application for "Software Engineer" is under review.</p>
                    </div>
                    <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full flex items-center justify-center">
                        1 Update
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NotificationPage;
