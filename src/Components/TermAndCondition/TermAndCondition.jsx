import { useState, useEffect, useRef } from "react"

const TermsAndConditions = () => {
  // State for accordion sections
  const [openSections, setOpenSections] = useState({
    introduction: true,
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

  // Refs for sections to enable scrolling
  const sectionRefs = {
    introduction: useRef(null),
    userAccounts: useRef(null),
    jobListings: useRef(null),
    employerTerms: useRef(null),
    userConduct: useRef(null),
    intellectualProperty: useRef(null),
    privacy: useRef(null),
    limitation: useRef(null),
    termination: useRef(null),
    governingLaw: useRef(null),
    changes: useRef(null),
    contact: useRef(null),
  }

  // Table of contents data
  const tableOfContents = [
    { id: "introduction", title: "1. Introduction" },
    { id: "userAccounts", title: "2. User Accounts" },
    { id: "jobListings", title: "3. Job Listings and Applications" },
    { id: "employerTerms", title: "4. Employer/Recruiter Terms" },
    { id: "userConduct", title: "5. User Conduct" },
    { id: "intellectualProperty", title: "6. Intellectual Property" },
    { id: "privacy", title: "7. Privacy" },
    { id: "limitation", title: "8. Limitation of Liability" },
    { id: "termination", title: "9. Termination" },
    { id: "governingLaw", title: "10. Governing Law" },
    { id: "changes", title: "11. Changes to Terms" },
    { id: "contact", title: "12. Contact Information" },
  ]

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

    // Open the section when scrolled to
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: true,
    }))
  }

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.trim() === "") {
      setSearchResults([])
      return
    }

    const results = tableOfContents.filter((section) => {
      const sectionContent = document.getElementById(section.id)?.textContent || ""
      return sectionContent.toLowerCase().includes(term.toLowerCase())
    })

    setSearchResults(results)
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
                  {tableOfContents.map((item) => (
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

              {/* Action buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={printTerms}
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
                  Print Terms
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Terms and Conditions</h1>

              <div className="space-y-6 text-gray-700">
                {/* Introduction */}
                <section ref={sectionRefs.introduction} id="introduction">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("introduction")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">1. Introduction</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.introduction ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.introduction && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p className="mb-3">
                        Welcome to [Job Portal Name] ("we," "our," or "us"). By accessing or using our website, mobile
                        applications, and services (collectively, the "Services"), you agree to be bound by these Terms
                        and Conditions.
                      </p>
                      <p>
                        Please read these Terms carefully. If you do not agree with these Terms, you should not access
                        or use our Services. By creating an account or using any part of our Services, you acknowledge
                        that you have read, understood, and agree to be bound by these Terms.
                      </p>
                    </div>
                  )}
                </section>

                {/* User Accounts */}
                <section ref={sectionRefs.userAccounts} id="userAccounts">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("userAccounts")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">2. User Accounts</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.userAccounts ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.userAccounts && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p className="mb-3">
                        2.1. <span className="font-medium">Registration:</span> To access certain features of our
                        Services, you must register for an account. You agree to provide accurate, current, and complete
                        information during the registration process and to update such information to keep it accurate,
                        current, and complete.
                      </p>
                      <p className="mb-3">
                        2.2. <span className="font-medium">Account Security:</span> You are responsible for maintaining
                        the confidentiality of your account credentials and for all activities that occur under your
                        account. You agree to notify us immediately of any unauthorized use of your account.
                      </p>
                      <p className="mb-3">
                        2.3. <span className="font-medium">Account Types:</span> We offer different types of accounts
                        for job seekers and employers. Each account type has specific features, limitations, and terms
                        that may apply.
                      </p>
                    </div>
                  )}
                </section>

                {/* Job Listings and Applications */}
                <section ref={sectionRefs.jobListings} id="jobListings">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("jobListings")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">3. Job Listings and Applications</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.jobListings ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.jobListings && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p className="mb-3">
                        3.1. <span className="font-medium">Job Listings:</span> Employers may post job listings on our
                        platform. We do not guarantee the accuracy, completeness, or availability of any job listings.
                      </p>
                      <p className="mb-3">
                        3.2. <span className="font-medium">Applications:</span> Job seekers may apply to job listings
                        through our Services. We do not guarantee that applications will be received, reviewed, or
                        responded to by employers.
                      </p>
                      <p className="mb-3">
                        3.3. <span className="font-medium">Content Restrictions:</span> Job listings and applications
                        must not contain discriminatory, illegal, offensive, or inappropriate content. We reserve the
                        right to remove any content that violates these Terms.
                      </p>
                    </div>
                  )}
                </section>

                {/* Employer/Recruiter Terms */}
                <section ref={sectionRefs.employerTerms} id="employerTerms">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("employerTerms")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">4. Employer/Recruiter Terms</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.employerTerms ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.employerTerms && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p className="mb-3">
                        4.1. <span className="font-medium">Posting Requirements:</span> Employers and recruiters must
                        provide accurate and complete information about their company and job opportunities.
                      </p>
                      <p className="mb-3">
                        4.2. <span className="font-medium">Subscription Services:</span> Certain employer features may
                        require a paid subscription. Subscription terms, including pricing and billing cycles, will be
                        disclosed before purchase.
                      </p>
                      <p className="mb-3">
                        4.3. <span className="font-medium">Candidate Data:</span> Employers must use candidate data only
                        for recruitment purposes and in compliance with applicable privacy laws.
                      </p>
                    </div>
                  )}
                </section>

                {/* User Conduct */}
                <section ref={sectionRefs.userConduct} id="userConduct">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("userConduct")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">5. User Conduct</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.userConduct ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.userConduct && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p className="mb-3">You agree not to use our Services to:</p>
                      <ul className="list-disc pl-6 mb-3 space-y-2">
                        <li>Violate any applicable laws or regulations</li>
                        <li>Infringe on the rights of others</li>
                        <li>Post false, misleading, or fraudulent content</li>
                        <li>Harass, abuse, or harm another person</li>
                        <li>Send spam or unsolicited messages</li>
                        <li>Interfere with the proper functioning of our Services</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Collect user data without permission</li>
                      </ul>
                      <p>
                        We reserve the right to suspend or terminate accounts that violate these conduct guidelines.
                      </p>
                    </div>
                  )}
                </section>

                {/* Intellectual Property */}
                <section ref={sectionRefs.intellectualProperty} id="intellectualProperty">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("intellectualProperty")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">6. Intellectual Property</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.intellectualProperty ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.intellectualProperty && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p className="mb-3">
                        6.1. <span className="font-medium">Our Content:</span> All content, features, and functionality
                        of our Services, including but not limited to text, graphics, logos, icons, images, audio clips,
                        and software, are owned by us or our licensors and are protected by copyright, trademark, and
                        other intellectual property laws.
                      </p>
                      <p className="mb-3">
                        6.2. <span className="font-medium">User Content:</span> You retain ownership of the content you
                        submit to our Services. By submitting content, you grant us a worldwide, non-exclusive,
                        royalty-free license to use, reproduce, modify, adapt, publish, and display such content for the
                        purpose of providing and promoting our Services.
                      </p>
                    </div>
                  )}
                </section>

                {/* Privacy */}
                <section ref={sectionRefs.privacy} id="privacy">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("privacy")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">7. Privacy</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.privacy ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.privacy && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p className="mb-3">
                        Our Privacy Policy describes how we collect, use, and share your personal information. By using
                        our Services, you consent to our collection and use of your data as described in our Privacy
                        Policy.
                      </p>
                    </div>
                  )}
                </section>

                {/* Limitation of Liability */}
                <section ref={sectionRefs.limitation} id="limitation">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("limitation")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">8. Limitation of Liability</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.limitation ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.limitation && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p className="mb-3">
                        8.1. <span className="font-medium">Disclaimer of Warranties:</span> Our Services are provided
                        "as is" and "as available" without warranties of any kind, either express or implied.
                      </p>
                      <p className="mb-3">
                        8.2. <span className="font-medium">Limitation of Liability:</span> To the maximum extent
                        permitted by law, we shall not be liable for any indirect, incidental, special, consequential,
                        or punitive damages, including but not limited to loss of profits, data, or use, arising out of
                        or in connection with our Services.
                      </p>
                      <p className="mb-3">
                        8.3. <span className="font-medium">Employment Relationships:</span> We are not responsible for
                        any employment decisions, for whatever reason, made by any entity posting jobs on our Services.
                      </p>
                    </div>
                  )}
                </section>

                {/* Termination */}
                <section ref={sectionRefs.termination} id="termination">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("termination")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">9. Termination</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.termination ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.termination && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p className="mb-3">
                        9.1. <span className="font-medium">Termination by You:</span> You may terminate your account at
                        any time by following the instructions on our Services.
                      </p>
                      <p className="mb-3">
                        9.2. <span className="font-medium">Termination by Us:</span> We may terminate or suspend your
                        account and access to our Services at any time, without prior notice or liability, for any
                        reason, including if you violate these Terms.
                      </p>
                      <p>
                        9.3. <span className="font-medium">Effect of Termination:</span> Upon termination, your right to
                        use our Services will immediately cease. All provisions of these Terms that by their nature
                        should survive termination shall survive.
                      </p>
                    </div>
                  )}
                </section>

                {/* Governing Law */}
                <section ref={sectionRefs.governingLaw} id="governingLaw">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("governingLaw")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">10. Governing Law</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.governingLaw ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.governingLaw && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p>
                        These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction],
                        without regard to its conflict of law provisions. Any disputes arising under these Terms shall
                        be resolved exclusively in the courts of [Jurisdiction].
                      </p>
                    </div>
                  )}
                </section>

                {/* Changes to Terms */}
                <section ref={sectionRefs.changes} id="changes">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("changes")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">11. Changes to Terms</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.changes ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.changes && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p>
                        We may modify these Terms at any time. We will provide notice of material changes by posting the
                        updated Terms on our Services and updating the "Last Updated" date. Your continued use of our
                        Services after such changes constitutes your acceptance of the new Terms.
                      </p>
                    </div>
                  )}
                </section>

                {/* Contact Information */}
                <section ref={sectionRefs.contact} id="contact">
                  <div
                    className="flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
                    onClick={() => toggleSection("contact")}
                  >
                    <h2 className="text-xl font-semibold text-gray-800">12. Contact Information</h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transition-transform ${openSections.contact ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {openSections.contact && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <p>
                        If you have any questions about these Terms, please contact us at [contact email] or [contact
                        address].
                      </p>
                    </div>
                  )}
                </section>

                {/* Last Updated */}
                <div className="pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Last Updated:{" "}
                    {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>

                {/* Accept Terms Checkbox */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="accept-terms"
                      checked={acceptTerms}
                      onChange={() => setAcceptTerms(!acceptTerms)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
                      I have read and agree to the Terms and Conditions
                    </label>
                  </div>

                  <button
                    disabled={!acceptTerms}
                    className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                      acceptTerms ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>
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

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @media print {
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default TermsAndConditions