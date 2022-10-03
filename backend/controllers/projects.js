const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");

const mongoose = require("mongoose");

// Project.find({})
//   .populate("user")
//   .exec((err, result) => {
//     if (err) {
//       // res.status(500).json({ message: err });
//       console.log(err);
//     }
//     // res.status(200).json(result);
//     console.log(result);
//   });

module.exports.createProject = async (req, res) => {
  try {
    // Upload image to cloudinary
    const upload = await cloudinary.uploader.upload(req.file.path);

    const data = await Project.create({
      title: req.body.title,
      image: upload.secure_url,
      cloudinaryId: upload.public_id,
      website: req.body.website,
      gitRepo: req.body.gitRepo,
      status: {
        isInitiating: req.body.status.isInitiating,
        isExecuting: req.body.status.isExecuting,
        isComplete: req.body.status.isComplete,
        isHosted: req.body.status.isHosted,
        user: users._id,
      },
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports.allProjects = async (req, res) => {
  try {
    const data = await Project.find().sort({ createdAt: "asc" }).lean();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.SingleProject = async (req, res) => {
  try {
    const data = await Project.findById(req.params.id)
      .sort({ createdAt: "desc" })
      .lean();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.profile = async (req, res) => {
  try {
    const data = await Project.find(req.id).lean();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
