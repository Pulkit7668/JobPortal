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
      topSkills: topSkills.filter((skill) => skill),
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

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">GitHub</label>
              <input
                type="text"
                name="github"
                value={formData.github || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        )

      case "resume":
        return (
          <div>
            <h3 className="font-bold mb-4">Basic Details</h3>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.basicInfo?.experience || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basicInfo: {
                      ...formData.basicInfo,
                      experience: e.target.value,
                    },
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.basicInfo?.city || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basicInfo: {
                      ...formData.basicInfo,
                      city: e.target.value,
                    },
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.basicInfo?.state || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basicInfo: {
                      ...formData.basicInfo,
                      state: e.target.value,
                    },
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.basicInfo?.email || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      basicInfo: {
                        ...formData.basicInfo,
                        email: e.target.value,
                      },
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailVerified"
                    checked={formData.basicInfo?.isEmailVerified || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        basicInfo: {
                          ...formData.basicInfo,
                          isEmailVerified: e.target.checked,
                        },
                      })
                    }
                    className="mr-2"
                  />
                  <label htmlFor="emailVerified" className="text-sm whitespace-nowrap">
                    Verified
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.basicInfo?.phoneNumber || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basicInfo: {
                      ...formData.basicInfo,
                      phoneNumber: e.target.value,
                    },
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.basicInfo?.description || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basicInfo: {
                      ...formData.basicInfo,
                      description: e.target.value,
                    },
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
              ></textarea>
            </div>
          </div>
        )

      case "professionalInfo":
        return (
          <div>
            <h3 className="font-bold mb-4">Professional Information</h3>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Current Role</label>
              <input
                type="text"
                name="currentRole"
                value={formData.currentRole || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        )

      case "experience":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 gap-4">
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
        
                  {/* Optional Project Link */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Project Link (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://your-project-link.com"
                      value={sample.projectLink || ""}
                      onChange={(e) => handleWorkSampleChange(index, "projectLink", e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
            ))}
          </div>
        );
        

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 w-full max-w-xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit {section.charAt(0).toUpperCase() + section.slice(1)}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSave(section, formData)
          }}
        >
          {renderForm()}

          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded order-1 sm:order-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

