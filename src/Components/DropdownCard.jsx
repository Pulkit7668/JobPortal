import React from 'react';

const DropdownCard = () => {
  return (
    <div className="hidden group-hover:block absolute top-full -left-32 w-[40vw] bg-white shadow-lg rounded-3xl mt-2">
      <div className="grid grid-cols-3 gap-8 p-6">
        {/* Popular Categories */}
        <div className='border-r border-gray-400'>
          <h3 className="font-bold text-gray-900 mb-4">Popular categories</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-blue-600">IT jobs</a></li>
            <li><a href="#" className="hover:text-blue-600">Sales jobs</a></li>
            <li><a href="#" className="hover:text-blue-600">Marketing jobs</a></li>
            <li><a href="#" className="hover:text-blue-600">Data Science jobs</a></li>
            <li><a href="#" className="hover:text-blue-600">HR jobs</a></li>
            <li><a href="#" className="hover:text-blue-600">Engineering jobs</a></li>
          </ul>
        </div>

        {/* Jobs in Demand */}
        <div className='border-r border-gray-400'>
          <h3 className="font-bold text-gray-900 mb-4">Jobs in demand</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-blue-600">Fresher jobs</a></li>
            <li><a href="#" className="hover:text-blue-600">MNC jobs</a></li>
            <li><a href="#" className="hover:text-blue-600">Remote jobs</a></li>
            <li>
              <a href="#" className="hover:text-blue-600">Work from home jobs</a>
            </li>
            <li><a href="#" className="hover:text-blue-600">Walk-in jobs</a></li>
            <li><a href="#" className="hover:text-blue-600">Part-time jobs</a></li>
          </ul>
        </div>

        {/* Jobs by Location */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Jobs by location</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-blue-600">Jobs in Delhi</a></li>
            <li><a href="#" className="hover:text-blue-600">Jobs in Mumbai</a></li>
            <li><a href="#" className="hover:text-blue-600">Jobs in Bangalore</a></li>
            <li><a href="#" className="hover:text-blue-600">Jobs in Hyderabad</a></li>
            <li><a href="#" className="hover:text-blue-600">Jobs in Chennai</a></li>
            <li><a href="#" className="hover:text-blue-600">Jobs in Pune</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownCard;
