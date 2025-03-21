// import CategorySlider from "../Components/Shop/CategorySlider"
// import CourseSection from "../Components/Shop/CourseSection"
// import { mockCourses } from "../Components/Shop/mockCourses"

// const ShopPage = () => {
//   // Filter courses by category
//   const newCourses = mockCourses.filter((course) => course.isNew).slice(0, 4)
//   const topRatedCourses = [...mockCourses].sort((a, b) => b.rating - a.rating).slice(0, 4)
//   const trendingCourses = mockCourses.filter((course) => course.trending).slice(0, 4)

//   return (
//     <div className="bg-gray-50 min-h-screen pb-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <CategorySlider />

//         <div className="mt-12">
//           <CourseSection title="New Launched Courses" courses={newCourses} viewMoreLink="/courses?filter=new" />

//           <CourseSection title="Top Rated Courses" courses={topRatedCourses} viewMoreLink="/courses?filter=top-rated" />

//           <CourseSection title="Trending Courses" courses={trendingCourses} viewMoreLink="/courses?filter=trending" />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ShopPage

