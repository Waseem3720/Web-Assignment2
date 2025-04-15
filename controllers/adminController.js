const Course = require('../models/Course');
const Student = require('../models/Student');

exports.getDashboard = async (req, res) => {
    const courses = await Course.find({}, 'courseCode name');
    res.render('admin/dashboard', { courses });
};

exports.getCourses = async (req, res) => {
    const courses = await Course.find().populate('prerequisites');
    res.render('admin/courses', { courses });
};

exports.addCourse = async (req, res) => {
    const { courseCode, name, department, level, scheduleDays, scheduleTime, seats, prerequisites } = req.body;
    const course = new Course({
        courseCode,
        name,
        department,
        level,
        schedule: { days: scheduleDays.split(','), time: scheduleTime },
        seats: { total: Number(seats), available: Number(seats) },
        prerequisites: prerequisites ? prerequisites.split(',') : []
    });
    await course.save();
    res.redirect('/admin/courses');
};

exports.updateCourse = async (req, res) => {
    const { courseId, name, seats, prerequisites } = req.body;
    const registeredCount = await Student.countDocuments({ registeredCourses: courseId });
    await Course.findByIdAndUpdate(courseId, {
        name,
        'seats.total': Number(seats),
        'seats.available': Number(seats) - registeredCount,
        prerequisites: prerequisites ? prerequisites.split(',') : []
    });
    res.redirect('/admin/courses');
};

exports.deleteCourse = async (req, res) => {
    await Course.findByIdAndDelete(req.params.courseId);
    res.redirect('/admin/courses');
};

exports.getStudents = async (req, res) => {
    const students = await Student.find().populate('registeredCourses');
    res.render('admin/students', { students });
};

exports.overrideRegistration = async (req, res) => {
    const { studentId, courseId } = req.body;
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student.registeredCourses.includes(courseId)) {
        student.registeredCourses.push(courseId);
        course.seats.available--;
        await student.save();
        await course.save();
    }
    res.redirect('/admin/students');
};

exports.getReportStudentsByCourse = async (req, res) => {
    const students = await Student.find({ registeredCourses: req.params.courseId });
    const course = await Course.findById(req.params.courseId);
    res.render('admin/reports/course-students', { students, course });
};

exports.getReportAvailableCourses = async (req, res) => {
    const courses = await Course.find({ 'seats.available': { $gt: 0 } });
    res.render('admin/reports/available-seats', { courses });
};

exports.getReportPrerequisiteIssues = async (req, res) => {
    const students = await Student.find().populate('registeredCourses completedCourses');
    const issues = students.filter(student => 
        student.registeredCourses.some(course => 
            course.prerequisites.some(prereq => !student.completedCourses.some(c => c._id.equals(prereq)))
        )
    );
    res.render('admin/reports/prerequisite-issues', { students: issues });
};