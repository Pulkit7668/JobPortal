// export const jobsData = [
//     {
//       title: "Popular categories",
//       items: [
//         { label: "IT jobs", link: "/jobs/it" },
//         { label: "Sales jobs", link: "/jobs/sales" },
//         { label: "Marketing jobs", link: "/jobs/marketing" },
//         { label: "Data Science jobs", link: "/jobs/data-science" },
//         { label: "HR jobs", link: "/jobs/hr" },
//         { label: "Engineering jobs", link: "/jobs/engineering" },
//       ],
//     },
//     {
//       title: "Jobs in demand",
//       items: [
//         { label: "Fresher jobs", link: "/jobs/fresher" },
//         { label: "MNC jobs", link: "/jobs/mnc" },
//         { label: "Remote jobs", link: "/jobs/remote" },
//         { label: "Work from home jobs", link: "/jobs/work-from-home" },
//         { label: "Walk-in jobs", link: "/jobs/walk-in" },
//         { label: "Part-time jobs", link: "/jobs/part-time" },
//       ],
//     },
//     {
//       title: "Jobs by location",
//       items: [
//         { label: "Jobs in Delhi", link: "/jobs/delhi" },
//         { label: "Jobs in Mumbai", link: "/jobs/mumbai" },
//         { label: "Jobs in Bangalore", link: "/jobs/bangalore" },
//         { label: "Jobs in Hyderabad", link: "/jobs/hyderabad" },
//         { label: "Jobs in Chennai", link: "/jobs/chennai" },
//         { label: "Jobs in Pune", link: "/jobs/pune" },
//       ],
//     },
//   ];
  
//   export const companiesData = [
//     {
//       title: "Resume writing",
//       items: [
//         { label: "Text resume", link: "/services/text-resume" },
//         { label: "Visual resume", link: "/services/visual-resume" },
//         { label: "Resume critique", link: "/services/resume-critique" },
//       ],
//     },
//     {
//       title: "Get recruiter's attention",
//       items: [
//         { label: "Resume display", link: "/services/resume-display" },
//         { label: "Monthly subscriptions", link: "/services/subscriptions" },
//         { label: "Basic & premium plans", link: "/services/plans" },
//       ],
//     },
//     {
//       title: "Free resume resources",
//       items: [
//         { label: "Resume maker", link: "/resources/resume-maker" },
//         { label: "Resume quality score", link: "/resources/quality-score" },
//         { label: "Resume samples", link: "/resources/samples" },
//         { label: "Job letter samples", link: "/resources/job-letters" },
//       ],
//     },
//   ];
  

// import React from "react";
// import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

// const Navbar = () => {
//   return (
//     <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
//       {/* Left: Logo and Menu */}
//       <div className="flex items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-1">
//           <div className="text-blue-600 text-xl font-bold">naukri</div>
//           <div className="text-orange-500 text-xl font-bold">campus</div>
//         </div>
//         {/* Menu Items */}
//         <div className="ml-10 flex space-x-6">
//           <a href="#" className="text-gray-600 hover:text-blue-500 font-medium">
//             Prepare
//           </a>
//           <a href="#" className="text-gray-600 hover:text-blue-500 font-medium">
//             Participate
//           </a>
//           <a href="#" className="text-gray-600 hover:text-blue-500 font-medium">
//             Opportunities
//           </a>
//         </div>
//       </div>

//       {/* Right: Search Bar, Notification, and User Icon */}
//       <div className="flex items-center space-x-6">
//         {/* Search Bar */}
//         <div className="flex items-center border rounded-full px-4 py-2 shadow-sm">
//           <input
//             type="text"
//             placeholder="Search jobs here"
//             className="outline-none text-gray-600 text-sm w-full"
//           />
//           <button className="ml-2 text-white bg-blue-600 p-2 rounded-full">
//             <FaSearch />
//           </button>
//         </div>

//         {/* Notification Bell */}
//         <div className="relative">
//           <FaBell className="text-gray-600 text-xl cursor-pointer" />
//           <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
//             2
//           </span>
//         </div>

//         {/* User Icon */}
//         <div className="bg-gray-100 p-2 rounded-full shadow-sm cursor-pointer">
//           <FaUserCircle className="text-gray-600 text-xl" />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// {/* <div className="space-x-4 flex items-center">
//             <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-200">
//               Login
//             </button>
//             <button className="bg-[#F05537] text-white px-4 py-2 rounded-full hover:bg-[#FC7358]">
//               Register
//             </button>

//             {/* For Employers Dropdown */}
//             <div className="group inline-block relative">
//               <button className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
//                 For Employers ▾
//               </button>
//               <div className="absolute hidden group-hover:block bg-white rounded-md shadow-lg mt-2 w-48">
//                 <ul>
//                   <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                     Buy Online
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                     Naukri Hiring Suite
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                     Employer Login
//                   </li>
//                 </ul>
//               </div>
//             </div>
//            */}

