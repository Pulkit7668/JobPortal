import React from "react";
import { FiHome } from "react-icons/fi";
import { MdOutlineBusiness } from "react-icons/md";
import { FaGraduationCap, FaRocket } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { BsBox } from "react-icons/bs";
import { BiBarChart, BiUserCircle } from "react-icons/bi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoAnalyticsOutline } from "react-icons/io5";
import { HiOutlineCog } from "react-icons/hi";

const ButtonGrid = () => {
  const buttons = [
    { label: "Remote", icon: <FiHome /> },
    { label: "MNC", icon: <MdOutlineBusiness /> },
    { label: "Fresher", icon: <FaGraduationCap /> },
    { label: "Software & IT", icon: <RiComputerLine /> },
    { label: "Startup", icon: <FaRocket /> },
    { label: "Supply Chain", icon: <BsBox /> },
    { label: "Marketing", icon: <BiBarChart /> },
    { label: "Internship", icon: <AiOutlineFileSearch /> },
    { label: "Analytics", icon: <IoAnalyticsOutline /> },
    { label: "HR", icon: <BiUserCircle /> },
    { label: "Engineering", icon: <HiOutlineCog /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 mt-20 mx-20">
      {buttons.map((button, index) => (
        <div
          key={index}
          className="flex items-center px-4 py-4 bg-white shadow-md rounded-lg hover:shadow-2xl transition duration-200 cursor-pointer"
        >
          <span className="text-xl text-gray-700">{button.icon}</span>
          <span className="ml-2 text-lg font-medium text-gray-700">{button.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ButtonGrid;
