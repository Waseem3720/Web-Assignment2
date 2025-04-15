const Student = require('../models/Student');
const Course = require('../models/Course');

exports.getDashboard = async (req, res) => {
    const student = await Student.findById(req.session.studentId)
        .populate('registeredCourses')
        .populate('subscribedCourses');
    res.render('student/dashboard', { student });
};

exports.getCourses = async (req, res) => {
    const { department, level, day, openSeats } = req.query;
    let query = {};
    if (department) query.department = department;
    if (level) query.level = Number(level);
    if (day) query['schedule.days'] = day;
    if (openSeats === 'true') query['seats.available'] = { $gt: 0 };
    const courses = await Course.find(query).populate('prerequisites');
    res.render('student/courses', { courses });
};

exports.registerCourse = async (req, res) => {
    const { courseId } = req.body;
    const student = await Student.findById(req.session.studentId).populate('registeredCourses completedCourses');
    const course = await Course.findById(courseId).populate('prerequisites');
    
    if (!course) return res.render('auth/error', { message: 'Course not found' });
    if (course.seats.available <= 0) return res.render('auth/error', { message: 'No seats available' });
    if (student.registeredCourses.some(c => c._id.equals(courseId))) {
        return res.render('auth/error', { message: 'Already registered' });
    }
    if (course.prerequisites.some(p => !student.completedCourses.some(c => c._id.equals(p)))) {
        return res.render('auth/error', { message: 'Prerequisite not met' });
    }

    student.registeredCourses.push(courseId);
    course.seats.available--;
    await student.save();
    await course.save();
    res.redirect('/student/dashboard');
};

exports.subscribeCourse = async (req, res) => {
    const { courseId } = req.body;
    const student = await Student.findById(req.session.studentId);
    if (!student.subscribedCourses.includes(courseId)) {
        student.subscribedCourses.push(courseId);
        await student.save();
    }
    res.redirect('/student/courses');
};