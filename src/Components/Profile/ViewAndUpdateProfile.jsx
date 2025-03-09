import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import ResumeSection from './ResumeSection';
import ProfessionalDetails from './ProfessionalDetails';
import EditModal from './EditModal';
import KeywordsSection from './KeywordsSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewAndUpdateProfile() {
  const [profileData, setProfileData] = useState({
    coverImage: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvdmVyJTIwcGljJTIwY29kZXxlbnwwfHwwfHx8MA%3D%3D',
    profileImage: 'https://images.unsplash.com/photo-1617975251517-b90ff061b52e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D',
    name: 'Rahul Sharma',
    headline: 'Senior Frontend Developer',
    company: 'TechSolutions India',
    location: 'Bangalore, India',
    bio: 'Passionate frontend developer with 5+ years of experience building responsive and user-friendly web applications.',
    resumeDetails: {
      basicInfo: 'B.Tech in Computer Science, 5+ years experience in web development',
      professionalDetails: 'Worked on multiple enterprise-level applications using modern JavaScript frameworks',
      experience: [
        { 
          company: 'TechSolutions India', 
          role: 'Senior Frontend Developer', 
          duration: 'Jan 2022 - Present',
          description: 'Leading the frontend team and developing scalable web applications',
          location: 'Bangalore, India',
          skills: ['React', 'TypeScript', 'Redux', 'Tailwind CSS']
        },
        { 
          company: 'WebTech Solutions', 
          role: 'Frontend Developer', 
          duration: 'Mar 2019 - Dec 2021',
          description: 'Developed responsive web interfaces using React and Redux',
          location: 'Pune, India',
          skills: ['React', 'JavaScript', 'Redux', 'CSS3']
        }
      ],
      education: [
        {
          institution: 'Delhi Technical University',
          degree: 'B.Tech in Computer Science',
          year: '2015 - 2019',
          location: 'Delhi, India',
          grade: '8.5 CGPA'
        },
        {
          institution: 'Delhi Public School',
          degree: 'Higher Secondary Education',
          year: '2013 - 2015',
          location: 'Delhi, India',
          grade: '92%'
        }
      ],
      skills: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux', 'Git', 'Node.js', 'Express', 'MongoDB', 'REST API', 'GraphQL', 'Jest', 'Webpack'],
      topSkills: ['React', 'JavaScript', 'TypeScript', 'Redux', 'Tailwind CSS'],
      workSamples: [
        {
          title: 'E-commerce Platform',
          description: 'Built a full-featured e-commerce platform with React, Redux, and Node.js. Implemented features like product search, filtering, cart management, payment integration, and order tracking.',
          technologies: ['React', 'Redux', 'Node.js', 'MongoDB', 'Stripe API'],
          role: 'Frontend Lead',
          duration: '4 months'
        },
        {
          title: 'CRM Dashboard',
          description: 'Developed an interactive dashboard for customer relationship management with real-time data visualization, user management, and reporting features.',
          technologies: ['React', 'TypeScript', 'D3.js', 'Firebase'],
          role: 'Full Stack Developer',
          duration: '3 months'
        },
        {
          title: 'Healthcare Management System',
          description: 'Created a comprehensive healthcare management system for a local clinic to manage patient records, appointments, and billing.',
          technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
          role: 'Frontend Developer',
          duration: '6 months'
        }
      ],
      keywords: {
        basicSkills: ['HTML', 'CSS', 'JavaScript', 'Git', 'Responsive Design', 'UI/UX', 'Problem Solving', 'Communication'],
        topSkills: ['React', 'TypeScript', 'Redux', 'Tailwind CSS', 'Node.js', 'MongoDB']
      }
    }
  });

  const [editingSection, setEditingSection] = useState(null);
  const [editData, setEditData] = useState({});
  const [activeTab, setActiveTab] = useState('all');

  const handleEdit = (section, data) => {
    setEditingSection(section);
    setEditData(data);
  };

  const handleSave = (section, newData) => {
    let updatedProfileData = { ...profileData };
    
    switch(section) {
      case 'cover':
        updatedProfileData.coverImage = newData.coverImage;
        break;
      case 'profile':
        updatedProfileData = {
          ...updatedProfileData,
          name: newData.name,
          headline: newData.headline,
          company: newData.company,
          location: newData.location,
          bio: newData.bio,
          profileImage: newData.profileImage
        };
        break;
      case 'resume':
        updatedProfileData.resumeDetails.basicInfo = newData.basicInfo;
        break;
      case 'experience':
        updatedProfileData.resumeDetails.experience = newData.experience;
        break;
      case 'education':
        updatedProfileData.resumeDetails.education = newData.education;
        break;
      case 'skills':
        updatedProfileData.resumeDetails.skills = newData.skills;
        updatedProfileData.resumeDetails.topSkills = newData.topSkills;
        break;
      case 'workSamples':
        updatedProfileData.resumeDetails.workSamples = newData.workSamples;
        break;
      case 'keywords':
        updatedProfileData.resumeDetails.keywords = newData.keywords;
        break;
      default:
        break;
    }
    
    setProfileData(updatedProfileData);
    setEditingSection(null);
    toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} updated successfully!`);
  };

  const handleCancel = () => {
    setEditingSection(null);
  };

  const filterContent = () => {
    if (activeTab === 'all') {
      return true;
    } else if (activeTab === 'experience') {
      return ['experience'];
    } else if (activeTab === 'education') {
      return ['education'];
    } else if (activeTab === 'skills') {
      return ['skills', 'keywords'];
    } else if (activeTab === 'projects') {
      return ['workSamples'];
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-4">
        <div className="mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <ProfileHeader 
              coverImage={profileData.coverImage} 
              onEdit={() => handleEdit('cover', { coverImage: profileData.coverImage })} 
            />
            
            <div className="p-6">
              <ProfileInfo 
                profileImage={profileData.profileImage}
                name={profileData.name}
                headline={profileData.headline}
                company={profileData.company}
                location={profileData.location}
                bio={profileData.bio}
                onEdit={() => handleEdit('profile', { 
                  profileImage: profileData.profileImage,
                  name: profileData.name,
                  headline: profileData.headline,
                  company: profileData.company,
                  location: profileData.location,
                  bio: profileData.bio
                })}
              />
            </div>
          </div>
          
          {(activeTab === 'all' || activeTab === 'resume') && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <ResumeSection 
                  basicInfo={profileData.resumeDetails.basicInfo}
                  onEdit={() => handleEdit('resume', { basicInfo: profileData.resumeDetails.basicInfo })}
                />
              </div>
            </div>
          )}
          
          {(activeTab === 'all' || activeTab === 'experience') && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <ProfessionalDetails 
                  section="experience"
                  title="Experience"
                  items={profileData.resumeDetails.experience}
                  onEdit={() => handleEdit('experience', { experience: profileData.resumeDetails.experience })}
                />
              </div>
            </div>
          )}
          
          {(activeTab === 'all' || activeTab === 'education') && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <ProfessionalDetails 
                  section="education"
                  title="Education"
                  items={profileData.resumeDetails.education}
                  onEdit={() => handleEdit('education', { education: profileData.resumeDetails.education })}
                />
              </div>
            </div>
          )}
          
          {(activeTab === 'all' || activeTab === 'skills') && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <ProfessionalDetails 
                  section="skills"
                  title="Skills & Tools"
                  skills={profileData.resumeDetails.skills}
                  topSkills={profileData.resumeDetails.topSkills}
                  onEdit={() => handleEdit('skills', { 
                    skills: profileData.resumeDetails.skills,
                    topSkills: profileData.resumeDetails.topSkills
                  })}
                />
              </div>
            </div>
          )}
          
          {(activeTab === 'all' || activeTab === 'projects') && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <ProfessionalDetails 
                  section="workSamples"
                  title="Work Samples"
                  items={profileData.resumeDetails.workSamples}
                  onEdit={() => handleEdit('workSamples', { workSamples: profileData.resumeDetails.workSamples })}
                />
              </div>
            </div>
          )}
          
          {(activeTab === 'all' || activeTab === 'skills') && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <KeywordsSection 
                  keywords={profileData.resumeDetails.keywords}
                  onEdit={() => handleEdit('keywords', { keywords: profileData.resumeDetails.keywords })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {editingSection && (
        <EditModal 
          section={editingSection}
          data={editData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
      
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
