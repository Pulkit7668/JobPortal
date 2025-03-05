import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recruitersData as companies } from './recruitersData';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaTools, FaExternalLinkAlt } from 'react-icons/fa';

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const company = companies.find(c => c.id.toString() === id);

  if (!company) {
    return <div className="text-center p-6 text-red-500 text-lg">Company not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-10 mx-20">
      <div className="flex items-center">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-6 hover:text-blue-700 transition duration-300"
        >
          <FaArrowLeft
            size={40}
            className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
          />
        </button>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Company Details</h1>
      </div>

      {/* Company Card */}
      <div className="w-full mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* Company Header */}
        <div className="flex items-center space-x-4">
          <img 
            src={company.image} 
            alt={company.name} 
            className="w-16 h-16 object-contain rounded-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{company.name}</h2>
            <p className="text-gray-600">{company.industry}</p>
          </div>
        </div>

        {/* Company Details */}
        <div className="mt-4 space-y-3 text-gray-700">
          <p className="text-lg">{company.description}</p>
          
          <p className="flex items-center">
            <FaMapMarkerAlt className="text-blue-600 mr-2" />
            <strong>Headquarters:</strong> {company.headquarters}
          </p>

          <p className="flex items-center">
            <FaCalendarAlt className="text-blue-600 mr-2" />
            <strong>Founded:</strong> {company.founded}
          </p>

          <p className="flex items-center">
            <FaTools className="text-blue-600 mr-2" />
            <strong>Services:</strong> {company.services ? company.services.join(", ") : "N/A"}
          </p>
        </div>

        {/* Website Link */}
        <div className="mt-6">
          <a 
            href={company.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Visit Website <FaExternalLinkAlt className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
