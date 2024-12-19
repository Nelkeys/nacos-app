import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// Initialize Firebase
const auth = getAuth();

// Check if the user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // If no user is logged in, redirect to sign-up page
    window.location.href = "/authentication/sign-up.html";
  }
});
