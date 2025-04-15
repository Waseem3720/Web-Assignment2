const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    registeredCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    subscribedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    completedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] // For prerequisite checks
});

module.exports = mongoose.model('Student', studentSchema);