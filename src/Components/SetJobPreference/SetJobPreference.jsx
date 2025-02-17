// import React, { useState } from 'react';
// import { IoCloseCircleSharp } from "react-icons/io5";
// import { toast, Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const SetJobPreference = () => {
//   const [location, setLocation] = useState('');
//   const [jobType, setJobType] = useState('');
//   const [salaryRange, setSalaryRange] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check if any field is empty
//     if (!location || !jobType || !salaryRange) {
//       toast.error('All fields are required!', {
//         style: {
//           backgroundColor: '#f8d7da', // Light red
//           color: '#721c24',
//         },
//       });
//       return; // Do not proceed if fields are empty
//     }

//     // If all fields are filled, show success toast
//     toast.success('Job Preferences Saved Successfully!', {
//       style: {
//         backgroundColor: '#d4edda', // Light green
//         color: '#155724',
//       },
//     });

//     // Redirect to home after 2 seconds
//     setTimeout(() => {
//       navigate('/');
//     }, 2000);
//   };

//   return (
//     <div className="h-full bg-gray-100 mt-5">
//       <div className="bg-white w-full flex flex-col">
//         {/* Top Part: Heading and Close Icon */}
//         <div className="bg-indigo-500 text-white xs:text-lg text-3xl font-bold relative py-4">
//           <h1 className="ml-5">Set Job Preference</h1>
//           <button
//             className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white"
//             onClick={() => navigate("/")}
//           >
//             <IoCloseCircleSharp size={30} />
//           </button>
//         </div>

//         {/* Bottom Part: Job Preferences Form */}
//         <div className="flex-1 p-5">
//           <form onSubmit={handleSubmit}>
//             {/* Job Location */}
//             <div className="mb-4">
//               <label htmlFor="location" className="block text-sm font-medium text-gray-700">Preferred Location</label>
//               <input
//                 type="text"
//                 id="location"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter preferred location"
//               />
//             </div>

//             {/* Job Type */}
//             <div className="mb-4">
//               <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
//               <select
//                 id="jobType"
//                 value={jobType}
//                 onChange={(e) => setJobType(e.target.value)}
//                 className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="">Select job type</option>
//                 <option value="Full-time">Full-time</option>
//                 <option value="Part-time">Part-time</option>
//                 <option value="Freelance">Freelance</option>
//                 <option value="Contract">Contract</option>
//               </select>
//             </div>

//             {/* Salary Range */}
//             <div className="mb-4">
//               <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">Salary Range</label>
//               <input
//                 type="text"
//                 id="salaryRange"
//                 value={salaryRange}
//                 onChange={(e) => setSalaryRange(e.target.value)}
//                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter salary range"
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//             >
//               Save Preferences
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Toast Notifications */}
//       <Toaster position="top-right" reverseOrder={false} />
//     </div>
//   );
// };

// export default SetJobPreference;

import React, { useState } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SetJobPreference = () => {
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [industry, setIndustry] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [skills, setSkills] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!location || !jobType || !salaryRange || !experienceLevel || !industry || !workMode || !skills) {
      toast.error('All fields are required!', {
        style: { backgroundColor: '#f8d7da', color: '#721c24' },
      });
      return;
    }

    // Show success toast
    toast.success('Job Preferences Saved Successfully!', {
      style: { backgroundColor: '#d4edda', color: '#155724' },
    });

    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="h-full bg-gray-100 mt-5">
      <div className="bg-white w-full flex flex-col">
        {/* Top Bar */}
        <div className="bg-indigo-500 text-white text-3xl font-bold relative py-5">
          <h1 className="ml-5">Set Job Preference</h1>
          <button className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white" onClick={() => navigate("/")}>
            <IoCloseCircleSharp size={30} />
          </button>
        </div>

        {/* Form Section */}
        <div className="flex-1 p-5">
          <form onSubmit={handleSubmit}>

            {/* Preferred Location */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Preferred Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter preferred location"
              />
            </div>

            {/* Job Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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
              <label className="block text-sm font-medium text-gray-700">Salary Range</label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter salary range"
              />
            </div>

            {/* Experience Level */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select experience level</option>
                <option value="Fresher">Fresher</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
              </select>
            </div>

            {/* Industry Preference */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Industry Preference</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select industry</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            {/* Work Mode */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Work Mode</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select work mode</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-Site">On-Site</option>
              </select>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Skills</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter required skills (comma-separated)"
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
