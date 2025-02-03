const express = require("express");
const router = express.Router();
const { userSignup,userLogin, getAllUser } = require("../controllers/userController");
const {mentorLogin,mentorSignup, getAllVendor}=require("../controllers/mentorControllers")
// Route for user signup
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/mentor-login",mentorLogin);
router.post("/mentor-signup",mentorSignup)
router.get("/get-ventor",getAllVendor)
router.get("/get-user",getAllUser)


module.exports = router;
