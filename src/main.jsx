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
import CareerGuidancePage from "./Components/Profile/CareerGuidancePage.jsx";
import FilterJobDetails from "./Components/FilterJobs/FilterJobDetails..jsx";
import Layout from "./Layout.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AllJobOpportunities from "./Components/JobOpportunities/AllJobOpportunities.jsx";
import ViewAndUpdateProfile from "./Components/Profile/ViewAndUpdateProfile.jsx";
import ChangePassword from "./Components/ChangePassword/ChangePassword.jsx";
import SupportChat from "./Components/SupportChat/SupportChat.jsx";
import ChangeVisibility from "./Components/ChangeVisibility/ChangeVisibility.jsx";
import SetJobPreference from "./Components/SetJobPreference/SetJobPreference.jsx";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";

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
          <Route path="/it" element={<JobCategoryPage category="IT" />} />
          <Route path="/sales" element={<JobCategoryPage category="Sales" />} />
          <Route path="/marketing" element={<JobCategoryPage category="Marketing" />} />
          <Route path="/hr" element={<JobCategoryPage category="HR" />} />
          <Route path="/finance" element={<JobCategoryPage category="Finance" />} />
          <Route path="/operations" element={<JobCategoryPage category="Operations" />} />
          <Route path="/support" element={<JobCategoryPage category="Support" />} />
          <Route path="/analytics" element={<JobCategoryPage category="Analytics" />} />
          <Route path="/legal" element={<JobCategoryPage category="Legal" />} />
          <Route path="/training" element={<JobCategoryPage category="Training" />} />
          <Route path="/engineering" element={<JobCategoryPage category="Engineering" />} />
          <Route path="/administration" element={<JobCategoryPage category="Administration" />} />
          <Route path="/search" element={<Searchpage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/job-results" element={<JobsResults />} />
          <Route path="/job-details/:jobTitle" element={<SearchJobDetails />} />
          <Route path="/jobs/:category/:jobId" element={<FilterJobDetails />} />
          <Route path="/career-guidance" element={<CareerGuidancePage />} />
          <Route path="/job-opportunities" element={<AllJobOpportunities />} />
          <Route path="/view-update-profile" element={<ViewAndUpdateProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/support-chat" element={<SupportChat />} />
          <Route path="/change-visibility" element={<ChangeVisibility />} />
          <Route path="/set-job-preference" element={<SetJobPreference />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
