const express = require("express");
const passport = require("passport/lib");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const mainRoutes = require("./routes/main");
const projectRoutes = require("./routes/projects");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// // Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

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
      mongoUrl: "mongodb+srv://Nk:pro123@projects.oyhzdlk.mongodb.net/projects",
    }),
  })
);

//Logging in the console
app.use(logger("dev"));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------
//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}, you better catch it!`);
});

//Routes
app.use("/", mainRoutes);
app.use("/project", projectRoutes);
