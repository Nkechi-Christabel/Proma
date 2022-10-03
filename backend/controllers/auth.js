const passport = require("passport/lib");
const validator = require("validator");
const User = require("../models/User");

module.exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    return res.status(400).json({
      message: "Please enter a valid email address.",
    });
  if (validator.isEmpty(req.body.password))
    return res.json({
      message: "Password cannot be blank.",
    });

  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // req.flash("errors", info);
      return res.status(404).json(info);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(user);
      // res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.status(200).json(user);
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.");
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

module.exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    return res.status(400).json({
      message: "Please enter a valid email address.",
    });
  if (!validator.isLength(req.body.password, { min: 8 }))
    return res.status(500).json({
      message: "Password must be at least 8 characters long",
    });
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User(req.body);
  User.findOne({ email: req.body.email }, async (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(409).json({
        message: "Account with that email address already exist.",
      });
    }
    await user.save((err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        res.status(201).json(user);
      });
    });
  });
};

module.exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.");
    res.status(200).json({ message: "User has logged out." });
  });
  req.session.destroy((err) => {
    if (err) {
      console.log("Error : Failed to destroy the session during logout.", err);
      req.user = null;
      res.status(500).json({ message: err.message });
    }
  });
};
