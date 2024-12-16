// Import Firebase SDK for Firebase App and Realtime Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// Your Firebase project configuration
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
const db = getDatabase(app);

// Get the level from the URL parameters
const params = new URLSearchParams(window.location.search);
const level = params.get("level");

if (level) {
  document.querySelector("h2").textContent += ` - ${level} Level`;

  // Firebase function to fetch courses data for the selected level
  const levelRef = ref(db, `${level}`);

  // Fetch the courses data from Firebase
  get(levelRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const courses = snapshot.val(); // This will contain the courses for the level

        const firstSemester = courses.firstSemester
          ? courses.firstSemester
              .map(
                (course) =>
                  `<a href="view.html?name=${encodeURIComponent(
                    course.name
                  )}&fileId=${course.fileId}" class="px-6 flex items-center gap-4 bg-white p-4 rounded-lg active:bg-gray-100">
                    <p class="text-xs font-medium">${course.name}</p>
                  </a>`
              )
              .join("")
          : "";

        const secondSemester = courses.secondSemester
          ? courses.secondSemester
              .map(
                (course) =>
                  `<a href="view.html?name=${encodeURIComponent(
                    course.name
                  )}&fileId=${course.fileId}" class="px-6 flex items-center gap-4 bg-white p-4 rounded-lg active:bg-gray-100">
                    <p class="text-xs font-medium">${course.name}</p>
                  </a>`
              )
              .join("")
          : "";

        // Append the courses to the page
        document
          .querySelector(".space-y-2:nth-child(1)")
          .insertAdjacentHTML("beforeend", firstSemester);
        document
          .querySelector(".space-y-2:nth-child(2)")
          .insertAdjacentHTML("beforeend", secondSemester);
      } else {
        // If no data is available for the level, show a message
        document.querySelector(
          "section"
        ).innerHTML = `<p class="text-center text-gray-500">No courses available for this level.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching courses: ", error);
      document.querySelector(
        "section"
      ).innerHTML = `<p class="text-center text-gray-500">Failed to load courses. Please try again later.</p>`;
    });
} else {
  document.querySelector(
    "section"
  ).innerHTML = `<p class="text-center text-gray-500">No level specified.</p>`;
}
