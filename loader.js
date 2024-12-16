document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
  
    document.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", (e) => {
        // Show the loader
        loader.classList.remove("hidden");
  
        // Allow the browser to navigate to the link after showing the loader
        const href = link.getAttribute("href");
        if (!link.target && href) {
          e.preventDefault();
          setTimeout(() => {
            window.location.href = href;
          }, 100); // Slight delay to ensure loader is visible
        }
      });
    });
  
    // Hide the loader when the page loads completely
    window.addEventListener("load", () => {
      loader.classList.add("hidden");
    });
  });
  