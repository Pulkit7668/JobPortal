import { useState, useRef } from "react"

export default function ResumeUpload({ currentResume, onUpload }) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState(currentResume?.name || "")
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileUpload(file)
  }

  const handleFileUpload = (file) => {
    if (!file) return

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/rtf",
    ]

    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid document (PDF, DOC, DOCX, or RTF)")
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB")
      return
    }

    setFileName(file.name)
    onUpload(file)
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Resume</h2>
      <p className="text-gray-600 mb-4">
        Your resume is the first impression you make on potential employers. Craft it carefully to secure your desired
        job or internship.
      </p>

      <div
        className={`border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {fileName ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
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
              <span className="break-all">{fileName}</span>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Upload a different file
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Upload resume
            </button>
            <p className="text-gray-500 text-xs sm:text-sm">Supported formats: doc, docx, rtf, pdf, up to 2MB</p>
            <p className="text-gray-400 text-xs sm:text-sm">or drag and drop your file here</p>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf,.doc,.docx,.rtf"
        onChange={(e) => handleFileUpload(e.target.files[0])}
      />
    </div>
  )
}

