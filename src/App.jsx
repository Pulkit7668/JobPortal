import React, { useEffect } from 'react'
import Homepage from './Pages/Homepage'
import { generateToken, messaging } from './Pages/NotificationPage/firebase'
import { onMessage } from 'firebase/messaging';
import toast, { Toaster } from 'react-hot-toast';

function App() {
 
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast.success(payload.notification.body);
      toast.error(payload.notification.title);
    });
  }, []);

  return (
    <>
    <Toaster position='top-center' />
    <Homepage />
    </>
  )
}

export default App

// import React, { useEffect } from 'react';
// import Homepage from './Pages/Homepage';

// function App() {
//   useEffect(() => {
//     // Right Click Disable
//     document.addEventListener("contextmenu", (event) => event.preventDefault());

//     // Inspect Element Disable
//     document.addEventListener("keydown", (event) => {
//       if (
//         event.key === "F12" ||
//         (event.ctrlKey && event.shiftKey && event.key === "I") ||
//         (event.ctrlKey && event.shiftKey && event.key === "J") ||
//         (event.ctrlKey && event.key === "U") // View Source Disable
//       ) {
//         event.preventDefault();
//       }
//     });

//     // Console Open Hone Par Detect Karna
//     const detectDevTools = setInterval(() => {
//       if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
//         document.body.innerHTML = "<h1>Inspect Mat Karo! 🚫</h1>";
//       }
//     }, 1000);

//     return () => clearInterval(detectDevTools); // Cleanup function
//   }, []);

//   return (
//     <>
//       <Homepage />
//     </>
//   );
// }

// export default App;
