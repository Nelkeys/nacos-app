import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getDatabase,
    ref,
    set
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Configuration
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
const db = getDatabase(app);

// Form Elements
const signUpForm = document.getElementById("signupForm");
const fullName = document.getElementById("full_name");
const regNumber = document.getElementById("reg_number");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm_password");

// Popup for Notifications
function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");
    popupMessage.innerText = message;
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), 3000);
}

// Register User Function
const registerUser = async (e) => {
    e.preventDefault();

    // Validation
    if (password.value !== confirmPassword.value) {
        showPopup("Passwords do not match!");
        return;
    }

    try {
        // Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Save User Data to Database
        await set(ref(db, `userAuthList/${user.uid}`), {
            fullName: fullName.value.trim(),
            regNumber: regNumber.value.trim(),
            email: email.value.trim()
        });

        showPopup("Account created successfully!");
        setTimeout(() => {
            window.location.href = "sign-in.html"; // Redirect to Login
        }, 2000);
    } catch (error) {
        console.error("Error during registration:", error);
        showPopup(error.message || "Error creating account. Please try again.");
    }
};

// Event Listener
signUpForm.addEventListener("submit", registerUser);
