import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import {
  FaHandshake,
  FaGraduationCap,
  FaBalanceScale,
  FaTools,
} from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";
import { RiComputerLine } from "react-icons/ri";
import {
  BiBarChart,
  BiUserCircle,
  BiSupport,
} from "react-icons/bi";
import { IoAnalyticsOutline } from "react-icons/io5";
import {
  MdOutlineBusiness,
  MdOutlineEngineering,
} from "react-icons/md";
import { FiSmile } from "react-icons/fi";

const FilterJob = () => {
  const location = useLocation();
  const buttons = [
    { label: "IT", icon: <RiComputerLine />, path: "/it" },
    { label: "Sales", icon: <FaHandshake />, path: "/sales" },
    { label: "Marketing", icon: <BiBarChart />, path: "/marketing" },
    { label: "HR", icon: <BiUserCircle />, path: "/hr" },
    { label: "Finance", icon: <MdOutlineBusiness />, path: "/finance" },
    { label: "Operations", icon: <MdOutlineEngineering />, path: "/operations" },
    { label: "Support", icon: <BiSupport />, path: "/support" },
    { label: "Analytics", icon: <IoAnalyticsOutline />, path: "/analytics" },
    { label: "Legal", icon: <FaBalanceScale />, path: "/legal" },
    { label: "Training", icon: <FaGraduationCap />, path: "/training" },
    { label: "Engineering", icon: <FaTools />, path: "/engineering" },
    { label: "Administration", icon: <FiSmile />, path: "/administration" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:mx-16 mt-6 lg:mt-10">
      {/* Header */}
      <div className="flex xs:flex-row justify-between items-start xs:items-center mb-6 gap-2 xs:gap-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Industries</h2>
        <div className="flex items-center">
          <Link
            to="/all-industries"
            className="mr-2 text-gray-800 hover:text-blue-600 text-sm sm:text-base transition-all duration-300"
          >
            View More
          </Link>
          <FaCircleArrowRight className="text-black text-base sm:text-lg" />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-wrap justify-center gap-4">
        {buttons.map((button, index) => (
          <Link
            key={index}
            to={button.path}
            aria-label={`Navigate to ${button.label}`}
            title={button.label}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 shadow-md 
              ${
                location.pathname === button.path
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:shadow-2xl hover:bg-gray-100"
              }`}
          >
            <span className="text-xl">{button.icon}</span>
            <span className="ml-2 text-base lg:text-lg font-medium">{button.label}</span>
          </Link>
        ))}
      </div>

      {/* Mobile Swiper View */}
      <div className="md:hidden">
        <Swiper
          spaceBetween={12}
          slidesPerView={3.2}
          freeMode={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay, FreeMode]}
          className="py-3"
        >
          {buttons.map((button, index) => (
            <SwiperSlide key={index}>
              <Link
                to={button.path}
                aria-label={`Navigate to ${button.label}`}
                title={button.label}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 shadow-md
                  ${
                    location.pathname === button.path
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:shadow-xl"
                  }`}
              >
                <span className="text-xl sm:text-2xl">{button.icon}</span>
                <span className="text-xs sm:text-sm font-medium mt-1 text-center">
                  {button.label}
                </span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FilterJob;
