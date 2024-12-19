document.addEventListener("DOMContentLoaded", () => {
  const dimmedOverlay = document.getElementById("dimmed-overlay");
  const topLoader = document.getElementById("top-loader");

  let isNavigating = false; // Track manual navigation

  // Event listener for all internal links
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Only handle valid internal links (ignore external or invalid links)
      if (href && !link.target && !href.startsWith("#")) {
        e.preventDefault();
        isNavigating = true;

        // Show dimmed overlay and top loader
        dimmedOverlay.classList.remove("hidden");
        topLoader.classList.remove("hidden");

        // Start loading animation
        topLoader.style.animation = "loading-bar 2s linear";

        // Navigate to the link after a short delay
        setTimeout(() => {
          window.location.href = href;
        }, 100);
      }
    });
  });

  // Hide loader and dimmed overlay on page load
  const hideLoader = () => {
    dimmedOverlay.classList.add("hidden");
    topLoader.classList.add("hidden");
    topLoader.style.animation = ""; // Reset animation
    isNavigating = false; // Reset navigation flag
  };

  window.addEventListener("load", hideLoader);

  // Handle the back/forward cache using the 'pageshow' event
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      hideLoader(); // Ensure the loader and overlay are hidden
    }
  });
});
