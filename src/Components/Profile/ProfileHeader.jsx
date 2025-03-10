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
      <div className="relative h-48 bg-gray-200 group">
        <img
          src={coverImage || "/placeholder.svg?height=320&width=1200"}
          alt="Cover"
          className="w-full h-full object-cover"
        />

        <button
          onClick={() => setShowCoverUpload(true)}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
          Enhance cover image
        </button>
      </div>

      {/* Profile Section */}
      <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
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
              className="h-8 w-8 text-white"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Update cover image</h3>
            <p className="text-gray-600 mb-4">Recommended dimensions: 1584x396 pixels</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCoverUpload(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => coverInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {showProfileUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Update profile photo</h3>
            <p className="text-gray-600 mb-4">Recommended dimensions: 400x400 pixels</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowProfileUpload(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => profileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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