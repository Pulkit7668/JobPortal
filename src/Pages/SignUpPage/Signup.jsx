import { useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineInfoCircle } from "react-icons/ai"
import { motion } from "framer-motion"
import LoginPage from "../LoginPage/LoginPage"
import { useNavigate } from "react-router-dom"

function Signup() {
  const [workStatus, setWorkStatus] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    city: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Add state to control login page visibility
  const [showLogin, setShowLogin] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required"
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!workStatus) {
      newErrors.workStatus = "Please select your work status"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)

        // Show success toast and open login page
        toast.success("Registration successful!", {
          duration: 3000,
        })

        // Open login page
        setShowLogin(true)
      }, 1500)
    } else {
      // Shake animation for form if there are errors
      const formElement = document.getElementById("signupForm")
      formElement.classList.add("shake")
      setTimeout(() => {
        formElement.classList.remove("shake")
      }, 500)

      toast.error("Please fix the errors in the form")
    }
  }

  const closeSignup = () => {
    navigate("/");
  }

  // Close login page
  const handleCloseLogin = () => {
    setShowLogin(false)
  }

  // Tooltip component
  const Tooltip = ({ text }) => (
    <span className="group relative inline-flex ml-1">
      <AiOutlineInfoCircle className="text-gray-500 cursor-help" />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-48 text-center">
        {text}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></span>
      </span>
    </span>
  )

  return (
    <>
      <Toaster />
      <style>
        {`
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        
        .input-error {
          border-color: #ef4444;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 5px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        `}
      </style>

      <div className="flex items-center justify-center md:p-6 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-full overflow-hidden"
        >
          {/* Left Section - Box */}
          <div className="w-1/2 p-6 flex flex-col items-center justify-center xs:hidden lg:block">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md w-[80%]"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                src="https://plus.unsplash.com/premium_vector-1721224450752-b0f014727713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMElsbHVzdHJhdGlvbnN8ZW58MHx8MHx8fDA%3D"
                alt="Benefits"
                className="w-52 h-52 mb-3 border rounded-full p-2 mx-auto"
              />
              <div className="mt-10">
                <h2 className="text-lg font-bold">On registering, you can</h2>
                <motion.ul className="mt-3 space-y-2 text-xs font-medium text-left text-gray-700">
                  {[
                    "Build your profile and let recruiters find you",
                    "Get job postings delivered right to your email",
                    "Find a job and grow your career",
                  ].map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                      className="flex items-start"
                    >
                      <span className="text-green-500 mr-2">✅</span> {benefit}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </div>

          {/* Right Section - Box */}
          <div className="xs:w-full lg:w-[70%] p-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="border p-6 bg-white rounded-lg shadow-md h-full"
            >
              <div className="flex items-center justify-between">
                <h1 className="xs:text-xl md:text-3xl font-bold">Create your Naukri profile</h1>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  onClick={closeSignup}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <AiOutlineClose size={24} />
                </motion.button>
              </div>
              <p className="text-sm font-semibold text-gray-600 mt-2">
                Search & apply to jobs from India's No.1 Job Site
              </p>

              <form id="signupForm" className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="What is your Name"
                    className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.fullName ? "input-error" : ""}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email ID</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Tell us your Email ID"
                    className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.email ? "input-error" : ""}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="(minimum 6 characters)"
                      className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.password ? "input-error" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <div
                    className={`flex items-center border rounded-lg p-3 transition-all duration-300 ${errors.mobile ? "border-red-500" : ""}`}
                  >
                    <span className="text-gray-600 mr-2">+91</span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      className="w-full outline-none"
                    />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                </div>

                {/* Work Status Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Work Status</label>
                  <div className="flex gap-4 mt-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all duration-300 ${workStatus === "experienced" ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${errors.workStatus ? "border-red-500" : ""}`}
                      onClick={() => setWorkStatus("experienced")}
                    >
                      <h3 className="xs:text-xs md:text-base font-semibold">I'm experienced</h3>
                      <p className="xs:text-xs md:text-sm text-gray-600">
                        I have work experience (excluding internships)
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all duration-300 ${workStatus === "fresher" ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${errors.workStatus ? "border-red-500" : ""}`}
                      onClick={() => setWorkStatus("fresher")}
                    >
                      <h3 className="xs:text-xs md:text-base font-semibold">I'm a fresher</h3>
                      <p className="xs:text-xs md:text-sm text-gray-600">
                        I am a student / Haven't worked after graduation
                      </p>
                    </motion.div>
                  </div>
                  {errors.workStatus && <p className="text-red-500 text-xs mt-1">{errors.workStatus}</p>}
                </div>

                {/* Conditionally Render Resume Upload for Experienced Users with smooth transition */}
                <motion.div
                  initial={false}
                  animate={{
                    height: workStatus === "experienced" ? "auto" : 0,
                    opacity: workStatus === "experienced" ? 1 : 0,
                    marginTop: workStatus === "experienced" ? "1rem" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
                  <div className="mt-2">
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-all duration-300">
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          <svg
                            className="w-10 h-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600">Drag and drop your resume here, or click to browse</p>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-600 mt-2">
                      Accepted formats: (DOC, DOCx, PDF, RTF | Max size: 2 MB)
                      <Tooltip text="Upload your latest resume to help recruiters find you easily" />
                    </p>
                  </div>
                </motion.div>

                {/* City Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.city ? "input-error" : ""}`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                {/* Register Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Register"
                  )}
                </motion.button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  By clicking Register, you agree to our
                  <a href="#" className="text-blue-500 hover:underline">
                    {" "}
                    Terms and Conditions
                  </a>{" "}
                  and
                  <a href="#" className="text-blue-500 hover:underline">
                    {" "}
                    Privacy Policy
                  </a>
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Login Page with original CSS animation */}
      <LoginPage isOpen={showLogin} onClose={handleCloseLogin} />
    </>
  )
}

export default Signup


// import { useState } from "react"
// import { toast, Toaster } from "react-hot-toast"
// import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineInfoCircle } from "react-icons/ai"
// import { motion } from "framer-motion"
// import LoginPage from "../LoginPage/LoginPage"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import { baseUrl } from "../../Context/apiVariable"

// function Signup() {
//   const [workStatus, setWorkStatus] = useState(null)
//   const [showPassword, setShowPassword] = useState(false)
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     name: "",
//     country_code: "+966",
//     mobile: "",
//     email: "",
//     password: "",
//     total_experience: "0",
//     resume_path: "https://www.google.com/images.car1.jpg/",
//     state: "",
//     city: "",
//     language: ["en"],
//   })
//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   // Add state to control login page visibility
//   const [showLogin, setShowLogin] = useState(false)

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target

//     // Special handling for language checkboxes is done separately
//     if (name !== "language") {
//       setFormData({
//         ...formData,
//         [name]: value,
//       })
//     }

//     // Clear error when user types
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: "",
//       })
//     }
//   }

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required"
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid"
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required"
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters"
//     }

//     if (!formData.mobile) {
//       newErrors.mobile = "Mobile number is required"
//     }

//     if (!formData.state.trim()) {
//       newErrors.state = "State is required"
//     }

//     if (!formData.city.trim()) {
//       newErrors.city = "City is required"
//     }

//     if (!workStatus) {
//       newErrors.workStatus = "Please select your work status"
//     }

//     if (formData.language.length === 0) {
//       newErrors.language = "Please select at least one language"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleFormSubmit = async(e) => {
//     e.preventDefault()

//     try {
//       const response = await axios.post(`${baseUrl}/user/register`, formData);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message);
//     }
//   }

//   const closeSignup = () => {
//     navigate("/")
//   }

//   // Close login page
//   const handleCloseLogin = () => {
//     setShowLogin(false)
//   }

//   // Tooltip component
//   const Tooltip = ({ text }) => (
//     <span className="group relative inline-flex ml-1">
//       <AiOutlineInfoCircle className="text-gray-500 cursor-help" />
//       <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-48 text-center">
//         {text}
//         <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></span>
//       </span>
//     </span>
//   )

//   return (
//     <>
//       <Toaster />
//       <style>
//         {`
//         .shake {
//           animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
//         }
        
//         @keyframes shake {
//           10%, 90% { transform: translate3d(-1px, 0, 0); }
//           20%, 80% { transform: translate3d(2px, 0, 0); }
//           30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
//           40%, 60% { transform: translate3d(4px, 0, 0); }
//         }
        
//         .input-error {
//           border-color: #ef4444;
//           animation: pulse 1.5s infinite;
//         }
        
//         @keyframes pulse {
//           0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
//           70% { box-shadow: 0 0 0 5px rgba(239, 68, 68, 0); }
//           100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
//         }
//         `}
//       </style>

//       <div className="flex items-center justify-center md:p-6 mt-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex w-full overflow-hidden"
//         >
//           {/* Left Section - Box */}
//           <div className="w-1/2 p-6 flex flex-col items-center justify-center xs:hidden lg:block">
//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//               className="bg-white p-6 rounded-lg shadow-md w-[80%]"
//             >
//               <motion.img
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 src="https://plus.unsplash.com/premium_vector-1721224450752-b0f014727713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMElsbHVzdHJhdGlvbnN8ZW58MHx8MHx8fDA%3D"
//                 alt="Benefits"
//                 className="w-52 h-52 mb-3 border rounded-full p-2 mx-auto"
//               />
//               <div className="mt-10">
//                 <h2 className="text-lg font-bold">On registering, you can</h2>
//                 <motion.ul className="mt-3 space-y-2 text-xs font-medium text-left text-gray-700">
//                   {[
//                     "Build your profile and let recruiters find you",
//                     "Get job postings delivered right to your email",
//                     "Find a job and grow your career",
//                   ].map((benefit, index) => (
//                     <motion.li
//                       key={index}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
//                       className="flex items-start"
//                     >
//                       <span className="text-green-500 mr-2">✅</span> {benefit}
//                     </motion.li>
//                   ))}
//                 </motion.ul>
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Section - Box */}
//           <div className="xs:w-full lg:w-[70%] p-6">
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.5 }}
//               className="border p-6 bg-white rounded-lg shadow-md h-full"
//             >
//               <div className="flex items-center justify-between">
//                 <h1 className="xs:text-xl md:text-3xl font-bold">Create your Naukri profile</h1>
//                 <motion.button
//                   whileHover={{ rotate: 90 }}
//                   transition={{ duration: 0.2 }}
//                   onClick={closeSignup}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <AiOutlineClose size={24} />
//                 </motion.button>
//               </div>
//               <p className="text-sm font-semibold text-gray-600 mt-2">
//                 Search & apply to jobs from India's No.1 Job Site
//               </p>

//               <form id="signupForm" className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="What is your Name"
//                     className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.name ? "input-error" : ""}`}
//                   />
//                   {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Email ID</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Tell us your Email ID"
//                     className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.email ? "input-error" : ""}`}
//                   />
//                   {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Password</label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="(minimum 6 characters)"
//                       className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.password ? "input-error" : ""}`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
//                     >
//                       {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//                     </button>
//                   </div>
//                   {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
//                   <div
//                     className={`flex items-center border rounded-lg p-3 transition-all duration-300 ${errors.mobile ? "border-red-500" : ""}`}
//                   >
//                     <select
//                       name="country_code"
//                       value={formData.country_code}
//                       onChange={handleChange}
//                       className="mr-2 outline-none bg-transparent"
//                     >
//                       <option value="+966">+966</option>
//                       <option value="+91">+91</option>
//                       <option value="+1">+1</option>
//                       <option value="+44">+44</option>
//                       <option value="+61">+61</option>
//                     </select>
//                     <input
//                       type="tel"
//                       name="mobile"
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       placeholder="Enter your mobile number"
//                       className="w-full outline-none"
//                     />
//                   </div>
//                   {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
//                 </div>

//                 {/* Work Status Selection */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Work Status</label>
//                   <div className="flex gap-4 mt-2">
//                     <motion.div
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all duration-300 ${workStatus === "experienced" ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${errors.workStatus ? "border-red-500" : ""}`}
//                       onClick={() => setWorkStatus("experienced")}
//                     >
//                       <h3 className="xs:text-xs md:text-base font-semibold">I'm experienced</h3>
//                       <p className="xs:text-xs md:text-sm text-gray-600">
//                         I have work experience (excluding internships)
//                       </p>
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all duration-300 ${workStatus === "fresher" ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${errors.workStatus ? "border-red-500" : ""}`}
//                       onClick={() => setWorkStatus("fresher")}
//                     >
//                       <h3 className="xs:text-xs md:text-base font-semibold">I'm a fresher</h3>
//                       <p className="xs:text-xs md:text-sm text-gray-600">
//                         I am a student / Haven't worked after graduation
//                       </p>
//                     </motion.div>
//                   </div>
//                   {errors.workStatus && <p className="text-red-500 text-xs mt-1">{errors.workStatus}</p>}
//                 </div>

//                 {/* Total Experience */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Total Experience (Years)</label>
//                   <select
//                     name="total_experience"
//                     value={formData.total_experience}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
//                   >
//                     <option value="0">0 (Fresher)</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                     <option value="6">6+</option>
//                     <option value="10">10+</option>
//                     <option value="15">15+</option>
//                     <option value="20">20+</option>
//                   </select>
//                 </div>

//                 {/* Conditionally Render Resume Upload for Experienced Users with smooth transition */}
//                 <motion.div
//                   initial={false}
//                   animate={{
//                     height: workStatus === "experienced" ? "auto" : 0,
//                     opacity: workStatus === "experienced" ? 1 : 0,
//                     marginTop: workStatus === "experienced" ? "1rem" : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
//                   <div className="mt-2">
//                     <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-all duration-300">
//                       <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
//                       <div className="space-y-2">
//                         <div className="flex justify-center">
//                           <svg
//                             className="w-10 h-10 text-gray-400"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                             ></path>
//                           </svg>
//                         </div>
//                         <p className="text-sm text-gray-600">Drag and drop your resume here, or click to browse</p>
//                       </div>
//                     </div>
//                     <p className="text-xs font-semibold text-gray-600 mt-2">
//                       Accepted formats: (DOC, DOCx, PDF, RTF | Max size: 2 MB)
//                       <Tooltip text="Upload your latest resume to help recruiters find you easily" />
//                     </p>
//                   </div>
//                 </motion.div>

//                 {/* State Selection */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">State</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={formData.state}
//                     onChange={handleChange}
//                     placeholder="Enter your state"
//                     className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.state ? "input-error" : ""}`}
//                   />
//                   {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
//                 </div>

//                 {/* City Selection */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Current City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className={`w-full p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none ${errors.city ? "input-error" : ""}`}
//                   />
//                   {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//                 </div>

//                 {/* Language Selection */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Languages</label>
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     {["en", "ar", "hi", "fr", "es"].map((lang) => (
//                       <div key={lang} className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`lang-${lang}`}
//                           checked={formData.language.includes(lang)}
//                           onChange={(e) => {
//                             if (e.target.checked) {
//                               setFormData({
//                                 ...formData,
//                                 language: [...formData.language, lang],
//                               })
//                             } else {
//                               setFormData({
//                                 ...formData,
//                                 language: formData.language.filter((l) => l !== lang),
//                               })
//                             }
//                           }}
//                           className="mr-2"
//                         />
//                         <label htmlFor={`lang-${lang}`} className="text-sm">
//                           {lang === "en"
//                             ? "English"
//                             : lang === "ar"
//                               ? "Arabic"
//                               : lang === "hi"
//                                 ? "Hindi"
//                                 : lang === "fr"
//                                   ? "French"
//                                   : lang === "es"
//                                     ? "Spanish"
//                                     : lang}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Register Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 relative overflow-hidden"
//                 >
//                   {isSubmitting ? (
//                     <div className="flex items-center justify-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Processing...
//                     </div>
//                   ) : (
//                     "Register"
//                   )}
//                 </motion.button>

//                 <p className="text-xs text-center text-gray-500 mt-4">
//                   By clicking Register, you agree to our
//                   <a href="#" className="text-blue-500 hover:underline">
//                     {" "}
//                     Terms and Conditions
//                   </a>{" "}
//                   and
//                   <a href="#" className="text-blue-500 hover:underline">
//                     {" "}
//                     Privacy Policy
//                   </a>
//                 </p>
//               </form>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Login Page with original CSS animation */}
//       <LoginPage isOpen={showLogin} onClose={handleCloseLogin} />
//     </>
//   )
// }

// export default Signup

