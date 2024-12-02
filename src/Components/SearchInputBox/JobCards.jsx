import React from 'react';

const JobCards = ({ job }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-[100%] hover:border hover:border-blue-600 my-4 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
        <span className="text-sm text-gray-600">{job.type}</span>
      </div>

      <div className="mb-4">
        <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
        <p className="text-gray-700"><strong>Experience:</strong> {job.experience}</p>
      </div>

      <div className='flex items-center'>
        <p className="text-sm font-semibold text-gray-700">Skills:</p>
        <ul className="flex flex-wrap ml-2 gap-2">
          {job.skills.map((skill, index) => (
            <li
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <div className='flex items-center justify-end mt-5'>
        <button className='text-blue-600 font-semibold border border-blue-600 rounded-md px-4 py-1'>Apply</button>
      </div>
    </div>
  );
};

export default JobCards;