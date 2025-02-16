import React from 'react';
import { Link } from "react-router-dom";

function DropdownCard({ data }) {
  if (!data || !Array.isArray(data)) return null;

  return (
    <div className="hidden group-hover:block w-60 absolute bg-white shadow-lg rounded-3xl mt-1 p-4">
      {data.map((section, index) => (
        <ul key={index} className="space-y-2 text-gray-600">
          {section.items.map((item, idx) => (
            <li key={idx}>
             <Link
              to={`/subscription-plan?section=${encodeURIComponent(item)}`} 
              className="hover:text-blue-600"
            >
              {item}
            </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default DropdownCard;