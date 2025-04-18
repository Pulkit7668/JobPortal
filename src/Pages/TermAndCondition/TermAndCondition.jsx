import { useState, useEffect, useRef } from "react";
import { termsAndConditionsData } from "./data";

const TermsAndConditions = () => {
  // State for accordion sections
  const [openSections, setOpenSections] = useState({
    introduction: false,
    userAccounts: false,
    jobListings: false,
    employerTerms: false,
    userConduct: false,
    intellectualProperty: false,
    privacy: false,
    limitation: false,
    termination: false,
    governingLaw: false,
    changes: false,
    contact: false,
  })

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const sectionRefs = useRef({});

  // Toggle section open/close
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Scroll to section
  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

  sectionRefs.current[sectionId]?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  
    // Open the section when scrolled to
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: true,
    }))
  }

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = termsAndConditionsData.filter((section) => {
      const sectionContent = document.getElementById(section.id)?.textContent || "";
      return sectionContent.toLowerCase().includes(term.toLowerCase());
    })

    setSearchResults(results);
  }

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Print terms function
  const printTerms = () => {
    window.print()
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Table of Contents */}
          <div className="lg:w-1/4 print:hidden">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contents</h2>

              {/* Search box */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search terms..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Search results */}
                {searchResults.length > 0 && (
                  <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-sm">
                    <ul className="divide-y divide-gray-200">
                      {searchResults.map((result) => (
                        <li key={result.id} className="px-4 py-2 hover:bg-gray-50">
                          <button
                            onClick={() => {
                              scrollToSection(result.id)
                              setSearchTerm("")
                              setSearchResults([])
                            }}
                            className="text-left w-full text-blue-600 hover:text-blue-800"
                          >
                            {result.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Table of contents links */}
              <nav>
                <ul className="space-y-2">
                  {termsAndConditionsData.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="text-left w-full py-1 px-2 rounded hover:bg-gray-100 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Term & Conditions</h1>
          
              <div className="space-y-6 text-gray-700">
                {/* Dynamically render sections */}
                {termsAndConditionsData.map((section) => (
                  <section key={section.id} ref={(el) => (sectionRefs.current[section.id] = el)} id={section.id}>
                    <div
                      className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                      onClick={() => toggleSection(section.id)}
                    >
                      <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-transform ${openSections[section.id] ? "transform rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
          
                    {openSections[section.id] && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                        <p className="mb-3">{section.content}</p>
                      </div>
                    )}
                  </section>
                ))}
          
                {/* Last Updated */}
                <div className="pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Last Updated:{" "}
                    {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors print:hidden"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default TermsAndConditions
