import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import SearchInputBox from "../Components/SearchInputBox/SearchInputBox";
import JobsForSkills from "../Components/JobForSkills/JobForSkills";
import TopRecruiters from "../Components/TopRecruiters/TopRecruiters";
import Footer from "../Components/Footer/Footer";
import FilterJob from "../Components/FilterJobs/FilterJob";
import JobOpportunities from "../Components/JobOpportunities/JobOpportunities";

function Homepage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <SearchInputBox />
      <FilterJob />
      <JobsForSkills />
      <TopRecruiters />
      <JobOpportunities />
      <Footer />
    </div>
  );
}

export default Homepage;