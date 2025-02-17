import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I update my profile?",
    answer: "To update your profile, go to the 'View & Update Profile' section and edit the relevant details."
  },
  {
    question: "How can I reset my password?",
    answer: "You can reset your password by clicking on 'Forgot Password' at the login page and following the instructions."
  },
  {
    question: "How do I apply for jobs?",
    answer: "Search for jobs in the jobs section and click on the 'Apply' button to submit your application."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can contact customer support via the 'Help' section in your profile or email us at support@example.com."
  }
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              className="w-full text-left p-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-gray-700">{faq.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-600 bg-white">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
