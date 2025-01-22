import React from 'react';
import { Link } from 'react-router-dom';

const DropdownCard = ({ data }) => {
  // Guard clause to handle undefined or invalid data
  if (!data || !Array.isArray(data)) return null;

  return (
    <div className="hidden group-hover:block absolute top-full w-60 bg-white shadow-lg rounded-3xl mt-2">
      <div className="p-5">
        {data.map((section, index) => (
          <div key={index}>
            <ul className="space-y-2 text-gray-600">
              {section.items?.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    to={item.url || '#'} 
                    className="hover:text-blue-600"
                  >
                    {item.name || item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownCard;
