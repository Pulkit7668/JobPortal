// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaBriefcase, FaUsers, FaStar } from "react-icons/fa";

// const RecruiterSidePage = () => {
//   return (
//     <div className="font-sans text-gray-900">
//       {/* Navbar */}
//       <nav className="bg-gray-50 text-black py-4 px-10 flex justify-between items-center shadow-md">
//         <div className="flex items-center gap-6">
//           <Link to="/" className="text-4xl font-bold text-blue-600">
//             UrLogo
//           </Link>
//         </div>
//         <div className="flex items-center gap-6">
//           <ul className="flex gap-6">
//             <li>
//               <Link
//                 to="/"
//                 className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1"
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/subscription-plan"
//                 className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1"
//               >
//                 Subscription Plan
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/services"
//                 className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1"
//               >
//                 Services
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/contact-us"
//                 className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1"
//               >
//                 Contact Us
//               </Link>
//             </li>
//           </ul>
//           <button className="font-semibold hover:text-blue-500 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1">
//             Sign Up
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section id="home" className="text-center py-20 bg-gray-100">
//         <motion.h2
//           className="text-4xl font-bold"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           Find the Best Talent Faster & Smarter!
//         </motion.h2>
//         <p className="mt-4 text-lg text-gray-700">
//           Post jobs, track applications, and hire the right candidates effortlessly.
//         </p>
//         <motion.button
//           className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300"
//           whileHover={{ scale: 1.05 }}
//         >
//           Get Started Today
//         </motion.button>
//       </section>

//       {/* Why Choose Us */}
//       <section id="why-choose-us" className="py-16 px-8">
//         <h3 className="text-3xl font-bold text-center">Why Choose UrLogo?</h3>
//         <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {[
//             { title: "AI-Powered Matching", icon: <FaBriefcase size={28} /> },
//             { title: "Easy Job Posting", icon: <FaUsers size={28} /> },
//             { title: "Verified Candidate Profiles", icon: <FaStar size={28} /> },
//             { title: "Subscription Plans", icon: <FaBriefcase size={28} /> },
//             { title: "24/7 Support", icon: <FaUsers size={28} /> },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               className="p-6 bg-gray-100 rounded-lg shadow flex items-center gap-4"
//               whileHover={{ scale: 1.05 }}
//             >
//               {item.icon}
//               <div>
//                 <h4 className="text-xl font-semibold">{item.title}</h4>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Interactive Statistics */}
//       <section className="text-center py-16 bg-blue-600 text-white">
//         <h3 className="text-3xl font-bold">Our Impact</h3>
//         <div className="mt-8 flex justify-center gap-12 text-xl font-semibold">
//           <motion.div whileHover={{ scale: 1.1 }}>
//             <p className="text-4xl font-bold">5K+</p>
//             <p>Recruiters</p>
//           </motion.div>
//           <motion.div whileHover={{ scale: 1.1 }}>
//             <p className="text-4xl font-bold">10K+</p>
//             <p>Hires Made</p>
//           </motion.div>
//           <motion.div whileHover={{ scale: 1.1 }}>
//             <p className="text-4xl font-bold">98%</p>
//             <p>Satisfaction</p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-16 px-8 bg-gray-50">
//         <h3 className="text-3xl font-bold text-center">What Recruiters Say</h3>
//         <div className="mt-8 grid md:grid-cols-2 gap-8">
//           {[
//             { name: "Rahul Sharma", review: "This platform made hiring so much easier!" },
//             { name: "Neha Agarwal", review: "A must-have tool for every recruiter." },
//           ].map((testimonial, index) => (
//             <motion.div
//               key={index}
//               className="p-6 bg-white shadow-md rounded-lg"
//               whileHover={{ scale: 1.05 }}
//             >
//               <p className="text-gray-700">"{testimonial.review}"</p>
//               <h4 className="mt-4 font-semibold">{testimonial.name}</h4>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="text-center py-16">
//         <h2 className="text-3xl font-bold">Ready to Hire Top Talent?</h2>
//         <p className="mt-4 text-lg">Post jobs and start hiring in minutes!</p>
//         <motion.button
//           className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition-all duration-300"
//           whileHover={{ scale: 1.05 }}
//         >
//           Start Hiring Now
//         </motion.button>
//       </section>
//     </div>
//   );
// };

// export default RecruiterSidePage;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBriefcase, FaUsers, FaStar } from "react-icons/fa";

const RecruiterSidePage = () => {
  return (
    <div className="font-sans text-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-50 text-black py-4 px-10 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-4xl font-bold text-blue-600">
            UrLogo
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1">
                Home
              </Link>
            </li>
            <li>
              <Link to="/subscription-plan" className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1">
                Subscription Plan
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-blue-600 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1">
                Contact Us
              </Link>
            </li>
          </ul>
          <button className="font-semibold hover:text-blue-500 hover:border-b-2 border-orange-500 pb-1 transition-all duration-300 py-1">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="text-center py-20 bg-gray-100">
        <motion.h2 className="text-4xl font-bold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Find the Best Talent Faster & Smarter!
        </motion.h2>
        <p className="mt-4 text-lg text-gray-700">Post jobs, track applications, and hire the right candidates effortlessly.</p>
        <motion.button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300" whileHover={{ scale: 1.05 }}>
          Get Started Today
        </motion.button>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-16 px-8">
        <h3 className="text-3xl font-bold text-center">Why Choose UrLogo?</h3>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[{ title: "AI-Powered Matching", icon: <FaBriefcase size={28} /> },
            { title: "Easy Job Posting", icon: <FaUsers size={28} /> },
            { title: "Verified Candidate Profiles", icon: <FaStar size={28} /> },
            { title: "Subscription Plans", icon: <FaBriefcase size={28} /> },
            { title: "24/7 Support", icon: <FaUsers size={28} /> },].map((item, index) => (
            <motion.div key={index} className="p-6 bg-gray-100 rounded-lg shadow flex items-center gap-4" whileHover={{ scale: 1.05 }}>
              {item.icon}
              <div>
                <h4 className="text-xl font-semibold">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Statistics */}
      <section className="text-center py-16 bg-blue-600 text-white">
        <h3 className="text-3xl font-bold">Our Impact</h3>
        <div className="mt-8 flex justify-center gap-12 text-xl font-semibold">
          {[{ label: "Recruiters", value: "5K+" },
            { label: "Hires Made", value: "10K+" },
            { label: "Satisfaction", value: "98%" },].map((stat, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }}>
              <p className="text-4xl font-bold">{stat.value}</p>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-8 bg-gray-50">
        <h3 className="text-3xl font-bold text-center">What Recruiters Say</h3>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {[{ name: "Rahul Sharma", review: "This platform made hiring so much easier!" },
            { name: "Neha Agarwal", review: "A must-have tool for every recruiter." },].map((testimonial, index) => (
            <motion.div key={index} className="p-6 bg-white shadow-md rounded-lg" whileHover={{ scale: 1.05 }}>
              <p className="text-gray-700">"{testimonial.review}"</p>
              <h4 className="mt-4 font-semibold">{testimonial.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold">Ready to Hire Top Talent?</h2>
        <p className="mt-4 text-lg">Post jobs and start hiring in minutes!</p>
        <motion.button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition-all duration-300" whileHover={{ scale: 1.05 }}>
          Start Hiring Now
        </motion.button>
      </section>
    </div>
  );
};

export default RecruiterSidePage;