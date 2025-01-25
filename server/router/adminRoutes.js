const express = require("express");
const router = express.Router();
const {getCourseData,getCourseId,changeStatus,declineCourse}=require("../controllers/adminContollers");
const { route } = require("./userRoutes");

router.post("/get-course",getCourseData)
router.get("/get-courseid/:id",getCourseId)
router.put("/update-status/:id",changeStatus)
router.delete("/delete-course",declineCourse)







module.exports=router