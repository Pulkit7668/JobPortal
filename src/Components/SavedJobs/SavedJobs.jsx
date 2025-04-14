import React, { useState } from 'react';
import { Briefcase, MapPin, Building2, Trash2, X, Wallet, Clock, Code, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Infosys",
      location: "Bengaluru",
      skills: ["React", "JavaScript", "HTML", "CSS"],
      description:
        "As a Frontend Developer, you will be responsible for building interactive and responsive user interfaces for web applications using React. You will collaborate closely with back-end developers to integrate front-end elements with server-side logic.",
      responsibilities: [
        "Develop and maintain web applications using React.",
        "Collaborate with UI/UX designers to implement design into code.",
        "Optimize applications for maximum speed and scalability.",
        "Work closely with back-end developers to integrate APIs."
      ],
      requirements: [
        "Bachelor's degree in Computer Science or a related field.",
        "3+ years of experience in front-end development.",
        "Proficiency in React.js and front-end tools like Webpack, Babel.",
        "Experience with responsive design and cross-browser compatibility."
      ],
      experience: "3-5 years",
      salary: "8 LPA - 12 LPA",
      application_deadline: "2025-01-31",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Tata Consultancy Services (TCS)",
      location: "Mumbai",
      skills: ["Node.js", "JavaScript", "MongoDB", "Express"],
      description:
        "As a Backend Developer, you will design and implement the server-side logic and database architecture for web applications. You will work with the frontend team to ensure seamless integration of services and maintain optimal performance.",
      responsibilities: [
        "Develop server-side applications using Node.js and Express.",
        "Integrate front-end elements with server-side logic.",
        "Work with databases such as MongoDB, MySQL, or PostgreSQL.",
        "Ensure the technical feasibility of front-end requests and APIs."
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field.",
        "2+ years of experience in backend development.",
        "Experience with Node.js, Express, and database management systems.",
        "Strong knowledge of RESTful API design and implementation."
      ],
      experience: "2-4 years",
      salary: "10 LPA - 15 LPA",
      application_deadline: "2024-11-15",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "Wipro",
      location: "Chennai",
      skills: ["React", "Node.js", "JavaScript", "MongoDB"],
      description:
        "As a Full Stack Developer, you will work on both the front-end and back-end of web applications. You will use React for building user interfaces and Node.js for developing the back-end services, ensuring a seamless experience across the entire application.",
      responsibilities: [
        "Design and implement full-stack web applications.",
        "Work with front-end technologies like React and back-end technologies like Node.js.",
        "Create and manage databases with MongoDB.",
        "Collaborate with cross-functional teams to deliver high-quality features."
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field.",
        "Experience with full-stack web development (React, Node.js, MongoDB).",
        "Understanding of cloud services like AWS or Azure.",
        "Experience with version control systems (Git)."
      ],
      experience: "4-6 years",
      salary: "12 LPA - 18 LPA",
      application_deadline: "2025-01-25",
    },
    {
      id: 4,
      title: "Web Developer",
      company: "HCL Technologies",
      location: "Noida",
      skills: ["HTML", "CSS", "JavaScript"],
      description:
        "As a Web Developer, you will design and implement user-friendly web applications using HTML, CSS, and JavaScript. Your main focus will be creating responsive and visually appealing websites, ensuring high performance across devices.",
      responsibilities: [
        "Develop and maintain web pages and applications.",
        "Write clean, scalable code with best practices in mind.",
        "Collaborate with designers to implement web layouts and UI elements.",
        "Optimize web applications for maximum performance and responsiveness."
      ],
      requirements: [
        "Bachelor's degree in Web Development, Computer Science, or related field.",
        "1-3 years of experience in web development.",
        "Proficiency in HTML5, CSS3, and JavaScript.",
        "Experience with web optimization techniques."
      ],
      experience: "1-3 years",
      salary: "6 LPA - 9 LPA",
      application_deadline: "2024-12-25",
    },
    {
      id: 5,
      title: "Mobile App Developer",
      company: "Accenture",
      location: "Hyderabad",
      skills: ["React Native", "JavaScript", "Redux", "Android", "iOS"],
      description:
        "We are looking for a Mobile App Developer to design, develop, and maintain mobile applications using React Native. You will be responsible for building apps that are responsive, high-performing, and maintainable across both Android and iOS platforms.",
      responsibilities: [
        "Build cross-platform mobile apps using React Native.",
        "Work closely with UI/UX designers to ensure the best user experience.",
        "Optimize mobile apps for speed and performance.",
        "Collaborate with backend developers to integrate APIs."
      ],
      requirements: [
        "Bachelor's degree in Computer Science or a related field.",
        "2+ years of experience in mobile app development.",
        "Proficiency in React Native and Redux.",
        "Experience with both Android and iOS platforms."
      ],
      experience: "2-4 years",
      salary: "10 LPA - 14 LPA",
      application_deadline: "2025-03-30",
    },
    {
      id: 6,
      title: "UX/UI Designer",
      company: "Capgemini",
      location: "Chennai",
      skills: ["Figma", "Sketch", "Adobe XD", "UX Design", "UI Design", "HTML", "CSS"],
      description:
        "As a UX/UI Designer, you will be responsible for designing intuitive and user-friendly interfaces. You will work closely with developers and product managers to create wireframes, prototypes, and high-fidelity designs that meet user needs and business goals.",
      responsibilities: [
        "Design user interfaces and experiences for web and mobile applications.",
        "Create wireframes, prototypes, and high-fidelity designs.",
        "Conduct user research and testing to improve designs.",
        "Collaborate with developers to implement designs."
      ],
      requirements: [
        "Bachelor's degree in Design or related field.",
        "3+ years of experience in UX/UI design.",
        "Proficiency in design tools like Figma, Sketch, and Adobe XD.",
        "Strong portfolio demonstrating design and problem-solving skills."
      ],
      experience: "3-5 years",
      salary: "7 LPA - ₹12 LPA",
      application_deadline: "2025-02-20",
    },
    {
      id: 7,
      title: "Cloud Engineer",
      company: "Google Cloud",
      location: "Hyderabad",
      skills: ["AWS", "Azure", "Docker", "Kubernetes", "Node.js"],
      description:
        "As a Cloud Engineer, you will be responsible for building and maintaining cloud infrastructure on platforms like AWS and Azure. You will work closely with development teams to integrate cloud services and ensure high availability and scalability of applications.",
      responsibilities: [
        "Design and implement cloud solutions using AWS and Azure.",
        "Automate deployment processes using Docker and Kubernetes.",
        "Ensure the scalability and security of cloud applications.",
        "Work with developers to integrate cloud services and APIs."
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field.",
        "2+ years of experience with cloud platforms (AWS, Azure).",
        "Experience with containerization (Docker, Kubernetes).",
        "Strong knowledge of cloud security best practices."
      ],
      experience: "2-4 years",
      salary: "15 LPA - 20 LPA",
      application_deadline: "2024-12-05",
    },
    {
      id: 8,
      title: "DevOps Engineer",
      company: "Amazon Web Services",
      location: "Bengaluru",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      description:
        "As a DevOps Engineer, you will work on automating and optimizing the deployment pipelines, managing cloud infrastructure, and implementing CI/CD best practices to ensure faster and more reliable delivery of software.",
      responsibilities: [
        "Automate deployment pipelines using CI/CD tools.",
        "Manage cloud infrastructure on AWS and other cloud providers.",
        "Containerize applications using Docker and orchestrate using Kubernetes.",
        "Work with developers and QA teams to ensure high-quality software releases."
      ],
      requirements: [
        "Bachelor's degree in Computer Science or related field.",
        "3+ years of experience in DevOps and cloud infrastructure.",
        "Proficiency in Docker, Kubernetes, and AWS.",
        "Experience with infrastructure as code (Terraform, CloudFormation)."
      ],
      experience: "3-5 years",
      salary: "18 LPA - 24 LPA",
      application_deadline: "2025-02-28",
    },
  ]);
  const navigate = useNavigate();

  const handleRemoveJob = (id) => {
    setSavedJobs(savedJobs.filter(job => job.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 lg:p-12">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
            onClick={() => navigate(-1)}
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {savedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    </div>
                    <button
                      onClick={() => handleRemoveJob(job.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full"
                      aria-label="Remove job"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Wallet className="w-4 h-4 mr-2" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-start gap-2 mb-2">
                      <Code className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Skills:</span>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-xl text-gray-600">You haven't saved any jobs yet</p>
            <p className="text-gray-500 mt-2">Jobs you save will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedJobs;