require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Student = require("./models/Student");
const Admin = require("./models/Admin");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected for seeding...");
    seedData();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

async function seedData() {
  try {
    // Clean collections if you want to start fresh
    await Student.deleteMany({});
    await Admin.deleteMany({});

    // Create a default student
    const student = new Student({
      rollNumber: "F223720",
      name: "Waseem Hanif",
      registeredCourses: [],
      subscribedCourses: [],
      completedCourses: [],
    });

    // Create a default admin with hashed password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("admin", saltRounds);
    const admin = new Admin({
      username: "admin",
      password: hashedPassword,
    });

    await student.save();
    await admin.save();

    console.log("Default student and admin created:");
    console.log("Student: rollNumber: F223720, name: Waseem Hanif");
    console.log("Admin: username: admin, password: admin");
  } catch (error) {
    console.error("Error while seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
}
