const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// should mongoose.connection be put in the call back of mongoose.connect???
const db = mongoose.connection;
db.on("error", err => {
  console.log(`There was an error connecting to the database: ${err}`);
});
db.once("open", () => {
  console.log(`You have successfully connected to your mongo database`);
});

module.exports = db;
