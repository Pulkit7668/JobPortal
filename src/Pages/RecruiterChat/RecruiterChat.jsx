// import React, { useState, useEffect, useRef } from "react";
// import { TbSend2 } from "react-icons/tb";
// import { IoCloseCircleSharp } from "react-icons/io5";
// import { HiMenu } from "react-icons/hi";
// import { IoArrowBack } from "react-icons/io5"; // Import Back Icon
// import { useNavigate } from "react-router-dom";

// const recruiters = [
//   { id: 1, name: "Alex", image: "https://i.imgur.com/5X1N3Gx.png" },
//   { id: 2, name: "Sophia", image: "https://i.imgur.com/5X1N3Gx.png" },
//   { id: 3, name: "Michael", image: "https://i.imgur.com/5X1N3Gx.png" },
// ];

// const RecruiterChat = () => {
//   const [message, setMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [selectedRecruiter, setSelectedRecruiter] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const navigate = useNavigate();
//   const messagesEndRef = useRef(null);

//   // Handle window resize to check mobile view
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener("resize", checkIfMobile);
//     return () => window.removeEventListener("resize", checkIfMobile);
//   }, []);

//   // Load default messages when selecting a recruiter
//   useEffect(() => {
//     if (selectedRecruiter) {
//       setChatMessages([
//         {
//           sender: "recruiter",
//           text: `Hello! I'm ${selectedRecruiter.name}, a recruiter from Techizons. How can I assist you today?`,
//           time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         },
//       ]);
//     }
//   }, [selectedRecruiter]);

//   // Scroll to latest message
//   useEffect(() => {
//     if (chatMessages.length > 1) {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chatMessages]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim() !== "") {
//       const newMessage = {
//         sender: "user",
//         text: message,
//         time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       };
//       setChatMessages([...chatMessages, newMessage]);
//       setMessage("");

//       setTimeout(() => {
//         let responseText = message.toLowerCase().includes("job")
//           ? "We have an opening for a Frontend Developer. Would you like to apply?"
//           : "Thank you for reaching out. How can I further assist you?";

//         const recruiterResponse = {
//           sender: "recruiter",
//           text: responseText,
//           time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         };

//         setChatMessages((prevMessages) => [...prevMessages, recruiterResponse]);
//       }, 1000);
//     }
//   };

//   return (
//     <div className="mt-5 h-[90vh] flex bg-gray-100 relative">
//       {/* Recruiter List - Show only if no recruiter is selected on mobile */}
//       {(!selectedRecruiter || !isMobile) && (
//         <div className={`w-full md:w-1/4 bg-white border-r border-gray-300 p-4`}>
//           <h2 className="text-xl font-semibold mb-4">Recruiters</h2>
//           <ul className="space-y-4">
//             {recruiters.map((recruiter) => (
//               <li
//                 key={recruiter.id}
//                 className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-200"
//                 onClick={() => setSelectedRecruiter(recruiter)}
//               >
//                 <img src={recruiter.image || "/placeholder.svg"} alt={recruiter.name} className="w-10 h-10 rounded-full" />
//                 <span className="text-lg font-medium">{recruiter.name}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Chat Window - Show only when a recruiter is selected */}
//       {selectedRecruiter && (
//         <div className={`w-full md:w-3/4 flex flex-col`}>
//           {/* Chat Header */}
//           <div className="bg-indigo-500 text-white font-bold py-3 flex justify-between px-3 md:px-5 items-center">
//             {isMobile && (
//               <button onClick={() => setSelectedRecruiter(null)} className="text-white p-1">
//                 <IoArrowBack size={24} />
//               </button>
//             )}
//             <div className="flex items-center">
//               <img src={selectedRecruiter.image || "/placeholder.svg"} alt={selectedRecruiter.name} className="w-8 h-8 rounded-full mr-2" />
//               <h1 className="text-lg md:text-2xl truncate">{selectedRecruiter.name}</h1>
//             </div>
//             <button onClick={() => navigate("/")} className="text-white">
//               <IoCloseCircleSharp size={isMobile ? 24 : 30} />
//             </button>
//           </div>

//           {/* Chat Messages */}
//           <div className="flex-1 flex flex-col-reverse overflow-y-auto bg-white p-2 md:p-4">
//             <div className="space-y-3 md:space-y-4">
//               {chatMessages.map((msg, index) => (
//                 <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-center`}>
//                   {msg.sender === "recruiter" && (
//                     <img src={selectedRecruiter.image || "/placeholder.svg"} alt="Recruiter" className="w-7 h-7 md:w-8 md:h-8 rounded-full mr-2" />
//                   )}
//                   <div
//                     className={`max-w-[75%] md:max-w-xs px-3 py-2 md:px-4 rounded-lg shadow-md ${
//                       msg.sender === "user" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"
//                     }`}
//                   >
//                     <p className="text-sm md:text-base">{msg.text}</p>
//                     <p className="text-xs text-gray-600 mt-1">{msg.time}</p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           {/* Message Input */}
//           <div className="border-t border-gray-300 p-2 md:p-4 bg-gray-50">
//             <form onSubmit={handleSendMessage} className="flex items-center space-x-2 md:space-x-4">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
//                 placeholder="Type your message..."
//               />
//               <button type="submit" className="bg-indigo-500 text-white p-2 md:p-3 rounded-full hover:bg-indigo-600">
//                 <TbSend2 size={isMobile ? 20 : 25} />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecruiterChat;

"use client"

import { useState, useEffect, useRef } from "react"
import { TbSend2, TbPaperclip } from "react-icons/tb"
import { IoCloseCircleSharp } from "react-icons/io5"
import { IoArrowBack } from "react-icons/io5"
import { FiCheck } from "react-icons/fi"
import { BsEmojiSmile, BsThreeDotsVertical } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { BsCheck2All } from "react-icons/bs"

const recruiters = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "https://i.imgur.com/5X1N3Gx.png",
    role: "Technical Recruiter",
    status: "online",
  },
  {
    id: 2,
    name: "Sophia Williams",
    image: "https://i.imgur.com/5X1N3Gx.png",
    role: "HR Manager",
    status: "online",
  },
  {
    id: 3,
    name: "Michael Chen",
    image: "https://i.imgur.com/5X1N3Gx.png",
    role: "Senior Recruiter",
    status: "away",
  },
  {
    id: 4,
    name: "Emma Davis",
    image: "https://i.imgur.com/5X1N3Gx.png",
    role: "Talent Acquisition",
    status: "offline",
  },
]

// Predefined responses for demo purposes
const responseOptions = {
  greeting: [
    "Hello! How can I help you with your job search today?",
    "Hi there! Looking for new opportunities?",
    "Welcome! I'm here to help with your career questions.",
  ],
  job: [
    "We have several openings that might match your skills. Are you interested in frontend, backend, or full-stack roles?",
    "Great timing! We're currently hiring for multiple developer positions. Could you tell me about your experience?",
    "We have an opening for a Frontend Developer with React experience. Would you like to apply?",
  ],
  experience: [
    "Your experience sounds impressive! Could you share your portfolio or GitHub?",
    "That's exactly what we're looking for! When would you be available for an interview?",
    "Interesting background! How comfortable are you with agile development methodologies?",
  ],
  default: [
    "Thank you for reaching out. How can I further assist you?",
    "That's great to know. What specific questions do you have about the position?",
    "I appreciate your interest. Would you like me to schedule a call with the hiring manager?",
  ],
}

const RecruiterChat = () => {
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [selectedRecruiter, setSelectedRecruiter] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredRecruiters, setFilteredRecruiters] = useState(recruiters)
  const [showDropdown, setShowDropdown] = useState(false)

  const navigate = useNavigate()
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const fileInputRef = useRef(null)

  // Handle window resize to check mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Filter recruiters based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = recruiters.filter((recruiter) => recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredRecruiters(filtered)
    } else {
      setFilteredRecruiters(recruiters)
    }
  }, [searchTerm])

  // Load default messages when selecting a recruiter
  useEffect(() => {
    if (selectedRecruiter) {
      setChatMessages([
        {
          id: Date.now(),
          sender: "recruiter",
          text: `Hello! I'm ${selectedRecruiter.name}, a ${selectedRecruiter.role} at Techizons. How can I assist you today?`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "read",
        },
      ])
    }
  }, [selectedRecruiter])

  // Scroll to latest message
  useEffect(() => {
    if (chatMessages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  const getRandomResponse = (type) => {
    const responses = responseOptions[type] || responseOptions.default
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = (e) => {
    e?.preventDefault()
    if (message.trim() !== "") {
      const newMessage = {
        id: Date.now(),
        sender: "user",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
      }

      setChatMessages((prev) => [...prev, newMessage])
      setMessage("")
      setShowEmojiPicker(false)

      // Show typing indicator
      setIsTyping(true)

      // Determine response type based on message content
      let responseType = "default"
      if (
        message.toLowerCase().includes("job") ||
        message.toLowerCase().includes("position") ||
        message.toLowerCase().includes("work")
      ) {
        responseType = "job"
      } else if (message.toLowerCase().includes("experience") || message.toLowerCase().includes("skills")) {
        responseType = "experience"
      } else if (
        message.toLowerCase().includes("hi") ||
        message.toLowerCase().includes("hello") ||
        message.toLowerCase().includes("hey")
      ) {
        responseType = "greeting"
      }

      // Update sent message to delivered
      setTimeout(() => {
        setChatMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))
      }, 500)

      // Send recruiter response after delay
      setTimeout(
        () => {
          setIsTyping(false)

          const recruiterResponse = {
            id: Date.now() + 1,
            sender: "recruiter",
            text: getRandomResponse(responseType),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "sent",
          }

          setChatMessages((prev) => [...prev, recruiterResponse])

          // Update user message to read
          setChatMessages((prev) => prev.map((msg) => (msg.sender === "user" ? { ...msg, status: "read" } : msg)))
        },
        1500 + Math.random() * 1000,
      )
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const fileName = e.target.files[0].name
      setMessage((prev) => prev + ` [File: ${fileName}]`)
      inputRef.current.focus()
    }
  }

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji)
    inputRef.current.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <FiCheck className="text-gray-400" />
      case "delivered":
        return <BsCheck2All className="text-gray-400" />
      case "read":
        return <BsCheck2All className="text-blue-500" />
      default:
        return null
    }
  }

  const getStatusIndicator = (status) => {
    let className = "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white "
    switch (status) {
      case "online":
        className += "bg-green-500"
        break
      case "away":
        className += "bg-yellow-500"
        break
      case "offline":
        className += "bg-gray-400"
        break
      default:
        className += "bg-gray-400"
    }
    return <span className={className}></span>
  }

  // Simple emoji picker component
  const EmojiPicker = () => {
    const emojis = ["😊", "👍", "🎉", "❤️", "😂", "🙌", "👏", "🤔", "👋", "🔥", "✅", "⭐", "🚀"]

    return (
      <div className="absolute bottom-full left-4 bg-white rounded-lg shadow-lg p-2 flex flex-wrap w-[280px] mb-2 z-10 animate-fadeIn">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className="text-xl w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer rounded hover:bg-gray-100 transition-colors"
            onClick={() => handleEmojiClick(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex h-[90vh] bg-gray-100 relative mt-5 overflow-hidden rounded-xl shadow-lg">
      {/* Recruiter List - Show only if no recruiter is selected on mobile */}
      {(!selectedRecruiter || !isMobile) && (
        <div
          className={`w-full md:w-[320px] bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
            selectedRecruiter && isMobile ? "hidden" : ""
          }`}
        >
          <div className="p-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recruiters</h2>
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search recruiters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          <ul className="overflow-y-auto flex-1 py-2">
            {filteredRecruiters.map((recruiter) => (
              <li
                key={recruiter.id}
                className={`flex items-center px-5 py-3 cursor-pointer transition-all hover:bg-gray-50 border-l-[3px] ${
                  selectedRecruiter?.id === recruiter.id ? "bg-indigo-50 border-l-indigo-500" : "border-l-transparent"
                }`}
                onClick={() => setSelectedRecruiter(recruiter)}
              >
                <div className="relative mr-3">
                  <img
                    src={recruiter.image || "/placeholder.svg"}
                    alt={recruiter.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  {getStatusIndicator(recruiter.status)}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800 text-[0.95rem]">{recruiter.name}</span>
                  <span className="text-xs text-gray-500 mt-1">{recruiter.role}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chat Window - Show only when a recruiter is selected */}
      {selectedRecruiter && (
        <div className={`flex-1 flex flex-col bg-white transition-all duration-300 ${isMobile ? "w-full" : ""}`}>
          {/* Chat Header */}
          <div className="bg-indigo-500 text-white py-3 px-4 md:px-5 flex justify-between items-center border-b border-indigo-600">
            <div className="flex items-center">
              {isMobile && (
                <button
                  onClick={() => setSelectedRecruiter(null)}
                  className="text-white mr-3 bg-transparent border-none cursor-pointer flex items-center justify-center p-1 rounded-full hover:bg-indigo-400 transition-colors"
                >
                  <IoArrowBack size={24} />
                </button>
              )}
              <div className="relative mr-2">
                <img
                  src={selectedRecruiter.image || "/placeholder.svg"}
                  alt={selectedRecruiter.name}
                  className="w-10 h-10 rounded-full border-2 border-indigo-400"
                />
                {getStatusIndicator(selectedRecruiter.status)}
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-semibold">{selectedRecruiter.name}</h1>
                <span className="text-xs opacity-80">
                  {selectedRecruiter.status === "online"
                    ? "Online"
                    : selectedRecruiter.status === "away"
                      ? "Away"
                      : "Offline"}
                </span>
              </div>
            </div>
            <div className="flex items-center relative">
              <button
                className="text-white bg-transparent border-none cursor-pointer mr-3 p-1 rounded-full hover:bg-indigo-400 transition-colors"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <BsThreeDotsVertical size={20} />
              </button>
              {showDropdown && (
                <div className="absolute top-full right-0 bg-white rounded-lg shadow-lg w-[180px] z-10 mt-2 overflow-hidden animate-fadeIn">
                  <button className="py-3 px-4 text-left w-full bg-transparent border-none text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                    View Profile
                  </button>
                  <button className="py-3 px-4 text-left w-full bg-transparent border-none text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                    Clear Chat
                  </button>
                  <button className="py-3 px-4 text-left w-full bg-transparent border-none text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors">
                    Block Recruiter
                  </button>
                </div>
              )}
              <button
                onClick={() => navigate("/")}
                className="text-white bg-transparent border-none cursor-pointer flex items-center justify-center"
              >
                <IoCloseCircleSharp size={isMobile ? 24 : 28} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col-reverse">
            <div className="flex flex-col">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                >
                  {msg.sender === "recruiter" && (
                    <img
                      src={selectedRecruiter.image || "/placeholder.svg"}
                      alt="Recruiter"
                      className="w-8 h-8 rounded-full mr-2 self-end"
                    />
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm max-w-[75%] md:max-w-[60%] ${
                      msg.sender === "user"
                        ? "bg-indigo-500 text-white rounded-br-sm"
                        : "bg-gray-200 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-[0.95rem] leading-relaxed break-words">{msg.text}</p>
                    <div className="flex items-center justify-end mt-1 text-xs">
                      <span className={`${msg.sender === "user" ? "opacity-80" : "text-gray-500"}`}>{msg.time}</span>
                      {msg.sender === "user" && getStatusIcon(msg.status)}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex mb-4 justify-start animate-fadeIn">
                  <img
                    src={selectedRecruiter.image || "/placeholder.svg"}
                    alt="Recruiter"
                    className="w-8 h-8 rounded-full mr-2 self-end"
                  />
                  <div className="bg-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center">
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="p-3 border-t border-gray-200 bg-white relative">
            {showEmojiPicker && <EmojiPicker />}

            <form onSubmit={handleSendMessage} className="flex items-center">
              <button
                type="button"
                className="bg-transparent border-none text-gray-500 p-2 rounded-full hover:bg-gray-100 hover:text-indigo-500 transition-colors"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <BsEmojiSmile size={20} />
              </button>

              <button
                type="button"
                className="bg-transparent border-none text-gray-500 p-2 rounded-full hover:bg-gray-100 hover:text-indigo-500 transition-colors"
                onClick={handleFileUpload}
              >
                <TbPaperclip size={20} />
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              </button>

              <input
                type="text"
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 py-3 px-4 mx-2 border border-gray-200 rounded-full text-[0.95rem] bg-gray-50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white transition-all"
                placeholder="Type your message..."
              />

              <button
                type="submit"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  message.trim()
                    ? "bg-indigo-500 text-white hover:bg-indigo-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!message.trim()}
              >
                <TbSend2 size={20} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </div>
  )
}

export default RecruiterChat