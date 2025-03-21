// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import PaymentForm from "../Components/Shop/PaymentForm"
// import { mockCourses } from "../Components/Shop/mockCourses"

// const CourseDetailPage = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [course, setCourse] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [showPaymentForm, setShowPaymentForm] = useState(false)
//   const [paymentSuccess, setPaymentSuccess] = useState(false)

//   useEffect(() => {
//     // Simulate API call to get course details
//     const fetchCourse = () => {
//       setLoading(true)
//       setTimeout(() => {
//         const foundCourse = mockCourses.find((c) => c.id === Number.parseInt(id))
//         if (foundCourse) {
//           setCourse(foundCourse)
//         }
//         setLoading(false)
//       }, 500)
//     }

//     fetchCourse()
//   }, [id])

//   const handleBuyNow = () => {
//     setShowPaymentForm(true)
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   const handlePaymentSuccess = () => {
//     setPaymentSuccess(true)
//     setShowPaymentForm(false)
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
//       </div>
//     )
//   }

//   if (!course) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
//         <p className="text-gray-600 mb-8">The course you're looking for doesn't exist or has been removed.</p>
//         <button
//           onClick={() => navigate("/courses")}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md"
//         >
//           Browse Courses
//         </button>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen pb-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {paymentSuccess && (
//           <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-8">
//             <div className="flex">
//               <svg
//                 className="h-5 w-5 text-green-400 mr-2"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <div>
//                 <p className="font-medium">Payment Successful!</p>
//                 <p className="text-sm">You now have access to "{course.title}". Check your email for course details.</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="md:col-span-2">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-80 object-cover" />

//               <div className="p-6">
//                 <div className="flex flex-wrap justify-between items-start mb-4">
//                   <h1 className="text-3xl font-bold text-gray-900 mb-2 mr-4">{course.title}</h1>
//                   <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
//                     {course.category}
//                   </span>
//                 </div>

//                 <div className="flex items-center mb-4">
//                   <div className="flex text-yellow-400 mr-2">
//                     {[...Array(5)].map((_, i) => (
//                       <svg
//                         key={i}
//                         className={`w-5 h-5 ${i < Math.floor(course.rating) ? "fill-current" : "stroke-current fill-none"}`}
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//                         />
//                       </svg>
//                     ))}
//                   </div>
//                   <span className="text-gray-600">
//                     {course.rating} ({course.reviewCount} reviews)
//                   </span>
//                 </div>

//                 <p className="text-gray-600 mb-2">
//                   <span className="font-medium">Instructor:</span> {course.instructor}
//                 </p>
//                 <p className="text-gray-600 mb-2">
//                   <span className="font-medium">Last Updated:</span> {course.lastUpdated}
//                 </p>
//                 <p className="text-gray-600 mb-6">
//                   <span className="font-medium">Duration:</span> {course.duration}
//                 </p>

//                 <div className="border-t border-gray-200 pt-6">
//                   <h2 className="text-xl font-semibold mb-4">Course Description</h2>
//                   <p className="text-gray-700 mb-4">{course.description}</p>
//                   <p className="text-gray-700">{course.longDescription}</p>
//                 </div>

//                 <div className="border-t border-gray-200 pt-6 mt-6">
//                   <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
//                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
//                     {course.learningPoints.map((point, index) => (
//                       <li key={index} className="flex items-start">
//                         <svg
//                           className="h-5 w-5 text-green-500 mr-2 mt-0.5"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                         <span className="text-gray-700">{point}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="md:col-span-1">
//             {showPaymentForm ? (
//               <PaymentForm course={course} onPaymentSuccess={handlePaymentSuccess} />
//             ) : (
//               <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
//                 <div className="mb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-3xl font-bold text-gray-900">${course.price}</span>
//                     {course.originalPrice && (
//                       <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
//                     )}
//                   </div>
//                   {course.discount > 0 && (
//                     <div className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-md inline-block">
//                       {Math.round((course.discount / course.originalPrice) * 100)}% off
//                     </div>
//                   )}
//                 </div>

//                 <div className="space-y-3 mb-6">
//                   <div className="flex items-start">
//                     <svg
//                       className="h-5 w-5 text-gray-500 mr-2 mt-0.5"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <span className="text-gray-700">{course.duration} of content</span>
//                   </div>
//                   <div className="flex items-start">
//                     <svg
//                       className="h-5 w-5 text-gray-500 mr-2 mt-0.5"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
//                     </svg>
//                     <span className="text-gray-700">Certificate of completion</span>
//                   </div>
//                   <div className="flex items-start">
//                     <svg
//                       className="h-5 w-5 text-gray-500 mr-2 mt-0.5"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <span className="text-gray-700">Full lifetime access</span>
//                   </div>
//                   <div className="flex items-start">
//                     <svg
//                       className="h-5 w-5 text-gray-500 mr-2 mt-0.5"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                     <span className="text-gray-700">{course.lessons} lessons</span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleBuyNow}
//                   className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md mb-3"
//                 >
//                   Buy Now
//                 </button>

//                 <button className="w-full bg-white hover:bg-gray-50 text-indigo-600 font-medium py-3 px-4 rounded-md border border-indigo-600">
//                   Add to Wishlist
//                 </button>

//                 <p className="text-xs text-gray-500 text-center mt-4">30-Day Money-Back Guarantee</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CourseDetailPage

