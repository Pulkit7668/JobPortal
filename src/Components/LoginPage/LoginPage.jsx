// import React, { useState } from "react";
// import { FaFacebook, FaGoogle, FaTimes } from "react-icons/fa";

// function LoginPage({ isOpen, onClose }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showToast, setShowToast] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!username || !password) {
//       setError("Please fill in all fields.");
//       setShowToast(true);
//     } else {
//       // Handle login logic here (e.g., check credentials)
//       setError(""); // Clear error if login is valid
//       setShowToast(false);
//       console.log("Logging in...");
//     }
//   };

//   const handleForgotPassword = () => {
//     console.log("Redirecting to forgot password...");
//     // Add your forgot password logic here
//   };

//   const handleSignUp = () => {
//     console.log("Redirecting to sign up...");
//     // Add your sign-up page logic here
//   };

//   return (
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-30 z-40"
//           onClick={onClose}
//         ></div>
//       )}
//       <div
//         className={`fixed top-0 right-0 h-full md:w-[50%] 2xl:w-[25%] bg-white md:rounded-l-3xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         } sm:w-[80%] lg:w-96`}
//       >
//         <div className="flex justify-between items-center px-4 py-3 border-b">
//           <h2 className="text-lg font-bold">Login</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-800"
//             aria-label="Close login panel"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>

//         <div className="p-6">
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Username
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className="flex justify-between items-center">
//               <label className="flex items-center text-sm">
//                 <input
//                   type="checkbox"
//                   className="mr-2 rounded text-blue-600 focus:ring-blue-500"
//                 />
//                 Remember me
//               </label>
//               <button
//                 type="button"
//                 onClick={handleForgotPassword}
//                 className="text-sm text-blue-600 hover:underline"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
//             >
//               Login
//             </button>
//           </form>

//           {showToast && (
//             <div
//               className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg"
//             >
//               {error}
//             </div>
//           )}

//           <div className="my-6 text-center text-gray-500 text-sm">OR</div>

//           <div className="space-y-3">
//             <button
//               className="w-full py-2 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 rounded-md text-sm font-medium"
//             >
//               <FaFacebook size={16} className="mr-2" />
//               Login with Facebook
//             </button>
//             <button
//               className="w-full py-2 flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
//             >
//               <FaGoogle size={16} className="mr-2" />
//               Login with Google
//             </button>
//           </div>

//           <p className="mt-6 text-center text-sm text-gray-500">
//             Don't have an account?{" "}
//             <button
//               onClick={handleSignUp}
//               className="text-blue-600 hover:underline"
//             >
//               Sign up
//             </button>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LoginPage;


import React, { useState, useEffect } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const LoginForm = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger the animation when the component is mounted
    return () => setIsVisible(false); // Cleanup on unmount
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-sm transform transition-transform duration-500 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => {
            setIsVisible(false); // Trigger the slide-out animation
            setTimeout(onClose, 300); // Delay closing to allow the animation to finish
          }}
        >
          &times;
        </button>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                id="email"
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                id="password"
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
