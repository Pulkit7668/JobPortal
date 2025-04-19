import { useState } from "react"
import { ArrowLeft, Info, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CompanyRatePage() {
  const [activeTab, setActiveTab] = useState("reviews")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [workCulture, setWorkCulture] = useState([])
  const [interviewExperience, setInterviewExperience] = useState(0)
  const [interviewDifficulty, setInterviewDifficulty] = useState(0)
  const [interviewDuration, setInterviewDuration] = useState("")
  const [dressCode, setDressCode] = useState([])
  const [recommendCompany, setRecommendCompany] = useState("")
  const [paidFairly, setPaidFairly] = useState("")
  const [adequateSalary, setAdequateSalary] = useState("")
  const navigate = useNavigate()

  const handleWorkCultureChange = (option) => {
    if (workCulture.includes(option)) {
      setWorkCulture(workCulture.filter((item) => item !== option))
    } else {
      setWorkCulture([...workCulture, option])
    }
  }

  const handleDressCodeChange = (option) => {
    if (dressCode.includes(option)) {
      setDressCode(dressCode.filter((item) => item !== option))
    } else {
      setDressCode([...dressCode, option])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", {
      workCulture,
      interviewExperience,
      interviewDifficulty,
      interviewDuration,
      dressCode,
      recommendCompany,
      paidFairly,
      adequateSalary,
    })
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  const handleStartReview = () => {
    setShowReviewForm(true)
    window.scrollTo(0, 0)
  }

  const handleBackToReviews = () => {
    setShowReviewForm(false)
    setSubmitted(false)
    window.scrollTo(0, 0)
  }

  // Mobile header with status bar
  const MobileHeader = () => (
    <header className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
      <button onClick={showReviewForm ? handleBackToReviews : () => navigate(-1)}>
        <ArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
    </header>
  )

  // Rating scale component (1-5)
  const RatingScale = ({ value, onChange, leftLabel, rightLabel }) => (
    <div className="mt-2">
      <div className="grid grid-cols-5 gap-0">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            className={`py-4 border ${num === 1 ? "rounded-l-md" : ""} ${num === 5 ? "rounded-r-md" : ""} ${
              value === num ? "bg-blue-100 border-blue-500 text-blue-600 font-medium" : "border-gray-300"
            }`}
            onClick={() => onChange(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-gray-600 text-sm">{leftLabel}</span>
        <span className="text-gray-600 text-sm">{rightLabel}</span>
      </div>
    </div>
  )

  // Yes/No toggle component
  const YesNoToggle = ({ value, onChange, question }) => (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-2">{question}</h2>
      <div className="grid grid-cols-2 gap-0">
        <button
          type="button"
          className={`py-3 border border-r-0 rounded-l-md ${
            value === "Yes" ? "bg-blue-100 border-blue-500 text-blue-600 font-medium" : "border-gray-300"
          }`}
          onClick={() => onChange("Yes")}
        >
          Yes
        </button>
        <button
          type="button"
          className={`py-3 border rounded-r-md ${
            value === "No" ? "bg-blue-100 border-blue-500 text-blue-600 font-medium" : "border-gray-300"
          }`}
          onClick={() => onChange("No")}
        >
          No
        </button>
      </div>
    </div>
  )

  // Checkbox group component
  const CheckboxGroup = ({ title, subtitle, options, selected, onChange }) => (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600 text-sm mb-2">{subtitle}</p>}
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option} className="flex items-center border rounded-md p-4">
            <input
              type="checkbox"
              className="w-5 h-5 border-gray-300 rounded"
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
            />
            <span className="ml-3">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )

  // Radio group component
  const RadioGroup = ({ title, options, selected, onChange }) => (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      <div className="space-y-3">
        {options.map((option) => (
          <label key={option} className="flex items-center border rounded-md p-4">
            <input
              type="radio"
              name="radioGroup"
              className="w-5 h-5 border-gray-300 rounded-full"
              checked={selected === option}
              onChange={() => onChange(option)}
            />
            <span className="ml-3">{option}</span>
          </label>
        ))}
      </div>
    </div>
  )

  // Reviews page with tabs
  const ReviewsPage = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">My reviews and contributions</h1>
      <p className="text-gray-600 mb-6">
        Your reviews, questions and answers will appear on the employer's Company Page. They are not associated with
        your name, CV or job applications.
      </p>

      <div className="border-b">
        <div className="flex overflow-x-auto">
          <button
            className={`py-3 px-4 whitespace-nowrap ${
              activeTab === "reviews" ? "border-b-2 border-blue-600 text-blue-600 font-medium" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (0)
          </button>
          <button
            className={`py-3 px-4 whitespace-nowrap ${
              activeTab === "questions" ? "border-b-2 border-blue-600 text-blue-600 font-medium" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("questions")}
          >
            Questions (0)
          </button>
          <button
            className={`py-3 px-4 whitespace-nowrap ${
              activeTab === "answers" ? "border-b-2 border-blue-600 text-blue-600 font-medium" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("answers")}
          >
            Answers (0)
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 bg-pink-200 rounded-full opacity-50"></div>
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-amber-400 rounded-t-full"></div>
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-24 h-12 border-4 border-blue-600 rounded-t-full"></div>
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex justify-center">
                <div className="w-6 h-6 bg-white border border-gray-800 flex items-center justify-center mx-1">★</div>
                <div className="w-6 h-6 bg-white border border-gray-800 flex items-center justify-center mx-1">★</div>
                <div className="w-6 h-6 bg-white border border-gray-800 flex items-center justify-center mx-1">★</div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Unlock all reviews</h2>
          <p className="text-center text-gray-600 mb-8">Access all reviews by writing yours</p>
          <button
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md flex items-center justify-center"
            onClick={handleStartReview}
          >
            Write a review <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )

  // Success page after submission
  const SuccessPage = () => (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-center mb-2">Thank you for your review!</h2>
        <p className="text-center text-gray-600 mb-8">
          Your feedback will help other job seekers make informed decisions.
        </p>
        <button className="w-full max-w-xs bg-blue-600 text-white py-3 px-4 rounded-md" onClick={handleBackToReviews}>
          View all reviews
        </button>
      </div>
    </div>
  )

  // Complete review form on a single page
  const ReviewForm = () => (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">
              Share your anonymous review about <span className="block md:inline">Byte Digital Solution Pvt Ltd</span>
            </h1>
            <p className="text-gray-600 text-sm mt-1">Your feedback can help other job seekers.</p>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <Info className="w-5 h-5 text-gray-500 mr-2" />
          <p className="text-gray-600 text-sm">All questions are optional. Please skip any that don't apply.</p>
        </div>

        <YesNoToggle
          question="Would you recommend working at Byte Digital Solution Pvt Ltd to a friend?"
          value={recommendCompany}
          onChange={setRecommendCompany}
        />

        <YesNoToggle
          question="Do you think you are paid fairly at Byte Digital Solution Pvt Ltd?"
          value={paidFairly}
          onChange={setPaidFairly}
        />

        <YesNoToggle
          question="Do you feel like your salary at Byte Digital Solution Pvt Ltd is enough for the cost of living in your area?"
          value={adequateSalary}
          onChange={setAdequateSalary}
        />

        <CheckboxGroup
          title="How would you describe the work culture at Byte Digital Solution Pvt Ltd?"
          subtitle="Choose all that are applicable:"
          options={["Relaxed", "Fast-paced", "Stressful", "Collaborative", "Competitive", "Slow-paced", "Not sure"]}
          selected={workCulture}
          onChange={handleWorkCultureChange}
        />

        <h2 className="text-lg font-medium mb-2">
          Please rate your overall interview experience at Byte Digital Solution Pvt Ltd.
        </h2>
        <RatingScale
          value={interviewExperience}
          onChange={setInterviewExperience}
          leftLabel="Poor"
          rightLabel="Excellent"
        />

        <h2 className="text-lg font-medium mt-6 mb-2">
          Please rate the level of difficulty of your interview at Byte Digital Solution Pvt Ltd.
        </h2>
        <RatingScale
          value={interviewDifficulty}
          onChange={setInterviewDifficulty}
          leftLabel="Easy"
          rightLabel="Difficult"
        />

        <RadioGroup
          title="How long did it take from the beginning of the interview process at Byte Digital Solution Pvt Ltd until you received your job offer?"
          options={["About a day or two", "About a week", "About two weeks", "About a month", "More than one month"]}
          selected={interviewDuration}
          onChange={setInterviewDuration}
        />

        <CheckboxGroup
          title="How would you recommend dressing for an interview at Byte Digital Solution Pvt Ltd?"
          subtitle="Choose all that are applicable:"
          options={[
            "Formal (business suit)",
            "Business casual (e.g. dress slacks)",
            "Casual (t-shirt and jeans)",
            "They didn't have a dress code",
            "Special outfit (e.g. protective gear)",
          ]}
          selected={dressCode}
          onChange={handleDressCodeChange}
        />

        <div className="mt-8">
          <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-md">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  )

  // Render the appropriate content based on the current state
  const renderContent = () => {
    if (submitted) {
      return <SuccessPage />
    } else if (showReviewForm) {
      return <ReviewForm />
    } else {
      return <ReviewsPage />
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen mt-16 md:mt-0">
      <div className="max-w-7xl mx-auto bg-white shadow-sm md:my-8 md:rounded-lg overflow-hidden">
        <MobileHeader />
        <main>{renderContent()}</main>
      </div>
    </div>
  )
}
