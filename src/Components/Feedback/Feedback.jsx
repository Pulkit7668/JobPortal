import { useState, useEffect } from "react"
import { Star, Send, CheckCircle } from "lucide-react"
import { AiOutlineClose } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    overallExperience: 0,
    userInterface: 0,
    jobRelevancy: 0,
    applicationProcess: 0,
    comments: "",
    suggestions: "",
    email: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRatingChange = (category, rating) => {
    setFormData((prev) => ({
      ...prev,
      [category]: rating,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const closeSignup = () => {
    navigate("/")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          overallExperience: 0,
          userInterface: 0,
          jobRelevancy: 0,
          applicationProcess: 0,
          comments: "",
          suggestions: "",
          email: "",
        })
      }, 3000)
    }, 1500)
  }

  const RatingStars = ({ category, value }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(category, star)}
            className="focus:outline-none"
          >
            <Star className={`w-6 h-6 ${star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Feedback!</h2>
          <p className="text-gray-600 mb-6">Your feedback helps us improve our job portal for everyone.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-lg lg:mx-20 mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Portal Feedback</h1>
        <button
          onClick={closeSignup}
          className="text-gray-500 hover:text-gray-700"
       >
        <AiOutlineClose size={24} />
      </button>
      </div>
      <p className="text-gray-600 mb-8">
        We value your opinion! Please take a moment to share your experience with our job portal.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Rate your experience</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Overall Experience</label>
              <RatingStars category="overallExperience" value={formData.overallExperience} />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">User Interface</label>
              <RatingStars category="userInterface" value={formData.userInterface} />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Job Relevancy</label>
              <RatingStars category="jobRelevancy" value={formData.jobRelevancy} />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Application Process</label>
              <RatingStars category="applicationProcess" value={formData.applicationProcess} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              What did you like about our job portal?
            </label>
            <textarea
              id="comments"
              name="comments"
              rows={3}
              value={formData.comments}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your positive experiences..."
            />
          </div>

          <div>
            <label htmlFor="suggestions" className="block text-sm font-medium text-gray-700 mb-1">
              How can we improve our job portal?
            </label>
            <textarea
              id="suggestions"
              name="suggestions"
              rows={3}
              value={formData.suggestions}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="We welcome your suggestions..."
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email (optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
            <p className="mt-1 text-xs text-gray-500">We'll only use this to follow up on your feedback if needed.</p>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading || formData.overallExperience === 0}
            className={`flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors
              ${loading || formData.overallExperience === 0 ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Submitting...
              </>
            ) : (
              <>
                Submit Feedback <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

