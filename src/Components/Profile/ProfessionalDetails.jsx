export default function ProfessionalDetails({
  experience,
  education,
  skills,
  topSkills,
  workSamples,
  onEditExperience,
  onEditEducation,
  onEditSkills,
  onEditWorkSamples,
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Professional Details</h2>

      <div id="experience" className="mb-8 scroll-mt-16">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Experience</h3>
          <button onClick={onEditExperience} className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
        {experience.map((exp, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <h4 className="font-medium">{exp.role}</h4>
            <p className="text-gray-600">
              {exp.company} • {exp.duration}
            </p>
            <p className="mt-1 text-sm">{exp.description}</p>
          </div>
        ))}
      </div>

      <div id="education" className="mb-8 scroll-mt-16">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Education</h3>
          <button onClick={onEditEducation} className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
        {education.map((edu, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <h4 className="font-medium">{edu.degree}</h4>
            <p className="text-gray-600">
              {edu.institution} • {edu.year}
            </p>
          </div>
        ))}
      </div>

      <div id="skills" className="mb-8 scroll-mt-16">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Skills & Keywords</h3>
          <button onClick={onEditSkills} className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
        <div className="mb-4">
          <h4 className="font-medium mb-2">Top Skills</h4>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
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

      <div id="projects" className="mb-8 scroll-mt-16">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Projects & Work Samples</h3>
          <button onClick={onEditWorkSamples} className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-50 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
        </div>
        {workSamples.map((sample, index) => (
          <div key={index} className="mb-4 last:mb-0">
            <h4 className="font-medium">{sample.title}</h4>
            <p className="mt-1 text-sm">{sample.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

