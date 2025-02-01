const messageModel = require("../models/messageModel");

// Add Message
const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    // Check if required data is available
    if (!from || !to || !message) {
      return res.status(400).json({ msg: "Missing required fields: from, to, or message." });
    }

    // Create new message in the database
    const data = await messageModel.create({
      message, // Save the message text directly
      users: [from, to],
      sender: from,
      timestamp: new Date(), // Add a timestamp
    });

    if (data) {
      return res.status(200).json({ msg: "Message added successfully" });
    }
    return res.status(500).json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex); // Pass the error to the error handler
  }
};

// Get Messages between users
const getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    // Check if both users are provided
    if (!from || !to) {
      return res.status(400).json({ msg: "Both 'from' and 'to' fields are required." });
    }

    // Find messages between the two users
    const messages = await messageModel
      .find({
        users: { $all: [from, to] },
      })
      .sort({ timestamp: 1 }); // Sort by timestamp in ascending order

    // Map messages to a custom format
    const projectMessages = messages.map((msg) => ({
      fromSelf: msg.sender.toString() === from, // Check if the sender is the current user
      message: msg.message, // Direct message text
      timestamp: msg.timestamp, // Include the timestamp
    }));

    return res.status(200).json(projectMessages);
  } catch (ex) {
    next(ex); // Pass the error to the error handler
  }
};

module.exports = { addMessage, getMessages };