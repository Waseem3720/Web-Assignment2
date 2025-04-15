document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  if (localStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add("dark");
    if (themeIcon) themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.documentElement.classList.toggle("dark");

      if (document.documentElement.classList.contains("dark")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("darkMode", "true");
      } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("darkMode", "false");
      }
    });
  }

  // Sidebar toggle - simplify the logic
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  const sidebarToggle = document.getElementById("toggle-sidebar");

  // Apply sidebar collapsed state on page load
  if (localStorage.getItem("sidebarCollapsed") === "true") {
    sidebar.classList.add("collapsed");
    mainContent.classList.add("sidebar-collapsed");
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");
      mainContent.classList.toggle("sidebar-collapsed");

      // Save state to localStorage
      localStorage.setItem(
        "sidebarCollapsed",
        sidebar.classList.contains("collapsed")
      );
    });
  }

  // Mobile sidebar toggle
  const mobileSidebarToggle = document.getElementById("mobile-sidebar-toggle");

  if (mobileSidebarToggle && sidebar) {
    mobileSidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("-translate-x-full");
    });

    // Initially hide sidebar on mobile
    if (window.innerWidth < 768) {
      sidebar.classList.add("-translate-x-full");
    }
  }
});
