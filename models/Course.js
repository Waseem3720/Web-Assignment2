const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: String,
    level: Number,
    schedule: {
        days: [String], // e.g., ["Mon", "Wed"]
        time: String    // e.g., "10:00-11:30"
    },
    seats: {
        total: Number,
        available: Number
    },
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Course', courseSchema);