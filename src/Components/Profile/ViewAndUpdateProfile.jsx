import { useState } from "react"
import Sidebar from "./Sidebar"
import ProfileHeader from "./ProfileHeader"
import ProfileInfo from "./ProfileInfo"
import ProfessionalDetails from "./ProfessionalDetails"
import EditModal from "./EditModal1"
import ResumeUpload from "./ResumeUpload"
import BasicDetails from "./BasicDetails"

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState("all")
  const [profileData, setProfileData] = useState({
    coverImage:
      "https://images.unsplash.com/photo-1615525137689-198778541af6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvdmVyJTIwaW1hZ2UlMjBjb2RlfGVufDB8fDB8fHww",
    profileImage:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Rahul Sharma",
    headline: "Senior Frontend Developer",
    company: "TechSolutions India",
    location: "Bangalore, India",
    bio: "Passionate frontend developer with 5+ years of experience building responsive and user-friendly web applications.",
    linkedin: "https://www.linkedin.com/",
    github: "https://www.github.com/",
    resumeDetails: {
      basicInfo: "B.Tech in Computer Science, 5+ years experience in web development",
      professionalDetails: {
        industry: "Information Technology",
        department: "Engineering",
        currentRole: "Senior Frontend Developer",
      },
      experience: [
        {
          company: "TechSolutions India",
          role: "Senior Frontend Developer",
          duration: "Jan 2022 - Present",
          description: "Leading the frontend team and developing scalable web applications",
        },
        {
          company: "WebTech Solutions",
          role: "Frontend Developer",
          duration: "Mar 2019 - Dec 2021",
          description: "Developed responsive web interfaces using React and Redux",
        },
      ],
      education: [
        {
          institution: "Delhi Technical University",
          degree: "B.Tech in Computer Science",
          year: "2015 - 2019",
        },
      ],
      skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Redux", "Git"],
      topSkills: ["React", "JavaScript", "Tailwind CSS", "TypeScript", "Redux"],
      workSamples: [
        {
          title: "E-commerce Platform",
          description: "Built a full-featured e-commerce platform with React, Redux, and Node.js",
          projectLink: ""
        },
        {
          title: "CRM Dashboard",
          description: "Developed an interactive dashboard for customer relationship management",
          projectLink: ""
        },
      ],
    },
    education: {
      name: "Hi-Tech Institute of Information Technology",
      logo: "/placeholder.svg?height=40&width=40",
    },
  })

  const [editingSection, setEditingSection] = useState(null)
  const [editData, setEditData] = useState({})

  const handleEdit = (section, data) => {
    // Make sure we have a valid data object
    const editData = data || {}

    // For sections that require specific data structure, provide defaults if missing
    if (section === "experience" && !editData.experience) {
      editData.experience = []
    }

    if (section === "education" && !editData.education) {
      editData.education = []
    }

    if (section === "skills") {
      if (!editData.skills) editData.skills = []
      if (!editData.topSkills) editData.topSkills = []
    }

    if (section === "workSamples" && !editData.workSamples) {
      editData.workSamples = []
    }

    setEditingSection(section)
    setEditData(editData)
  }

  const handleSave = (section, newData) => {
    if (section === "profile") {
      setProfileData({
        ...profileData,
        name: newData.name,
        headline: newData.headline,
        company: newData.company,
        location: newData.location,
        bio: newData.bio,
        linkedin: newData.linkedin,
        github: newData.github,
      })
    } else if (section === "resume") {
      setProfileData({
        ...profileData,
        resumeDetails: {
          ...profileData.resumeDetails,
          basicInfo: newData.basicInfo,
        },
      })
    } else if (section === "professionalInfo") {
      setProfileData({
        ...profileData,
        resumeDetails: {
          ...profileData.resumeDetails,
          professionalDetails: {
            ...profileData.resumeDetails.professionalDetails,
            industry: newData.industry,
            department: newData.department,
            currentRole: newData.currentRole,
          },
        },
      })
    } else if (section === "experience") {
      setProfileData({
        ...profileData,
        resumeDetails: {
          ...profileData.resumeDetails,
          experience: newData.experience,
        },
      })
    } else if (section === "education") {
      setProfileData({
        ...profileData,
        resumeDetails: {
          ...profileData.resumeDetails,
          education: newData.education,
        },
      })
    } else if (section === "skills") {
      setProfileData({
        ...profileData,
        resumeDetails: {
          ...profileData.resumeDetails,
          skills: newData.skills,
          topSkills: newData.topSkills,
        },
      })
    } else if (section === "workSamples") {
      setProfileData({
        ...profileData,
        resumeDetails: {
          ...profileData.resumeDetails,
          workSamples: newData.workSamples,
        },
      })
    }

    setEditingSection(null)
  }

  const handleCancel = () => {
    setEditingSection(null)
  }

  const handleImageUpdate = (type, previewUrl, file) => {
    // Handle the file upload to your backend here
    setProfileData((prev) => ({
      ...prev,
      [type === "cover" ? "coverImage" : "profileImage"]: previewUrl,
    }))
  }

  const handleResumeUpload = (file) => {
    // Handle the resume file upload to your backend here
    console.log("Uploading resume:", file)
    // Update state to show the file has been uploaded
    setProfileData((prev) => ({
      ...prev,
      resume: file,
    }))
  }

  return (
    <div className="flex min-h-screen bg-gray-100 mt-5">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 lg:ml-64 p-2 sm:p-4 md:p-6">
        <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <ProfileHeader
            coverImage={profileData.coverImage}
            profileImage={profileData.profileImage}
            name={profileData.name}
            headline={profileData.headline}
            location={profileData.location}
            onUpdateImages={handleImageUpdate}
          />

          <div className="p-3 sm:p-4 md:p-6">
            <div id="profile">
              <ProfileInfo
                name={profileData.name}
                headline={profileData.headline}
                location={profileData.location}
                bio={profileData.bio}
                company={profileData.company}
                education={profileData.education}
                linkedin={profileData.linkedin}
                github={profileData.github}
                onEdit={() =>
                  handleEdit("profile", {
                    name: profileData.name,
                    headline: profileData.headline,
                    company: profileData.company,
                    location: profileData.location,
                    bio: profileData.bio,
                    linkdin: profileData.linkedin,
                    github: profileData.github,
                  })
                }
              />
            </div>

            <div id="basicDetails" className="mt-8 border-t pt-6 scroll-mt-16">
              <BasicDetails
                basicInfo={profileData.resumeDetails.basicInfo}
                onEdit={() => handleEdit("resume", { basicInfo: profileData.resumeDetails.basicInfo })}
              />
            </div>

            <div id="resume" className="mt-8 border-t pt-6 scroll-mt-16">
              <ResumeUpload currentResume={profileData.resume} onUpload={handleResumeUpload} />
            </div>

            <div className="mt-8 border-t pt-6">
              <ProfessionalDetails
                experience={profileData.resumeDetails.experience}
                education={profileData.resumeDetails.education}
                skills={profileData.resumeDetails.skills}
                topSkills={profileData.resumeDetails.topSkills}
                workSamples={profileData.resumeDetails.workSamples}
                industry={profileData.resumeDetails.professionalDetails?.industry}
                department={profileData.resumeDetails.professionalDetails?.department}
                currentRole={profileData.resumeDetails.professionalDetails?.currentRole}
                onEditExperience={() => handleEdit("experience", { experience: profileData.resumeDetails.experience })}
                onEditEducation={() => handleEdit("education", { education: profileData.resumeDetails.education })}
                onEditSkills={() =>
                  handleEdit("skills", {
                    skills: profileData.resumeDetails.skills,
                    topSkills: profileData.resumeDetails.topSkills,
                  })
                }
                onEditWorkSamples={() =>
                  handleEdit("workSamples", { workSamples: profileData.resumeDetails.workSamples })
                }
                onEditProfessionalInfo={() =>
                  handleEdit("professionalInfo", {
                    industry: profileData.resumeDetails.professionalDetails?.industry,
                    department: profileData.resumeDetails.professionalDetails?.department,
                    currentRole: profileData.resumeDetails.professionalDetails?.currentRole,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {editingSection && (
        <EditModal section={editingSection} data={editData} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  )
}

