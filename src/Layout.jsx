import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

const Layout = () => {
  const location = useLocation();

  // Jinke upar footer nahi dikhana hai unka path yahan specify karo
  const hideFooterRoutes = ["/signup" ,"/login", "/register", "/dashboard", "/support-chat", "/view-update-profile", "/recruiter-chat", "/support-chat", "/set-job-preference", "/blocked-companies", "/saved-jobs"];

  const hideNavbarRoutes = ["/recruiter-page"];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Agar current route hideNavbarRoutes me nahi hai to navbar dikhao */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
      {/* Agar current route hideFooterRoutes me nahi hai to footer dikhao */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default Layout;
