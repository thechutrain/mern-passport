const mongoose = require("mongoose");

const { Schema } = mongoose;

const unusables = new Schema({
  unusableUsername: {
    type: String,
    required: true,
    unique: true,
  },
  reason: {
    type: String,
    required: true,
    default: "somebody said so",
  },
});

module.exports = { unusables };
