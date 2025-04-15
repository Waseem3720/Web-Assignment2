document.addEventListener("DOMContentLoaded", () => {
  initAdminDashboard();
  setupReportGenerators();
  setupCourseActions();
});
// Enable/disable view button based on selection
document
  .getElementById("course-selector")
  .addEventListener("change", function () {
    const viewButton = document.getElementById("view-students");
    viewButton.disabled = !this.value;
  });

// Add click handler for view button
document.getElementById("view-students").addEventListener("click", function () {
  const courseId = document.getElementById("course-selector").value;
  if (courseId) {
    window.location.href = `/admin/reports/students/${courseId}`;
  }
});

function initAdminDashboard() {
  console.log("Admin dashboard initialized");
  // Setup method override for DELETE requests
  document.querySelectorAll(".delete-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (confirm("Are you sure you want to delete this course?")) {
        const method = document.createElement("input");
        method.type = "hidden";
        method.name = "_method";
        method.value = "DELETE";
        form.appendChild(method);
        form.submit();
      }
    });
  });
}

function setupReportGenerators() {
  const reportLinks = document.querySelectorAll(".report-link");
  reportLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const reportType = e.target.dataset.report;
      document
        .getElementById(`${reportType}-report`)
        .classList.remove("hidden");
      document.querySelectorAll(".report-content").forEach((report) => {
        if (report.id !== `${reportType}-report`) {
          report.classList.add("hidden");
        }
      });
    });
  });
}

function setupCourseActions() {
  // Setup prerequisite selector
  const courseSelectors = document.querySelectorAll(".prereq-selector");
  courseSelectors.forEach((selector) => {
    selector.addEventListener("change", (e) => {
      const prereqInput = document.getElementById(e.target.dataset.target);
      const selectedCourse = e.target.value;

      if (selectedCourse && !prereqInput.value.includes(selectedCourse)) {
        prereqInput.value = prereqInput.value
          ? `${prereqInput.value},${selectedCourse}`
          : selectedCourse;
      }
    });
  });
}
