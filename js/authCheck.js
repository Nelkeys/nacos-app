import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ4vGjiLjaAG5kIP-IWab441RETilwdks",
  authDomain: "nacos-app.firebaseapp.com",
  databaseURL: "https://nacos-app-default-rtdb.firebaseio.com",
  projectId: "nacos-app",
  storageBucket: "nacos-app.firebasestorage.app",
  messagingSenderId: "982514858036",
  appId: "1:982514858036:web:66e7bb244b772ce65d7261", 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If no user is logged in, redirect to sign-up page
    window.location.href = "/authentication/sign-up.html";
  }
});
