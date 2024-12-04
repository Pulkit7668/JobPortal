import React from "react";

function ProfileCard() {
  const profileCompletion = 40;

  const progressColor = profileCompletion >= 75 ? "#34D399" : "#F04141";

  return (
    <div className="w-80 bg-white rounded-xl shadow-lg p-6">
      {/* Profile Picture and Progress Circle */}
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          {/* Outer Circle */}
          <svg className="absolute top-0 left-0 w-20 h-20" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#F87171"
              strokeWidth="3"
              strokeDasharray="100"
              strokeDashoffset={`${100 - profileCompletion}`}
              transform="rotate(-90 18 18)"
            />
          </svg>
          {/* Placeholder Image */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
            <img
              src="https://static.naukimg.com/s/0/0/i/ni-gnb-revamped/userdp_v1.svg"
              alt="Profile"
              className="rounded-full w-[70%] h-[70%] object-cover"
            />
          </div>
          {/* Completion Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-700">
              {profileCompletion}%
            </span>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="text-center mt-4">
        <h2 className="text-lg font-bold">Pulkit Gautam</h2>
        <p className="text-sm text-gray-500">
          B.Tech/B.E. Production/Industrial at Hi-Tech Institute of Engineering & Tech
        </p>
        <p className="text-xs text-gray-400 mt-1">Last updated today</p>
      </div>

      {/* Complete Profile Button */}
      <div className="mt-4 flex justify-center">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700">
          Complete profile
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
