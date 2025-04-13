import { useState } from "react"
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle,
  ChevronDown,
  CreditCard,
  Download,
  Gift,
  RefreshCw,
  Shield,
  Star,
  ToggleLeft,
  ToggleRight,
  User,
  Users,
} from "lucide-react"

// Sample user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  joinDate: "January 15, 2023",
  avatar: "/placeholder.svg?height=80&width=80",
  paymentMethods: [
    { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
    { id: 2, type: "Mastercard", last4: "5555", expiry: "10/24", isDefault: false },
  ],
}

// Sample membership data
const membershipData = [
  {
    id: 1,
    type: "Premium",
    status: "Active",
    startDate: "January 15, 2023",
    expiryDate: "January 15, 2024",
    price: "$99.99/year",
    autoRenew: true,
    benefits: [
      "Unlimited access to all content",
      "Priority customer support",
      "Exclusive webinars and events",
      "No advertisements",
    ],
    color: "bg-gradient-to-r from-purple-500 to-indigo-600",
    usage: { sessions: 45, downloads: 23, hours: 78 },
  },
  {
    id: 2,
    type: "Pro",
    status: "Expired",
    startDate: "March 10, 2022",
    expiryDate: "March 10, 2023",
    price: "$49.99/year",
    autoRenew: false,
    benefits: ["Access to premium content", "Standard customer support", "Monthly newsletter"],
    color: "bg-gradient-to-r from-orange-400 to-pink-500",
    usage: { sessions: 32, downloads: 15, hours: 45 },
  },
  {
    id: 3,
    type: "Basic",
    status: "Cancelled",
    startDate: "June 5, 2021",
    expiryDate: "June 5, 2022",
    price: "$19.99/year",
    autoRenew: false,
    benefits: ["Basic access to content", "Email support"],
    color: "bg-gradient-to-r from-green-400 to-teal-500",
    usage: { sessions: 18, downloads: 7, hours: 24 },
  },
]

// Sample payment history
const paymentHistory = [
  {
    id: 1,
    date: "January 15, 2023",
    amount: "$99.99",
    membership: "Premium",
    status: "Successful",
    invoice: "INV-2023-001",
  },
  { id: 2, date: "March 10, 2022", amount: "$49.99", membership: "Pro", status: "Successful", invoice: "INV-2022-045" },
  { id: 3, date: "June 5, 2021", amount: "$19.99", membership: "Basic", status: "Successful", invoice: "INV-2021-112" },
  { id: 4, date: "June 5, 2022", amount: "$19.99", membership: "Basic", status: "Failed", invoice: "INV-2022-113" },
]

// Sample available plans for comparison
const availablePlans = [
  {
    id: 1,
    type: "Basic",
    price: "$19.99/year",
    features: [
      { name: "Content Access", value: "Limited" },
      { name: "Customer Support", value: "Email Only" },
      { name: "Downloads", value: "10/month" },
      { name: "Ad-Free Experience", value: "No" },
      { name: "Exclusive Events", value: "No" },
    ],
  },
  {
    id: 2,
    type: "Pro",
    price: "$49.99/year",
    features: [
      { name: "Content Access", value: "Standard" },
      { name: "Customer Support", value: "Business Hours" },
      { name: "Downloads", value: "50/month" },
      { name: "Ad-Free Experience", value: "No" },
      { name: "Exclusive Events", value: "Limited" },
    ],
  },
  {
    id: 3,
    type: "Premium",
    price: "$99.99/year",
    isRecommended: true,
    features: [
      { name: "Content Access", value: "Unlimited" },
      { name: "Customer Support", value: "24/7 Priority" },
      { name: "Downloads", value: "Unlimited" },
      { name: "Ad-Free Experience", value: "Yes" },
      { name: "Exclusive Events", value: "All Access" },
    ],
  },
]

// Sample referral data
const referralData = {
  code: "JOHNDOE10",
  totalReferred: 5,
  pendingRewards: 2,
  rewardsEarned: "$50.00",
  referralLink: "https://example.com/refer/JOHNDOE10",
}

// MembershipCard Component
const MembershipCard = ({ membership }) => {
  const [expanded, setExpanded] = useState(false)
  const [autoRenew, setAutoRenew] = useState(membership.autoRenew)
  const isActive = membership.status === "Active"

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${isActive ? "ring-2 ring-blue-500" : "opacity-80"}`}>
      <div className={`${membership.color} p-4 text-white`}>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{membership.type} Membership</h3>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              membership.status === "Active"
                ? "bg-green-200 text-green-800"
                : membership.status === "Expired"
                  ? "bg-red-200 text-red-800"
                  : "bg-gray-200 text-gray-800"
            }`}
          >
            {membership.status}
          </div>
        </div>
        <p className="mt-1 text-lg font-semibold">{membership.price}</p>
      </div>

      <div className="p-5 bg-white">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <CalendarDays size={16} />
          <span>
            Valid: {membership.startDate} - {membership.expiryDate}
          </span>
        </div>

        <h4 className="font-medium mb-2">Benefits:</h4>
        <ul className="space-y-2">
          {membership.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>

        {isActive && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium">Auto-renewal</span>
            <button
              onClick={() => setAutoRenew(!autoRenew)}
              className="focus:outline-none"
              aria-label={autoRenew ? "Disable auto-renewal" : "Enable auto-renewal"}
            >
              {autoRenew ? (
                <ToggleRight size={24} className="text-blue-500" />
              ) : (
                <ToggleLeft size={24} className="text-gray-400" />
              )}
            </button>
          </div>
        )}

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="font-medium mb-2">Usage Statistics:</h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-50 p-2 rounded text-center">
                <p className="text-lg font-bold">{membership.usage.sessions}</p>
                <p className="text-xs text-gray-500">Sessions</p>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <p className="text-lg font-bold">{membership.usage.downloads}</p>
                <p className="text-xs text-gray-500">Downloads</p>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <p className="text-lg font-bold">{membership.usage.hours}</p>
                <p className="text-xs text-gray-500">Hours</p>
              </div>
            </div>

            {isActive && (
              <>
                <h4 className="font-medium mb-2">Upgrade Options:</h4>
                <div className="space-y-2 mb-4">
                  {availablePlans.map(
                    (plan) =>
                      plan.type !== membership.type && (
                        <button
                          key={plan.id}
                          className="w-full py-2 px-3 text-left rounded border border-gray-200 hover:bg-gray-50 flex justify-between items-center"
                        >
                          <span>Upgrade to {plan.type}</span>
                          <ArrowUpRight size={16} />
                        </button>
                      ),
                  )}
                </div>
              </>
            )}
          </div>
        )}

        <div className="mt-5 flex justify-between">
          {isActive ? (
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors">
              Cancel Membership
            </button>
          ) : (
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors">
              Renew Membership
            </button>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
          >
            {expanded ? "View Less" : "View More"}
            <ChevronDown size={16} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

// // UserProfile Component
// const UserProfile = ({ user }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <div className="flex items-center gap-4">
//         <img
//           src={user.avatar || "/placeholder.svg"}
//           alt={user.name}
//           className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
//         />
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
//           <p className="text-gray-600">{user.email}</p>
//           <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
//             <User size={14} />
//             <span>Member since {user.joinDate}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// MembershipStats Component
const MembershipStats = ({ memberships }) => {
  const activeCount = memberships.filter((m) => m.status === "Active").length
  const expiredCount = memberships.filter((m) => m.status === "Expired").length
  const cancelledCount = memberships.filter((m) => m.status === "Cancelled").length

  const stats = [
    { label: "Active", value: activeCount, icon: <Star className="text-green-500" size={20} /> },
    { label: "Expired", value: expiredCount, icon: <CreditCard className="text-red-500" size={20} /> },
    { label: "Cancelled", value: cancelledCount, icon: <Shield className="text-gray-500" size={20} /> },
    { label: "Total", value: memberships.length, icon: <Gift className="text-blue-500" size={20} /> },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
          <div className="mb-2">{stat.icon}</div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-gray-600 text-sm">{stat.label} Memberships</p>
        </div>
      ))}
    </div>
  )
}

// PaymentHistory Component
const PaymentHistory = ({ payments }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">Payment History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Membership
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.membership}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === "Successful" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// // PaymentMethods Component
// const PaymentMethods = ({ methods, setMethods }) => {
//   const setDefaultMethod = (id) => {
//     const updatedMethods = methods.map((method) => ({
//       ...method,
//       isDefault: method.id === id,
//     }))
//     setMethods(updatedMethods)
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Payment Methods</h2>
//         <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
//           Add New
//         </button>
//       </div>
//       <div className="space-y-4">
//         {methods.map((method) => (
//           <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
//             <div className="flex items-center gap-3">
//               <CreditCard size={24} className={method.type === "Visa" ? "text-blue-600" : "text-red-600"} />
//               <div>
//                 <p className="font-medium">
//                   {method.type} ending in {method.last4}
//                 </p>
//                 <p className="text-sm text-gray-500">Expires {method.expiry}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               {method.isDefault ? (
//                 <span className="text-sm text-green-600 font-medium">Default</span>
//               ) : (
//                 <button
//                   onClick={() => setDefaultMethod(method.id)}
//                   className="text-sm text-blue-600 hover:text-blue-800"
//                 >
//                   Set as default
//                 </button>
//               )}
//               <button className="text-gray-400 hover:text-gray-600">
//                 <RefreshCw size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// // NotificationPreferences Component
// const NotificationPreferences = () => {
//   const [preferences, setPreferences] = useState({
//     renewalReminders: true,
//     expiryAlerts: true,
//     specialOffers: false,
//     newsletterUpdates: true,
//   })

//   const togglePreference = (key) => {
//     setPreferences({
//       ...preferences,
//       [key]: !preferences[key],
//     })
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <div className="flex items-center gap-2 mb-4">
//         <Bell size={20} />
//         <h2 className="text-xl font-bold">Notification Preferences</h2>
//       </div>
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="font-medium">Renewal Reminders</p>
//             <p className="text-sm text-gray-500">Get notified before your membership renews</p>
//           </div>
//           <button onClick={() => togglePreference("renewalReminders")} className="focus:outline-none">
//             {preferences.renewalReminders ? (
//               <ToggleRight size={24} className="text-blue-500" />
//             ) : (
//               <ToggleLeft size={24} className="text-gray-400" />
//             )}
//           </button>
//         </div>
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="font-medium">Expiry Alerts</p>
//             <p className="text-sm text-gray-500">Get notified when your membership is about to expire</p>
//           </div>
//           <button onClick={() => togglePreference("expiryAlerts")} className="focus:outline-none">
//             {preferences.expiryAlerts ? (
//               <ToggleRight size={24} className="text-blue-500" />
//             ) : (
//               <ToggleLeft size={24} className="text-gray-400" />
//             )}
//           </button>
//         </div>
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="font-medium">Special Offers</p>
//             <p className="text-sm text-gray-500">Receive notifications about special deals and promotions</p>
//           </div>
//           <button onClick={() => togglePreference("specialOffers")} className="focus:outline-none">
//             {preferences.specialOffers ? (
//               <ToggleRight size={24} className="text-blue-500" />
//             ) : (
//               <ToggleLeft size={24} className="text-gray-400" />
//             )}
//           </button>
//         </div>
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="font-medium">Newsletter Updates</p>
//             <p className="text-sm text-gray-500">Receive our monthly newsletter</p>
//           </div>
//           <button onClick={() => togglePreference("newsletterUpdates")} className="focus:outline-none">
//             {preferences.newsletterUpdates ? (
//               <ToggleRight size={24} className="text-blue-500" />
//             ) : (
//               <ToggleLeft size={24} className="text-gray-400" />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // MembershipComparison Component
// const MembershipComparison = ({ plans }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden">
//       <div className="p-6 border-b border-gray-200">
//         <h2 className="text-xl font-bold">Membership Comparison</h2>
//         <p className="text-gray-600 mt-1">Compare our membership plans to find the right one for you</p>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 Feature
//               </th>
//               {plans.map((plan) => (
//                 <th
//                   key={plan.id}
//                   scope="col"
//                   className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   <div className="relative">
//                     {plan.isRecommended && (
//                       <div className="absolute -top-3 left-0 right-0 mx-auto w-max px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
//                         Recommended
//                       </div>
//                     )}
//                     {plan.type}
//                     <div className="font-bold text-gray-800 mt-1">{plan.price}</div>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {plans[0].features.map((feature, index) => (
//               <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{feature.name}</td>
//                 {plans.map((plan) => (
//                   <td key={plan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
//                     {plan.features[index].value}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//             <tr>
//               <td className="px-6 py-4"></td>
//               {plans.map((plan) => (
//                 <td key={plan.id} className="px-6 py-4 text-center">
//                   <button
//                     className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                       plan.isRecommended
//                         ? "bg-blue-600 text-white hover:bg-blue-700"
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     {plan.isRecommended ? "Get Started" : "Select Plan"}
//                   </button>
//                 </td>
//               ))}
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// // ReferralProgram Component
// const ReferralProgram = ({ referral }) => {
//   const [copied, setCopied] = useState(false)

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <div className="flex items-center gap-2 mb-4">
//         <Users size={20} />
//         <h2 className="text-xl font-bold">Referral Program</h2>
//       </div>
//       <p className="text-gray-600 mb-6">Invite your friends and earn rewards when they join our membership program.</p>

//       <div className="grid md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-gray-50 p-4 rounded-lg text-center">
//           <p className="text-2xl font-bold text-blue-600">{referral.totalReferred}</p>
//           <p className="text-sm text-gray-500">Friends Referred</p>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg text-center">
//           <p className="text-2xl font-bold text-blue-600">{referral.pendingRewards}</p>
//           <p className="text-sm text-gray-500">Pending Rewards</p>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg text-center">
//           <p className="text-2xl font-bold text-blue-600">{referral.rewardsEarned}</p>
//           <p className="text-sm text-gray-500">Rewards Earned</p>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <div>
//           <p className="font-medium mb-2">Your Referral Code</p>
//           <div className="flex">
//             <div className="bg-gray-100 border border-gray-300 rounded-l-lg px-4 py-2 font-mono flex-grow">
//               {referral.code}
//             </div>
//             <button
//               onClick={() => copyToClipboard(referral.code)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
//             >
//               {copied ? "Copied!" : "Copy"}
//             </button>
//           </div>
//         </div>

//         <div>
//           <p className="font-medium mb-2">Referral Link</p>
//           <div className="flex">
//             <div className="bg-gray-100 border border-gray-300 rounded-l-lg px-4 py-2 text-sm truncate flex-grow">
//               {referral.referralLink}
//             </div>
//             <button
//               onClick={() => copyToClipboard(referral.referralLink)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
//             >
//               {copied ? "Copied!" : "Copy"}
//             </button>
//           </div>
//         </div>

//         <div className="flex gap-2 mt-4">
//           <button className="flex items-center gap-1 px-4 py-2 bg-[#1877F2] text-white rounded-lg font-medium hover:bg-[#166FE5] transition-colors">
//             Share on Facebook
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg font-medium hover:bg-[#1A94DA] transition-colors">
//             Share on Twitter
//           </button>
//           <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
//             Email
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// Main MembershipPage Component
const MyMemberShip = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [activePage, setActivePage] = useState("memberships")
  // const [paymentMethods, setPaymentMethods] = useState(userData.paymentMethods)

  const filteredMemberships =
    activeTab === "all" ? membershipData : membershipData.filter((m) => m.status.toLowerCase() === activeTab)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-5">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Your Memberships</h1>
          <p className="mt-3 text-xl text-gray-500">Manage and view all your membership subscriptions</p>
        </div>

        {/* <UserProfile user={userData} /> */}

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex flex-wrap space-x-8">
            <button
              onClick={() => setActivePage("memberships")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activePage === "memberships"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Memberships
            </button>
            <button
              onClick={() => setActivePage("payments")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activePage === "payments"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Payment History
            </button>
            {/* <button
              onClick={() => setActivePage("payment-methods")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activePage === "payment-methods"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setActivePage("compare")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activePage === "compare"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Compare Plans
            </button>
            <button
              onClick={() => setActivePage("referrals")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activePage === "referrals"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Referrals
            </button>
            <button
              onClick={() => setActivePage("notifications")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activePage === "notifications"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Notifications
            </button> */}
          </nav>
        </div>

        {activePage === "memberships" && (
          <>
            <MembershipStats memberships={membershipData} />

            <div>
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "all"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    All Memberships
                  </button>
                  <button
                    onClick={() => setActiveTab("active")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "active"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setActiveTab("expired")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "expired"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Expired
                  </button>
                  <button
                    onClick={() => setActiveTab("cancelled")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "cancelled"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Cancelled
                  </button>
                </nav>
              </div>

              {filteredMemberships.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No memberships found in this category.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMemberships.map((membership) => (
                    <MembershipCard key={membership.id} membership={membership} />
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Available Memberships</h2>
              <p className="text-gray-600 mb-4">Upgrade your experience with our premium membership options.</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Browse Membership Plans
              </button>
            </div>
          </>
        )}

        {activePage === "payments" && <PaymentHistory payments={paymentHistory} />}

        {activePage === "payment-methods" && <PaymentMethods methods={paymentMethods} setMethods={setPaymentMethods} />}

        {activePage === "compare" && <MembershipComparison plans={availablePlans} />}

        {activePage === "referrals" && <ReferralProgram referral={referralData} />}

        {activePage === "notifications" && <NotificationPreferences />}
      </div>
    </div>
  )
}

export default MyMemberShip

