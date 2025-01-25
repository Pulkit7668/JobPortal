// import React, { useState } from 'react';
// import { AiOutlineClose } from 'react-icons/ai';
// import { TbSend2 } from "react-icons/tb";
// import { useNavigate } from 'react-router-dom';

// const SupportChat = () => {
//   const [adminMessages, setAdminMessages] = useState([
//     { sender: 'admin', text: 'Hello, Welcome to Admin Support! How can I assist you today?' },
//   ]);
//   const [recruiterMessages, setRecruiterMessages] = useState([
//     { sender: 'recruiter', text: 'Hello, Welcome to Recruiter Support! How can I help you today?' },
//   ]);
//   const [message, setMessage] = useState('');
//   const [activeChat, setActiveChat] = useState('');
//   const navigate = useNavigate();

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       if (activeChat === 'admin') {
//         setAdminMessages([...adminMessages, { sender: 'user', text: message }]);
//         setTimeout(() => {
//           setAdminMessages((prev) => [
//             ...prev,
//             { sender: 'admin', text: 'How can I assist you today?' },
//           ]);
//         }, 1000);
//       } else if (activeChat === 'recruiter') {
//         setRecruiterMessages([...recruiterMessages, { sender: 'user', text: message }]);
//         setTimeout(() => {
//           setRecruiterMessages((prev) => [
//             ...prev,
//             { sender: 'recruiter', text: 'What can I help you with?' },
//           ]);
//         }, 1000);
//       }
//       setMessage('');
//     }
//   };

//   const switchChat = (role) => {
//     setActiveChat(role);
//   };

//   const handleCloseChat = () => {
//     setActiveChat('');
//   };

//   const handleCloseSupport = () => {
//     navigate('/');
//   };

//   return (
//     <div className="h-96 flex flex-col m-10">
//       <div className="flex flex-1 overflow-hidden p-2">
//         {/* Left Side: Role Selection */}
//         <div className="w-1/4 p-3 bg-white border-r border-gray-300">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-xl font-bold text-gray-700">Support Chat</h1>
//             <button onClick={handleCloseSupport} className="text-gray-500 hover:text-gray-700 border border-gray-500 hover:border-gray-700 rounded-full p-1">
//               <AiOutlineClose size={24} />
//             </button>
//           </div>
//           <h2 className="text-lg font-semibold mb-3">Select Role</h2>
//           <button
//             onClick={() => switchChat('admin')}
//             className={`block w-full text-left px-4 py-1 mb-2 rounded-lg ${
//               activeChat === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             Admin
//           </button>
//           <button
//             onClick={() => switchChat('recruiter')}
//             className={`block w-full text-left px-4 py-1 rounded-lg ${
//               activeChat === 'recruiter' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             Recruiter
//           </button>
//         </div>

//         {/* Right Side: Chat Area */}
//         <div className="flex-1 flex flex-col bg-white relative">
//           {activeChat ? (
//             <>
//               {/* Header Section */}
//               <div className="flex items-center justify-between p-3 bg-white border-b border-gray-300">
//                 <div className="text-lg font-semibold text-gray-700">
//                   {activeChat.charAt(0).toUpperCase() + activeChat.slice(1)}
//                 </div>
//                 <button
//                   onClick={handleCloseChat}
//                   className="text-gray-500 hover:text-gray-700 border border-gray-500 hover:border-gray-700 rounded-full p-1"
//                 >
//                   <AiOutlineClose size={24} />
//                 </button>
//               </div>

//               {/* Chat Content */}
//               <div className="flex-1 p-2 space-y-3 bg-gray-100 overflow-auto">
//                 {activeChat === 'admin' &&
//                   adminMessages.map((msg, index) => (
//                     <div
//                       key={index}
//                       className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div
//                         className={`p-2 max-w-xs rounded-lg ${
//                           msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
//                         }`}
//                       >
//                         {msg.text}
//                       </div>
//                     </div>
//                   ))}

//                 {activeChat === 'recruiter' &&
//                   recruiterMessages.map((msg, index) => (
//                     <div
//                       key={index}
//                       className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div
//                         className={`p-2 max-w-xs rounded-lg ${
//                           msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
//                         }`}
//                       >
//                         {msg.text}
//                       </div>
//                     </div>
//                   ))}
//               </div>

//               {/* Input Section */}
//               <div className="p-2 border-t border-gray-300 bg-white">
//                 <div className="flex items-center">
//                   <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter') {
//                         handleSendMessage();
//                       }
//                     }}
//                     className="w-full p-2 border border-gray-300 rounded-lg text-sm"
//                     placeholder="Type a message"
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     className="ml-2 p-2 bg-blue-500 text-white rounded-full text-sm"
//                   >
//                     <TbSend2 size={25} />
//                   </button>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="flex items-center justify-center flex-1 bg-gray-200 bg-opacity-50">
//               <p className="text-gray-600 text-lg">Please select a role to start chatting</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupportChat;


import React, { useState } from 'react';
import { TbSend2 } from "react-icons/tb";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const SupportChat = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'support', text: 'Hello! How can I assist you today?' },
  ]);
  const navigate = useNavigate();

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

  return (
    <div className="m-5 p-5 h-[80vh] bg-gray-100 flex flex-col">
      <div className="bg-indigo-500 text-white text-3xl font-bold py-2 rounded-t-lg relative">
        <h1 className="ml-5">Support Chat</h1>
        <button
          onClick={handleCloseChat}
          className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white"
        >
          <IoCloseCircleSharp size={30} />
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-full overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto bg-white">
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
          </div>
        </div>

        {/* Message Input */}
        <div className="border border-gray-300 p-4 bg-gray-50 rounded-b-lg">
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
    </div>
  );
};

export default SupportChat;
