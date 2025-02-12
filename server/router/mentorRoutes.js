const express = require("express");
const router = express.Router();
const {addCourseDetails,getCourseData, addStudentIdbtCourse, enrollCourse,} =require("../controllers/teachersContollers")

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() }); 

router.post('/add-course', upload.single('photo'), addCourseDetails);
router.get("/get-course",getCourseData)
router.post("/image")
router.post("/enroll-course",enrollCourse)

module.exports=router