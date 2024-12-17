const jobsData = [
    {
      title: "Software Engineer",
      skills: ["JavaScript", "React", "Node.js"],
      location: "New Delhi",
      experience: 2,
      description: "Design, develop, and maintain software applications.",
      salary: "₹6,00,000 - ₹8,00,000 per annum",
      company: "Tech Innovators Pvt. Ltd.",
      postedDate: "2023-12-01",
      jobType: "Full-time"
    },
    {
      title: "Frontend Developer",
      skills: ["HTML", "CSS", "React"],
      location: "Bengaluru",
      experience: 1,
      description: "Build user-facing features and interactive web applications.",
      salary: "₹4,00,000 - ₹6,00,000 per annum",
      company: "Web Solutions Inc.",
      postedDate: "2023-11-25",
      jobType: "Full-time"
    },
    {
      title: "Backend Developer",
      skills: ["Node.js", "Express", "MongoDB"],
      location: "Hyderabad",
      experience: 3,
      description: "Work on server-side logic, databases, and API development.",
      salary: "₹7,00,000 - ₹10,00,000 per annum",
      company: "CloudTech Enterprises",
      postedDate: "2023-12-05",
      jobType: "Full-time"
    },
    {
      title: "Data Scientist",
      skills: ["Python", "Machine Learning", "SQL"],
      location: "Chennai",
      experience: 4,
      description: "Analyze large datasets and build machine learning models.",
      salary: "₹10,00,000 - ₹14,00,000 per annum",
      company: "Data Insights Pvt. Ltd.",
      postedDate: "2023-11-30",
      jobType: "Full-time"
    },
    {
      title: "Product Manager",
      skills: ["Agile", "Jira", "Product Strategy"],
      location: "Mumbai",
      experience: 5,
      description: "Lead the development of new products and features.",
      salary: "₹12,00,000 - ₹18,00,000 per annum",
      company: "Tech Giants Ltd.",
      postedDate: "2023-11-20",
      jobType: "Full-time"
    },
    {
      title: "React Developer",
      skills: ["React", "JavaScript", "Redux"],
      location: "Pune",
      experience: 2,
      description: "Develop dynamic and responsive user interfaces using React.",
      salary: "₹5,00,000 - ₹7,00,000 per annum",
      company: "Innovative Solutions",
      postedDate: "2023-12-10",
      jobType: "Full-time"
    },
    {
      title: "UI/UX Designer",
      skills: ["Figma", "Sketch", "Wireframing"],
      location: "Kolkata",
      experience: 3,
      description: "Design intuitive and user-friendly interfaces and experiences.",
      salary: "₹6,00,000 - ₹9,00,000 per annum",
      company: "DesignHub Studios",
      postedDate: "2023-12-01",
      jobType: "Full-time"
    },
    {
      title: "Full Stack Developer",
      skills: ["JavaScript", "React", "Node.js", "MongoDB"],
      location: "Ahmedabad",
      experience: 4,
      description: "Work on both front-end and back-end development for applications.",
      salary: "₹8,00,000 - ₹12,00,000 per annum",
      company: "Techno Solutions Ltd.",
      postedDate: "2023-11-15",
      jobType: "Full-time"
    },
    {
      title: "DevOps Engineer",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
      location: "Chandigarh",
      experience: 3,
      description: "Manage infrastructure and automate deployment processes.",
      salary: "₹7,00,000 - ₹10,00,000 per annum",
      company: "DevOps Technologies",
      postedDate: "2023-12-03",
      jobType: "Full-time"
    },
    {
      title: "Business Analyst",
      skills: ["Excel", "SQL", "Power BI"],
      location: "Surat",
      experience: 2,
      description: "Analyze business processes and suggest improvements.",
      salary: "₹5,00,000 - ₹7,00,000 per annum",
      company: "Consulting Partners",
      postedDate: "2023-11-28",
      jobType: "Full-time"
    },
    {
      title: "Machine Learning Engineer",
      skills: ["Python", "TensorFlow", "Scikit-learn"],
      location: "Noida",
      experience: 4,
      description: "Develop and deploy machine learning models for data analysis.",
      salary: "₹9,00,000 - ₹12,00,000 per annum",
      company: "AI Solutions Pvt. Ltd.",
      postedDate: "2023-12-02",
      jobType: "Full-time"
    },
    {
      title: "Digital Marketing Manager",
      skills: ["SEO", "PPC", "Google Analytics"],
      location: "Jaipur",
      experience: 3,
      description: "Lead digital marketing campaigns and analyze performance metrics.",
      salary: "₹6,00,000 - ₹9,00,000 per annum",
      company: "Marketing Pros",
      postedDate: "2023-11-25",
      jobType: "Full-time"
    },
    {
      title: "Content Writer",
      skills: ["Writing", "SEO", "Content Marketing"],
      location: "Lucknow",
      experience: 1,
      description: "Create engaging content for websites, blogs, and social media.",
      salary: "₹3,00,000 - ₹4,00,000 per annum",
      company: "Content Creators",
      postedDate: "2023-12-07",
      jobType: "Full-time"
    },
    {
      title: "Cloud Solutions Architect",
      skills: ["AWS", "Azure", "Cloud Computing"],
      location: "Indore",
      experience: 5,
      description: "Design cloud-based solutions and infrastructure for businesses.",
      salary: "₹15,00,000 - ₹20,00,000 per annum",
      company: "CloudX Technologies",
      postedDate: "2023-12-05",
      jobType: "Full-time"
    },
    {
      title: "Cyber Security Specialist",
      skills: ["Ethical Hacking", "Firewall", "Penetration Testing"],
      location: "Bhopal",
      experience: 4,
      description: "Secure networks and systems against cyber threats.",
      salary: "₹8,00,000 - ₹12,00,000 per annum",
      company: "SecuriTech Pvt. Ltd.",
      postedDate: "2023-12-04",
      jobType: "Full-time"
    },
    {
      title: "QA Engineer",
      skills: ["Manual Testing", "Automation Testing", "Selenium"],
      location: "Visakhapatnam",
      experience: 2,
      description: "Ensure the quality of software through testing and bug reporting.",
      salary: "₹4,00,000 - ₹6,00,000 per annum",
      company: "QualityTech",
      postedDate: "2023-11-30",
      jobType: "Full-time"
    },
    {
      title: "Sales Manager",
      skills: ["Salesforce", "CRM", "Lead Generation"],
      location: "Vadodara",
      experience: 3,
      description: "Manage and drive sales for the company’s products and services.",
      salary: "₹6,00,000 - ₹9,00,000 per annum",
      company: "Sales Experts",
      postedDate: "2023-11-18",
      jobType: "Full-time"
    },
    {
      title: "HR Manager",
      skills: ["Recruitment", "Employee Relations", "HR Software"],
      location: "Coimbatore",
      experience: 4,
      description: "Manage HR processes and recruit talent for the company.",
      salary: "₹7,00,000 - ₹10,00,000 per annum",
      company: "PeopleFirst",
      postedDate: "2023-12-01",
      jobType: "Full-time"
    },
    {
      title: "Product Designer",
      skills: ["Sketch", "Figma", "Prototyping"],
      location: "Nagpur",
      experience: 3,
      description: "Design and prototype user-centered products and features.",
      salary: "₹6,00,000 - ₹8,00,000 per annum",
      company: "DesignWorks",
      postedDate: "2023-11-27",
      jobType: "Full-time"
    }
  ];
  
  export default jobsData;
    