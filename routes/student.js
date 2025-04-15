const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { requireStudentLogin } = require('../middleware/auth');
const Student = require('../models/Student');
const Course = require('../models/Course');

router.get('/dashboard', requireStudentLogin, studentController.getDashboard);
router.get('/courses', requireStudentLogin, studentController.getCourses);
router.post('/register', requireStudentLogin, studentController.registerCourse);
router.post('/subscribe', requireStudentLogin, studentController.subscribeCourse);

// Add calendar view route
router.get('/calendar', requireStudentLogin, async (req, res) => {
  try {
    const student = await Student.findById(req.session.studentId)
      .populate('registeredCourses')
      .populate('subscribedCourses')
      .populate('completedCourses');
    
    if (!student) {
      return res.redirect('/auth/login');
    }
    
    res.render('student/calendar', { student });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Route for seat availability check
router.get('/check-availability/:courseId', requireStudentLogin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    
    res.json({
      available: course.seats.available,
      courseCode: course.courseCode
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;