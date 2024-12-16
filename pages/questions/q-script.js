// Import Firebase SDK for Firebase App and Realtime Database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

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

// Get the selected level from the URL
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get("level");

// Containers for first and second semester
const firstSemesterContainer = document.getElementById(
  "first-semester-container"
);
const secondSemesterContainer = document.getElementById(
  "second-semester-container"
);

// Firebase function to fetch courses for the selected level
async function fetchCourses(level) {
  try {
    // Reference to the Realtime Database for the selected level
    const levelRef = ref(db, `${level}`);
    const snapshot = await get(levelRef);

    if (snapshot.exists()) {
      const levelData = snapshot.val();

      let courses = {
        firstSemester: [],
        secondSemester: [],
      };

      // Process firstSemester and secondSemester
      if (levelData.firstSemester) {
        courses.firstSemester = levelData.firstSemester;
      }
      if (levelData.secondSemester) {
        courses.secondSemester = levelData.secondSemester;
      }

      populateCourses(courses);
    } else {
      console.log("No data available for this level");
      firstSemesterContainer.innerHTML = `<p>No courses available for level ${level}</p>`;
      secondSemesterContainer.innerHTML = `<p>No courses available for level ${level}</p>`;
    }
  } catch (error) {
    console.error("Error fetching courses: ", error);
  }
}

// Function to populate the courses on the page
function populateCourses(levelCourses) {
  if (levelCourses.firstSemester.length > 0) {
    const firstSemesterHeader = document.createElement("h3");
    firstSemesterHeader.className = "font-semibold text-lg mb-2";
    firstSemesterContainer.appendChild(firstSemesterHeader);

    levelCourses.firstSemester.forEach((course) => {
      if (course.pastQuestions && course.pastQuestions.length) {
        const courseElement = document.createElement("a");
        courseElement.href = `/pages/questions/view.html?name=${encodeURIComponent(
          course.name
        )}&questions=${encodeURIComponent(
          JSON.stringify(course.pastQuestions)
        )}`;
        courseElement.className =
          "flex items-center gap-2 bg-white px-6 py-3 rounded-lg active:bg-gray-100";

        const courseName = document.createElement("p");
        courseName.className = "text-xs font-medium";
        courseName.textContent = course.name;

        courseElement.appendChild(courseName);
        firstSemesterContainer.appendChild(courseElement);
      }
    });
  }

  if (levelCourses.secondSemester.length > 0) {
    const secondSemesterHeader = document.createElement("h3");
    secondSemesterHeader.className = "font-semibold text-lg mb-2";
    secondSemesterContainer.appendChild(secondSemesterHeader);

    levelCourses.secondSemester.forEach((course) => {
      if (course.pastQuestions && course.pastQuestions.length) {
        const courseElement = document.createElement("a");
        courseElement.href = `/pages/questions/view.html?name=${encodeURIComponent(
          course.name
        )}&questions=${encodeURIComponent(
          JSON.stringify(course.pastQuestions)
        )}`;
        courseElement.className =
          "flex items-center gap-2 bg-white px-6 py-3 rounded-lg active:bg-gray-100";

        const courseName = document.createElement("p");
        courseName.className = "text-xs font-medium";
        courseName.textContent = course.name;

        courseElement.appendChild(courseName);
        secondSemesterContainer.appendChild(courseElement);
      }
    });
  }

  if (
    levelCourses.firstSemester.length === 0 &&
    levelCourses.secondSemester.length === 0
  ) {
    firstSemesterContainer.innerHTML = `<p>No courses available for level ${level}</p>`;
    secondSemesterContainer.innerHTML = `<p>No courses available for level ${level}</p>`;
  }
}

// Fetch the courses from Firebase based on the selected level
if (level) {
  fetchCourses(level);
} else {
  firstSemesterContainer.innerHTML = "<p>No level specified.</p>";
  secondSemesterContainer.innerHTML = "<p>No level specified.</p>";
}
