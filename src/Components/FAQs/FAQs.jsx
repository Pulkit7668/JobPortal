import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is the subscription plan?",
    answer:
      "Our subscription plan offers different tiers, including a basic plan, a premium plan, and a pro plan. Each plan provides varying levels of access to features.",
  },
  {
    question: "How can I cancel my subscription?",
    answer:
      "You can cancel your subscription anytime through your account settings page. Once canceled, you will not be billed for the next period, and you can continue using your plan until the end of your billing cycle.",
  },
  {
    question: "Can I update my profile information?",
    answer:
      "Yes, you can update your profile information at any time. Simply go to the 'Profile' section from the navigation bar, and click on 'Edit Profile'.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on 'Forgot Password' on the login page, and follow the instructions to receive a password reset link via email.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we prioritize the security of your data. We use industry-standard encryption to protect your information and ensure your privacy is maintained.",
  },
];

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the FAQ if it's already open
    } else {
      setOpenIndex(index); // Open the selected FAQ
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-8">Frequently Asked Questions</h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-700">{faq.question}</h3>
                {openIndex === index ? (
                  <FaChevronUp size={20} className="text-gray-600" />
                ) : (
                  <FaChevronDown size={20} className="text-gray-600" />
                )}
              </div>

              {openIndex === index && (
                <div className="p-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQs;
