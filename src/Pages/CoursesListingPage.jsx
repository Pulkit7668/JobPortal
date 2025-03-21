// "use client"

// import { useState, useEffect } from "react"
// import { useLocation } from "react-router-dom"
// import Filters from "../Components/Shop/Filters"
// import CourseCard from "../Components/Shop/CourseCard"
// import Pagination from "../Components/Shop/Pagination"
// import { mockCourses } from "../Components/Shop/mockCourses"

// const CoursesListingPage = () => {
//   const location = useLocation()
//   const queryParams = new URLSearchParams(location.search)
//   const initialFilter = queryParams.get("filter") || ""

//   const [currentPage, setCurrentPage] = useState(1)
//   const [filteredCourses, setFilteredCourses] = useState([])
//   const [filters, setFilters] = useState({
//     search: "",
//     courseType: "",
//     priceRange: "",
//     sort: "popular",
//   })

//   const coursesPerPage = 8

//   useEffect(() => {
//     // Apply initial filter from URL if present
//     if (initialFilter) {
//       let initialFilteredCourses = [...mockCourses]

//       switch (initialFilter) {
//         case "new":
//           initialFilteredCourses = mockCourses.filter((course) => course.isNew)
//           break
//         case "top-rated":
//           initialFilteredCourses = [...mockCourses].sort((a, b) => b.rating - a.rating)
//           break
//         case "trending":
//           initialFilteredCourses = mockCourses.filter((course) => course.trending)
//           break
//         default:
//           break
//       }

//       setFilteredCourses(initialFilteredCourses)
//     } else {
//       setFilteredCourses(mockCourses)
//     }
//   }, [initialFilter])

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters)
//     let filtered = [...mockCourses]

//     // Apply search filter
//     if (newFilters.search) {
//       const searchTerm = newFilters.search.toLowerCase()
//       filtered = filtered.filter(
//         (course) =>
//           course.title.toLowerCase().includes(searchTerm) || course.instructor.toLowerCase().includes(searchTerm),
//       )
//     }

//     // Apply course type filter
//     if (newFilters.courseType) {
//       filtered = filtered.filter((course) => course.type === newFilters.courseType)
//     }

//     // Apply price range filter
//     if (newFilters.priceRange) {
//       switch (newFilters.priceRange) {
//         case "free":
//           filtered = filtered.filter((course) => course.price === 0)
//           break
//         case "under50":
//           filtered = filtered.filter((course) => course.price > 0 && course.price < 50)
//           break
//         case "50to100":
//           filtered = filtered.filter((course) => course.price >= 50 && course.price <= 100)
//           break
//         case "100to200":
//           filtered = filtered.filter((course) => course.price > 100 && course.price <= 200)
//           break
//         case "over200":
//           filtered = filtered.filter((course) => course.price > 200)
//           break
//         default:
//           break
//       }
//     }

//     // Apply sorting
//     if (newFilters.sort) {
//       switch (newFilters.sort) {
//         case "popular":
//           filtered.sort((a, b) => b.reviewCount - a.reviewCount)
//           break
//         case "newest":
//           filtered.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
//           break
//         case "priceAsc":
//           filtered.sort((a, b) => a.price - b.price)
//           break
//         case "priceDesc":
//           filtered.sort((a, b) => b.price - a.price)
//           break
//         case "rating":
//           filtered.sort((a, b) => b.rating - a.rating)
//           break
//         default:
//           break
//       }
//     }

//     setFilteredCourses(filtered)
//     setCurrentPage(1) // Reset to first page when filters change
//   }

//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//     window.scrollTo(0, 0)
//   }

//   // Calculate pagination
//   const indexOfLastCourse = currentPage * coursesPerPage
//   const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
//   const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
//   const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)

//   return (
//     <div className="bg-gray-50 min-h-screen pb-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Courses</h1>

//         <Filters onFilterChange={handleFilterChange} />

//         {filteredCourses.length === 0 ? (
//           <div className="text-center py-12">
//             <h2 className="text-xl font-medium text-gray-600">No courses found matching your criteria</h2>
//             <p className="mt-2 text-gray-500">Try adjusting your filters or search terms</p>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {currentCourses.map((course) => (
//                 <CourseCard key={course.id} course={course} />
//               ))}
//             </div>

//             {totalPages > 1 && (
//               <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CoursesListingPage

