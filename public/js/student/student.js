document.addEventListener("DOMContentLoaded", () => {
  initCalendar();
  setupRealTimeUpdates();
  showPrerequisites();
  setupCourseFilters();

  // Make calendar responsive to sidebar changes
  const sidebar = document.getElementById("sidebar");
  const calendar = document.getElementById("weekly-calendar");

  if (sidebar && calendar) {
    const resizeObserver = new ResizeObserver(() => {
      // Recalculate calendar width when sidebar changes
      if (calendar.closest(".calendar-container")) {
        calendar.closest(".calendar-container").style.width = "100%";
      }
    });

    resizeObserver.observe(sidebar);

    // Also listen for window resize
    window.addEventListener("resize", () => {
      if (calendar.closest(".calendar-container")) {
        calendar.closest(".calendar-container").style.width = "100%";
      }
    });
  }
});

// Weekly calendar view
function initCalendar() {
  const calendar = document.getElementById("weekly-calendar");
  if (!calendar) return;

  // Use abbreviated days to match course data
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = [];

  // Generate time slots from 8:00 to 18:00
  for (let hour = 8; hour <= 18; hour++) {
    timeSlots.push(`${hour}:00`);
  }

  // Create calendar header
  const headerRow = document.createElement("div");
  headerRow.className = "grid grid-cols-6 bg-gray-200 dark:bg-gray-700";
  headerRow.innerHTML = '<div class="p-2 font-bold">Time</div>';

  days.forEach((day) => {
    const dayHeader = document.createElement("div");
    dayHeader.className = "p-2 font-bold";
    dayHeader.textContent = getFullDayName(day);
    headerRow.appendChild(dayHeader);
  });

  calendar.appendChild(headerRow);

  // Create time slots
  timeSlots.forEach((time) => {
    const row = document.createElement("div");
    row.className = "grid grid-cols-6 border-b dark:border-gray-700";

    const timeCell = document.createElement("div");
    timeCell.className = "p-2 font-medium border-r dark:border-gray-700";
    timeCell.textContent = time;
    row.appendChild(timeCell);

    days.forEach((day) => {
      const cell = document.createElement("div");
      cell.className = "p-2 min-h-[60px]";
      cell.id = `cell-${day}-${time}`;
      row.appendChild(cell);
    });

    calendar.appendChild(row);
  });

  // Populate calendar with courses
  populateCalendar();
}

// Helper function to display full day names
function getFullDayName(shortDay) {
  const dayMap = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
  };
  return dayMap[shortDay] || shortDay;
}

// Function to populate calendar with registered courses
function populateCalendar() {
  console.log("Populating calendar with courses:", window.registeredCourses);

  if (!window.registeredCourses || window.registeredCourses.length === 0) {
    console.log("No registered courses to display");
    return;
  }

  window.registeredCourses.forEach((course) => {
    if (!course.schedule || !course.schedule.days || !course.schedule.time) {
      console.log("Course missing schedule data:", course);
      return;
    }

    console.log(
      `Processing course: ${
        course.courseCode
      }, Schedule: ${course.schedule.days.join(", ")} at ${
        course.schedule.time
      }`
    );

    course.schedule.days.forEach((day) => {
      const [startTime, endTime] = course.schedule.time.split("-");
      // Fix the time parsing issue - remove any leading zeros
      const startHour = parseInt(startTime.replace(/^0+/, "").split(":")[0]);
      // Handle potential non-standard endTime format (03:000)
      const endTimeCleaned = endTime.replace(/0+$/, "0");
      const endHour = parseInt(endTimeCleaned.replace(/^0+/, "").split(":")[0]);

      console.log(
        `Adding ${course.courseCode} to ${day} from ${startHour}:00 to ${endHour}:00`
      );

      for (let hour = startHour; hour < endHour; hour++) {
        const cellId = `cell-${day}-${hour}:00`;
        console.log(`Looking for cell with ID: ${cellId}`);
        const cell = document.getElementById(cellId);

        if (cell) {
          console.log(`Found cell ${cellId}`);
          if (
            cell.querySelector("div") &&
            !cell.textContent.includes(course.courseCode)
          ) {
            // Conflict detected
            console.log(`Conflict detected at ${cellId}`);
            cell.classList.add("bg-red-200", "dark:bg-red-900");
            cell.innerHTML += `<div class="text-xs p-1 bg-red-300 dark:bg-red-800 my-1 rounded">${course.courseCode} (CONFLICT)</div>`;
          } else {
            console.log(`Adding ${course.courseCode} to cell ${cellId}`);
            cell.classList.add("bg-blue-100", "dark:bg-blue-900");
            cell.innerHTML = `<div class="text-xs p-1 bg-blue-200 dark:bg-blue-800 rounded">${course.courseCode} - ${course.name}</div>`;
          }
        } else {
          console.log(`Cell ${cellId} not found`);
        }
      }
    });
  });
}

// Real-time updates
function setupRealTimeUpdates() {
  // Simulate WebSocket with polling
  setInterval(checkAvailableSeats, 10000);
}

function checkAvailableSeats() {
  const subscribedCourses = document.querySelectorAll(".subscribed-course");
  subscribedCourses.forEach((course) => {
    const courseId = course.dataset.id;

    // API call
    fetch(`/student/check-availability/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.available > 0) {
          course.classList.add("bg-green-100");
          course.querySelector(
            ".seat-status"
          ).textContent = `${data.available} seats available!`;

          // Show notification
          const notification = document.getElementById("notification");
          if (notification) {
            notification.textContent = `Seats available in ${data.courseCode}!`;
            notification.classList.remove("hidden");
            setTimeout(() => notification.classList.add("hidden"), 5000);
          }
        }
      })
      .catch((err) => console.error("Error checking availability:", err));
  });
}

// Show prerequisites visualization
function showPrerequisites() {
  const prereqBtns = document.querySelectorAll(".show-prereq-btn");
  prereqBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const courseId = e.target.dataset.id;
      const prereqList = document.getElementById(`prereq-${courseId}`);
      if (prereqList) {
        prereqList.classList.toggle("hidden");
      }
    });
  });
}
