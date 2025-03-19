import React, { useState, useEffect, useRef } from "react";
import { TbSend2 } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const recruiters = [
  { id: 1, name: "Alex", image: "https://i.imgur.com/5X1N3Gx.png" },
  { id: 2, name: "Sophia", image: "https://i.imgur.com/5X1N3Gx.png" },
  { id: 3, name: "Michael", image: "https://i.imgur.com/5X1N3Gx.png" },
];

const RecruiterChat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(recruiters[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const sidebarRef = useRef(null);

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener("resize", checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  useEffect(() => {
    // Load default messages when selecting a recruiter
    setChatMessages([
      {
        sender: "recruiter",
        text: `Hello! I'm ${selectedRecruiter.name}, a recruiter from Techizons. How can I assist you today?`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    
    // Close sidebar on mobile after selecting a recruiter
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [selectedRecruiter, isMobile]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const newMessage = {
        sender: "user",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage("");

      setTimeout(() => {
        let responseText = message.toLowerCase().includes("job")
          ? "We have an opening for a Frontend Developer. Would you like to apply?"
          : "Thank you for reaching out. How can I further assist you?";

        const recruiterResponse = {
          sender: "recruiter",
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setChatMessages((prevMessages) => [...prevMessages, recruiterResponse]);
      }, 1000);
    }
  };

  const handleCloseChat = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (chatMessages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div className="mt-5 h-[90vh] flex bg-gray-100 relative">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Recruiter List Sidebar */}
      <div 
        ref={sidebarRef}
        className={`
          ${isMobile ? 'fixed left-0 top-0 h-full z-20' : 'w-1/4'} 
          ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
          bg-white border-r border-gray-300 p-4 transition-transform duration-300 ease-in-out
          ${isMobile ? 'w-3/4 max-w-xs' : ''}
        `}
      >
        <h2 className="text-xl font-semibold mb-4">Recruiters</h2>
        <ul className="space-y-4">
          {recruiters.map((recruiter) => (
            <li
              key={recruiter.id}
              className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md ${
                selectedRecruiter.id === recruiter.id ? "bg-indigo-100" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedRecruiter(recruiter)}
            >
              <img src={recruiter.image || "/placeholder.svg"} alt={recruiter.name} className="w-10 h-10 rounded-full" />
              <span className="text-lg font-medium">{recruiter.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className={`${isMobile ? 'w-full' : 'w-3/4'} flex flex-col`}>
        {/* Chat Header */}
        <div className="bg-indigo-500 text-white font-bold py-3 flex justify-between px-3 md:px-5 items-center">
          {isMobile && (
            <button onClick={toggleSidebar} className="text-white p-1">
              <HiMenu size={24} />
            </button>
          )}
          <div className="flex items-center">
            {isMobile && (
              <img 
                src={selectedRecruiter.image || "/placeholder.svg"} 
                alt={selectedRecruiter.name} 
                className="w-8 h-8 rounded-full mr-2" 
              />
            )}
            <h1 className="text-lg md:text-2xl truncate">
              {selectedRecruiter.name} - Recruiter Chat
            </h1>
          </div>
          <button onClick={handleCloseChat} className="text-white">
            <IoCloseCircleSharp size={isMobile ? 24 : 30} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col-reverse overflow-y-auto bg-white p-2 md:p-4">
          <div className="space-y-3 md:space-y-4">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-center`}>
                {msg.sender === "recruiter" && (
                  <img src={selectedRecruiter.image || "/placeholder.svg"} alt="Recruiter" className="w-7 h-7 md:w-8 md:h-8 rounded-full mr-2" />
                )}
                <div
                  className={`max-w-[75%] md:max-w-xs px-3 py-2 md:px-4 rounded-lg shadow-md ${
                    msg.sender === "user" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm md:text-base">{msg.text}</p>
                  <p className="text-xs text-gray-600 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-300 p-2 md:p-4 bg-gray-50">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2 md:space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
              placeholder="Type your message..."
            />
            <button type="submit" className="bg-indigo-500 text-white p-2 md:p-3 rounded-full hover:bg-indigo-600">
              <TbSend2 size={isMobile ? 20 : 25} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecruiterChat;