import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi"; // Importing the back icon

function UpdateProfile() {
  const navigate = useNavigate();

  // State for the form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  // Handling file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Profile updated successfully!");
    navigate("/profile"); // Redirect to profile page after updating
  };

  return (
    <div className="flex flex-col md:flex-row p-8 mx-auto mt-10 w-[80%] bg-gray-50 rounded-lg shadow-lg">
      {/* Left side - Profile Update Form */}
      <div className="md:w-1/2 p-6">
        {/* Back Button with Icon */}
        <button
          onClick={() => navigate("/profile")}
          className="text-blue-600 border-2 border-blue-600 rounded-full p-1 mb-6 hover:bg-blue-600 hover:text-white transition duration-300"
        >
          <FiArrowLeft size={24} />
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Update Profile
        </h2>

        {/* Profile Update Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-lg font-semibold text-gray-700" htmlFor="profilePicture">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {profilePicture && (
              <div className="mt-4">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full mx-auto"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Right side - Interactive Image */}
      <div className="md:w-[50%] p-6 flex items-center justify-center">
        <div className="relative">
          <img
            src="https://media.istockphoto.com/id/1385065100/photo/close-up-of-businessman-working-with-mobile-phone-and-stylus-pen-and-laptop-computer-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=swcPOMxfNW24QfBUrPF0AO9UUsO6BwW2xprNr9NOxLg="
            alt="Profile Update"
            className="rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-25 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;