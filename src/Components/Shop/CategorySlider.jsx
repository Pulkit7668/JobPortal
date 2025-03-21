// "use client"

// import { useState, useRef } from "react"
// import { Link } from "react-router-dom"

// const categories = [
//   { id: 1, name: "Courses", link: "/courses" },
//   { id: 2, name: "Profile Booster", link: "/profile-booster" },
//   { id: 3, name: "Consultation", link: "/consultation" },
//   { id: 4, name: "Free Certification", link: "/free-certification" },
//   { id: 5, name: "Premium Services", link: "/premium-services" },
// ]

// const CategorySlider = () => {
//   const [startIndex, setStartIndex] = useState(0)
//   const sliderRef = useRef(null)

//   const nextSlide = () => {
//     if (startIndex < categories.length - 4) {
//       setStartIndex(startIndex + 1)
//     }
//   }

//   const prevSlide = () => {
//     if (startIndex > 0) {
//       setStartIndex(startIndex - 1)
//     }
//   }

//   const visibleCategories = categories.slice(startIndex, startIndex + 4)

//   return (
//     <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//       <div className="flex items-center">
//         <button
//           onClick={prevSlide}
//           className={`absolute left-0 z-10 p-2 rounded-full bg-white shadow-md ${
//             startIndex === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
//           }`}
//           disabled={startIndex === 0}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>

//         <div ref={sliderRef} className="flex justify-between w-full overflow-hidden px-10">
//           {visibleCategories.map((category) => (
//             <Link
//               key={category.id}
//               to={category.link}
//               className="flex-1 mx-2 p-6 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow duration-300"
//             >
//               <div className="text-lg font-medium text-gray-800">{category.name}</div>
//             </Link>
//           ))}
//         </div>

//         <button
//           onClick={nextSlide}
//           className={`absolute right-0 z-10 p-2 rounded-full bg-white shadow-md ${
//             startIndex >= categories.length - 4 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
//           }`}
//           disabled={startIndex >= categories.length - 4}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   )
// }

// export default CategorySlider

