import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import SearchInputBox from "../Components/SearchInputBox/SearchInputBox";
import JobsForSkills from "../Components/JobForSkills/JobForSkills";
import TopRecruiters from "../Components/TopRecruiters/TopRecruiters";
import ButtonGrid from "../Components/ButtonGrid/ButtonGrid";
import Footer from "../Components/Footer/Footer";
import JobListing from "../Components/JobCard/JobListing";

function Homepage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <SearchInputBox />
      <ButtonGrid />
      <JobsForSkills />
      <TopRecruiters />
      <JobListing />
      <Footer />
    </div>
  );
}

export default Homepage;