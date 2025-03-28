import { useState } from "react"
import {
  FaUser,
  FaFileAlt,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaRocket,
  FaInfoCircle,
} from "react-icons/fa"

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const quickLinks = [
    { id: "profile", name: "Profile", icon: <FaUser /> },
    { id: "basicDetails", name: "Basic Details", icon: <FaInfoCircle /> },
    { id: "resume", name: "Resume", icon: <FaFileAlt /> },
    { id: "professionalDetails", name: "Professional Details", icon: <FaFileAlt /> },
    { id: "experience", name: "Experience", icon: <FaBriefcase /> },
    { id: "education", name: "Education", icon: <FaGraduationCap /> },
    { id: "skills", name: "Skills & Keywords", icon: <FaTools /> },
    { id: "projects", name: "Projects", icon: <FaRocket /> },
  ]

  const handleTabClick = (id) => {
    setActiveTab(id)
    setIsMobileMenuOpen(false)

    // Scroll to the section
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      {/* Mobile/Tablet Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-800 text-white z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-24">
          <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4 pl-2">Quick Links</h2>
          <nav>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.id} className="mb-2">
                  <button
                    onClick={() => handleTabClick(link.id)}
                    className={`flex items-center w-full p-2 rounded transition-colors ${
                      activeTab === link.id ? "bg-blue-700 text-white" : "hover:bg-gray-700 text-gray-300"
                    }`}
                  >
                    <span className="mr-3 text-lg">{link.icon}</span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
              <span className="text-white font-bold">R</span>
            </div>
            <div>
              <p className="text-sm font-medium">Rahul Sharma</p>
              <p className="text-xs text-gray-400">View Profile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 hidden lg:block">
        <div className="px-5 py-24">
          <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4 pl-2">Quick Links</h2>
          <nav>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.id} className="mb-2">
                  <button
                    onClick={() => handleTabClick(link.id)}
                    className={`flex items-center w-full p-2 rounded transition-colors ${
                      activeTab === link.id ? "bg-blue-700 text-white" : "hover:bg-gray-700 text-gray-300"
                    }`}
                  >
                    <span className="mr-3 text-lg">{link.icon}</span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
              <span className="text-white font-bold">R</span>
            </div>
            <div>
              <p className="text-sm font-medium">Rahul Sharma</p>
              <p className="text-xs text-gray-400">View Profile</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

