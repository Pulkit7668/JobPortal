// import React from "react";
// import { FiHome } from "react-icons/fi";
// import { MdOutlineBusiness } from "react-icons/md";
// import { FaGraduationCap, FaRocket, FaHandshake } from "react-icons/fa";
// import { RiComputerLine } from "react-icons/ri";
// import { BsBox } from "react-icons/bs";
// import { BiBarChart, BiUserCircle } from "react-icons/bi";
// import { AiOutlineFileSearch } from "react-icons/ai";
// import { IoAnalyticsOutline } from "react-icons/io5";

// const ButtonGrid = () => {
//   const buttons = [
//     { label: "Remote", icon: <FiHome /> },
//     { label: "MNC", icon: <MdOutlineBusiness /> },
//     { label: "Fresher", icon: <FaGraduationCap /> },
//     { label: "Software & IT", icon: <RiComputerLine /> },
//     { label: "Startup", icon: <FaRocket /> },
//     { label: "Supply Chain", icon: <BsBox /> },
//     { label: "Marketing", icon: <BiBarChart /> },
//     { label: "Internship", icon: <AiOutlineFileSearch /> },
//     { label: "Analytics", icon: <IoAnalyticsOutline /> },
//     { label: "HR", icon: <BiUserCircle /> },
//     { label: "Sales", icon: <FaHandshake /> },
//   ];

//   return (
//     <div className="flex flex-wrap justify-center gap-4 p-4 mt-20 mx-20">
//       {buttons.map((button, index) => (
//         <div
//           key={index}
//           className="flex items-center px-4 py-4 bg-white shadow-md rounded-lg hover:shadow-2xl transition duration-200 cursor-pointer"
//         >
//           <span className="text-xl text-gray-700">{button.icon}</span>
//           <span className="ml-2 text-lg font-medium text-gray-700">{button.label}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ButtonGrid;

import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from "react-icons/fi";
import { MdOutlineBusiness } from "react-icons/md";
import { FaGraduationCap, FaRocket, FaHandshake } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { BsBox } from "react-icons/bs";
import { BiBarChart, BiUserCircle } from "react-icons/bi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoAnalyticsOutline } from "react-icons/io5";

const ButtonGrid = () => {
  const buttons = [
    { label: "Remote", icon: <FiHome />, path: "/remote" },
    { label: "MNC", icon: <MdOutlineBusiness />, path: "/mnc" },
    { label: "Fresher", icon: <FaGraduationCap />, path: "/fresher" },
    { label: "Software & IT", icon: <RiComputerLine />, path: "/software-it" },
    { label: "Startup", icon: <FaRocket />, path: "/startup" },
    { label: "Supply Chain", icon: <BsBox />, path: "/supply-chain" },
    { label: "Marketing", icon: <BiBarChart />, path: "/marketing" },
    { label: "Internship", icon: <AiOutlineFileSearch />, path: "/internship" },
    { label: "Analytics", icon: <IoAnalyticsOutline />, path: "/analytics" },
    { label: "HR", icon: <BiUserCircle />, path: "/hr" },
    { label: "Sales", icon: <FaHandshake />, path: "/sales" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 mt-20 mx-20">
      {buttons.map((button, index) => (
        <Link key={index} to={button.path} className="flex items-center px-4 py-4 bg-white shadow-md rounded-lg hover:shadow-2xl transition duration-200 cursor-pointer">
          <span className="text-xl text-gray-700">{button.icon}</span>
          <span className="ml-2 text-lg font-medium text-gray-700">{button.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default ButtonGrid;
