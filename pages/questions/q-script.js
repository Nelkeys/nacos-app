import { courses } from "../courses.js";

// Get the selected level from the URL
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get("level");

// Populate the courses dynamically
const levelCourses = courses[level];
const firstSemesterContainer = document.getElementById("first-semester-container");
const secondSemesterContainer = document.getElementById("second-semester-container");

if (levelCourses) {
  // Handle First Semester Courses
  if (levelCourses.firstSemester) {
    const firstSemesterHeader = document.createElement("h3");
    firstSemesterHeader.className = "font-semibold text-lg mb-2";

    // Add first semester header to the container
    firstSemesterContainer.appendChild(firstSemesterHeader);

    // Filter and create the course elements for the first semester
    levelCourses.firstSemester
      .filter((course) => course.pastQuestions && course.pastQuestions.length)
      .forEach((course) => {
        const courseElement = document.createElement("a");
        courseElement.href = `/pages/questions/view.html?name=${encodeURIComponent(course.name)}&questions=${encodeURIComponent(JSON.stringify(course.pastQuestions))}`;
        courseElement.className = "flex items-center gap-2 bg-white px-6 py-3 rounded-lg active:bg-gray-100";
        
        const courseName = document.createElement("p");
        courseName.className = "text-xs font-medium";
        courseName.textContent = course.name;

        courseElement.appendChild(courseName);
        firstSemesterContainer.appendChild(courseElement);
      });
  }

  // Handle Second Semester Courses
  if (levelCourses.secondSemester) {
    const secondSemesterHeader = document.createElement("h3");
    secondSemesterHeader.className = "font-semibold text-lg mb-2";

    // Add second semester header to the container
    secondSemesterContainer.appendChild(secondSemesterHeader);

    // Filter and create the course elements for the second semester
    levelCourses.secondSemester
      .filter((course) => course.pastQuestions && course.pastQuestions.length)
      .forEach((course) => {
        const courseElement = document.createElement("a");
        courseElement.href = `/pages/questions/view.html?name=${encodeURIComponent(course.name)}&questions=${encodeURIComponent(JSON.stringify(course.pastQuestions))}`;
        courseElement.className = "flex items-center gap-2 bg-white px-6 py-3 rounded-lg active:bg-gray-100";
        
        const courseName = document.createElement("p");
        courseName.className = "text-xs font-medium";
        courseName.textContent = course.name;

        courseElement.appendChild(courseName);
        secondSemesterContainer.appendChild(courseElement);
      });
  }
} else {
  // Display message if no courses are available for the level
  firstSemesterContainer.innerHTML = `<p>No courses available for level ${level}</p>`;
  secondSemesterContainer.innerHTML = `<p>No courses available for level ${level}</p>`;
}
