import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"
import { FaTimes } from "react-icons/fa"
import { Toaster, toast } from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"
import ForgotPassword from "../ForgotPassword/ForgotPassword"

const LoginPage = ({ isOpen, onClose }) => {
  const { login, loginWithGoogle, loginWithPhone } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState("email")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)

  const isFormValid =
    loginMethod === "email"
      ? email.trim() !== "" && password.trim() !== ""
      : phoneNumber.trim() !== "" && password.trim() !== ""

  // Validate phone number format
  const isValidPhoneNumber = (phone) => {
    // Basic validation - can be enhanced based on your requirements
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isFormValid) {
      toast.error("Please fill in all fields!", {
        position: "top-center",
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
      })
      return
    }

    // Validate phone number if phone login method is selected
    if (loginMethod === "phone" && !isValidPhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number!", {
        position: "top-center",
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
      })
      return
    }

    setLoading(true)
    setTimeout(async () => {
      try {
        if (loginMethod === "email") {
          await login(email)
        } else {
          await loginWithPhone(phoneNumber)
        }

        toast.success("Login successful!", {
          position: "top-center",
          style: {
            background: "#d4edda",
            color: "#155724",
          },
        })
        onClose()
        navigate("/")
      } catch (error) {
        toast.error("Login failed. Please try again.", {
          position: "top-center",
          style: {
            background: "#f8d7da",
            color: "#721c24",
          },
        })
      } finally {
        setLoading(false)
      }
    }, 2000)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        await loginWithGoogle()
        toast.success("Login successful!", {
          position: "top-center",
          style: {
            background: "#d4edda",
            color: "#155724",
          },
        })
        onClose()
        navigate("/")
      } catch (error) {
        toast.error("Login failed. Please try again.", {
          position: "top-center",
          style: {
            background: "#f8d7da",
            color: "#721c24",
          },
        })
      } finally {
        setLoading(false)
      }
    }, 2000)
  }

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword)
  }

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
            {/* Title */}
            <h2 className="xs:text-xl md:text-2xl font-bold text-blue-600">Login to Your Account</h2>
            {/* Close Button */}
            <button className="text-gray-500 hover:text-gray-800" onClick={onClose}>
              <FaTimes size={20} />
            </button>
          </div>

          {/* Login Method Tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                loginMethod === "email"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setLoginMethod("email")}
            >
              Email
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                loginMethod === "phone"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setLoginMethod("phone")}
            >
              Phone Number
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Phone Field */}
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
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-sm"
                  placeholder="Enter your phone number (e.g., +1234567890)"
                />
                <p className="mt-1 text-xs text-gray-500">Format: +[country code][number] (e.g., +12025550123)</p>
              </div>
            )}

            {/* Password Field */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-3 rounded-lg text-sm font-medium text-white transition bg-blue-600 ${
                !isFormValid || loading
                  ? "cursor-not-allowed"
                  : "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              }`}
            >
              {loading ? <div className="loader mx-auto"></div> : "Login"}
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 mt-4 mb-10 rounded-lg text-sm font-medium text-blue-600 transition border border-black focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 flex items-center justify-center"
          >
            <FcGoogle size={20} className="mr-2" />
            Login with Google
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" onClick={onClose} className="text-blue-600 hover:underline font-medium">
              Sign up here
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            Are you a recruiter?{" "}
            <a
              href="https://static-page-0011.netlify.app/"
              onClick={onClose}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              Recruiter Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPassword isOpen={isForgotPassword} onClose={toggleForgotPassword} />
    </>
  )
}

export default LoginPage


