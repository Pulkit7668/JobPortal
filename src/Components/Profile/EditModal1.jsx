import { useState } from "react"

export default function EditModal({ section, data, onSave, onCancel }) {
  const [formData, setFormData] = useState(data || {})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleExperienceChange = (index, field, value) => {
    if (!formData.experience) return
    const updatedExperience = [...formData.experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    }

    setFormData({
      ...formData,
      experience: updatedExperience,
    })
  }

  const handleEducationChange = (index, field, value) => {
    if (!formData.education) return
    const updatedEducation = [...formData.education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }

    setFormData({
      ...formData,
      education: updatedEducation,
    })
  }

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim())
    setFormData({
      ...formData,
      skills: skills.filter((skill) => skill), // Remove empty strings
    })
  }

  const handleTopSkillsChange = (e) => {
    const topSkills = e.target.value.split(",").map((skill) => skill.trim())
    setFormData({
      ...formData,
      topSkills: topSkills.filter((skill) => skill), // Remove empty strings
    })
  }

  const handleWorkSampleChange = (index, field, value) => {
    if (!formData.workSamples) return
    const updatedWorkSamples = [...formData.workSamples]
    updatedWorkSamples[index] = {
      ...updatedWorkSamples[index],
      [field]: value,
    }

    setFormData({
      ...formData,
      workSamples: updatedWorkSamples,
    })
  }

  const renderForm = () => {
    switch (section) {
      case "cover":
        return (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Cover Image URL</label>
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        )

      case "profile":
        return (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Headline</label>
              <input
                type="text"
                name="headline"
                value={formData.headline || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              ></textarea>
            </div>
          </div>
        )

      case "resume":
        return (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Basic Info</label>
              <textarea
                name="basicInfo"
                value={formData.basicInfo || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              ></textarea>
            </div>
          </div>
        )

      case "experience":
        return (
          <div>
            {formData.experience &&
              formData.experience.map((exp, index) => (
                <div key={index} className="mb-6 p-4 border rounded">
                  <h3 className="font-bold mb-2">Experience {index + 1}</h3>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                    <input
                      type="text"
                      value={exp.role || ""}
                      onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
                    <input
                      type="text"
                      value={exp.company || ""}
                      onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
                    <input
                      type="text"
                      value={exp.duration || ""}
                      onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                      value={exp.description || ""}
                      onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              ))}
          </div>
        )

      case "education":
        return (
          <div>
            {formData.education &&
              formData.education.map((edu, index) => (
                <div key={index} className="mb-6 p-4 border rounded">
                  <h3 className="font-bold mb-2">Education {index + 1}</h3>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Institution</label>
                    <input
                      type="text"
                      value={edu.institution || ""}
                      onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Degree</label>
                    <input
                      type="text"
                      value={edu.degree || ""}
                      onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                    <input
                      type="text"
                      value={edu.year || ""}
                      onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
              ))}
          </div>
        )

      case "skills":
        return (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Skills (comma separated)</label>
              <textarea
                value={formData.skills ? formData.skills.join(", ") : ""}
                onChange={handleSkillsChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Top Skills (comma separated, max 5-6)
              </label>
              <textarea
                value={formData.topSkills ? formData.topSkills.join(", ") : ""}
                onChange={handleTopSkillsChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="2"
              ></textarea>
            </div>
          </div>
        )

      case "workSamples":
        return (
          <div>
            {formData.workSamples &&
              formData.workSamples.map((sample, index) => (
                <div key={index} className="mb-6 p-4 border rounded">
                  <h3 className="font-bold mb-2">Work Sample {index + 1}</h3>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                      type="text"
                      value={sample.title || ""}
                      onChange={(e) => handleWorkSampleChange(index, "title", e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                      value={sample.description || ""}
                      onChange={(e) => handleWorkSampleChange(index, "description", e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit {section.charAt(0).toUpperCase() + section.slice(1)}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave(section, formData)
          }}
        >
          {renderForm()}

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

