import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar/Navbar";
import SearchInputBox from "../Components/SearchInputBox/SearchInputBox";
import JobsForSkills from "../Components/JobForSkills/JobForSkills";
import TopRecruiters from "../Components/TopRecruiters/TopRecruiters";
import ButtonGrid from "../Components/ButtonGrid/ButtonGrid";
import Footer from "../Components/Footer/Footer";
import JobListing from "../Components/JobCard/JobListing";
import jobData from "../Components/JobCard/DummyData";

function Homepage() {
  const [visibleJobs, setVisibleJobs] = useState(2);

  const handleViewMore = () => {
    setVisibleJobs((prev) => Math.min(prev + 2, jobData.length));
  };

  const handleViewLess = () => {
    setVisibleJobs((prev) => Math.max(prev - 10, 2));
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <SearchInputBox />
      <ButtonGrid />
      <JobsForSkills />
      <TopRecruiters />
      <div className="container mt-12 mb-10">
        <h1 className="ml-24 mb-4 text-3xl font-bold">Job Opportunities</h1>
        <div className="grid grid-cols-2 gap-5 mx-24">
          <AnimatePresence>
            {jobData.slice(0, visibleJobs).map((job) => (
              <motion.div
                key={job.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardAnimation}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <JobListing
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  salary={job.salary}
                  type={job.type}
                  experience={job.experience}
                  logo={job.logo}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center gap-4">
          {visibleJobs < jobData.length && (
            <button
              onClick={handleViewMore}
              className="mt-5 px-4 py-2 font-semibold text-black border border-black rounded-xl hover:bg-white transition duration-300"
            >
              View More
            </button>
          )}
          {visibleJobs > 2 && (
            <button
              onClick={handleViewLess}
              className="mt-5 px-4 py-2 font-semibold text-black border border-black rounded-xl hover:bg-white transition duration-300"
            >
              View Less
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;