

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../../Context/apiVariable";

const ChangePassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Changed to 6 digits
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleNext = async () => {
    if (step === 1) {
      if (email.trim() === "") {
        setError("Email is required.");
        toast.error("Please enter your email.");
        return;
      }
      if (!validateEmail(email)) {
        setError("Please enter a valid email.");
        toast.error("Please enter a valid email.");
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.post(`${baseUrl}/user/forgot_password`, {
          email: email.trim(),
        });

        if (response.data) {
          console.log(response.data.data.token)
          setOtpToken(response.data.data.token);
          console.log(otpToken)
          toast.success("OTP sent to your email!");
          setIsOtpSent(true);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
        setError(error.response?.data?.message || "Failed to send OTP");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (step === 2) {
      if (otp.join("").trim() === "") {
        setError("OTP is required.");
        toast.error("Please enter the OTP.");
        return;
      }

      if (otp.join("").length !== 6) {
        setError("Please enter a valid 6-digit OTP.");
        toast.error("Please enter a valid 6-digit OTP.");
        return;
      }

      setIsLoading(true);
      try {
        console.log(otpToken); // Fixed incorrect variable
        const response = await axios.post(
          `${baseUrl}/user/verify_otp`,
          {
            email: email.trim(),
            otp: otp.join(""),
          },
          {
            headers: {
              token: otpToken,
            },
          }
        );

        if (response.data) {
          setStep(3);
          toast.success("OTP verified successfully.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
        setError(error.response?.data?.message || "Invalid OTP");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setError("");
    setStep(step + 1);
  };

  const handleResetPassword = async () => {
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      setError("Both password fields are required.");
      toast.error("Please fill out both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axios.put(
        `${baseUrl}/user/change_password`,
        {
          email: email.trim(),
          new_password: newPassword.trim(),
          otp: otp.join(""),
        },
        {
          headers: {
            token: otpToken,
          }
        }
      );
      console.log(response.data);
      if (response.data) {
        toast.success("Password changed successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password. Please try again.");
      setError(error.response?.data?.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input automatically
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100">
      <div className="flex bg-white p-5 rounded-lg shadow-md xs:w-[90%] md:w-[95%] lg:w-2/3">
        {/* Left side: Placeholder for Change Password Design */}
        <div className="w-1/2 pr-4 flex flex-col justify-center items-center xs:hidden md:flex">
          <div className="w-full h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex flex-col justify-center items-center text-center text-white">
            <h3 className="text-3xl font-bold">Secure Your Account</h3>
            <p className="mt-4 text-gray-100 mx-5">Follow the steps to reset your password and protect your account.</p>
          </div>
        </div>

        {/* Right side: Change Password Form */}
        <div className="md:w-1/2 md:pl-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="xs:text-lg md:text-3xl font-bold">Change Your Password</h1>
            {/* Close Btn */}
            <FaTimes
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              size={20}
              onClick={() => navigate("/")}
            />
          </div>
          <h2 className="text-2xl font-bold mb-6">
            {step === 1 && <div className="relative"><span>Verify Email</span></div>}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Reset Password"}
          </h2>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          {step === 1 && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Enter your email:</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && error.includes("Email") && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              <button
                className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleNext}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <svg className="w-6 h-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0A8 8 0 014 12z"></path>
                    </svg>
                    <span className="ml-2">Sending OTP...</span>
                  </div>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Enter the 6-digit OTP sent to your email:</label>
              <div className="flex space-x-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength="1"
                    className="w-12 p-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
              <button
                className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleNext}
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">New Password:</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label className="block text-gray-700 font-medium mb-2 mt-4">Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg mt-4 hover:bg-blue-600 transition disabled:opacity-50"
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ChangePassword;