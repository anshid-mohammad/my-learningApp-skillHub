
const CourseDetails=require("../models/teachersForm")
const Course = require('../models/teachersForm'); // Import your Mongoose Course model

// AWS Configuration
const { s3, upload, randomFileName, sharp } = require('../utils/s3Clinet');

const addCourseDetails = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No photo file provided' });
  }

  try {
    const buffer = await sharp(file.buffer)
      .resize({ height: 1080, width: 720, fit: 'contain' })
      .jpeg({ quality: 70 })
      .toBuffer();

    const uniqueFileName = `${Date.now()}_${randomFileName()}_${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: uniqueFileName,
      Body: buffer,
      ContentType: file.mimetype,
    };

    const data = await s3.upload(params).promise();
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

    // Save course data including image URL
    const newCourse = new Course({
      ...req.body,
      photo: imageUrl,
    });

    await newCourse.save();

    res.status(201).json({ message: 'Course created successfully!', course: newCourse });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Failed to add course', error: error.message });
  }
};




      const getCourseData = async (req, res) => {
        try {
          const courseData = await CourseDetails.find();
      
          if (!courseData.length) {
            return res.status(404).json({ message: "No courses found" });
          }
      
          console.log("Fetched Course Data:", courseData);
      
          res.status(200).json(courseData);
        } catch (error) {
          console.error("Error fetching course data:", error.message);
      
          res.status(500).json({ message: "Failed to fetch course data", error: error.message });
        }
      };
    module.exports={addCourseDetails,getCourseData}