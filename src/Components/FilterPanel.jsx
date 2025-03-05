import React from "react"
import { X } from "lucide-react"

const FilterPanel = ({ isOpen, onClose, onApplyFilters, filters, setFilters }) => {
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"]
  const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Executive"]
  const salaryRanges = ["Any", "0-30,000", "30,000-60,000", "60,000-90,000", "90,000+"]
  const commonSkills = ["JavaScript", "React", "Node.js", "Python", "Java", "SQL", "AWS", "DevOps"]

  const handleJobTypeChange = (type) => {
    if (filters.jobType.includes(type)) {
      setFilters({
        ...filters,
        jobType: filters.jobType.filter((t) => t !== type),
      })
    } else {
      setFilters({
        ...filters,
        jobType: [...filters.jobType, type],
      })
    }
  }

  const handleExperienceChange = (level) => {
    if (filters.experienceLevel.includes(level)) {
      setFilters({
        ...filters,
        experienceLevel: filters.experienceLevel.filter((l) => l !== level),
      })
    } else {
      setFilters({
        ...filters,
        experienceLevel: [...filters.experienceLevel, level],
      })
    }
  }

  const handleSkillChange = (skill) => {
    if (filters.skills.includes(skill)) {
      setFilters({
        ...filters,
        skills: filters.skills.filter((s) => s !== skill),
      })
    } else {
      setFilters({
        ...filters,
        skills: [...filters.skills, skill],
      })
    }
  }

  const handleSalaryChange = (range) => {
    setFilters({
      ...filters,
      salaryRange: range,
    })
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleClearAll = () => {
    setFilters({
      jobType: [],
      experienceLevel: [],
      salaryRange: "Any",
      skills: [],
    })
  }

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-all duration-300 overflow-y-auto ${
        isOpen ? "w-80" : "w-0"
      }`}
    >
      {isOpen && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filter Jobs</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          {/* Job Type Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Job Type</h3>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`job-type-${type}`}
                    checked={filters.jobType.includes(type)}
                    onChange={() => handleJobTypeChange(type)}
                    className="mr-2"
                  />
                  <label htmlFor={`job-type-${type}`}>{type}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Level Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Experience Level</h3>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`exp-${level}`}
                    checked={filters.experienceLevel.includes(level)}
                    onChange={() => handleExperienceChange(level)}
                    className="mr-2"
                  />
                  <label htmlFor={`exp-${level}`}>{level}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Range Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Salary Range</h3>
            <div className="space-y-2">
              {salaryRanges.map((range) => (
                <div key={range} className="flex items-center">
                  <input
                    type="radio"
                    id={`salary-${range}`}
                    name="salary"
                    checked={filters.salaryRange === range}
                    onChange={() => handleSalaryChange(range)}
                    className="mr-2"
                  />
                  <label htmlFor={`salary-${range}`}>{range}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="space-y-2">
              {commonSkills.map((skill) => (
                <div key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`skill-${skill}`}
                    checked={filters.skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                    className="mr-2"
                  />
                  <label htmlFor={`skill-${skill}`}>{skill}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            <button
              onClick={handleClearAll}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
            >
              Clear All
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterPanel

