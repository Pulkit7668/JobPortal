import React from 'react';

export default function KeywordsSection({ keywords, onEdit }) {
  return (
    <div className="relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
          Keywords
        </h2>
        <button 
          onClick={onEdit}
          className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Edit
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <h4 className="font-semibold">Basic Skills</h4>
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Naukri.com</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.basicSkills.map((skill, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors cursor-pointer">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Top Skills (5-6)</h4>
          <div className="flex flex-wrap gap-2">
            {keywords.topSkills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
