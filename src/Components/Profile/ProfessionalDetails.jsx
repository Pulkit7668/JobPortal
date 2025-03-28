export default function ProfessionalDetails({
  experience,
  education,
  skills,
  topSkills,
  workSamples,
  industry = "",
  department = "",
  currentRole = "",
  onEditExperience,
  onEditEducation,
  onEditSkills,
  onEditWorkSamples,
  onEditProfessionalInfo,
}) {
  return (
    <div>
      {/* Professional Info Section */}
      <div id="professionalDetails" className="mb-8 scroll-mt-16">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-2">
          <h2 className="text-xl font-semibold mb-0 sm:mb-0">Professional Details</h2>
          <button
            onClick={onEditProfessionalInfo}
            className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg mb-6">
          <div>
            <p className="text-sm text-gray-500">Industry</p>
            <p className="font-medium">{industry || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium">{department || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Role</p>
            <p className="font-medium">{currentRole || "Not specified"}</p>
          </div>
        </div>
      </div>

      <div id="experience" className="mb-8 scroll-mt-16">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-2">
          <h3 className="text-lg font-semibold mb-0 sm:mb-0">Experience</h3>
          <button
            onClick={onEditExperience}
            className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experience.map((exp, index) => (
            <div key={index} className="mb-4 last:mb-0 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium">{exp.role}</h4>
              <p className="text-gray-600">
                {exp.company} • {exp.duration}
              </p>
              <p className="mt-1 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="education" className="mb-8 scroll-mt-16">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-2">
          <h3 className="text-lg font-semibold mb-0 sm:mb-0">Education</h3>
          <button
            onClick={onEditEducation}
            className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((edu, index) => (
            <div key={index} className="mb-4 last:mb-0 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">{edu.institution}</h4>
              <h4 className="font-medium mb-2">{edu.degree}</h4>
              <p className="text-gray-600">
                {edu.institution} • {edu.year}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div id="skills" className="mb-8 scroll-mt-16">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-2">
          <h3 className="text-lg font-semibold mb-0 sm:mb-0">Skills</h3>
          <button
            onClick={onEditSkills}
            className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Top Skills</h4>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">All Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="projects" className="mb-8 scroll-mt-16">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 gap-2">
          <h3 className="text-lg font-semibold mb-0 sm:mb-0">Projects & Work Samples</h3>
          <button
            onClick={onEditWorkSamples}
            className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workSamples.map((sample, index) => (
            <div key={index} className="mb-4 last:mb-0 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium">{sample.title}</h4>
              <p className="mt-1 text-sm">{sample.description}</p>
              {sample.projectLink && (
                <a
                  href={sample.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-1 text-sm"
                >
                  {sample.projectLink}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

