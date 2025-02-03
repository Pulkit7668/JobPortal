// import React, { useState, useRef, useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import toast, { Toaster } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";

// const TogglePage = ({ jobTitle, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     resume: null,
//   });

//   const modalRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (modalRef.current && !modalRef.current.contains(e.target)) {
//         onClose();
//       }
//     };

//     // Add event listener for click outside
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [onClose]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.phone || !formData.resume) {
//       toast.error("Please fill all the required fields!");
//       return;
//     }

//     const loadingToast = toast.loading("Submitting your application...");

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       toast.success(`You have successfully applied for the ${jobTitle} position!`, {
//         id: loadingToast,
//       });

//       setTimeout(() => {
//         onClose();
//       }, 2000);
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.", {
//         id: loadingToast,
//       });
//     }
//   };

//   // Framer Motion variants for bottom-to-top animations
//   const drawerVariants = {
//     hidden: { y: "100%" },
//     visible: { y: 0 },
//     exit: { y: "100%", transition: { duration: 3 } },
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end"
//         initial="hidden"
//         animate="visible"
//         exit="hidden"
//       >
//         <motion.div
//           ref={modalRef}
//           variants={drawerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           className="bg-white p-6 w-full max-w-none rounded-t-lg shadow-lg"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Apply for {jobTitle}</h2>
//             <motion.button
//               onClick={onClose}
//               className="text-gray-600 hover:text-gray-800 font-semibold p-2"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               initial={{ opacity: 1 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0, transition: { duration: 0.3 } }}
//             >
//               <FaTimes size={20} />
//             </motion.button>
//           </div>
//           <form onSubmit={handleSubmit}>
//             {/* Name Field */}
//             <div className="mb-4">
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                 Name<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your name"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             {/* Email Field */}
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your email"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             {/* Phone Field */}
//             <div className="mb-4">
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your phone number"
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             {/* Resume Upload */}
//             <div className="mb-4">
//               <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-4">
//                 Resume Upload<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="file"
//                 id="resume"
//                 name="resume"
//                 onChange={handleChange}
//                 required
//                 accept=".pdf,.doc,.docx"
//                 className="mt-1 block w-full"
//               />
//             </div>

//             {/* Submit and Cancel Buttons */}
//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="mr-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//               >
//                 Apply
//               </button>
//             </div>
//           </form>
//           <Toaster position="top-center" />
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default TogglePage;

import React, { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const TogglePage = ({ jobTitle, onClose }) => {
  const [formData, setFormData] = useState({});

  const recruiterQuestions = [
    "Why do you want this job?",
    "What are your key skills?",
    "Describe a challenge you faced and how you handled it.",
  ];

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [index]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((answer) => !answer.trim())) {
      toast.error("Please answer all questions!");
      return;
    }

    const loadingToast = toast.loading("Submitting your application...");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(`You have successfully applied for the ${jobTitle} position!`, {
        id: loadingToast,
      });
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        id: loadingToast,
      });
    }
  };

  const drawerVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
    exit: { y: "100%", transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end" initial="hidden" animate="visible" exit="hidden">
        <motion.div ref={modalRef} variants={drawerVariants} initial="hidden" animate="visible" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }} className="bg-white p-6 w-full max-w-none rounded-t-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Apply for {jobTitle}</h2>
            <motion.button onClick={onClose} className="text-gray-600 hover:text-gray-800 font-semibold p-2" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FaTimes size={20} />
            </motion.button>
          </div>
          <form onSubmit={handleSubmit}>
            {recruiterQuestions.map((question, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{question}</label>
                <textarea value={formData[index] || ""} onChange={(e) => handleChange(e, index)} required placeholder="Your answer..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
              </div>
            ))}
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="mr-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
              <button type="submit" className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Submit</button>
            </div>
          </form>
          <Toaster position="top-center" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TogglePage;
