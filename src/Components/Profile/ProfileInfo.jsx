export default function ProfileInfo({ name, headline, location, education, onEdit, company, bio, linkedin, github }) {
  return (
    <div className="pt-14 sm:pt-16 md:pt-20 px-3 sm:px-5 md:px-8 pb-4 sm:pb-5 md:pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-xl md:text-2xl font-bold">{name || "Your Name"}</h1>
            {/* Verification Badge */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-base sm:text-base md:text-lg text-gray-600 mt-1">{headline || "Your Headline"}</p>
          <p className="mt-2 text-gray-700">{bio || "No bio available"}</p>
          <p className="mt-2 text-gray-600 flex items-center">
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {company || "Company Not Provided"}
          </p>
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location || "Your Location"}</span>
          </div>
        </div>

        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4 w-full xs:w-auto mt-4 sm:mt-0">
          <div className="flex items-center gap-4">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-sm md:text-base"
              >
                <svg role="img" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <title>LinkedIn</title>
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 19h-2.5v-10h2.5v10zm-1.25-11.25c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.25 11.25h-2.5v-5c0-1.1-.9-2-2-2s-2 .9-2 2v5h-2.5v-10h2.5v1.25c.73-.95 1.84-1.25 3-1.25 2.48 0 4.5 2.02 4.5 4.5v5.5z"/>
                </svg>
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-sm md:text-base"
              >
                <svg role="img" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <title>GitHub</title>
                  <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.4.7-4.2-1.5-4.2-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 2.6.8 3.6.6.1-.8.4-1.4.7-1.7-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.9 1.2 2 1.2 3.2 0 4.5-2.8 5.4-5.5 5.7.4.4.8 1 .8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 0z"/>
                </svg>

              </a>
            )}
          </div>

          <button
            onClick={onEdit}
            className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center"
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
      </div>
    </div>
  )
}