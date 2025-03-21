import { useState } from "react"
import { X } from "lucide-react"

const FilterPanel = ({ isOpen, onClose, onApplyFilters, filters, setFilters }) => {
  const [easyApply, setEasyApply] = useState(filters.easyApply || false)
  const [datePosted, setDatePosted] = useState(filters.datePosted || "anytime")
  const [experienceLevel, setExperienceLevel] = useState(filters.experienceLevel || "All Levels")
  const [jobType, setJobType] = useState(filters.jobType || "All Types")
  const [workType, setWorkType] = useState(filters.workType || "All Types")
  const [isVerified, setIsVerified] = useState(filters.isVerified || false)
  const [companySize, setCompanySize] = useState(filters.companySize || "All Sizes")
  const [selectedLocations, setSelectedLocations] = useState(filters.selectedLocations || [])
  const [locationInput, setLocationInput] = useState("")

  // Available locations for multiple selection
  const availableLocations = [
    "New York",
    "San Francisco",
    "Chicago",
    "Austin",
    "Seattle",
    "Boston",
    "Los Angeles",
    "Denver",
    "Miami",
    "Atlanta",
  ]

  const handleApplyFilters = () => {
    const updatedFilters = {
      ...filters,
      easyApply,
      datePosted,
      experienceLevel,
      jobType,
      workType,
      isVerified,
      companySize,
      selectedLocations,
    }

    setFilters(updatedFilters)
    onApplyFilters(updatedFilters)
    onClose()
  }

  const handleLocationSelect = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== location))
    } else {
      setSelectedLocations([...selectedLocations, location])
    }
  }

  const addCustomLocation = () => {
    if (locationInput && !selectedLocations.includes(locationInput)) {
      setSelectedLocations([...selectedLocations, locationInput])
      setLocationInput("")
    }
  }

  return (
    <>
      {/* Sidebar Filter Panel */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 border-r border-gray-700 overflow-y-auto transition-transform duration-300 ease-in-out z-40 w-64 md:w-72 mt-16 pb-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-300 hover:text-white transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Filters</h2>

          {/* Location (Priority 1) */}
          <div className="mb-4">
            {/* <h3 className="text-sm font-semibold text-gray-200 py-2 border-b border-gray-700">Location</h3> */}
            <div className="mt-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedLocations.map((location) => (
                  <span
                    key={location}
                    className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full flex items-center"
                  >
                    {location}
                    <button
                      onClick={() => handleLocationSelect(location)}
                      className="ml-1 text-white hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Add location"
                  className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-l-md text-gray-200 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 w-full text-sm placeholder-gray-500"
                />
                <button
                  onClick={addCustomLocation}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-2 rounded-r-md"
                >
                  +
                </button>
              </div>
              <div className="mt-2 max-h-32 overflow-y-auto">
                {availableLocations.map((location) => (
                  <div key={location} className="flex items-center mt-1">
                    <input
                      type="checkbox"
                      id={`loc-${location}`}
                      checked={selectedLocations.includes(location)}
                      onChange={() => handleLocationSelect(location)}
                      className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 rounded bg-gray-800"
                    />
                    <label htmlFor={`loc-${location}`} className="ml-2 block text-sm text-gray-300">
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Date Posted (Priority 2) */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-200 py-2 border-b border-gray-700">Date Posted</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="anytime"
                  name="datePosted"
                  value="anytime"
                  checked={datePosted === "anytime"}
                  onChange={(e) => setDatePosted(e.target.value)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 bg-gray-800"
                />
                <label htmlFor="anytime" className="ml-2 block text-sm text-gray-300">
                  Anytime
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="pastWeek"
                  name="datePosted"
                  value="past week"
                  checked={datePosted === "past week"}
                  onChange={(e) => setDatePosted(e.target.value)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 bg-gray-800"
                />
                <label htmlFor="pastWeek" className="ml-2 block text-sm text-gray-300">
                  Past Week
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="past24Hours"
                  name="datePosted"
                  value="past 24 hours"
                  checked={datePosted === "past 24 hours"}
                  onChange={(e) => setDatePosted(e.target.value)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 bg-gray-800"
                />
                <label htmlFor="past24Hours" className="ml-2 block text-sm text-gray-300">
                  Past 24 Hours
                </label>
              </div>
            </div>
          </div>

          {/* Job Type (Priority 3) */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-200 py-2 border-b border-gray-700">Job Type</h3>
            <div className="mt-2">
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-200 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 w-full text-sm"
              >
                <option>All Types</option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Freelance</option>
              </select>
            </div>
          </div>

          {/* Experience Type (Priority 4) */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-200 py-2 border-b border-gray-700">Experience Level</h3>
            <div className="mt-2">
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-200 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 w-full text-sm"
              >
                <option>All Levels</option>
                <option>Entry Level</option>
                <option>Mid Level</option>
                <option>Senior Level</option>
                <option>Executive</option>
              </select>
            </div>
          </div>

          {/* Work Type (Priority 5) - Renamed from Location */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-200 py-2 border-b border-gray-700">Work Type</h3>
            <div className="mt-2">
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-200 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 w-full text-sm"
              >
                <option>All Types</option>
                <option>Remote</option>
                <option>On-Site</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>

          {/* Easy Apply (Priority 6) - Changed to checkbox */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-200 py-2 border-b border-gray-700">Easy Apply</h3>
            <div className="mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="easyApply"
                  checked={easyApply}
                  onChange={(e) => setEasyApply(e.target.checked)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 rounded bg-gray-800"
                />
                <label htmlFor="easyApply" className="ml-2 block text-sm text-gray-300">
                  Easy Apply
                </label>
              </div>
            </div>
          </div>

          {/* Nearby Location (Priority 7) - Changed to checkbox */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-200 py-2 border-b border-gray-700">Nearby Location</h3>
            <div className="mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="nearbyLocation"
                  checked={filters.nearbyLocation}
                  onChange={(e) => setFilters({ ...filters, nearbyLocation: e.target.checked })}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 rounded bg-gray-800"
                />
                <label htmlFor="nearbyLocation" className="ml-2 block text-sm text-gray-300">
                  Show Nearby Jobs
                </label>
              </div>
            </div>
          </div>

          {/* Is Verified (Priority 8) */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-200 py-2 border-b border-gray-700">Is Verified</h3>
            <div className="mt-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVerified"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 rounded bg-gray-800"
                />
                <label htmlFor="isVerified" className="ml-2 block text-sm text-gray-300">
                  Verified Companies Only
                </label>
              </div>
            </div>
          </div>

          {/* Company Size (Priority 9) */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-200 py-2 border-b border-gray-700">Company Size</h3>
            <div className="mt-2">
              <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-200 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500 w-full text-sm"
              >
                <option>All Sizes</option>
                <option>1-10 Employees</option>
                <option>11-50 Employees</option>
                <option>51-200 Employees</option>
                <option>201-1000 Employees</option>
                <option>1000+ Employees</option>
              </select>
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={handleApplyFilters}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md shadow-md transition w-full mt-4"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}

export default FilterPanel

