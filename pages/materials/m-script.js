// main.js
import { courses } from "/pages/courses.js";

const params = new URLSearchParams(window.location.search);
const level = params.get("level");

if (courses[level]) {
  document.querySelector("h2").textContent += ` - ${level} Level`;

  const firstSemester = courses[level].firstSemester
    .map(
      (course) =>
        `<a href="view.html?name=${encodeURIComponent(course.name)}&fileId=${
          course.fileId
        }" class="px-6 flex items-center gap-4 bg-white p-4 rounded-lg active:bg-gray-100">
              <p class="text-xs font-medium">${course.name}</p>
            </a>`
    )
    .join("");

  const secondSemester = courses[level].secondSemester
    .map(
      (course) =>
        `<a href="view.html?name=${encodeURIComponent(course.name)}&fileId=${
          course.fileId
        }" class="px-6 flex items-center gap-4 bg-white p-4 rounded-lg active:bg-gray-100">
              <p class="text-xs font-medium">${course.name}</p>
            </a>`
    )
    .join("");

  document
    .querySelector(".space-y-2:nth-child(1)")
    .insertAdjacentHTML("beforeend", firstSemester);
  document
    .querySelector(".space-y-2:nth-child(2)")
    .insertAdjacentHTML("beforeend", secondSemester);
} else {
  document.querySelector(
    "section"
  ).innerHTML = `<p class="text-center text-gray-500">No courses available for this level.</p>`;
}
