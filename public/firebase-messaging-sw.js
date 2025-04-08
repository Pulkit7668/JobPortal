importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');


firebase.initializeApp({
    apiKey: "AIzaSyCFht9Xv9DiTtMsErQhnexiyF1cu9w-jsw",
    authDomain: "push-notification-e8001.firebaseapp.com",
    projectId: "push-notification-e8001",
    storageBucket: "push-notification-e8001.firebasestorage.app",
    messagingSenderId: "564074776442",
    appId: "1:564074776442:web:b0ca05bb98a090db3ab8c3",
    measurementId: "G-Y18JMHJWL4"
});

const messaging = firebase.messaging();


// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });