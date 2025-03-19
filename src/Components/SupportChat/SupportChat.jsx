import React, { useState, useEffect, useRef } from 'react';
import { TbSend2 } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const SupportChat = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: 'Hello! How can I assist you today?' },
  ]);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      setChatMessages([...chatMessages, { sender: 'user', text: message }]);
      setMessage('');

      // Simulate a response from support after a delay
      setTimeout(() => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'support', text: 'I am here to help you!' },
        ]);
      }, 1000);
    }
  };

  const handleCloseChat = () => {
    navigate("/");
  };

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="mt-5 h-[90vh] bg-gray-100 flex flex-col">
      {/* Chat Header */}
      <div className="bg-indigo-500 text-white text-3xl font-bold p-8 relative">
        <h1 className="ml-5"></h1>
        <button
          onClick={handleCloseChat}
          className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white"
        >
          <IoCloseCircleSharp size={30} />
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col-reverse overflow-y-auto bg-white p-4">
        <div className="space-y-4">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Auto-scroll reference */}
        </div>
      </div>

      {/* Message Input */}
      <div className="border border-gray-300 p-4 mb-4 bg-gray-50">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600"
          >
            <TbSend2 size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportChat;

