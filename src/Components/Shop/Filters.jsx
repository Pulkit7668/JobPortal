// "use client"

// import { useState } from "react"

// const Filters = ({ onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     search: "",
//     courseType: "",
//     priceRange: "",
//     sort: "popular",
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     const updatedFilters = { ...filters, [name]: value }
//     setFilters(updatedFilters)
//     onFilterChange(updatedFilters)
//   }

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 mb-6">
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//         <div>
//           <label htmlFor="filters" className="block text-sm font-medium text-gray-700 mb-1">
//             Filters
//           </label>
//           <select
//             id="filters"
//             name="filters"
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             onChange={handleChange}
//           >
//             <option value="">All</option>
//             <option value="featured">Featured</option>
//             <option value="bestseller">Bestseller</option>
//             <option value="new">New</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
//             Search
//           </label>
//           <input
//             type="text"
//             id="search"
//             name="search"
//             placeholder="Search courses..."
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={filters.search}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label htmlFor="courseType" className="block text-sm font-medium text-gray-700 mb-1">
//             Course Type
//           </label>
//           <select
//             id="courseType"
//             name="courseType"
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={filters.courseType}
//             onChange={handleChange}
//           >
//             <option value="">All Types</option>
//             <option value="video">Video Course</option>
//             <option value="interactive">Interactive</option>
//             <option value="certification">Certification</option>
//             <option value="workshop">Workshop</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
//             Price Range
//           </label>
//           <select
//             id="priceRange"
//             name="priceRange"
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={filters.priceRange}
//             onChange={handleChange}
//           >
//             <option value="">All Prices</option>
//             <option value="free">Free</option>
//             <option value="under50">Under $50</option>
//             <option value="50to100">$50 - $100</option>
//             <option value="100to200">$100 - $200</option>
//             <option value="over200">Over $200</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
//             Sort
//           </label>
//           <select
//             id="sort"
//             name="sort"
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={filters.sort}
//             onChange={handleChange}
//           >
//             <option value="popular">Most Popular</option>
//             <option value="newest">Newest</option>
//             <option value="priceAsc">Price: Low to High</option>
//             <option value="priceDesc">Price: High to Low</option>
//             <option value="rating">Highest Rated</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Filters

