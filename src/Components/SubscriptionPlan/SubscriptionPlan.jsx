import React, { useState, useRef } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { PiStarFourFill } from "react-icons/pi";

const SubscriptionPlan = () => {
  const [selectedPrice, setSelectedPrice] = useState(null);
  const jobPostingRef = useRef(null);
  const resdexRef = useRef(null);
  const assistedHiringRef = useRef(null);
  const faqRef = useRef(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handlePriceClick = (index) => {
    setSelectedPrice(index);
  };

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleQuestionToggle = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const hiringPlans = [
    {
      title: "JOB POSTING",
      description: "Post a job and get relevant applies",
      features: [
        "Attract qualified candidates actively seeking new opportunities",
        "Customise job posting to find candidates as per your requirements",
      ],
    },
    {
      title: "RESDEX",
      description: "Search Naukri’s resume database",
      features: [
        "Discover local talent in every city with India’s largest resume database",
        "Find the right fit as per your specific preferences like location, skills, & more",
      ],
    },
    {
      title: "ASSISTED HIRING",
      description: "Get a dedicated hiring expert",
      features: [
        "Let our experts understand your hiring needs to assist you better",
        "Sit back and relax as we handle candidate sourcing and screening",
      ],
      newLabel: true,
    },
  ];

  const pricingPlans = [
    {
      title: "Standard",
      price: "₹400",
      features: [
        "1 Job Posting",
        "30 Days Duration",
        "Standard Visibility",
        "Upto 250 character job description",
        "1 job location",
        "200 applies",
        "Applies expiry 30 days",
        "Jobseeker contact details are visible",
        "Boost on Job Search Page",
        "Job Branding",
      ],
      validity: "Job validity 15 days",
      crosses: [7, 8, 9],
    },
    {
      title: "Classifeid",
      price: "₹800",
      features: [
        "3 Job Postings",
        "45 Days Duration",
        "Featured Visibility",
        "Upto 250 character job description",
        "3 job locations",
        "Unlimited applies",
        "Applies expiry 90 days",
        "Jobseeker contact details are visible",
        "Boost on Job Search Page",
        "Job Branding",
      ],
      validity: "Job validity 30 days",
      crosses: [8, 9],
    },
    {
      title: "Hot Vacancy",
      price: "₹1500",
      features: [
        "Unlimited Job Postings",
        "60 Days Duration",
        "Priority Placement",
        "Detailed job description",
        "3 job locations",
        "Unlimited applies",
        "Applies expiry 90 days",
        "Jobseeker contact details are visible",
        "Boost on Job Search Page",
        "Job Branding",
      ],
      validity: "Job validity 30 days",
      crosses: [],
    },
  ];

  const resdexPlans = [
    {
      title: "Resdex Lite",
      description: "Best for small and medium businesses with smaller hiring needs",
      prices: [
        { requirement: "1 Job requirement", views: "100 CV views", price: "₹4,000", gstNote: "*GST as applicable", },
        { requirement: "3 Job Requirement", views: "300 CV views", price: "₹10,500", gstNote: "*GST as applicable", },
      ],
      features: [
        "100 CV views per requirement",
        "Up to 500 search results",
        "Candidates active in last 6 months",
        "10+ advanced filters",
        "Single user access",
        "Email multiple candidates together",
        "Boolean keyword search",
        "Download CVs in bulk",
      ],
      validity: "Database validity 15 days",
      button: "Buy now",
      crosses: [5, 6, 7],
    },
    {
      title: "Resdex",
      description: "Get customised solutions and dedicated support for bigger hiring needs",
      price: "Custom Price",
      gstNote: "Based on your plan",
      features: [
        "CV views as per plan",
        "Unlimited search results",
        "All available candidates",
        "20+ advanced filters",
        "Multiple user access",
        "Email multiple candidates together",
        "Boolean keyword search",
        "Download CVs in bulk"
      ],
      validity: "Database validity as per the plan",
      button: "Contact sales",
      crosses: [],
    },
  ];

  const assistedHiringPlans = [
    {
      title: "Assisted Hiring (Standard)",
      price: "₹4,000",
      features: [
        "Personalised consultation with a hiring expert",
        "Experts post your job on Naukri to attract quality candidates",
        "We will shortlist relevant candidates who best match your unique hiring needs",
      ],
      validity: "Plan validity 90 days",
      button: "Buy now",
      newLabel: true,
    },
  ];

  const faqs = [
    {
      question: "I have purchased Job posting plan on Naukri. How do I create my job listing?",
      answer: "Once your payment is confirmed, you'll receive an email with a unique link to our job posting creation page. It typically takes just a few minutes to fill out the required information, including the job title, description, desired skills, and location. We'll advertise your job listing and it will reach qualified candidates in your selected location(s). Interested candidates can easily apply directly through our platform, making it simple for you to gather a pool of potential talent."
    },
    {
      question: "What is the difference between Resume Database Access (Resdex) and a Job posting?",
      answer: "Both Resdex and Job Posting are Naukri’s powerful tools for finding the right candidates, but they work differently: Resdex is India's largest resume database access, giving you access to over 9.73 crore resumes. Our powerful search filters allow you to narrow down your search by various criteria, including location, skills, and more."
    },
    {
      question: "How is Resdex Lite different from Resdex?",
      answer: "Resdex and Resdex Lite offer different approaches to finding candidates: Resdex provides full access to our entire resume database, allowing you to conduct in-depth searches and handpick candidates who perfectly match your requirements. Resdex Lite: It is a streamlined option where you provide your hiring requirements, and we then match and send you a curated list of up to 500 potential candidates from our database who fit your criteria."
    },
    {
      question: "What information is needed to create a 'requirement' in Resdex Lite?",
      answer: "When using Resdex Lite, you'll need to specify the job title, key skills, experience level, preferred location, and any other relevant details about the desired candidate. This information helps us share the most suitable candidates from our database."
    },
    {
      question: "What is Assisted Hiring?",
      answer: "Assisted hiring is Naukri’s comprehensive recruitment solution where our experienced recruiters act as your dedicated hiring partners. They take on the entire recruitment process, from understanding your requirements to sourcing, screening, and shortlisting qualified candidates. This service is designed to save you time, reduce stress, and ensure you find the right talent for your specific needs."
    },
    {
      question: "What happens when I purchase the Assisted hiring offering?",
      answer: "By purchasing Assisted Hiring, you gain access to our dedicated recruitment specialists who will call you within 1 business day to understand your requirement. They'll target sourcing, screening, and shortlisting candidates for you. You'll receive a list of the most relevant candidates, saving you time and effort. The final decision on interviews is yours, and you have the flexibility to schedule them as needed."
    },
    {
      question: "How does pricing work for the different Naukri recruiter plans?",
      answer: "Our pricing is transparent, with options to suit different budgets and hiring needs. You can view the detailed pricing information for each plan available on our website."
    },
    {
      question: "What kind of support can I expect from Naukri Recruiter?",
      answer: "We offer dedicated customer support to answer any questions and help you make the most of our services. You can reach us by dropping your contact details at support@yourlogo.com or calling 1100-2000-2200-0111."
    }
  ];

  return (
    <div className="bg-gray-100">
      <div className="relative w-full h-[60vh] bg-gray-100 flex items-center justify-center">
        <div className="relative z-10 text-center px-6 py-20">
          <h2 className="xs:text-xl md:text-5xl font-bold text-gray-800 leading-tight">
            Find, attract, and <span className="text-blue-600">hire</span> talent with Naukri.
          </h2>
          <button
           className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
           onClick={() => scrollToSection(jobPostingRef)}
          >
            Explore plans
          </button>
        </div>
      </div>

      {/* Card Section */}
      <div className="relative z-10 max-w-5xl xs:mx-5 lg:mx-auto md:flex md:justify-between bg-white shadow-lg rounded-xl p-8">
        <div className="flex flex-col items-center md:w-1/3 text-center mb-5">
          <div className="text-5xl mb-4">🧑‍💼</div>
          <h3 className="text-lg font-semibold">
            Hire <span className="font-bold text-gray-800">skilled candidates</span>
          </h3>
          <p className="text-gray-600 text-sm">for your business</p>
        </div>
        <hr className="xs:block md:hidden mb-5" />
        <div className="flex flex-col items-center md:w-1/3 text-center md:border-l md:border-r px-6 mb-10">
          <div className="text-5xl mb-4">🏢</div>
          <h3 className="text-lg font-semibold">
            Get candidates with relevant <span className="font-bold text-gray-800">industry experience</span>
          </h3>
        </div>
        <hr className="xs:block md:hidden mb-5" />
        <div className="flex flex-col items-center md:w-1/3 text-center">
          <div className="text-5xl mb-4">💰</div>
          <h3 className="text-lg font-semibold">
            Explore <span className="font-bold text-gray-800">budget-friendly</span> plans
          </h3>
          <p className="text-gray-600 text-sm">starting from ₹400</p>
        </div>
      </div>

      {/* Hiring Made Easy Section */}
      <div className="max-w-6xl mx-auto text-center mt-16">
        <h2 className="text-4xl font-bold text-gray-900">Hiring Made Easy</h2>
        <p className="text-gray-600 text-lg mt-2">for Small & Medium Businesses</p>

        {/* Plans Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 xs:mx-5 lg:mx-0">
          {hiringPlans.map((plan, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition duration-300 transform hover:-translate-y-2 relative">
              <span className="bg-blue-100 text-blue-600 lg:text-lg font-semibold px-3 py-1 rounded">{plan.title}</span>
              <h3 className="xs:text-xl md:text-base lg:text-xl font-semibold text-start mt-4">{plan.description}</h3>
              <ul className="mt-2 text-gray-600 md:text-xs lg:text-sm text-start space-y-2 list-disc list-inside">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button  
                  onClick={() => {
                  if (plan.title === "JOB POSTING") {
                    scrollToSection(jobPostingRef);
                  } else if (plan.title === "RESDEX") {
                    scrollToSection(resdexRef);
                  } else if (plan.title === "ASSISTED HIRING") {
                    scrollToSection(assistedHiringRef);
                  }
                }} 
                className="mt-4 text-blue-600 font-semibold border border-blue-600 xs:px-20 md:px-10 lg:px-20 py-2 rounded-lg hover:bg-blue-100 transition duration-300">
                View plans
              </button>
              {plan.newLabel && (
                <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-lg rotate-12">
                  Newly launched
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Job Posting */}
      <div ref={jobPostingRef} className="max-w-6xl xs:mx-5 lg:mx-auto mt-16 px-6 border border-gray-300 py-10 rounded-3xl bg-gradient-to-b from-blue-50 via-white to-gray-100">
        <h4 className="xs:text-sm md:text-lg font-bold text-[#F15424] text-center mb-2">JOB POSTING</h4>
        <h2 className="xs:text-xl md:text-4xl font-bold text-gray-900 text-center">Job Posting Pricing</h2>
        <p className="text-gray-600 md:text-xl mt-2 text-center">Choose the plan that suits your hiring needs</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <h3 className="xs:text-3xl md:text-2xl lg:text-3xl text-blue-600">{plan.title}</h3>
              <p className="text-2xl font-bold text-gray-600 mt-2">{plan.price}</p>
              <p className="text-xs font-semibold text-gray-500">*GST as applicable</p>
              <h3 className="text-xl font-semibold text-gray-600 mt-2">Key Features</h3>
              <ul className="mt-4 text-gray-600 text-sm space-y-2 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    {plan.crosses.includes(i) ? (
                      <FaTimes className="text-red-500 mr-2" />
                    ) : (
                      <FaCheck className="text-blue-600 mr-2" />
                    )}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <hr className="my-4 border-dotted border-gray-300" />
              <p className="text-sm font-semibold text-center text-gray-500">{plan.validity}</p>
              <button className="mt-4 w-full text-white bg-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Buy now 
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RESDEX Section */}
      <div ref={resdexRef} className="max-w-6xl xs:mx-5 lg:mx-auto mt-16 px-6 py-10 border border-gray-300 rounded-3xl mb-10 bg-gradient-to-b from-purple-100 via-white to-gray-100">
        <h4 className="xs:text-sm md:text-lg font-bold text-[#F15424] text-center mb-2">RESDEX</h4>
        <h2 className="xs:text-xl md:text-4xl font-bold text-gray-900 text-center">Search India’s Largest Resume Database</h2>
        <p className="text-gray-600 md:text-xl mt-2 text-center">by location, industry, skills, and more to find the right fit</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {resdexPlans.map((plan, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl border shadow-md">
              <h3 className="text-3xl text-purple-600">{plan.title}</h3>
              <p className="xs:text-sm md:text-base text-gray-600 mt-2">{plan.description}</p>
              {plan.prices ? (
                <div className="lg:flex justify-between mt-4">
                  {plan.prices.map((priceOption, i) => (
                    <div
                      key={i}
                      className={`flex-1 mx-2 xs:mb-5 lg:mb-0 cursor-pointer ${selectedPrice === i ? 'border-purple-600' : 'border-gray-300'} border p-3 rounded-lg flex items-center justify-between`}
                      onClick={() => handlePriceClick(i)}
                    >
                      <div className="">
                        <p className="text-xs text-gray-800">{priceOption.requirement}</p>
                        <p className="text-xs text-gray-800">{priceOption.views}</p>
                      </div>
                      <div className="border-l-2 border-gray-400 border-dotted h-full mx-4"></div>
                        <div>
                          <p className="font-bold text-gray-800">{priceOption.price}</p>
                          <p className="text-[8px] font-semibold text-gray-500">{priceOption.gstNote}</p>
                        </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-3xl font-bold text-gray-800 mt-4">{plan.price}</p>
              )}
              <h3 className="text-xl font-semibold text-gray-600 mt-2">Key Features</h3>
              <ul className="mt-4 text-gray-600 text-sm space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    {plan.crosses.includes(i) ? (
                      <FaTimes className="text-red-500 mr-2" />
                    ) : (
                      <FaCheck className="text-purple-600 mr-2" />
                    )}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <hr className="my-4 border-dotted border-gray-300" />
              <p className="text-sm font-semibold text-center text-gray-500">{plan.validity}</p>
              <button className={`mt-4 w-full font-semibold px-4 py-2 rounded-lg transition duration-300 ${plan.button === 'Contact sales' ? 'bg-transparent text-purple-600 border border-purple-600 hover:bg-purple-100' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Assisted Hiring */}
      <div ref={assistedHiringRef} className="max-w-6xl xs:mx-5 lg:mx-auto mt-16 px-6 py-10 border border-gray-300 rounded-3xl bg-gradient-to-b from-green-50 via-white to-gray-100">
        <h4 className="xs:text-sm md:text-lg font-bold text-[#F15424] text-center mb-2">ASSISTED HIRING</h4>
        <h2 className="xs:text-xl md:text-4xl font-bold text-gray-900 text-center">Get a Dedicated Hiring Expert</h2>
        <p className="text-gray-600 md:text-xl mt-2 text-center">Let our experts handle your hiring needs</p>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-10">
          {assistedHiringPlans.map((plan, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border hover:shadow-xl transition duration-300 transform hover:-translate-y-2 relative">
              {plan.newLabel && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Newly launched
                </span>
              )}
              <h3 className="text-xl font-semibold text-blue-600">{plan.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">{plan.price}</p>
              <p className="text-xs text-gray-500">*GST as applicable</p>

              <ul className="mt-4 text-gray-700 space-y-2 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center xs:text-xs md:text-sm">
                    <PiStarFourFill className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="text-gray-500 text-sm mt-2">
                <span className="font-semibold">For requirements under 9 lacs CTC</span>
              </p>
              <hr className="my-4 border-dotted border-gray-300" />
              <p className="text-sm font-semibold text-center text-gray-500">{plan.validity}</p>
              <button className="mt-4 w-full text-white bg-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Doubts section */}
      <div className="max-w-6xl xs:mx-5 lg:mx-auto mt-16 px-6 py-10 mb-10 border border-gray-300 rounded-3xl bg-gradient-to-b from-yellow-50 via-white to-gray-100">
        <h4 className="xs:text-sm md:text-lg font-bold text-[#F15424] text-center mb-2">ANY DOUBTS?</h4>
        <h2 className="xs:text-xl md:text-4xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>

        <div className="mt-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b py-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleQuestionToggle(index)}
              >
                <h3 className="xs:text-sm md:text-lg font-semibold">{faq.question}</h3>
                <span className="text-3xl">{activeQuestion === index ? '-' : '+'}</span>
              </div>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeQuestion === index ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;