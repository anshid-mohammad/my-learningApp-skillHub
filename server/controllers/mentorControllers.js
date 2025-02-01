const Mentor = require("../models/mentor");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");
const CourseDetails= require("../models/teachersForm")

const mentorSignup = async (req, res) => {
  try {
    const { name, email,phoneNumber, password } = req.body;

    if (!name || !email  || !phoneNumber|| !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const MentorExisting = await Mentor.findOne({ email });
    if (MentorExisting) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMentor = new Mentor({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    await newMentor.save();
    res.status(201).json({
      message: "User registered successfully",
      MentorId: newMentor._id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

const mentorLogin = async (req, res) => {
  try {
    const { email, password,phoneNumber } = req.body;

    const mentor = await Mentor.findOne({ email }).select("+password");
    if (!mentor) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, mentor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(mentor);

    res.status(200).json({ message: "Login successful", userId:mentor._id ,username:mentor.name,userRole:mentor.role,token});

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

const getTeachers = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

module.exports = {mentorLogin, mentorSignup,getTeachers};
