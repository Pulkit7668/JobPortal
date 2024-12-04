import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import RecruiterActions from "./Components/Navbar/RecruiterActions.jsx";
import WishlistPage from "./Components/Profile/Wishlist.jsx";
import JobDetail from "./Components/JobForSkills/JobDetails.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recruiter-actions" element={<RecruiterActions />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="jobforskills/job/:id" element={<JobDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
