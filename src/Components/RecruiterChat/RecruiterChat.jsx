import React, { useState, useEffect, useRef } from "react";
import { TbSend2 } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const RecruiterChat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "recruiter",
      text: "Hello! I'm Alex, a recruiter from Techizons. How can I assist you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

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

      // Simulate recruiter response
      setTimeout(() => {
        let responseText = "";
        if (message.toLowerCase().includes("job")) {
          responseText = "We have an opening for a Frontend Developer. Would you like to apply?";
        } else if (message.toLowerCase().includes("interview")) {
          responseText = "Your interview is scheduled for Monday at 10 AM. Does that work for you?";
        } else {
          responseText = "Thank you for reaching out. How can I further assist you?";
        }

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

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatMessages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div className="mt-5 h-[90vh] bg-gray-100 flex flex-col">
      {/* Chat Header */}
      <div className="bg-indigo-500 text-white text-2xl font-bold py-3 flex justify-between px-5 items-center">
        <h1>Recruiter Chat</h1>
        <button onClick={handleCloseChat} className="text-white">
          <IoCloseCircleSharp size={30} />
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col-reverse overflow-y-auto bg-white p-4">
        <div className="space-y-4">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-center`}>
              {msg.sender === "recruiter" && (
                <img
                  src="https://i.imgur.com/5X1N3Gx.png"
                  alt="Recruiter"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${msg.sender === "user" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                <p>{msg.text}</p>
                <p className="text-xs text-gray-600 mt-1">{msg.time}</p>
              </div>
              {msg.sender === "user" && (
                <img
                  src="https://i.imgur.com/Q0k3pKM.png"
                  alt="User"
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-300 p-4 mb-4 bg-gray-50">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your message..."
          />
          <button type="submit" className="bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600">
            <TbSend2 size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecruiterChat;
