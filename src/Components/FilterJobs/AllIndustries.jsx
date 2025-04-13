import React, { useState, useEffect, useMemo } from 'react';
import { filterJobData } from './FilterJobData';
import JobCardPage from './JobCardPage';
import { useNavigate } from 'react-router-dom';

const AllIndustries = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [showJobCardPage, setShowJobCardPage] = useState(false);
  const navigate = useNavigate();

  // ✅ Memoize departments to avoid update loop
  const departments = useMemo(() => Object.keys(filterJobData), []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredDepartments(departments);
    } else {
      const filtered = departments.filter(dept => 
        dept.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDepartments(filtered);
    }
  }, [searchQuery, departments]);

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
    setShowJobCardPage(true);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const formatDepartmentName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const countTotalJobs = (department) => {
    return filterJobData[department].length;
  };

  // Department colors for visual distinction
  const departmentColors = {
    engineering: "#E3F2FD",
    marketing: "#F3E5F5",
    sales: "#E8F5E9",
    design: "#FFF3E0",
    finance: "#E0F7FA",
    hr: "#FBE9E7",
    operations: "#F1F8E9",
    product: "#E8EAF6",
    legal: "#FFEBEE",
    customer: "#FFFDE7",
  };

  // Department icons for visual distinction
  const getDepartmentIcon = (department) => {
    switch(department.toLowerCase()) {
      case 'engineering':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'marketing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        );
      case 'sales':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'design':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        );
      case 'finance':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  // If JobCardPage should be shown, render it
  if (showJobCardPage && selectedDepartment) {
    return <JobCardPage category={formatDepartmentName(selectedDepartment)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 mt-5">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center p-4">
          <button 
            onClick={handleBackClick}
            className="mr-4 text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">
            {selectedDepartment 
              ? `${selectedDepartment.charAt(0).toUpperCase() + selectedDepartment.slice(1)} Jobs` 
              : 'All Industries'}
          </h1>
        </div>
        
        {/* Search input */}
        {!selectedDepartment && (
          <div className="px-4 pb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input
                type="text"
                className="w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Department"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {!selectedDepartment ? (
          // Department List with visual differentiation
          <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {filteredDepartments.map((department, index) => {
              const bgColor = departmentColors[department.toLowerCase()] || "#F5F5F5";
              
              return (
                <div 
                  key={department} 
                  className="flex items-center p-5 hover:shadow-lg cursor-pointer transition-all duration-300 rounded-xl border border-gray-200"
                  style={{ 
                    backgroundColor: bgColor,
                    transform: "scale(1)",
                    transition: "transform 0.2s"
                  }}
                  onClick={() => handleDepartmentClick(department)}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <div className={`p-3 rounded-full mr-4 flex items-center justify-center`} 
                    style={{ 
                      backgroundColor: "white", 
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
                    }}>
                    {getDepartmentIcon(department)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{formatDepartmentName(department)}</h3>
                    <div className="flex items-center mt-1">
                      <span className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        {countTotalJobs(department)} Jobs Available
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Job Listings for Selected Department
          <div className="divide-y divide-gray-100">
            {filterJobData[selectedDepartment]
              .filter(job => 
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((job) => (
                <div key={job.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="p-2 bg-gray-100 rounded-md mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{job.title}</h3>
                      <p className="text-gray-600 text-sm">{job.company}</p>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{job.location}</p>
                        <p className="text-sm text-gray-500">Experience: {job.experience}</p>
                        <p className="text-sm text-gray-500">Salary: {job.salary}</p>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {job.skills && job.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700">
                            {skill}
                          </span>
                        ))}
                        {job.skills && job.skills.length > 3 && (
                          <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AllIndustries;