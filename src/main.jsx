import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import JobDetail from "./Components/JobForSkills/JobDetails.jsx";
import RecruitersJobs from "./Components/TopRecruiters/RecruitersJobs.jsx";
import RecruiterJobDetails from "./Components/TopRecruiters/RecruiterJobDetails.jsx";
import JobDetailsForSkills from "./Components/JobForSkills/JobDetailsForSkills.jsx";
import AllRecruiters from "./Components/TopRecruiters/AllRecruiters.jsx";
import JobCategoryPage from './Components/FilterJobs/JobCardPage.jsx';
import Searchpage from "./Components/SearchInputBox/Searchpage.jsx";
import NotificationPage from "./Components/Navbar/NotificationPage.jsx";
import JobsResults from "./Components/SearchInputBox/JobResults.jsx";
import SearchJobDetails from "./Components/SearchInputBox/SearchJobDetails.jsx";
import CareerGuidancePage from "./Components/CareerGuidance/CareerGuidancePage.jsx";
import FilterJobDetails from "./Components/FilterJobs/FilterJobDetails..jsx";
import Layout from "./Layout.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/jobforskills" element={<JobDetailsForSkills />} />
          <Route path="jobforskills/job/:id" element={<JobDetail />} />
          <Route path="/recruiters/all" element={<AllRecruiters />} />
          <Route path="/recruiters/jobs/:recruiterId" element={<RecruitersJobs />} />
          <Route path="/recruiters/:recruiterId/jobs/:jobId" element={<RecruiterJobDetails />} />
          <Route path="/remote" element={<JobCategoryPage category="Remote" />} />
          <Route path="/mnc" element={<JobCategoryPage category="MNC" />} />
          <Route path="/fresher" element={<JobCategoryPage category="Fresher" />} />
          <Route path="/software-it" element={<JobCategoryPage category="SoftwareIt" />} />
          <Route path="/startup" element={<JobCategoryPage category="Startup" />} />
          <Route path="/supply-chain" element={<JobCategoryPage category="SupplyChain" />} />
          <Route path="/marketing" element={<JobCategoryPage category="Marketing" />} />
          <Route path="/internship" element={<JobCategoryPage category="Internship" />} />
          <Route path="/analytics" element={<JobCategoryPage category="Analytics" />} />
          <Route path="/hr" element={<JobCategoryPage category="HR" />} />
          <Route path="/sales" element={<JobCategoryPage category="Sales" />} />
          <Route path="/search" element={<Searchpage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/job-results" element={<JobsResults />} />
          <Route path="/job-details/:jobTitle" element={<SearchJobDetails />} />
          <Route path="/jobs/:category/:jobId" element={<FilterJobDetails />} />
          <Route path="/career-guidance" element={<CareerGuidancePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
