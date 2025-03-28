const express = require("express");
const multer = require("multer");
const Video = require("../Model/Video");
const path = require("path");
const fs = require("fs");
// const path = require("path");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload API
router.post("/upload", upload.single("video"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  console.log("Uploaded File:", req.file);
  // Save file metadata in MongoDB
  try {
    const normalizedPath = req.file.path.split(path.sep).join('/');

  const newVideo = new Video({
    title: req.body.title,
    description: req.body.description,
    filePath: normalizedPath.replace('uploads/', ''), // Store relative path
  });
    await newVideo.save();

    res.json({ message: "File uploaded successfully", video: newVideo });
  } catch (error) {
    console.error("Error saving to MongoDB:", error);
    res.status(500).json({ error: "Failed to save video" });
  }
});


  router.get("/", async (req, res) => {
    try {
      const videos = await Video.find();
      console.log(videos)
      res.json(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ error: "Failed to retrieve videos" });
    }
  });

module.exports=router

