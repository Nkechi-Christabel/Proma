const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const projectsController = require("../controllers/projects");

router.post(
  "/createProject",
  upload.single("image"),
  projectsController.createProject
);
router.get("/profileProject", projectsController.profile);
router.get("/singleProject", projectsController.createProject);
router.get("/allProjects", projectsController.allProjects);

module.exports = router;
