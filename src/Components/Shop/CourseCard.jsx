// import { Link } from "react-router-dom"

// const CourseCard = ({ course }) => {
//   return (
//     <Link to={`/courses/${course.id}`} className="block">
//       <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//         <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
//         <div className="p-4">
//           <div className="flex justify-between items-start">
//             <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.title}</h3>
//             <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">{course.category}</span>
//           </div>
//           <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
//           <div className="flex items-center mb-2">
//             <div className="flex text-yellow-400">
//               {[...Array(5)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className={`w-4 h-4 ${i < Math.floor(course.rating) ? "fill-current" : "stroke-current fill-none"}`}
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//                   />
//                 </svg>
//               ))}
//             </div>
//             <span className="text-sm text-gray-600 ml-1">({course.reviewCount})</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-lg font-bold text-gray-900">${course.price}</span>
//             {course.originalPrice && (
//               <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default CourseCard

