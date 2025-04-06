import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { FaTimes } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import ForgotPassword from "../../Components/ForgotPassword/ForgotPassword";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { baseUrl } from "../../Context/apiVariable";

const LoginPage = ({ isOpen, onClose }) => {
  const { login, loginWithGoogle, loginWithPhone } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const[otpToken , setOtpToken] = useState("")

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/user/login_by_email`, {
        email,
        password
      });
      
      if (response.data) {
        toast.success("Login successful!");
        localStorage.setItem("email",email);
        localStorage.setItem("password",password)
        localStorage.setItem("token",response.data.data.token);
        // Store the token or user data in your auth context
        login(response.data);
        onClose();
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Check if the error is due to account not found
      if (error.response?.status === 404 || error.response?.data?.message?.includes("not found")) {
        toast.error("Account not found. Please sign up first.");
          onClose();
          navigate("/signup");
      } else {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [timerActive, setTimerActive] = useState(false);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerActive(false);
      if (otpSent) {
        toast.error("OTP has expired. Please request a new one.");
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timer, otpSent]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isFormValid =
    loginMethod === "email"
      ? email.trim() !== "" && password.trim() !== ""
      : phoneNumber && phoneNumber.trim() !== "" && (otpSent ? !otpValues.includes("") : true);

  const getOtpValue = () => otpValues.join("");

  const handleOtpChange = (index, value) => {
    if (value && !/^\d*$/.test(value)) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(0, 1);
    setOtpValues(newOtpValues);
    if (value && index < 5) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtpValues(digits);
      otpRefs[5].current.focus();
    }
  };

  const isValidPhoneNumber = (phone) => {
    // Ensure phone has at least 8 digits
    return phone && phone.length >= 8;
  };

  const handlePhoneChange = (value, country) => {
    setPhoneNumber(value);
    
    if (country && country.dialCode) {
      // Set country code with + prefix
      setCountryCode(`+${country.dialCode}`);
      
      // Extract mobile number without country code
      // The value from PhoneInput includes the country code, so we need to remove it
      const mobile = value.substring(country.dialCode.length);
      setMobileNumber(mobile);
    }
  };

  const handleSendOtp = async () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number!");
      return;
    }

    if (!mobileNumber) {
      toast.error("Mobile number is required!");
      return;
    }

    setLoading(true);
    try {
      // Format the data exactly as the API expects
      console.log("Sending data:", { country_code: countryCode, mobile: mobileNumber }); // Debug log
      
      const response = await axios.post(`${baseUrl}/user/login_by_phone`, {
        country_code: countryCode, // With + prefix
        mobile: mobileNumber // Without country code
      },  );
      console.log(response.data)
      
      if (response.data) {
        setOtpToken(response.data.data)
        setOtpSent(true);
        setOtpValues(["", "", "", "", "", ""]);
        setTimer(120);
        setTimerActive(true);
        toast.success("OTP sent to your phone number!");
        
        setTimeout(() => {
          if (otpRefs[0].current) {
            otpRefs[0].current.focus();
          }
        }, 100);
      }
    } catch (error) {
      console.error("OTP send error:", error);
      console.error("Error response:", error.response?.data);
            
      // Check if the error is due to account not found
      if (error.response?.status === 404 || error.response?.data?.message?.includes("not found")) {
        toast.error("Account not found. Please sign up first.");
        // Optional: Add a delay before redirecting to signup
          onClose();
          navigate("/signup");
      } else {
        toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
// hanndlel submit ++++++++++++++++++++++++++++
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("Please fill in all fields!");
      return;
    }

    setLoading(true);
    console.log(otpToken)
    try {
      if (loginMethod === "email") {
        await handleLogin();
      } else {
        const response = await axios.post(`${baseUrl}/user/verify_otp`, {
          country_code: countryCode, // With + prefix
          mobile: mobileNumber, // Without country code
        otp: getOtpValue()
        },{
          headers:{
            token:otpToken,
            key:"token",
            type:"text"
          }
        });
        console.log(response.data)
        
        if (response.data) {
          loginWithPhone(response.data);
          setOtpToken(response.data.token)
          toast.success("Login successful!");
          onClose();
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      console.error("Error response:", error.response?.data); // Debug log
      
      // Check if the error is due to account not found or invalid OTP
      if (error.response?.status === 404 || error.response?.data?.message?.includes("not found")) {
        toast.error("Account not found. Please sign up first.");
        // Optional: Add a delay before redirecting to signup
        setTimeout(() => {
          onClose();
          navigate("/signup");
        }, 2000);
      } else if (error.response?.data?.message?.includes("invalid") || error.response?.data?.message?.includes("incorrect")) {
        toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
      } else {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Login successful!");
      onClose();
      navigate("/");
    } catch (error) {
      // Check if the error is due to account not found
      if (error.response?.status === 404 || error.response?.data?.message?.includes("not found")) {
        toast.error("Account not found. Please sign up first.");
        // Optional: Add a delay before redirecting to signup
        setTimeout(() => {
          onClose();
          navigate("/signup");
        }, 2000);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
  };

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    setOtpSent(false);
    setOtpValues(["", "", "", "", "", ""]);
    setTimerActive(false);
    setTimer(120);
  };

  return (
    <>
      <Toaster />
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={onClose}></div>}
      <div
        className={`fixed top-0 right-0 h-full md:w-[50%] 2xl:w-[25%] bg-white md:rounded-l-3xl shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } xs:w-full lg:w-[30%] p-6`}
      >
        <div className="">
          <div className="flex items-center justify-between mb-6">
            <h2 className="xs:text-xl md:text-2xl font-bold text-blue-600">Login to Your Account</h2>
            <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
              <FaTimes size={20} />
            </button>
          </div>

          <div className="flex mb-6 border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                loginMethod === "email"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleLoginMethodChange("email")}
            >
              Email
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                loginMethod === "phone"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleLoginMethodChange("phone")}
            >
              Phone Number
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {loginMethod === "email" ? (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            ) : (
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex flex-col space-y-2">
                  <div className="phone-input-container">
                    <PhoneInput
                      country={"sa"} // Default to Saudi Arabia (966)
                      value={phoneNumber}
                      onChange={handlePhoneChange} // Use the new handler that captures country code
                      disabled={otpSent && timerActive}
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: true,
                      }}
                      containerClass="phone-input"
                      inputClass="phone-input-field"
                      buttonClass="phone-input-button"
                      dropdownClass="phone-input-dropdown"
                      searchClass="py-2 border-b border-gray-300"
                      enableSearch={true}
                      disableSearchIcon={false}
                    />
                  </div>

                  {(!otpSent || timer === 0) && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!isValidPhoneNumber(phoneNumber) || loading}
                      className={`px-4 py-3 rounded-lg text-sm font-medium text-white transition ${
                        !isValidPhoneNumber(phoneNumber) || loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                      }`}
                    >
                      {loading ? "Sending..." : timer === 0 ? "Resend OTP" : otpSent ? "Resend" : "Send OTP"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {loginMethod === "email" ? (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 py-2 text-sm font-medium text-blue-600 focus:outline-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={toggleForgotPassword}
                    className="text-blue-600 hover:underline font-medium text-sm"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            ) : otpSent ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Enter 6-digit OTP</label>
                  {timerActive && (
                    <div className={`text-sm font-medium ${timer < 30 ? "text-red-500" : "text-blue-600"}`}>
                      {formatTime(timer)}
                    </div>
                  )}
                </div>
                <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
                  {otpValues.map((digit, index) => (
                    <input
                      key={index}
                      ref={otpRefs[index]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-full h-12 text-center text-lg font-semibold border ${
                        timer === 0 ? "border-red-300 bg-red-50" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      disabled={timer === 0}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {timer === 0 ? "OTP expired. Please request a new one." : "OTP valid for " + formatTime(timer)}
                  </span>
                  {timer === 0 && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading}
                      className="text-blue-600 hover:underline font-medium text-sm"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
            ) : null}
{/* hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh */}
            <button
              type="submit"

              disabled={!isFormValid || loading || (loginMethod === "phone" && (!otpSent || timer === 0))}
              className={`w-full py-3 rounded-lg text-sm font-medium text-white transition bg-blue-600 ${
                !isFormValid || loading || (loginMethod === "phone" && (!otpSent || timer === 0))
                  ? "cursor-not-allowed bg-opacity-70"
                  : "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              }`}
            >
              {loading ? <div className="loader mx-auto"></div> : "Login"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 mt-4 mb-10 rounded-lg text-sm font-medium text-blue-600 transition border border-black focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 flex items-center justify-center"
          >
            <FcGoogle size={20} className="mr-2" />
            Login with Google
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" onClick={onClose} className="text-blue-600 hover:underline font-medium">
              Sign up here
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            Are you recruiter?{" "}
            <a
              href="https://new-repo-admin-5.vercel.app/"
              onClick={onClose}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              Recruiter Login
            </a>
          </p>
        </div>
      </div>

      <ForgotPassword isOpen={isForgotPassword} onClose={toggleForgotPassword} />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .loader {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 3px solid white;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .phone-input {
          width: 100%;
        }
        .phone-input-field {
          width: 100% !important;
          height: 46px !important;
          border-radius: 0.5rem !important;
          border: 1px solid #d1d5db !important;
          font-size: 0.875rem !important;
          padding-left: 48px !important;
        }
        .phone-input-field:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25) !important;
        }
        .phone-input-button {
          border-radius: 0.5rem 0 0 0.5rem !important;
          border: 1px solid #d1d5db !important;
          border-right: none !important;
        }
        .phone-input-dropdown {
          border-radius: 0.5rem !important;
          border: 1px solid #d1d5db !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }
      `,
        }}
      />
    </>
  );
};

export default LoginPage;