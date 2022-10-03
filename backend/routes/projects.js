const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const projectsController = require("../controllers/projects");
// const authenticated = require("../middleware/auth")
const passport = require("../config/passport");

router.post(
  "/createProject",
  upload.single("image"),
  projectsController.createProject
);
router.get("/profileProject", projectsController.profile);
router.get("/singleProject", projectsController.createProject);
router.get("/allProjects", projectsController.allProjects);

module.exports = router;
