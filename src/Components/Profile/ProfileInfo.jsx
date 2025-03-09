import React from 'react';

export default function ProfileInfo({ profileImage, name, headline, company, location, bio, onEdit }) {
  return (
    <div className="relative pb-6">
      <div className="flex flex-col md:flex-row">
        <div className="absolute -top-16 left-6 md:relative md:top-0 md:left-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img 
              src={profileImage || "/placeholder.svg"} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="mt-12 md:mt-0 md:ml-8 flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-gray-600">{headline}</p>
            </div>
            <button 
              onClick={onEdit}
              className="mt-2 md:mt-0 bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center self-start"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>
          </div>
          
          <div className="mt-3">
            <p className="text-gray-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {company}
            </p>
            <p className="text-gray-600 flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
            <p className="mt-3 text-gray-700">{bio}</p>
            
            <div className="mt-4 flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Contact
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
    