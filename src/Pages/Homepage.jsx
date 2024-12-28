import React, {useEffect} from "react";
import SearchInputBox from "../Components/SearchInputBox/SearchInputBox";
import JobsForSkills from "../Components/JobForSkills/JobForSkills";
import TopRecruiters from "../Components/TopRecruiters/TopRecruiters";
import FilterJob from "../Components/FilterJobs/FilterJob";
import JobOpportunities from "../Components/JobOpportunities/JobOpportunities";

function Homepage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SearchInputBox />
      <FilterJob />
      <JobsForSkills />
      <TopRecruiters />
      <JobOpportunities />
    </>
  );
}

export default Homepage;