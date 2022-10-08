const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const projectsController = require("../controllers/projects");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  projectsController.createProject
);
router.get(
  "/userProjects",
  passport.authenticate("jwt", { session: false }),
  projectsController.userProjects
);
router.get(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  projectsController.singleProject
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  projectsController.userProjects
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  projectsController.userProjects
);

module.exports = router;
