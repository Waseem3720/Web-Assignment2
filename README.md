# Course Registration System

## Overview

The Course Registration System is a web application designed to manage university course registrations. It provides separate interfaces for students and administrators, with features like course management, registration, schedule visualization, and real-time updates.

## Features

### Student Features

- View and register for available courses
- Browse courses with filtering options (by department, level, day, seat availability)
- Calendar view showing weekly schedule with conflict detection
- Subscribe to notifications for courses with no available seats
- Real-time updates when seats become available
- View course prerequisites

### Admin Features

- Manage courses (add, update, delete)
- View and manage students
- Generate reports (students by course, available seats, prerequisite issues)
- Override student registrations

### General Features

- Responsive design with dark/light mode
- Collapsible sidebar navigation
- Mobile-friendly interface

## Setup Instructions

1. **Clone the repository**



2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   - Create a `.env` file in the root directory with the following:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/course_registration
   SESSION_SECRET=your_secret_key
   PORT=3000
   ```

   - Modify the MongoDB URI as needed for your setup.

4. **Set up the database**

   - Ensure MongoDB is running on your system.
   - Seed the database with initial data:

   ```bash
   node seed.js
   ```

   This will create default admin and student accounts.

5. **Start the application**

   ```bash
   npm start
   ```

6. **Access the application**
   - Open your browser and go to `http://localhost:3000/auth/login`

## Default Credentials

### Student Login

- **Roll Number**: F223720
- **Name**: Waseem Hanif
- No password required - just enter the roll number.

### Admin Login

- **Username**: admin
- **Password**: admin

## Usage Guide

### Student Interface

1. **Login**

   - Enter roll number F223639 at the login page.

2. **Dashboard**

   - View registered courses.
   - See subscribed courses with seat availability.
   - Access quick links to browse courses and view calendar.

3. **Browse Courses**

   - Filter courses by department, level, day, and seat availability.
   - Register for courses by clicking the "Register" button.
   - Subscribe to notifications for full courses by clicking "Subscribe".

4. **Calendar View**

   - Access from Dashboard or navigation sidebar.
   - Shows weekly schedule with registered courses.
   - Highlights time conflicts in red.

5. **Course Conflicts**
   - The system automatically detects and highlights scheduling conflicts.
   - Conflicts appear in red on the calendar view.

### Admin Interface

1. **Login**

   - Enter username "admin" and password "admin".

2. **Dashboard**

   - Access quick links to manage courses and students.
   - Generate various reports.

3. **Manage Courses**

   - Add new courses with code, name, schedule, and prerequisites.
   - Update or delete existing courses.
   - Adjust seat availability.

4. **Manage Students**

   - View all students and their registered courses.
   - Override registrations if needed.

5. **Reports**
   - **Students by Course**: View all students registered for a specific course.
   - **Available Seats**: Check which courses have open seats.
   - **Prerequisite Issues**: Identify students registered for courses without completing prerequisites.

## Technical Details

- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose ORM
- **Frontend**: EJS templates with Tailwind CSS
- **Authentication**: Session-based with bcrypt for password hashing
- **UI Features**: Dark/light mode toggle, responsive sidebar, mobile optimization

## Real-time Features

- Course availability notifications
- Automatic calendar updates
- Conflict detection when registering for courses

## Tips for Testing

1. **Calendar Conflicts**: Register for multiple courses with overlapping schedules to see conflict detection.
2. **Seat Availability**: As an admin, modify course seat numbers to test the subscription notification system.
3. **Responsive Design**: Test on different screen sizes or use browser developer tools to check mobile compatibility.
4. **Dark Mode**: Toggle between light and dark modes using the theme button in the sidebar.

## Troubleshooting

- If the calendar isn't displaying properly, ensure JavaScript is enabled.
- For database connection issues, verify MongoDB is running and check your connection string.
- Clear browser cache if styles aren't updating correctly.

---

_This project was created as part of the FAST-BSE-6B Web Development coursework._

