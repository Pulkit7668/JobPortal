import React, { useState } from 'react';
import { FaEdit, FaTimes } from "react-icons/fa";
import { sections } from './sections';
import EditModal from './Editmodal';
import { renderModalContent } from './ModalContent';
import { toast, Toaster } from 'react-hot-toast';

const startYears = Array.from({ length: 11 }, (_, i) => 2015 + i);
const endYears = Array.from({ length: 15 }, (_, i) => 2015 + i);

function QuickLinks() {
    const [editingSection, setEditingSection] = useState(null);
    const [careerPreferences, setCareerPreferences] = useState({    
        jobType: "",
        availability: "",
        preferredLocation: "",
    });
    const [education, setEducation] = useState({
        qualification: "",
        courseName: "",
        collegeName: "",
        gradingSystem: "",
        courseStartYear: "",
        courseEndYear: "",
        courseType: "",
        postGraduate: false,
    });
    const [keySkills, setKeySkills] = useState({
        input: "",
        skills: [],
    });
    const [languagesKnown, setLanguagesKnown] = useState({
        input: "",
        languages: [],
    });
    const [internship, setInternship] = useState({
        companyName: "",
        internshipStartMonth: "",
        internshipStartYear: "",
        internshipEndMonth: "",
        internshipEndYear: "",
        projectName: "",
        internshipDescription: "",
        internshipKeySkills: "",
        projectUrl: ""
    });
    const [project, setProject] = useState({
        projectName: "",
        projectStartMonth: "",
        projectStartYear: "",
        projectEndMonth: "",
        projectEndYear: "",
        projectDescription: "",
        projectKeySkills: "",
        projectUrl: ""
    });
    const [profileSummary, setProfileSummary] = useState("");

    const handleCareerPreferencesChange = (e) => {
        setCareerPreferences({ ...careerPreferences, [e.target.name]: e.target.value });
    };

    const handleEducationChange = (qualification) => {
        setEducation({ ...education, qualification, postGraduate: qualification === "Post Graduate" });
    };

    const handleEducationFieldChange = (e) => {
        setEducation({ ...education, [e.target.name]: e.target.value });
    };

    const handleJobTypeClick = (jobType) => {
        setCareerPreferences({ ...careerPreferences, jobType });
    };

    const handleRemoveJobType = () => {
        setCareerPreferences({ ...careerPreferences, jobType: "" });
    };

    const handleAvailabilityClick = (availability) => {
        setCareerPreferences({ ...careerPreferences, availability });
    };

    const handleRemoveAvailability = () => {
        setCareerPreferences({ ...careerPreferences, availability: "" });
    };

    const handleKeySkillsChange = (e) => {
        setKeySkills({ ...keySkills, input: e.target.value });
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (keySkills.input.trim() && !keySkills.skills.includes(keySkills.input.trim())) {
            setKeySkills({
                input: "",
                skills: [...keySkills.skills, keySkills.input.trim()],
            });
        }
    };

    const handleRemoveSkill = (index) => {
        const newSkills = keySkills.skills.filter((_, i) => i !== index);
        setKeySkills({ ...keySkills, skills: newSkills });
    };

    const handleAddLanguage = (e) => {
        const language = e.target.value;
        if (language && !languagesKnown.languages.includes(language)) {
            setLanguagesKnown({
                ...languagesKnown,
                languages: [...languagesKnown.languages, language],
            });
        }
    };

    const handleRemoveLanguage = (index) => {
        const newLanguages = languagesKnown.languages.filter((_, i) => i !== index);
        setLanguagesKnown({ ...languagesKnown, languages: newLanguages });
    };

    const handleInternshipFieldChange = (e) => {
        const { name, value } = e.target;
        setInternship((prev) => ({ ...prev, [name]: value }));
    };

    const handleProjectFieldChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfileSummaryChange = (e) => {
        setProfileSummary(e.target.value);
    };

    const handleSave = () => {
        toast.success(`${editingSection} saved successfully!`);
        setEditingSection(null);
    };

    return (
        <div>
            <Toaster />
            {/* Quick Links Section */}
            <div className="mx-auto p-10 relative flex flex-col gap-6">
                <h1 className="text-3xl text-blue-600 font-bold">View & Edit</h1>
                <hr />
                <div className="flex gap-6">
                    <div className="w-1/4 bg-white border p-4 rounded-2xl shadow-md h-[30rem] overflow-hidden">
                        <h2 className="text-xl font-bold text-blue-600">Quick Links</h2>
                        <ul className="mt-2 space-y-3 font-medium overflow-y-auto h-full pr-2 custom-scrollbar">
                            {sections.map((section, index) => (
                                <li key={index} className="hover:underline cursor-pointer" onClick={() => setEditingSection(section)}>
                                    {section}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Main Profile Section */}
                    <div className="w-3/4 space-y-6 overflow-y-scroll pr-2 custom-scrollbar" style={{ maxHeight: '30rem' }}>
                        {sections.map((section, index) => (
                            <div key={index} className="p-4 bg-white shadow-md border rounded-2xl relative">
                                <h3 className="text-xl font-bold">{section}</h3>
                                {section === "Career Preferences" ? (
                                    <div className="mt-10">
                                        <div className="flex justify-between gap-4 mt-2">
                                            <div className="flex flex-col">
                                                <span className="font-medium">Preferred Job Type</span>
                                                <span className="text-blue-600 font-semibold">{careerPreferences.jobType}</span>
                                            </div>
                                            <div className="flex flex-col mr-[40%]">
                                                <span className="font-medium">Availability to Work</span>
                                                <span className="text-blue-600 font-semibold">{careerPreferences.availability}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-6">
                                            <span className="font-medium">Preferred Location</span>
                                            <span className="text-blue-600 font-semibold">{careerPreferences.preferredLocation}</span>
                                        </div>
                                    </div>
                                ) : section === "Education" ? (
                                    <div>
                                        <p className="text-gray-600 mt-2">Adding your educational details help recruiters know your value as a potential candidate</p>
                                        <span className="text-blue-600 font-semibold">{education.qualification}</span>
                                    </div>
                                ) : section === "Key Skills" ? (
                                    <div>
                                        <p className="text-gray-600 mt-2">Recruiters look for candidates with specific key skills. Add them here to appear in searches.</p>
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
                                ) : section === "Languages Known" ? (
                                    <div className="mt-10">
                                        <p className="text-gray-600 mt-2">Select the languages you know.</p>
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
                                ) : section === "Internships" ? (
                                    <div>
                                        <p className="text-gray-600 mt-2">Add details about your internships.</p>
                                        <div className='flex flex-row gap-60 mt-2'>
                                            <div className="flex flex-col">
                                              <span className="font-medium">Company Name</span>
                                              <span className="text-blue-600 font-semibold mt-2">{internship.companyName}</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                              <span className="font-medium">Internship Duration</span>
                                              <span className="text-blue-600 font-semibold">{`${internship.internshipStartMonth} ${internship.internshipStartYear} to ${internship.internshipEndMonth} ${internship.internshipEndYear}`}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-10">
                                            <span className="font-medium">Project Name</span>
                                            <span className="text-blue-600 font-semibold mt-2">{internship.projectName}</span>
                                        </div>
                                    </div>
                                ) : section === "Projects" ? (
                                    <div>
                                        <p className="text-gray-600 mt-2">Add details about your projects.</p>
                                        <div className='flex flex-row gap-60 mt-4'>
                                            <div className="flex flex-col">
                                              <span className="font-medium">Project Name</span>
                                              <span className="text-blue-600 font-semibold mt-2">{project.projectName}</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                              <span className="font-medium">Project Duration</span>
                                              <span className="text-blue-600 font-semibold">{`${project.projectStartMonth} ${project.projectStartYear} to ${project.projectEndMonth} ${project.projectEndYear}`}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : section === "Profile Summary" ? (
                                    <div>
                                        <p className="text-gray-600 mt-2">Your profile summary should mention the highlights of your career and education, what your professional interests are, and what kind of career you are looking for. Write a meaningful summary of more than 50 characters.</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-600 mt-2">Add details for {section.toLowerCase()}</p>
                                )}
                                <FaEdit className="text-gray-500 cursor-pointer absolute top-4 right-4" onClick={() => setEditingSection(section)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editingSection && (
                <EditModal title={`Edit ${editingSection}`} onClose={() => setEditingSection(null)} onSave={handleSave}>
                    {renderModalContent(
                        editingSection,
                        careerPreferences,
                        education,
                        keySkills,
                        languagesKnown,
                        internship,
                        project,
                        profileSummary,
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
                        handleRemoveLanguage,
                        handleInternshipFieldChange,
                        handleProjectFieldChange,
                        handleProfileSummaryChange
                    )}
                </EditModal>
            )}
        </div>
    );
}

export default QuickLinks;