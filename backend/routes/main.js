const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { ensureAuth } = require('../middleware/auth');

//Main Routes - simplified for now
// router.get("/", homeController.getIndex);
// router.get("/profile", ensureAuth, postsController.getProfile);
// router.get("/feed", ensureAuth, postsController.getFeed);
// router.get("/login", authController.getLogin);

router.get('/logout', authController.logout);
router.post('/login', authController.postLogin);
router.get('/user', ensureAuth, authController.getUser);
// router.get("/signup", authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;
