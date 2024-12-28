import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import { jobs } from './JobDataForSkills';
import TogglePage from '../TogglePage/TogglePage';

function JobDetail() {
  const { id } = useParams();
  const job = jobs.find((job) => job.id === parseInt(id));
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  const toggleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  if (!job) {
    return <p>Job not found.</p>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-6 lg:mx-20">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 mb-10"
      >
        <FaArrowLeft size={40} className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300" />
      </button>
      <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
      <p className="text-xl text-gray-600 mb-2">{job.company}</p>
      <p className="text-sm text-gray-500 mb-4">{job.location}</p>
      <p className="text-lg text-gray-700 mb-4">{job.description}</p>

      <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
      <ul className="list-disc pl-5 mb-4">
        {job.responsibilities.map((resp, index) => (
          <li key={index}>{resp}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Requirements</h3>
      <ul className="list-disc pl-5">
        {job.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>

      {/* Apply Now button */}
      <div className="mt-6 flex justify-end">
        <button onClick={() => handleApplyNow(job)}
          className="px-6 py-2 bg-blue-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Apply Now
        </button>
      </div>
      <div
        onClick={toggleSaveJob}
        className="cursor-pointer absolute md:right-28 xs:right-10 top-24 transition-all duration-300"
      >
        {isSaved ? (
          <FaHeart size={24} className="text-red-500" />
        ) : (
          <FaRegHeart size={24} className="text-gray-400" />
        )}
      </div>
      {/* Toggle Page */}
      {isTogglePageOpen && (
            <TogglePage jobTitle={selectedJob?.title}
            onClose={() => setISTogglePageOpen(false)} 
            />
          )}
    </div>
  );
}

export default JobDetail;
