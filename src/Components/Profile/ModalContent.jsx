import React, { useState } from 'react';
import { FaTimes } from "react-icons/fa";
import { toast } from 'react-hot-toast';

const startYears = Array.from({ length: 11 }, (_, i) => 2015 + i);
const endYears = Array.from({ length: 15 }, (_, i) => 2015 + i);

export const renderModalContent = (
    editingSection,
    careerPreferences,
    education,
    keySkills,
    languagesKnown,
    handleCareerPreferencesChange,
    handleEducationChange,
    handleJobTypeClick,
    handleRemoveJobType,
    handleAvailabilityClick,
    handleRemoveAvailability,
    handleEducationFieldChange,
    handleKeySkillsChange,
    handleAddSkill,
    handleRemoveSkill,
    handleAddLanguage,
    handleRemoveLanguage
) => {
    switch (editingSection) {
        case "Career Preferences":
            return (
                <>
                    <div>
                        <label className="font-medium">Preferred Job Type</label>
                        <div className="flex gap-4 mt-2">
                            {careerPreferences.jobType === "" ? (
                                <>
                                    <button
                                        onClick={() => handleJobTypeClick("Internships")}
                                        className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                    >
                                        Internships
                                    </button>
                                    <button
                                        onClick={() => handleJobTypeClick("Jobs")}
                                        className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                    >
                                        Jobs
                                    </button>
                                </>
                            ) : (
                                <div className="px-4 py-2 border-2 rounded-3xl bg-gray-200 text-gray-600 flex items-center gap-2">
                                    {careerPreferences.jobType}
                                    <FaTimes
                                        className="text-red-500 cursor-pointer"
                                        onClick={handleRemoveJobType}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="font-medium">Availability to Work</label>
                        <div className="flex gap-4 mt-2">
                            {careerPreferences.availability === "" ? (
                                ["15 Days or less", "1 Month", "2 Months", "3 Months", "More than 3 Months"].map((duration) => (
                                    <button
                                        key={duration}
                                        onClick={() => handleAvailabilityClick(duration)}
                                        className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                    >
                                        {duration}
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-2 border-2 rounded-3xl bg-gray-200 text-gray-600 flex items-center gap-2">
                                    {careerPreferences.availability}
                                    <FaTimes
                                        className="text-red-500 cursor-pointer"
                                        onClick={handleRemoveAvailability}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="font-medium">Preferred Location</label>
                        <input name="preferredLocation" value={careerPreferences.preferredLocation} onChange={handleCareerPreferencesChange} className="w-full p-2 border rounded-2xl" />
                    </div>
                </>
            );
        case "Education":
            return (
                <>
                    <div>
                        <label className="font-medium">Qualification/Degree</label>
                        <div className="flex gap-4 mt-2">
                            {education.qualification === "" ? (
                                <>
                                    <button
                                        onClick={() => handleEducationChange("Graduate/Diploma")}
                                        className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                    >
                                        Graduate/Diploma
                                    </button>
                                    <button
                                        onClick={() => handleEducationChange("Post Graduate")}
                                        className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                    >
                                        Post Graduate
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (education.postGraduate) {
                                                handleEducationChange("Doctorate");
                                            } else {
                                                toast.error("Please fill the Post Graduate section first.");
                                            }
                                        }}
                                        className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                    >
                                        Doctorate
                                    </button>
                                </>
                            ) : (
                                <div className="px-4 py-2 border-2 rounded-3xl bg-gray-200 text-gray-600 flex items-center gap-2">
                                    {education.qualification}
                                    <FaTimes
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => handleEducationChange("")}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {education.qualification && (
                        <>
                            <div>
                                <label className="font-medium">Course Name</label>
                                <input name="courseName" value={education.courseName || ""} onChange={handleEducationFieldChange} className="w-full p-2 border rounded-2xl" />
                            </div>
                            <div>
                                <label className="font-medium">College Name</label>
                                <input name="collegeName" value={education.collegeName || ""} onChange={handleEducationFieldChange} className="w-full p-2 border rounded-2xl" />
                            </div>
                            <div>
                                <label className="font-medium">Grading System</label>
                                <div className="flex gap-4 mt-2">
                                    {education.gradingSystem === "" ? (
                                        <>
                                            <button
                                                onClick={() => handleEducationFieldChange({ target: { name: "gradingSystem", value: "GPA out of 10" } })}
                                                className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                            >
                                                GPA out of 10
                                            </button>
                                            <button
                                                onClick={() => handleEducationFieldChange({ target: { name: "gradingSystem", value: "GPA out of 4" } })}
                                                className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                            >
                                                GPA out of 4
                                            </button>
                                            <button
                                                onClick={() => handleEducationFieldChange({ target: { name: "gradingSystem", value: "Percentage" } })}
                                                className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                            >
                                                Percentage
                                            </button>
                                            <button
                                                onClick={() => handleEducationFieldChange({ target: { name: "gradingSystem", value: "Course requires a pass" } })}
                                                className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                            >
                                                Course requires a pass
                                            </button>
                                        </>
                                    ) : (
                                        <div className="px-4 py-2 border-2 rounded-3xl bg-gray-200 text-gray-600 flex items-center gap-2">
                                            {education.gradingSystem}
                                            <FaTimes
                                                className="text-red-500 cursor-pointer"
                                                onClick={() => handleEducationFieldChange({ target: { name: "gradingSystem", value: "" } })}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="font-medium">Course Duration</label>
                                <div className="flex gap-4">
                                    <select name="courseStartYear" value={education.courseStartYear || ""} onChange={handleEducationFieldChange} className="w-full p-2 border rounded-2xl min-h-[1.5rem]">
                                        <option value="">Start Year</option>
                                        {startYears.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                    <span className="self-center">to</span>
                                    <select name="courseEndYear" value={education.courseEndYear || ""} onChange={handleEducationFieldChange} className="w-full p-2 border rounded-2xl min-h-[1.5rem]">
                                        <option value="">End Year</option>
                                        {endYears.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="font-medium">Course Type</label>
                                <div className="flex gap-4 mt-2">
                                    {education.courseType === "" ? (
                                        <>
                                            <button
                                                onClick={() => handleEducationFieldChange({ target: { name: "courseType", value: "Full Time" } })}
                                                className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                            >
                                                Full Time
                                            </button>
                                            <button
                                                onClick={() => handleEducationFieldChange({ target: { name: "courseType", value: "Part Time" } })}
                                                className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                            >
                                                Part Time
                                            </button>
                                            <button
                                                onClick={() => handleEducationFieldChange({ target: { name: "courseType", value: "Correspondence" } })}
                                                className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                            >
                                                Correspondence
                                            </button>
                                        </>
                                    ) : (
                                        <div className="px-4 py-2 border-2 rounded-3xl bg-gray-200 text-gray-600 flex items-center gap-2">
                                            {education.courseType}
                                            <FaTimes
                                                className="text-red-500 cursor-pointer"
                                                onClick={() => handleEducationFieldChange({ target: { name: "courseType", value: "" } })}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </>
            );
        case "Key Skills":
            return (
                <>
                    <div>
                        <p className="text-gray-600 mb-5">Recruiters look for candidates with specific key skills. Add them here to appear in searches.</p>
                        <input
                            type="text"
                            placeholder="Enter your key skills"
                            value={keySkills.input}
                            onChange={handleKeySkillsChange}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e)}
                            className="w-full p-2 border rounded-2xl"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {keySkills.skills.map((skill, index) => (
                                <div key={index} className="px-4 py-2 border-2 rounded-3xl bg-gray-200 text-gray-600 flex items-center gap-2">
                                    {skill}
                                    <FaTimes
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => handleRemoveSkill(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            );
            case "Languages":
                return (
                    <>
                        <div>
                            <p className="text-gray-600 mb-5">Recruiters look for candidates who can communicate in multiple languages. Add them here to appear in searches.</p>
                            <div className="flex gap-2">
                                {!languagesKnown.languages.includes("Hindi") && !languagesKnown.languages.includes("English") && (
                                    <>
                                        <button
                                            onClick={() => handleAddLanguage({ target: { value: "Hindi" } })}
                                            className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                        >
                                            Hindi
                                        </button>
                                        <button
                                            onClick={() => handleAddLanguage({ target: { value: "English" } })}
                                            className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                                        >
                                            English
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {languagesKnown.languages.map((language, index) => (
                                    <div key={index} className="px-4 py-2 border-2 rounded-3xl bg-gray-200 text-gray-600 flex items-center gap-2">
                                        {language}
                                        <FaTimes
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => handleRemoveLanguage(index)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                );
        default:
            return null;
    }
};