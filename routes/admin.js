const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAdminLogin } = require('../middleware/auth');

router.get('/dashboard', requireAdminLogin, adminController.getDashboard);
router.get('/courses', requireAdminLogin, adminController.getCourses);
router.post('/courses', requireAdminLogin, adminController.addCourse);
router.post('/courses/:courseId', requireAdminLogin, adminController.updateCourse);
router.delete('/courses/:courseId', requireAdminLogin, adminController.deleteCourse);
router.get('/students', requireAdminLogin, adminController.getStudents);
router.post('/students/override', requireAdminLogin, adminController.overrideRegistration);
router.get('/reports/students/:courseId', requireAdminLogin, adminController.getReportStudentsByCourse);
router.get('/reports/courses', requireAdminLogin, adminController.getReportAvailableCourses);
router.get('/reports/prerequisites', requireAdminLogin, adminController.getReportPrerequisiteIssues);

module.exports = router;