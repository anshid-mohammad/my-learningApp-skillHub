const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
 
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: false },
    role: { type: String, enum: ["admin","mentor"], default: "mentor" },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Mentor", userSchema);



