const mongoose = require("mongoose");
const user = require("./user");
const unusables = require("./unusables");

const User = mongoose.model("User", user);
const Unusables = mongoose.model("Unusables", unusables);

module.exports = { User, Unusables };
