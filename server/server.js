require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const dbConnection = require("./db"); // loads our connection to the mongo database
const passport = require("./passport");
const app = express();
const PORT = process.env.PORT || 8080;

// ===== Middleware ====
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.APP_SECRET,
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false,
  })
);

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// ===== testing middleware =====
app.use(function(req, res, next) {
  console.log("===== passport user =======");
  console.log(req.session);
  console.log(req.user);
  console.log("===== END =======");
  next();
});

app.use("/auth", require("./auth"));
app.use("/static", express.static(path.join(__dirname, "../build/static")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/"));
});

/* Express app ROUTING */

// ====== Error handler ====
app.use(function(err, req, res, next) {
  console.log("====== ERROR =======");
  console.error(err.stack);
  res.status(500);
});

// ==== Starting Server =====
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
