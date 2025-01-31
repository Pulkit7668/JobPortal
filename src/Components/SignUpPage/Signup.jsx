import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";

function Signup() {
  const [workStatus, setWorkStatus] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent form submission

    // Example form submission logic (you can replace this with actual API call logic)
    const isFormValid = true; // Replace with actual validation logic

    if (isFormValid) {
      // Display success toast
      toast.success("Registration successful!", {
        duration: 3000,
        onClose: () => navigate("/"), // Navigate after the toast closes
      });
    } else {
      // Display error toast
      toast.error("Registration failed. Please try again.");
    }
  };

  const closeSignup = () => {
    navigate("/"); // Redirect to homepage when close icon is clicked
  };

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center md:p-6 mt-10">
        <div className="flex w-full overflow-hidden">
          
          {/* Left Section - Box with fixed height and sticky */}
          <div className="w-[40%] p-6 ml-20 flex flex-col items-center justify-center h-[65vh] sticky top-20 xs:hidden lg:block">
            <div className="bg-white p-6 rounded-lg shadow-md w-[60%] h-[100%] text-center">
              <img
                src="https://plus.unsplash.com/premium_vector-1721224450752-b0f014727713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMElsbHVzdHJhdGlvbnN8ZW58MHx8MHx8fDA%3D"
                alt="Benefits"
                className="w-52 h-52 mb-3 border rounded-full p-2 mx-auto"
              />
              <div className="mt-10">
                <h2 className="text-lg font-bold">On registering, you can</h2>
                <ul className="mt-3 space-y-2 text-xs font-medium text-center text-gray-700">
                  <li>✅ Build your profile and let recruiters find you</li>
                  <li>✅ Get job postings delivered right to your email</li>
                  <li>✅ Find a job and grow your career</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right Section - Box */}
          <div className="lg:w-[55%] xs:p-2 lg:p-6">
            <div className="border p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <h1 className="xs:text-xl md:text-3xl font-bold">Create your Naukri profile</h1>
                <button onClick={closeSignup} className="text-gray-500 hover:text-gray-700">
                  <AiOutlineClose size={24} />
                </button>
              </div>
              <p className="text-sm font-semibold text-gray-600 mt-2">Search & apply to jobs from India's No.1 Job Site</p>
              
              <form className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" placeholder="What is your Name" className="w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email ID</label>
                  <input type="email" placeholder="Tell us your Email ID" className="w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" placeholder="(minimum 6 characters)" className="w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <div className="flex items-center border rounded-lg p-3">
                    <span className="text-gray-600 mr-2">+91</span>
                    <input type="tel" placeholder="Enter your mobile number" className="w-full outline-none" required />
                  </div>
                </div>
                
                {/* Work Status Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Work Status</label>
                  <div className="flex gap-4 mt-2">
                    <div
                      className={`flex-1 p-4 border rounded-lg cursor-pointer ${workStatus === "experienced" ? "border-blue-500 " : "border-gray-300"}`}
                      onClick={() => setWorkStatus("experienced")}
                    >
                      <h3 className="xs:text-xs md:text-base font-semibold">I'm experienced</h3>
                      <p className="xs:text-xs md:text-sm text-gray-600">I have work experience (excluding internships)</p>
                    </div>
                    <div
                      className={`flex-1 p-4 border rounded-lg cursor-pointer ${workStatus === "fresher" ? "border-blue-500" : "border-gray-300"}`}
                      onClick={() => setWorkStatus("fresher")}
                    >
                      <h3 className="xs:text-xs md:text-base font-semibold">I'm a fresher</h3>
                      <p className="xs:text-xs md:text-sm text-gray-600">I am a student / Haven't worked after graduation</p>
                    </div>
                  </div>
                </div>

                {/* Conditionally Render Resume Upload for Experienced Users with smooth transition */}
                <div className={`mt-4 transition-all duration-500 ease-in-out ${workStatus === "experienced" ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                  <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
                  <div className="mt-2">
                    <input
                      type="file"
                      className="w-full p-3 border rounded-lg text-white"
                    />                    
                    <p className="text-xs font-semibold text-gray-600 mt-2">Accepted formats: (DOC, DOCx, PDF, RTF | Max size: 2 MB)</p>
                  </div>
                </div>

                {/* City Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current City</label>
                  <input type="text" className="w-full p-3 border rounded-lg" required />
                </div>
                
                {/* Register Button */}
                <button 
                  type="button" // Prevent form submission
                  onClick={handleFormSubmit} 
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
