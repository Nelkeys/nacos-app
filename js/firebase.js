import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQ4vGjiLjaAG5kIP-IWab441RETilwdks",
  authDomain: "nacos-app.firebaseapp.com",
  databaseURL: "https://nacos-app-default-rtdb.firebaseio.com",
  projectId: "nacos-app",
  storageBucket: "nacos-app.firebasestorage.app",
  messagingSenderId: "982514858036",
  appId: "1:982514858036:web:66e7bb244b772ce65d7261",
  measurementId: "G-R48BS4FSX5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const token = await getToken(messaging, {
        vapidKey: "BPl-SvngXeXoC-OvwyHLt93ZwahFKYS3eTsjJ5b5s89o40cUcQiZAUmsSGVD5FZIOc52haqNJ2L2yFxpiiJssHs",
      });
      console.log("FCM Token:", token);
      // Send the token to your server for later use
    } else {
      console.error("Unable to get permission to notify.");
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
  }
};

// Listen for messages when the app is in the foreground
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // Customize notification display here
});
