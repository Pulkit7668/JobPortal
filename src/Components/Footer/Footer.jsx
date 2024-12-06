import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
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
              <Link to="/facebook" aria-label="Facebook" className="text-blue-600 hover:text-blue-800">
                <FaFacebookF className="text-2xl" />
              </Link>
              <Link to="/instagram" aria-label="Instagram" className="text-pink-500 hover:text-pink-700">
                <FaInstagram className="text-2xl" />
              </Link>
              <Link to="/twitter" aria-label="Twitter" className="text-blue-400 hover:text-blue-600">
                <FaTwitter className="text-2xl" />
              </Link>
              <Link to="/linkedin" aria-label="LinkedIn" className="text-blue-800 hover:text-blue-900">
                <FaLinkedinIn className="text-2xl" />
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="font-bold mb-2">Company</h5>
              <ul>
                <li className="mb-1">
                  <Link to="/about-us" className="hover:text-blue-600">
                    About us
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/careers" className="hover:text-blue-600">
                    Careers
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/employer-home" className="hover:text-blue-600">
                    Employer Home
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/sitemap" className="hover:text-blue-600">
                    Sitemap
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/credits" className="hover:text-blue-600">
                    Credits
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-2">Support</h5>
              <ul>
                <li className="mb-1">
                  <Link to="/help-center" className="hover:text-blue-600">
                    Help Center
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/privacy-policy" className="hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/terms-conditions" className="hover:text-blue-600">
                    Terms & Conditions
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/fraud-alert" className="hover:text-blue-600">
                    Fraud Alert
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/trust-safety" className="hover:text-blue-600">
                    Trust & Safety
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Apply on the Go Section */}
          <div className="p-4 border-2 border-gray-200 hover:shadow-2xl rounded-3xl text-center">
            <h5 className="text-lg font-bold mb-2">Apply on the go</h5>
            <p className="text-sm text-gray-600 mb-4">Get real-time job updates on our App</p>
            <div className="flex justify-center space-x-4">
              <a
                href=""
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
                href=""
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
            <p className="mt-2 text-xs text-gray-500">All trademarks are the property of their respective owners <br /> All rights reserved 2024 Info Edge (India) Ltd.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
