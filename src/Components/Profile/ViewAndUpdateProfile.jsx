import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const ViewAndUpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "Pulkit Gautam",
    email: "pulkit@example.com",
    bio: "B.Tech/B.E. Production/Industrial at Hi-Tech Institute of Engineering & Tech",
    location: "New York, USA",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use fetch to send the PUT request
      const response = await fetch("/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!", {
          style: {
            backgroundColor: "#d4edda",
            color: "#155724",           
          },
        });
      } else {
        toast.error("Failed to update profile. Please try again later.", {
          style: {
            backgroundColor: "#f8d7da", 
            color: "#721c24",             
          },
        });
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again later.", {
        style: {
          backgroundColor: "#f8d7da",
          color: "#721c24",        
        },
      });
    } finally {
      setLoading(false);
    }
  };


  const handleTestSuccess = () => {
    toast.success("This is a test success toast!", {
      style: {
        backgroundColor: "#d4edda", 
        color: "#155724",           
      },
    });
  };

  return (
    <div className="mt-12 mb-10 lg:mx-24 xs:mx-5">
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft size={40} className="mr-3 p-2 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-300" />
        </button>
        <h1 className="xs:text-xl md:text-3xl font-bold">View & Update Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-4">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={profileData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Button to manually trigger a success toast */}
      <button 
        onClick={handleTestSuccess} 
        className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
      >
        Test Success Toast
      </button>

      <Toaster />
    </div>
  );
};

export default ViewAndUpdateProfile;
