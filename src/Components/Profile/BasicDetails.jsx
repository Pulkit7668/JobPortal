export default function BasicDetails({ basicInfo, onEdit }) {
  const {
    experience = "",
    city = "",
    state = "",
    email = "",
    isEmailVerified = false,
    phoneNumber = "",
    description = "",
  } = typeof basicInfo === "object" ? basicInfo : { description: basicInfo }

  return (
    <div className="relative">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-2">
        <h2 className="text-xl font-bold">Basic Details</h2>
        <button
          onClick={onEdit}
          className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Edit
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4 flex justify-center md:justify-start">
            <div className="bg-gray-200 h-32 w-24 rounded flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <h3 className="font-semibold text-lg mb-2">Basic Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="text-gray-700">{experience || "Not specified"}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-700">
                  {city && state ? `${city}, ${state}` : city || state || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <div className="flex items-center">
                  <p className="text-gray-700 mr-2 break-all">{email || "Not specified"}</p>
                  {email && isEmailVerified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                      Verified
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-gray-700">{phoneNumber || "Not specified"}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">About</p>
              <p className="text-gray-700">{description || "No description provided"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

