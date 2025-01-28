const express = require("express");
const router = express.Router();
const {addStudentData,getStudentData, getStudentId, changeStatus, declineStudent}= require("../controllers/studentControllers")

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() }); 
router.post(
  '/add-student',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'identityProof', maxCount: 1 },
  ]),
  addStudentData
);
router.get("/get-student",getStudentData)

router.get("/student-details/:id",getStudentId)
router.put("/update-student/:id",changeStatus)
router.delete("/delete-student/:id",declineStudent)
module.exports=router