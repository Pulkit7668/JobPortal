import { useState, useRef } from "react"

export default function ProfileHeader({ coverImage, profileImage, name, headline, location, onUpdateImages }) {
  const [showCoverUpload, setShowCoverUpload] = useState(false)
  const [showProfileUpload, setShowProfileUpload] = useState(false)
  const coverInputRef = useRef(null)
  const profileInputRef = useRef(null)

  const handleImageUpload = async (event, type) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"]
    if (!validTypes.includes(file.type)) {
      alert("Please upload an image file (JPEG, PNG, or GIF)")
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB")
      return
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)

    // Update images
    onUpdateImages(type, previewUrl, file)

    // Reset upload states
    setShowCoverUpload(false)
    setShowProfileUpload(false)
  }

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-32 sm:h-40 md:h-48 bg-gray-200 group">
        <img
          src={coverImage || "/placeholder.svg?height=320&width=1200"}
          alt="Cover"
          className="w-full h-full object-cover"
        />

        <button
          onClick={() => setShowCoverUpload(true)}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-white/90 hover:bg-white text-gray-800 px-2 py-1 sm:px-3 md:px-4 sm:py-1.5 md:py-2 rounded-full shadow-md transition-all opacity-70 sm:opacity-60 md:opacity-0 group-hover:opacity-100 flex items-center gap-1 sm:gap-1.5 md:gap-2 text-xs sm:text-sm md:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="hidden sm:inline md:hidden">Edit</span>
          <span className="hidden md:inline">Enhance cover image</span>
          <span className="inline sm:hidden">Edit</span>
        </button>
      </div>

      {/* Profile Section */}
      <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-4 sm:ml-6 md:ml-8">
        <div className="relative group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
            <img
              src={profileImage || "/placeholder.svg?height=128&width=128"}
              alt={name || "Profile"}
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={() => setShowProfileUpload(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={coverInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, "cover")}
      />
      <input
        type="file"
        ref={profileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, "profile")}
      />

      {/* Upload Modals */}
      {showCoverUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Update cover image</h3>
            <p className="text-gray-600 mb-4">Recommended dimensions: 1584x396 pixels</p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowCoverUpload(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={() => coverInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 order-1 sm:order-2"
              >
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {showProfileUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Update profile photo</h3>
            <p className="text-gray-600 mb-4">Recommended dimensions: 400x400 pixels</p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowProfileUpload(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={() => profileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 order-1 sm:order-2"
              >
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


