// "use client"

// import { Star } from "lucide-react"

// export default function ReviewList({ reviews }) {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-xl font-bold text-gray-900 mb-6">Company Reviews</h2>

//       {reviews.length === 0 ? (
//         <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to leave a review!</p>
//       ) : (
//         <div className="space-y-6">
//           {reviews.map((review) => (
//             <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
//                 <div className="flex items-center">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Star
//                       key={star}
//                       className={`w-5 h-5 ${
//                         star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>

//               <p className="text-gray-600 mb-4">{review.comment}</p>

//               <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
//                 <div className="mb-2 sm:mb-0">
//                   <span className="font-medium text-gray-900">{review.author}</span>
//                   {review.position && review.company && (
//                     <span className="text-gray-500">
//                       {" "}
//                       - {review.position}, {review.company}
//                     </span>
//                   )}
//                 </div>
//                 <div className="text-gray-500">{review.date}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

