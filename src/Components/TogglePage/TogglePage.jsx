import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const TogglePage = ({ jobTitle, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.resume) {
      toast.error("Please fill all the required fields!");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Submitting your application...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(`You have successfully applied for the ${jobTitle} position!`, {
        id: loadingToast,
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 md:rounded-lg shadow-lg w-full max-w-md xs:h-full md:h-[5%] lg:h-[65%] ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Apply for {jobTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 font-semibold p-2"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Resume Upload */}
          <div className="mb-4">
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-4">
              Resume Upload<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleChange}
              required
              className="mt-1 block w-full"
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
        <Toaster position="top-center" /> {/* Add Toaster component here */}
      </div>
    </div>
  );
};

export default TogglePage;
