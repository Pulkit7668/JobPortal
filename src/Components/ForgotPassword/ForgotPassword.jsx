
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

const ForgotPassword = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const otpRefs = useRef([]);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal is closed
      setEmail("");
      setOtp("");
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setNewPassword("");
      setConfirmPassword("");
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setIsPasswordReset(false);
    }
  }, [isOpen]);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      toast.error("Please enter your email address!", {
        position: "top-center",
        style: {
          background: "#f8d7da", // Custom error background color
          color: "#721c24", // Custom error text color
        },
      });
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      try {
        // Simulate sending OTP
        toast.success("OTP sent to your email!", {
          position: "top-center",
          style: {
            background: "#d4edda", // Custom success background color
            color: "#155724", // Custom success text color
          },
        });
        setIsOtpSent(true);
      } catch (error) {
        toast.error("Failed to send OTP. Please try again.", {
          position: "top-center",
          style: {
            background: "#f8d7da", // Custom error background color
            color: "#721c24", // Custom error text color
          },
        });
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = otp.split("");
      newOtp[index] = value;
      setOtp(newOtp.join(""));

      if (value !== "" && index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp.trim() === "") {
      toast.error("Please enter the OTP!", {
        position: "top-center",
        style: {
          background: "#f8d7da", // Custom error background color
          color: "#721c24", // Custom error text color
        },
      });
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      try {
        // Simulate OTP verification
        toast.success("OTP verified! You can now reset your password.", {
          position: "top-center",
          style: {
            background: "#d4edda", // Custom success background color
            color: "#155724", // Custom success text color
          },
        });
        setIsOtpVerified(true);
      } catch (error) {
        toast.error("Invalid OTP. Please try again.", {
          position: "top-center",
          style: {
            background: "#f8d7da", // Custom error background color
            color: "#721c24", // Custom error text color
          },
        });
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      toast.error("Please fill in all fields!", {
        position: "top-center",
        style: {
          background: "#f8d7da", // Custom error background color
          color: "#721c24", // Custom error text color
        },
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-center",
        style: {
          background: "#f8d7da", // Custom error background color
          color: "#721c24", // Custom error text color
        },
      });
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      try {
        // Simulate password reset
        toast.success("Password reset successful!", {
          position: "top-center",
          style: {
            background: "#d4edda", // Custom success background color
            color: "#155724", // Custom success text color
          },
        });
        setIsPasswordReset(true);
        setTimeout(() => {
          navigate("/");
        }, 300);
      } catch (error) {
        toast.error("Failed to reset password. Please try again.", {
          position: "top-center",
          style: {
            background: "#f8d7da", // Custom error background color
            color: "#721c24", // Custom error text color
          },
        });
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <>
      <Toaster />
      <div
        className={`fixed top-0 right-0 h-full md:w-[50%] 2xl:w-[25%] bg-white md:rounded-l-3xl shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } xs:w-full lg:w-[30%] p-6 ${isPasswordReset ? "translate-x-full" : ""}`}
      >
        <div className="">
          <div className="flex items-center justify-between mb-6">
            {/* Title */}
            <h2 className="text-2xl font-bold text-blue-600 text-center">
              Forgot Password
            </h2>
            {/* Close Button */}
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={onClose}
            >
              <FaTimes size={20} />
            </button>
          </div>
          {/* Form */}
          {!isOtpSent ? (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm"
                  placeholder="Enter your email"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading} // Disable button if loading
                className={`w-full py-3 rounded-lg text-sm font-medium text-white transition bg-blue-600 ${
                  loading
                    ? "cursor-not-allowed"
                    : "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                }`}
              >
                {loading ? (
                  <div className="loader mx-auto"></div>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          ) : !isOtpVerified ? (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {/* OTP Field */}
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter OTP
                </label>
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={otp[index] || ""}
                      onChange={(e) => handleOtpChange(e, index)}
                      ref={(el) => (otpRefs.current[index] = el)}
                      required
                      className="w-12 px-2 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-center text-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading} // Disable button if loading
                className={`w-full py-3 rounded-lg text-sm font-medium text-white transition bg-blue-600 ${
                  loading
                    ? "cursor-not-allowed"
                    : "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                }`}
              >
                {loading ? (
                  <div className="loader mx-auto"></div>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPasswordSubmit} className="space-y-6">
              {/* New Password Field */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium text-blue-600 focus:outline-none"
                  >
                    {showNewPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm"
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium text-blue-600 focus:outline-none"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading} // Disable button if loading
                className={`w-full py-3 rounded-lg text-sm font-medium text-white transition bg-blue-600 ${
                  loading
                    ? "cursor-not-allowed"
                    : "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                }`}
              >
                {loading ? (
                  <div className="loader mx-auto"></div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;