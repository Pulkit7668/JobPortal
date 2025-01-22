import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { label: "Facebook", icon: <FaFacebookF />, url: "", color: "text-blue-600" },
    { label: "Instagram", icon: <FaInstagram />, url: "", color: "text-pink-500" },
    { label: "Twitter", icon: <FaTwitter />, url: "", color: "text-blue-400" },
    { label: "LinkedIn", icon: <FaLinkedinIn />, url: "", color: "text-blue-800" },
  ];

  const links = [
    {
      title: "Company",
      items: [
        { name: "About us", path: "" },
        { name: "Careers", path: "" },
      ],
    },
    {
      title: "Support",
      items: [
        { name: "Help Center", path: "" },
        { name: "Privacy Policy", path: "" },
        { name: "Terms & Conditions", path: "" },
      ],
    },
  ];

  return (
    <footer className="text-gray-800 border-t-2 lg:mx-20 py-8">
      <div className="mx-auto px-4">
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
                href="#"
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
