import React, { useState } from "react";
import { FaFacebook, FaGoogle, FaTimes } from "react-icons/fa";

function LoginPage({ isOpen, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields.");
      setShowToast(true);
    } else {
      // Handle login logic here (e.g., check credentials)
      setError(""); // Clear error if login is valid
      setShowToast(false);
      console.log("Logging in...");
    }
  };

  const handleForgotPassword = () => {
    console.log("Redirecting to forgot password...");
    // Add your forgot password logic here
  };

  const handleSignUp = () => {
    console.log("Redirecting to sign up...");
    // Add your sign-up page logic here
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full md:w-[50%] 2xl:w-[25%] bg-white md:rounded-l-3xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } sm:w-[80%] lg:w-96`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-bold">Login</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close login panel"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
            >
              Login
            </button>
          </form>

          {showToast && (
            <div
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg"
            >
              {error}
            </div>
          )}

          <div className="my-6 text-center text-gray-500 text-sm">OR</div>

          <div className="space-y-3">
            <button
              className="w-full py-2 flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 rounded-md text-sm font-medium"
            >
              <FaFacebook size={16} className="mr-2" />
              Login with Facebook
            </button>
            <button
              className="w-full py-2 flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
            >
              <FaGoogle size={16} className="mr-2" />
              Login with Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <button
              onClick={handleSignUp}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
