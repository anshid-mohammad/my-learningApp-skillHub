const express = require("express");
const router = express.Router();
const { userSignup,userLogin } = require("../controllers/userController");
const {mentorLogin,mentorSignup,getTeachers}=require("../controllers/mentorControllers")
// Route for user signup
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/mentor-login",mentorLogin);
router.post("/mentor-signup",mentorSignup)
router.get("/get-mentor",getTeachers)


module.exports = router;
