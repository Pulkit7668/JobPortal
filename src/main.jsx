import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
// import RecruiterActions from "./Components/Navbar/RecruiterActions.jsx";
import JobDetail from "./Components/JobForSkills/JobDetails.jsx";
import RecruitersJobs from "./Components/TopRecruiters/RecruitersJobs.jsx";
import RecruiterJobDetails from "./Components/TopRecruiters/RecruiterJobDetails.jsx"
import JobDetailsForSkills from "./Components/JobForSkills/JobDetailsForSkills.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/recruiter-actions" element={<RecruiterActions />} /> */}
        <Route path="/jobforskills" element={<JobDetailsForSkills />} />
        <Route path="jobforskills/job/:id" element={<JobDetail />} />
        <Route path="/recruiters/jobs/:recruiterId" element={<RecruitersJobs />} />
        <Route path="/recruiters/:recruiterId/jobs/:jobId" element={<RecruiterJobDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
