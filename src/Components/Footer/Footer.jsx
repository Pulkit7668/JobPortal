import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { label: "Facebook", icon: <FaFacebookF />, url: "/facebook", color: "text-blue-600" },
    { label: "Instagram", icon: <FaInstagram />, url: "/instagram", color: "text-pink-500" },
    { label: "Twitter", icon: <FaTwitter />, url: "/twitter", color: "text-blue-400" },
    { label: "LinkedIn", icon: <FaLinkedinIn />, url: "/linkedin", color: "text-blue-800" },
  ];

  const links = [
    {
      title: "Company",
      items: [
        { name: "About us", path: "/about-us" },
        { name: "Careers", path: "/careers" },
        { name: "Employer Home", path: "/employer-home" },
        { name: "Sitemap", path: "/sitemap" },
        { name: "Credits", path: "/credits" },
      ],
    },
    {
      title: "Support",
      items: [
        { name: "Help Center", path: "/help-center" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms-conditions" },
        { name: "Fraud Alert", path: "/fraud-alert" },
        { name: "Trust & Safety", path: "/trust-safety" },
      ],
    },
  ];

  return (
    <footer className="text-gray-800 border-t-2 mx-20 py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div>
            <h2 className="text-4xl font-bold mb-10 text-blue-600">UrLogo</h2>
            <h5 className="font-bold mb-2">Connect with us</h5>
            <div className="flex space-x-5">
              {socialLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.url}
                  aria-label={link.label}
                  className={`${link.color} hover:opacity-80`}
                >
                  <span className="text-2xl">{link.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-4">
            {links.map((section, idx) => (
              <div key={idx}>
                <h5 className="font-bold mb-2">{section.title}</h5>
                <ul>
                  {section.items.map((item, id) => (
                    <li key={id} className="mb-1">
                      <Link to={item.path} className="hover:text-blue-600">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Apply on the Go Section */}
          <div className="p-4 border-2 border-gray-200 hover:shadow-2xl rounded-3xl text-center">
            <h5 className="text-lg font-bold mb-2">Apply on the go</h5>
            <p className="text-sm text-gray-600 mb-4">Get real-time job updates on our App</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="w-40"
                />
              </a>
              <a
                href="https://www.apple.com/in/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90"
              >
                <img
                  src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us.svg"
                  alt="App Store"
                  className="w-40"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center border-t-2 mt-4">
          <p className="mt-2 text-xs text-gray-500">
            All trademarks are the property of their respective owners <br /> All rights reserved
            2024 Info Edge (India) Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
