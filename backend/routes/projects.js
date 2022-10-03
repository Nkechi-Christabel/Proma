const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const projectsController = require('../controllers/projects');
const { ensureAuth } = require('../middleware/auth');

router.post(
  '/',
  ensureAuth,
  upload.single('image'),
  projectsController.createProject
);

router.get('/:id', ensureAuth, projectsController.singleProject);
router.get('/', ensureAuth, projectsController.allUserProjects);

module.exports = router;
