import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import SearchInputBox from './Components/SearchInputBox/SearchInputBox';
import JobsForSkills from './Components/JobForSkills/JobForSkills';
import TopRecruiters from './Components/TopRecruiters/TopRecruiters';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <SearchInputBox />
      <JobsForSkills />
      <TopRecruiters />
      </div>
  );
}

export default App;
