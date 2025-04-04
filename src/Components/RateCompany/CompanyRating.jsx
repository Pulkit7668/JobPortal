import { useState } from "react"
import { Star, StarHalf, MessageSquare, Users, Briefcase } from "lucide-react"
import RatingForm from "./RatingForm"
import ReviewList from "./ReviewList"

// Sample company data
const companyData = {
  name: "TechCorp Solutions",
  logo: "/placeholder.svg?height=100&width=100",
  description: "Leading provider of innovative technology solutions for businesses of all sizes.",
  founded: "2010",
  employees: "500+",
  industry: "Technology",
  website: "https://techcorp-example.com",
  averageRating: 4.2,
  totalReviews: 128,
}

// Sample reviews
const initialReviews = [
  {
    id: 1,
    author: "Jane Smith",
    rating: 5,
    date: "2023-10-15",
    title: "Excellent company to work with",
    comment:
      "We've been using TechCorp's services for over 2 years and have been extremely satisfied with their professionalism and quality of work.",
    position: "Marketing Director",
    company: "Global Retail Inc.",
  },
  {
    id: 2,
    author: "Michael Johnson",
    rating: 4,
    date: "2023-09-22",
    title: "Great service with minor issues",
    comment:
      "Overall very good experience. Their customer support team is responsive and helpful. Had a few delays with implementation but nothing major.",
    position: "CTO",
    company: "StartUp Ventures",
  },
  {
    id: 3,
    author: "Sarah Williams",
    rating: 3,
    date: "2023-08-05",
    title: "Decent but overpriced",
    comment:
      "The quality of service is good but I feel their pricing is a bit on the higher side compared to competitors offering similar solutions.",
    position: "Operations Manager",
    company: "Midwest Manufacturing",
  },
  {
    id: 4,
    author: "Sarah Williams",
    rating: 3,
    date: "2023-08-05",
    title: "Decent but overpriced",
    comment:
      "The quality of service is good but I feel their pricing is a bit on the higher side compared to competitors offering similar solutions.",
    position: "Operations Manager",
    company: "Midwest Manufacturing",
  },
]

export default function CompanyRating() {
  const [reviews, setReviews] = useState(initialReviews)
  const [averageRating, setAverageRating] = useState(companyData.averageRating)
  const [totalReviews, setTotalReviews] = useState(companyData.totalReviews)

  const handleNewReview = (newReview) => {
    const newReviewWithId = {
      ...newReview,
      id: reviews.length + 1,
      date: new Date().toISOString().split("T")[0],
    }

    const updatedReviews = [newReviewWithId, ...reviews]
    setReviews(updatedReviews)

    // Recalculate average rating
    const allRatings = updatedReviews.map((review) => review.rating)
    const newAverage = (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1)

    setAverageRating(Number.parseFloat(newAverage))
    setTotalReviews(totalReviews + 1)
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:shrink-0 p-6 flex items-center justify-center bg-gray-50">
            <img
              className="h-24 w-24 object-contain"
              src={companyData.logo || "/placeholder.svg"}
              alt={`${companyData.name} logo`}
            />
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">{companyData.name}</h1>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                      {star <= Math.floor(averageRating) ? (
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ) : star - 0.5 <= averageRating ? (
                        <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <Star className="w-5 h-5 text-gray-300" />
                      )}
                    </span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{averageRating}</span>
                <span className="text-sm text-gray-500 ml-2">({totalReviews} reviews)</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{companyData.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
                <span>
                  <strong>Industry:</strong> {companyData.industry}
                </span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-500 mr-2" />
                <span>
                  <strong>Employees:</strong> {companyData.employees}
                </span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-gray-500 mr-2" />
                <span>
                  <strong>Founded:</strong> {companyData.founded}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <RatingForm onSubmitReview={handleNewReview} />
        </div>
        <div className="lg:col-span-2">
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  )
}

