// "use client"

// import { useState } from "react"
// import { Star } from "lucide-react"

// export default function RatingForm({ onSubmitReview }) {
//   const [rating, setRating] = useState(0)
//   const [hoverRating, setHoverRating] = useState(0)
//   const [title, setTitle] = useState("")
//   const [comment, setComment] = useState("")
//   const [author, setAuthor] = useState("")
//   const [position, setPosition] = useState("")
//   const [company, setCompany] = useState("")
//   const [errors, setErrors] = useState({})
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)

//   const validate = () => {
//     const newErrors = {}
//     if (rating === 0) newErrors.rating = "Please select a rating"
//     if (!title.trim()) newErrors.title = "Please enter a title"
//     if (!comment.trim()) newErrors.comment = "Please enter a comment"
//     if (!author.trim()) newErrors.author = "Please enter your name"

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (!validate()) return

//     setIsSubmitting(true)

//     // Simulate API call
//     setTimeout(() => {
//       const newReview = {
//         rating,
//         title,
//         comment,
//         author,
//         position,
//         company,
//       }

//       onSubmitReview(newReview)

//       // Reset form
//       setRating(0)
//       setTitle("")
//       setComment("")
//       setAuthor("")
//       setPosition("")
//       setCompany("")
//       setIsSubmitting(false)
//       setIsSubmitted(true)

//       // Reset success message after 3 seconds
//       setTimeout(() => {
//         setIsSubmitted(false)
//       }, 3000)
//     }, 1000)
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-xl font-bold text-gray-900 mb-6">Rate this company</h2>

//       {isSubmitted ? (
//         <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
//           Thank you for your review! It has been submitted successfully.
//         </div>
//       ) : null}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
//           <div className="flex">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <button
//                 key={star}
//                 type="button"
//                 className="p-1 focus:outline-none"
//                 onClick={() => setRating(star)}
//                 onMouseEnter={() => setHoverRating(star)}
//                 onMouseLeave={() => setHoverRating(0)}
//               >
//                 <Star
//                   className={`w-8 h-8 ${
//                     (hoverRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//                   }`}
//                 />
//               </button>
//             ))}
//           </div>
//           {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//             Review Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//             Your Review
//           </label>
//           <textarea
//             id="comment"
//             rows={4}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//           {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
//             Your Name
//           </label>
//           <input
//             type="text"
//             id="author"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//           />
//           {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
//             Your Position (optional)
//           </label>
//           <input
//             type="text"
//             id="position"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={position}
//             onChange={(e) => setPosition(e.target.value)}
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
//             Your Company (optional)
//           </label>
//           <input
//             type="text"
//             id="company"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? "Submitting..." : "Submit Review"}
//         </button>
//       </form>
//     </div>
//   )
// }

