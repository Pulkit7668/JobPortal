// "use client"

// import { useState } from "react"

// const PaymentForm = ({ course, onPaymentSuccess }) => {
//   const [formData, setFormData] = useState({
//     cardNumber: "",
//     cardName: "",
//     expiryDate: "",
//     cvv: "",
//   })
//   const [isProcessing, setIsProcessing] = useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setIsProcessing(true)

//     // Simulate payment processing
//     setTimeout(() => {
//       setIsProcessing(false)
//       onPaymentSuccess()
//     }, 2000)
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
//             Card Number
//           </label>
//           <input
//             type="text"
//             id="cardNumber"
//             name="cardNumber"
//             placeholder="1234 5678 9012 3456"
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={formData.cardNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
//             Cardholder Name
//           </label>
//           <input
//             type="text"
//             id="cardName"
//             name="cardName"
//             placeholder="John Doe"
//             className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={formData.cardName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
//               Expiry Date
//             </label>
//             <input
//               type="text"
//               id="expiryDate"
//               name="expiryDate"
//               placeholder="MM/YY"
//               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               value={formData.expiryDate}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
//               CVV
//             </label>
//             <input
//               type="text"
//               id="cvv"
//               name="cvv"
//               placeholder="123"
//               className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               value={formData.cvv}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="border-t border-gray-200 pt-4 mb-4">
//           <div className="flex justify-between mb-2">
//             <span className="text-gray-600">Course Price</span>
//             <span className="font-medium">${course.price}</span>
//           </div>
//           {course.discount > 0 && (
//             <div className="flex justify-between mb-2">
//               <span className="text-gray-600">Discount</span>
//               <span className="font-medium text-green-600">-${course.discount}</span>
//             </div>
//           )}
//           <div className="flex justify-between font-bold">
//             <span>Total</span>
//             <span>${course.price - (course.discount || 0)}</span>
//           </div>
//         </div>

//         <button
//           type="submit"
//           className={`w-full py-2 px-4 rounded-md text-white font-medium ${
//             isProcessing ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
//           }`}
//           disabled={isProcessing}
//         >
//           {isProcessing ? "Processing..." : `Pay $${course.price - (course.discount || 0)}`}
//         </button>
//       </form>
//     </div>
//   )
// }

// export default PaymentForm

