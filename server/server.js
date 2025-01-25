const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose =require("./configration/connection")
const userRouter=require("./router/userRoutes");
const passport = require('passport');
const passportConfig=require("./configration/passportConfig")
const authRoute=require("./router/authRoutes")
const session = require('express-session');
const mentorRouter= require("./router/mentorRoutes")
const adminRouter= require("./router/adminRoutes")

// const storeFiles=require("./files/storeFiles")
const createAdmin=require("./CreateAdmin/admin")
const sampleFiles=require("./files/sampleFile")

const app =express()
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000',
  credentials:true,
 })); 

 app.use(session({
  secret: 'your_secret_key',  // Secret key for signing the session cookie
  resave: false,              // Forces the session to be saved back to the store, even if it wasn't modified
  saveUninitialized: false,   // Prevents storing empty sessions
  cookie: { secure: false }   // Set `secure: true` if you're using HTTPS
}));
 createAdmin()
// Initialize Passport and session handling
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth",authRoute)

// app.use("/api/auth",sampleFiles)

app.use("/api/auth",adminRouter)

// app.use("/api/auth",storeFiles)
app.use("/api/auth",userRouter,mentorRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "An unexpected error occurred" });
  });
  
  // Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  