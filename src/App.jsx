import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import SearchInputBox from './Components/SearchInputBox/SearchInputBox';
import JobsForSkills from './Components/JobForSkills/JobForSkills';
import TopRecruiters from './Components/TopRecruiters/TopRecruiters';
import ButtonGrid from './Components/ButtonGrid/ButtonGrid';
import Footer from './Components/Footer/Footer'
import JobCards from './Components/SearchInputBox/JobCards';
import jobData from './Components/SearchInputBox/DummyData';


function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
    <Navbar />
    <SearchInputBox />
    <ButtonGrid />
    <JobsForSkills />
    <TopRecruiters />
    <div className="container mt-12 mb-10">
      <h1 className="ml-24 mb-4 text-3xl font-bold">Job Opportunities</h1>
      <div className='grid grid-cols-2 gap-5 mx-24'>
      {jobData.map((job) => (
        <JobCards key={job.id} job={job} />
      ))}
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default App;
