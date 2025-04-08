// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCFht9Xv9DiTtMsErQhnexiyF1cu9w-jsw",
  authDomain: "push-notification-e8001.firebaseapp.com",
  projectId: "push-notification-e8001",
  storageBucket: "push-notification-e8001.firebasestorage.app",
  messagingSenderId: "564074776442",
  appId: "1:564074776442:web:b0ca05bb98a090db3ab8c3",
  measurementId: "G-Y18JMHJWL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);

    if (permission === "granted") {
        const token = await getToken(messaging, {vapidKey: "BBnAIo8CcnbwwJ896Xh5-LvlTfzmhNNh3NuC1CYnoT8S3UwdbhmaA3HbYZ381dI5KcgOpJJVYXATg_I8Ce7h2wM"});
        console.log(token);
    }
};

export { messaging };