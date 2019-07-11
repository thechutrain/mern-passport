require("dotenv").config();

// eslint-disable-next-line prettier/prettier
const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schema/typedefs");
const resolvers = require("./schema/resolvers");

const { getUser } = require("./helperFuncs");

const dbConnection = require("./db"); // loads our connection to the mongo database
const passport = require("./passport");

const PORT = process.env.PORT || 8080;
const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 443, hostname: "example.com" },
  development: { ssl: false, port: 8080, hostname: "localhost" },
};

const environment = process.env.NODE_ENV || "production";
const config = configurations[environment];

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      console.log(connection, "<-context connection");
      return connection.context;
    }
    return { user: req.user };
  },
  subscriptions: {
    onConnect: connectionParams => {
      // onConnect: (connectionParams, websocket) => {
      // console.log(connectionParams);
      const authToken = connectionParams.Authorization;
      if (authToken) {
        return getUser(authToken).then(user => ({
          currentUser: user,
        }));
      }
      throw new Error("Missing auth token");
    },
  },
});

const app = express();
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
// app.use(function(req, res, next) {
//   console.log("===== passport user =======");
//   console.log(req.session);
//   console.log(req.user);
//   console.log("===== END =======");
//   next();
// });

/* Express app ROUTING */

// ====== Error handler ====
app.use(function(err, req, res, next) {
  console.log("====== ERROR =======");
  console.error(err.stack);
  res.status(500);
});

// insert app into apollo
apollo.applyMiddleware({ app });
// Create the HTTPS or HTTP server, per configuration
var server;
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = https.createServer(
    {
      key: fs.readFileSync(`./ssl/${environment}/server.key`),
      cert: fs.readFileSync(`./ssl/${environment}/server.crt`),
    },
    app
  );
} else {
  server = http.createServer(app);
}

app.use("/auth", require("./auth"));
app.use("/static", express.static(path.join(__dirname, "../build/static")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/"));
});
app.get("*", (req, res) => {
  res.json({ message: "There should be a 404 here." });
});

// ==== Starting Server =====
// app.listen(PORT, () => {
//   console.log(`App listening on PORT: ${PORT}`);
// });
server.listen({ port: config.port }, () =>
  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
      apollo.graphqlPath
    }`
  )
);
