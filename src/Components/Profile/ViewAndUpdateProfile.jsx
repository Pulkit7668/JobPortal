import { useState, useRef } from "react";
import { FaEdit, FaMapMarkerAlt, FaPhone, FaEnvelope, FaVenusMars, FaBirthdayCake } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

function ViewAndUpdateProfile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Pulkit Gautam",
    education: "B.Tech/B.E.",
    college: "Hi-Tech Institute of Engineering & Technology, Ghaziabad",
    location: "Noida",
    hometown: "Agra",
    email: "pulkitpandit12345@gmail.com",
    phone: "7668432641",
    gender: "Male",
    birthday: "12/12/1999",
    currentLocation: "",
  });
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setPhoto(URL.createObjectURL(file));
    } else {
      alert("Please select a valid file (png, jpg, jpeg, gif - up to 2MB)");
    }
  };

  const handleGenderClick = (gender) => {
    setProfile({ ...profile, gender });
  };

  const handleRemoveGender = () => {
    setProfile({ ...profile, gender: "Add Gender" });
  };

  // Function to calculate profile completion percentage
  const calculateProfileCompletion = () => {
    const filledFields = Object.values(profile).filter((field) => field && field !== "Add Gender").length;
    const totalFields = 9; // Total fields to be considered for completion
    return Math.round((filledFields / totalFields) * 100);
  };

  return (
    <div className="max-w-6xl h-[40vh] mx-auto p-10 bg-white shadow-md rounded-lg relative flex items-center gap-6 mt-10 mb-10">
      <div
        className="relative w-32 h-32 rounded-full border-4 border-gray-200 flex items-center justify-center bg-gray-300 text-gray-600 text-sm font-bold cursor-pointer"
        onClick={() => setShowPhotoModal(true)}
      >
        <div className="mt-6">
          {photo ? (
            <img src={photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span>Add photo</span>
          )}

          <FaPlus className="absolute text-gray-400 bg-white p-1 rounded-full text-3xl top-8 left-1/2 transform -translate-x-1/2" size={25} />
        </div>

        {/* Dynamically update completion percentage */}
        <div className="absolute bottom-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{calculateProfileCompletion()}%</div>
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          {profile.name} <FaEdit className="text-gray-500 cursor-pointer" onClick={() => setEditing(true)} />
        </h2>
        <p className="text-gray-600">{profile.education}</p>
        <p className="text-gray-500">{profile.college}</p>
        <div className="mt-2 flex gap-6 text-gray-600">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt /> {profile.location}
            </div>
            <div className="flex items-center gap-2">
              <FaVenusMars /> {profile.gender}
            </div>
            <div className="flex items-center gap-2">
              <FaBirthdayCake /> {profile.birthday}
            </div>
          </div>

          <div className="border-l border-gray-300 pl-6 flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <FaPhone /> {profile.phone}
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope /> {profile.email}
            </div>
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[50%]">
            <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
              Edit Profile
              <FaTimes
                className="cursor-pointer text-red-500"
                onClick={() => setEditing(false)} // Close editing mode when clicked
              />
            </h2>
            <div className="space-y-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: '400px', paddingRight: '10px' }}>
              <div>
                <label className="font-medium">Email</label>
                <input name="email" value={profile.email} onChange={handleChange} className="w-full p-2 border rounded-2xl" />
              </div>
              <div>
                <label className="font-medium">Phone</label>
                <input name="phone" value={profile.phone} onChange={handleChange} className="w-full p-2 border rounded-2xl" />
              </div>
              <div>
                <label className="font-medium">Gender</label>
                <div className="flex gap-4 mt-2">
                  {profile.gender === "Add Gender" && (
                    <>
                      <button
                        onClick={() => handleGenderClick("Male")}
                        className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-blue-500 hover:text-white"
                      >
                        Male
                      </button>
                      <button
                        onClick={() => handleGenderClick("Female")}
                        className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-pink-500 hover:text-white"
                      >
                        Female
                      </button>
                      <button
                        onClick={() => handleGenderClick("Transgender")}
                        className="px-4 py-2 border-2 rounded-3xl bg-white text-gray-600 border-gray-300 hover:bg-purple-500 hover:text-white"
                      >
                        Transgender
                      </button>
                    </>
                  )}

                  {profile.gender !== "Add Gender" && (
                    <div className="px-4 py-2 border-2 rounded-3xl bg-gray-200 text-gray-600 flex items-center gap-2">
                      {profile.gender}
                      <FaTimes
                        className="text-red-500 cursor-pointer"
                        onClick={handleRemoveGender}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="font-medium">Date of birth (DD/MM/YYYY)</label>
                <input name="birthday" onChange={handleChange} className="w-full p-2 border rounded-2xl" />
              </div>
              <div>
                <label className="font-medium">Current Location</label>
                <input name="currentLocation" value={profile.currentLocation} onChange={handleChange} className="w-full p-2 border rounded-2xl" />
              </div>
              <div>
                <label className="font-medium">Hometown</label>
                <input name="hometown" value={profile.hometown} onChange={handleChange} className="w-full p-2 border rounded-2xl" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setEditing(false)} className="mr-5 font-semibold text-blue-600 rounded-lg">Cancel</button>
              <button
                onClick={() => {
                  setProfile({
                    ...profile,
                    location: profile.currentLocation,
                  });
                  setEditing(false);
                }}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Upload Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-3xl shadow-lg w-[50%] text-center">
            <h2 className="text-xl font-bold">Upload a Recent Photo</h2>
            <p className="text-gray-600 mb-4 font-semibold">
              Photo enhances memorability and helps you demonstrate professionalism.
            </p>
            <div className="text-center flex items-center justify-center">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="block px-3 py-2 font-semibold border rounded-3xl mt-2 text-white bg-blue-600"
              >
                Upload Photo 
              </button>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handlePhotoChange}
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="hidden"
              />
            </div>
            <div className="mt-4 text-sm font-medium text-gray-500">
              Supported file format: png, jpg, jpeg, gif - up to 2MB
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowPhotoModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Cancel</button>
              <button onClick={() => setShowPhotoModal(false)} className="px-4 py-2 bg-green-600 text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewAndUpdateProfile;