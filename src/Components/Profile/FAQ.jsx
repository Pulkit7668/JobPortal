import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    id: "profile-update",
    title: "1. Introduction",
    question: "How do I update my profile?",
    answer: "To update your profile, go to the 'View & Update Profile' section and edit the relevant details."
  },
  {
    id: "password-reset",
    title: "2. Information We Collect",
    question: "How can I reset my password?",
    answer: "You can reset your password by clicking on 'Forgot Password' at the login page and following the instructions."
  },
  {
    id: "job-application",
    title: "3. How We Use Your Information",
    question: "How do I apply for jobs?",
    answer: "Search for jobs in the jobs section and click on the 'Apply' button to submit your application."
  },
  {
    id: "customer-support",
    title: "4. Data Storage and Security",
    question: "How can I contact customer support?",
    answer: "You can contact customer support via the 'Help' section in your profile or email us at support@example.com."
  },
  {
    id: "user-rights",
    title: "5. Your Rights",
    question: "What rights do I have regarding my data?",
    answer: "You have the right to access, correct, delete, and export your personal data. You can manage these options in your account settings."
  },
  {
    id: "cookies-info",
    title: "6. Cookies",
    question: "How does this site use cookies?",
    answer: "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage cookie preferences in your browser settings."
  },
  {
    id: "third-party-services",
    title: "7. Third-Party Services",
    question: "What third-party services do you use?",
    answer: "We use various third-party services for analytics, payment processing, and customer support. All third parties are compliant with our privacy standards."
  },
  {
    id: "faq-changes",
    title: "8. Changes to This FAQ",
    question: "How will I know if this FAQ is updated?",
    answer: "We will notify users of significant changes to our FAQ via email or through a notification on our website."
  },
  {
    id: "contact-us",
    title: "9. Contact Us",
    question: "How can I get more help?",
    answer: "For additional assistance, please email us at help@example.com or call our support line at (555) 123-4567."
  }
];

function FAQ() {
  // State for accordion sections
  const [openSections, setOpenSections] = useState({});
  
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const sectionRefs = useRef({});

  // Initialize refs for each section
  useEffect(() => {
    faqs.forEach(faq => {
      sectionRefs.current[faq.id] = React.createRef();
    });
  }, []);

  // Toggle section open/close
  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    if (sectionRefs.current[sectionId] && sectionRefs.current[sectionId].current) {
      sectionRefs.current[sectionId].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      // Open the section when scrolled to
      setOpenSections((prev) => ({
        ...prev,
        [sectionId]: true,
      }));
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = faqs.filter((faq) => {
      return (
        faq.title.toLowerCase().includes(term.toLowerCase()) ||
        faq.question.toLowerCase().includes(term.toLowerCase()) ||
        faq.answer.toLowerCase().includes(term.toLowerCase())
      );
    });

    setSearchResults(results);
  };

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Print FAQ function
  const printFAQ = () => {
    window.print();
  };

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
                    placeholder="Search FAQ..."
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
                              scrollToSection(result.id);
                              setSearchTerm("");
                              setSearchResults([]);
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
                  {faqs.map((faq) => (
                    <li key={faq.id}>
                      <button
                        onClick={() => scrollToSection(faq.id)}
                        className="text-left w-full py-1 px-2 rounded hover:bg-gray-100 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {faq.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Action buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={printFAQ}
                  className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Print FAQ
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h1>
          
              <div className="space-y-6 text-gray-700">
                {/* Dynamically render sections */}
                {faqs.map((faq) => (
                  <section 
                    key={faq.id} 
                    ref={sectionRefs.current[faq.id]} 
                    id={faq.id}
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                      onClick={() => toggleSection(faq.id)}
                    >
                      <h2 className="text-xl font-semibold text-gray-800">{faq.title}</h2>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-transform ${openSections[faq.id] ? "transform rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
          
                    {openSections[faq.id] && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                        <h3 className="font-medium text-gray-800 mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
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
  );
}

export default FAQ;