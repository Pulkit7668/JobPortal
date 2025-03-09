import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const quickLinks = [
    { id: 'all', name: 'All Sections', icon: '📋' },
    { id: 'resume', name: 'Resume', icon: '📄' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills & Keywords', icon: '🛠️' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen sticky top-0 hidden md:block">
      <div className="p-5 mt-10">
        <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4 pl-2">Quick Links</h2>
        <nav>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.id} className="mb-2">
                <button 
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center w-full p-2 rounded transition-colors ${
                    activeTab === link.id ? 'bg-blue-700 text-white' : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
            <span className="text-white font-bold">R</span>
          </div>
          <div>
            <p className="text-sm font-medium">Rahul Sharma</p>
            <p className="text-xs text-gray-400">View Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}
