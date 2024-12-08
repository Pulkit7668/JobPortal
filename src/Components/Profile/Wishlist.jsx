// import React, { useState } from 'react';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

// function Wishlist() {
//   // Sample data for the items
//   const items = [
//     { id: 1, name: 'Job 1', description: 'Description of Job 1' },
//     { id: 2, name: 'Job 2', description: 'Description of Job 2' },
//     { id: 3, name: 'Job 3', description: 'Description of Job 3' },
//   ];

//   const [wishlist, setWishlist] = useState([]);

//   const toggleWishlist = (itemId) => {
//     setWishlist((prevWishlist) =>
//       prevWishlist.includes(itemId)
//         ? prevWishlist.filter((id) => id !== itemId)
//         : [...prevWishlist, itemId]
//     );
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className="p-4 border border-gray-200 bg-white rounded-lg hover:shadow-xl transition-shadow duration-300 relative"
//           >
//             <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//             <p className="text-sm text-gray-600">{item.description}</p>
//             <div
//               onClick={() => toggleWishlist(item.id)}
//               className="absolute top-4 right-4 cursor-pointer text-xl hover:scale-110 transition-transform"
//               aria-label="Save to wishlist"
//             >
//               {wishlist.includes(item.id) ? (
//                 <FaHeart className="text-red-500" />
//               ) : (
//                 <FaRegHeart className="text-gray-400" />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Wishlist;
