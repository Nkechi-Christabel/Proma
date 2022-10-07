const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");
// const ObjectId = require("mongodb").ObjectId;

//Create a new project
module.exports.createProject = async (req, res) => {
  try {
    // Upload image to cloudinary
    const upload = await cloudinary.uploader.upload(req.file.path);

    await Project.create({
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
      },
      user: req.user._id,
    });
    const result = await Project.findOne({ user: req.user._id }).populate(
      "user"
    );
    console.log("this is the result", result);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//get user's posted project/projects
module.exports.userProjects = async (req, res) => {
  try {
    const data = await Project.find({ user: req.user._id })
      .sort({ createdAt: "asc" })
      .lean();
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "User's Projects not found" });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//Gets a single project by id
// module.exports.singleProject = async (req, res) => {
//   try {
//     const data = await Project.findOne({
//       _id: req.params.id,
//       user: req.user._id,
//     })
//       .sort({ createdAt: "desc" })
//       .lean();
//     if (!data)
//       return res
//         .status(404)
//         .json({ success: false, message: "Project not found" });

//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports.profile = async (req, res) => {
//   try {
//     const data = await Project.find(req.id).lean();
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
