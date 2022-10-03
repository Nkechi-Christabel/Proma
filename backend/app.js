const express = require("express");
const passport = require("passport/lib");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// const flash = require('express-flash');
const logger = require("morgan");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const mainRoutes = require("./routes/main");
const projectRoutes = require("./routes/projects");
const passportConfig = require("./config/passport")(passport);

require("./config/database");

dotenv.config({ path: path.join(__dirname, "./config/.env") });

app.use(cors());

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static Folder
app.use(express.static("public"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "kitty cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,
    }),
  })
);

//Logging in the console
app.use(logger("dev"));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------
//Routes
app.get("/healthcheck", (_, res) =>
  res.status(200).json({ success: true, message: "Server up" })
);

app.use("/", mainRoutes);
app.use("/projects", projectRoutes);

//Server Running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, you better catch it!`);
});
