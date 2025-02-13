const express = require("express");
const router = express.Router();
const { userSignup,userLogin, getAllUser, addUserImage, updateProfile } = require("../controllers/userController");
const {mentorLogin,mentorSignup, getAllVendor, updateProfileVentor, addVentorImage}=require("../controllers/mentorControllers")
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() }); 
// Route for user signup
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/mentor-login",mentorLogin);
router.post("/mentor-signup",mentorSignup)
router.get("/get-ventor",getAllVendor)
router.get("/get-user",getAllUser)
router.post('/add-imageUrl', upload.single('photo'), addUserImage);
router.post("/update-profile",updateProfile)
router.post("/update-profile-ventor",updateProfileVentor)
router.post("/add-imageUrl-ventor",upload.single('photo'),addVentorImage)




module.exports = router;
