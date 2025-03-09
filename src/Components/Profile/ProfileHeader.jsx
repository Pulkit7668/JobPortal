import React from 'react';

export default function ProfileHeader({ coverImage, onEdit }) {
  return (
    <div className="relative h-48 bg-gray-200">
      <img 
        src={coverImage || "/placeholder.svg"} 
        alt="Cover" 
        className="w-full h-full object-cover"
      />
      <button 
        onClick={onEdit}
        className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-md shadow-md hover:bg-gray-100 transition-colors flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Edit
      </button>
    </div>
  );
}
