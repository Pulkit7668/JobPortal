// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter >
//     <App />
//     </BrowserRouter>
//   </StrictMode>,
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import RecruiterActions from "./Components/Navbar/RecruiterActions.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recruiter-actions" element={<RecruiterActions />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
