import React from 'react';
import { Link } from 'react-router-dom';

const DropdownCard = ({ data }) => {
  return (
    <div className="hidden group-hover:block absolute top-full -left-32 w-[30vw] bg-white shadow-lg rounded-3xl mt-2">
      <div className="gap-8 p-6">
        {data.map((section, index) => (
          <div key={index} className={index !== data.length - 1 ? 'border-r border-gray-400' : ''}>
            <ul className="space-y-2 text-gray-600">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <Link href="#" className="hover:text-blue-600">
                    {item}
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
