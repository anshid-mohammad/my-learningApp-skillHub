const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "Message text is required."], // Improved validation message
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Ensure this matches the model name for users
        required: [true, "At least two users are required for a message."],
      },
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Ensure this matches the model name for the sender
      required: [true, "Sender ID is required."],
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Indexes for faster querying
messageSchema.index({ users: 1 }); // Index for querying messages by users
messageSchema.index({ sender: 1 }); // Index for querying messages by sender

module.exports = mongoose.model('Message', messageSchema); // Use PascalCase for model names