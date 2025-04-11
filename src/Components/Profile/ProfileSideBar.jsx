import { Link, useNavigate } from "react-router-dom"
import { FaTimes, FaBookmark, FaEye, FaSlidersH, FaUser, FaChartLine, FaDownload } from "react-icons/fa"
import { ImLoop } from "react-icons/im";
import { FaBox } from "react-icons/fa"
import { useAuth } from "../../Context/AuthContext"

function ProfileSidebar({ isOpen, onClose }) {
  const profileCompletion = 40
  const progressColor = profileCompletion >= 75 ? "#34D399" : "#F04141"
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  // If user is not logged in, don't render the sidebar
  if (!isLoggedIn && isOpen) {
    onClose()
    return null
  }

  const handleProfileClick = (path) => {
    onClose()
    navigate(path)
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={onClose}></div>}

      <div
        className={`fixed top-0 right-0 h-full md:w-[50%] 2xl:w-[25%] bg-white md:rounded-l-3xl shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} sm:w-[80%] lg:w-96`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-bold">Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close sidebar">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-gray-50 flex items-center justify-center bg-gray-100">
                <img
                  src="https://static.naukimg.com/s/0/0/i/ni-gnb-revamped/userdp_v1.svg"
                  alt="Profile picture of Pulkit Gautam"
                  className="rounded-full w-[80%] h-[80%] object-cover"
                />
              </div>
              <svg className="absolute top-0 left-0 w-16 h-16" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ffffff" strokeWidth="4" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke={progressColor}
                  strokeWidth="4"
                  strokeDasharray="97.39"
                  strokeDashoffset={`${97.39 - (profileCompletion / 100) * 97.39}`}
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <div className="absolute top-10 left-0 w-16 h-16 flex items-center justify-center">
                <span className="text-xs font-bold" style={{ color: progressColor }}>
                  {profileCompletion}%
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold">Pulkit Gautam</h3>
              <p className="text-sm text-gray-500">
                B.Tech/B.E. Production/Industrial at Hi-Tech Institute of Engineering & Tech
              </p>
              <button
                onClick={() => handleProfileClick("/view-update-profile")}
                className="text-sm text-blue-600 hover:underline"
              >
                View & Update Profile
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 text-sm">
          <h4 className="text-base font-bold mb-2">Your profile performance <span className="text-xs text-gray-400">(Last 90 days)</span></h4>

          <div className="space-y-4 border-2 border-gray-200 p-4 rounded-lg"> 
            <div className="flex items-start hover:bg-gray-200 transition-colors duration-150 ease-in-out p-2 rounded-lg cursor-pointer"> 
              <div className="mr-3">
                <FaUser />
              </div>
              <div>
                <h5 className="text-base font-semibold">35 profile views</h5> 
                <p className="text-sm text-gray-500">Discover who's viewed your profile.</p>
              </div>
            </div>

            <div className="flex items-start hover:bg-gray-200 transition-colors duration-150 ease-in-out p-2 rounded-lg cursor-pointer">
              <div className="mr-3">
                <FaChartLine />
              </div>
              <div>
                <h5 className="text-base font-semibold">70 post impressions</h5>
                <p className="text-sm text-gray-500">Check out who's engaging with your posts.</p>
                <p className="text-xs text-gray-500">Past 7 days</p>
              </div>
            </div>

            <div className="flex items-start hover:bg-gray-200 transition-colors duration-150 ease-in-out p-2 rounded-lg cursor-pointer"> 
              <div className="mr-3">
                <FaDownload />
              </div>
              <div>
                <h5 className="text-base font-semibold">20 Resume Downloads</h5>
                <p className="text-sm text-gray-500">See how often you appear in search results.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 text-sm">
          <div className="space-y-3">
            <button
              onClick={() => handleProfileClick("/change-visibility")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaEye />
              <span>Change Visibility</span>
            </button>

            <button
              onClick={() => handleProfileClick("/set-job-preference")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaSlidersH />
              <span>Set Job Preference</span>
            </button>

            <button
              onClick={() => handleProfileClick("/saved-jobs")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaBookmark />
              <span>Saved Jobs</span>
            </button>

            <button
              onClick={() => handleProfileClick("/my-member-ship")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <FaBox />
              <span>My Member Ship</span>
            </button>

            <button
              // onClick={() => handleProfileClick("/my-member-ship")}
              className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-blue-600 hover:underline hover:underline-offset-4 hover:decoration-orange-500 transition-colors duration-150 ease-in-out"
            >
              <ImLoop />
              <span>Loop CV</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileSidebar

