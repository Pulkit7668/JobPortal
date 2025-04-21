import { useState, useEffect } from "react"
import { Switch } from "@headlessui/react"
import { FaTimes, FaCheck, FaArrowLeft, FaInfoCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"

const ChangeVisibility = () => {
  const [isLookingForJob, setIsLookingForJob] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [animateSwitch, setAnimateSwitch] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateSwitch(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleToggle = () => {
    setIsLookingForJob((prevState) => !prevState)

    toast.success(`Status changed to: ${!isLookingForJob ? "Looking for a job" : "Not looking for a job"}`, {
      duration: 1500,
      style: {
        backgroundColor: "#f8f9fa",
        color: "#212529",
        fontSize: "14px",
      },
      icon: "🔄",
    })
  }

  const handleSaveChanges = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      toast.success(`Status updated: ${isLookingForJob ? "Looking for a job" : "Not looking for a job"}`, {
        duration: 3000,
        style: {
          backgroundColor: "#d4edda",
          color: "#155724",
          fontWeight: "bold",
        },
        icon: <FaCheck />,
      })

      setTimeout(() => {
        navigate("/")
      }, 2000)
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden transform transition-all duration-500 hover:shadow-xl">
        {/* Left Part - Info Panel */}
        <div className="md:w-1/2 flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-tl-lg rounded-bl-lg xs:hidden md:flex">
          <div className="transform transition-all duration-500 hover:scale-105">
            <h2 className="text-3xl font-bold mb-4 text-center">Keep Your Profile Updated</h2>
            <p className="text-lg text-center">Easily manage your job visibility to let recruiters know your status.</p>
            <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm transform transition-all duration-300 hover:bg-opacity-30">
              <p className="text-sm font-medium">
                Tip: Keep your profile visible to increase your chances of being noticed by recruiters.
              </p>
            </div>
          </div>
        </div>

        {/* Right Part - Controls */}
        <div className="md:w-1/2 p-6 md:p-8 relative flex flex-col justify-center">
          <div className="flex items-center justify-between mb-10">
            {/* Heading with Gradient Text on Hover */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 group transition-all duration-300">
              <span className="bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-500">
                Change Visibility
              </span>
            </h1>
            <FaTimes
              className="text-gray-500 cursor-pointer hover:text-red-500 transition-colors duration-300 transform hover:rotate-90"
              size={20}
              onClick={() => navigate("/")}
            />
          </div>

          {/* Status display with tooltip */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8 transform transition-all duration-500 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-700 mr-2">
                  {isLookingForJob ? "Currently looking for a job" : "Not looking for a job"}
                </span>
                <div className="relative">
                  <FaInfoCircle
                    className="text-gray-400 cursor-pointer hover:text-blue-500 transition-colors"
                    size={16}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  />
                  {showTooltip && (
                    <div className="absolute z-10 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600 -right-2 top-6">
                      {isLookingForJob
                        ? "Recruiters will be able to see that you're open to job opportunities."
                        : "Your profile will not be highlighted to recruiters looking for candidates."}
                      <div className="absolute -top-2 right-2 w-3 h-3 bg-white transform rotate-45 border-t border-l border-gray-200"></div>
                    </div>
                  )}
                </div>
              </div>
              <Switch
                checked={isLookingForJob}
                onChange={handleToggle}
                className={`${
                  isLookingForJob ? "bg-blue-500" : "bg-gray-300"
                } relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 ${
                  animateSwitch ? "animate-pulse" : ""
                }`}
              >
                <span
                  className={`${
                    isLookingForJob ? "translate-x-8" : "translate-x-1"
                  } inline-block h-5 w-5 transform bg-white rounded-full transition-transform duration-300 shadow-md`}
                />
              </Switch>
            </div>
          </div>

          {/* Status indicator */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-in-out ${
                  isLookingForJob ? "bg-green-500 w-full" : "bg-gray-400 w-1/3"
                }`}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Visibility: {isLookingForJob ? "High" : "Low"}</span>
              <span>Profile Status: {isLookingForJob ? "Active" : "Standard"}</span>
            </div>
          </div>

          {/* Save button with loading state */}
          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 ${
              isSaving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            }`}
          >
            {isSaving ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving Changes...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>

          {/* Mobile info panel */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg md:hidden">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Tip:</span>{" "}
              {isLookingForJob
                ? "Your profile is now more visible to recruiters."
                : "Update your status when you're ready to be discovered by recruiters."}
            </p>
          </div>

          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    </div>
  )
}

export default ChangeVisibility

