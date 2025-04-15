const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true for HTTPS
  })
);
// Add this middleware before route handlers
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.path = req.path; // Add this line
  next();
});

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/student", require("./routes/student"));
app.use("/admin", require("./routes/admin"));

// Error handling for undefined routes
app.use((req, res) => {
  res.status(404).render("auth/error", { message: "Page Not Found" });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
