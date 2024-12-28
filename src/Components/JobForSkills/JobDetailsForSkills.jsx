import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jobs } from "./JobDataForSkills";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TogglePage from "../TogglePage/TogglePage";
import Slider from "react-slick";

// Mock user profile skills
const userSkills = ["React", "JavaScript", "HTML", "CSS", "Node"];

// Function to filter jobs based on user's skills
const filterJobsBySkills = (jobs, userSkills) => {
  return jobs.filter((job) =>
    job.skills.some((skill) => userSkills.includes(skill))
  );
};

const PrevArrow = ({ onClick, hidden }) => (
  <div
    className={`absolute p-2 border-2 border-blue-600 rounded-full left-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-gray-600 ${hidden ? 'hidden' : ''}`}
    onClick={onClick}
  >
    <FaArrowLeft className="text-blue-600" size={15} />
  </div>
);

const NextArrow = ({ onClick, hidden }) => (
  <div
    className={`absolute border-2 border-blue-600 p-2 rounded-full right-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer ${hidden ? 'hidden' : ''}`}
    onClick={onClick}
  >
    <FaArrowRight className="text-blue-600" size={15} />
  </div>
);

function JobDetailsForSkills() {
  const filteredJobs = filterJobsBySkills(jobs, userSkills);
  const navigate = useNavigate();
  const [isTogglePageOpen, setISTogglePageOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [hidePrev, setHidePrev] = useState(true);
  const [hideNext, setHideNext] = useState(false);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setISTogglePageOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const settings = {
    infinite: false,
    centerMode: false,
    slidesToShow: 3, // You can change this number to show more slides
    speed: 500,
    focusOnSelect: true,
    arrows: true,
    dots: true,
    prevArrow: <PrevArrow onClick={() => setHidePrev(false)} hidden={hidePrev} />,
    nextArrow: <NextArrow onClick={() => setHideNext(false)} hidden={hideNext} />,
    beforeChange: (current, next) => {
      setHidePrev(next === 0); // Hide prev arrow at the start
      setHideNext(next >= filteredJobs.length - settings.slidesToShow); // Hide next arrow after last slides
    },
    responsive: [
      {
        breakpoint: 1024, // Tablet screen (1024px)
        settings: {
          slidesToShow: 3, // Change this number to show more slides on tablet
          slidesToScroll: 3,
          beforeChange: (current, next) => {
            setHidePrev(next === 0); // Hide prev arrow at the start
            setHideNext(next >= filteredJobs.length - 3); // Hide next arrow after 3 slides (adjust this number if needed)
          },
        },
      },
      {
        breakpoint: 768, // Smaller tablet screen (768px)
        settings: {
          slidesToShow: 2, // Change this number to show more slides on smaller tablets
          slidesToScroll: 2,
          beforeChange: (current, next) => {
            setHidePrev(next === 0); // Hide prev arrow at the start
            setHideNext(next >= filteredJobs.length - 2); // Hide next arrow after 2 slides (adjust this number if needed)
          },
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Change this number to show more slides on mobile screens
          slidesToScroll: 1,
          beforeChange: (current, next) => {
            setHidePrev(next === 0); // Hide prev arrow at the start
            setHideNext(next >= filteredJobs.length - 1); // Hide next arrow after 1 slide (adjust this number if needed)
          },
        },
      },
    ],
  };

  return (
    <div className="p-6 lg:mx-20 mb-5">
      <div className="flex items-center mb-10">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft
            size={35}
            className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
          />
        </button>
        <h2 className="text-2xl font-bold">More Jobs for Your Skills</h2>
      </div>
      {filteredJobs.length > 0 ? (
        <Slider {...settings}>
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-blue-200 transition-shadow duration-300 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <div className="mt-2">
                <span className="text-xs text-gray-600">
                  Skills: <strong>{job.skills.join(", ")}</strong>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="mt-3">
                  <button
                    onClick={() => handleApplyNow(job)}
                    className="px-3 py-2 text-sm font-semibold text-blue-700"
                  >
                    Apply Now
                  </button>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/jobforskills/job/${job.id}`}
                    className="px-3 py-2 text-sm font-semibold text-blue-700"
                  >
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No jobs available for your skills at the moment.</p>
      )}

      {/* Toggle Page */}
      {isTogglePageOpen && (
        <TogglePage
          jobTitle={selectedJob?.title}
          onClose={() => setISTogglePageOpen(false)}
        />
      )}
    </div>
  );
}

export default JobDetailsForSkills;
