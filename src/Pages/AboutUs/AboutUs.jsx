import React from "react";
import { FaRegSmile, FaLightbulb, FaUsers, FaChartLine } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8 mt-5">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          At <span className="font-semibold text-blue-500">YourCompany</span>, we are driven by passion, creativity, and a commitment to excellence. Our mission is to empower individuals and organizations with innovative solutions that shape the future.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {/* Mission Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4 text-blue-500">
              <FaLightbulb size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To deliver cutting-edge solutions that make a difference in the lives of our clients and communities.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4 text-blue-500">
              <FaRegSmile size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To inspire innovation and foster growth, creating a sustainable and inclusive future for all.
            </p>
          </div>

          {/* Team Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4 text-blue-500">
              <FaUsers size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Team</h3>
            <p className="text-gray-600">
              A group of passionate professionals dedicated to turning ideas into reality with collaboration and creativity.
            </p>
          </div>

          {/* Growth Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center mb-4 text-blue-500">
              <FaChartLine size={40} />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Growth</h3>
            <p className="text-gray-600">
              Continuously evolving to meet the dynamic needs of the industry, while staying true to our values.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We combine expertise, creativity, and a customer-first approach to deliver exceptional results. From the initial concept to the final delivery, we ensure a seamless and delightful experience for our clients.
          </p>
        </div>

        <div className="mt-16 text-left max-w-4xl mx-auto bg-blue-100 rounded-lg shadow p-6">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">Contact Us</h3>
          <p className="text-lg text-gray-600">
            Have questions? Reach out to us using the details below:
          </p>
          <ul className="mt-4 space-y-2">
            <li className="text-gray-700">
              <strong>Email:</strong> contact@yourcompany.com
            </li>
            <li className="text-gray-700">
              <strong>Phone:</strong> +1 234 567 890
            </li>
            <li className="text-gray-700">
              <strong>Address:</strong> 123 Innovation Street, TechCity, USA
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
