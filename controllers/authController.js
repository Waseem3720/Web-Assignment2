const Student = require('../models/Student');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

exports.studentLogin = async (req, res) => {
    const { rollNumber } = req.body;
    const student = await Student.findOne({ rollNumber });
    if (student) {
        req.session.studentId = student._id;
        res.redirect('/student/dashboard');
    } else {
        res.render('auth/login', { error: 'Student not found' });
    }
};

exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin && await bcrypt.compare(password, admin.password)) {
        req.session.adminId = admin._id;
        res.redirect('/admin/dashboard');
    } else {
        res.render('auth/login', { error: 'Invalid credentials' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
};