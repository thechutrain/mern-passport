const mongoose = require("mongoose");

const { Schema } = mongoose;

const colorValidator = v => /^#([0-9a-f]{3}){1,2}$/i.test(v);
const user = new Schema({
  firstName: {
    type: String,
    unique: false,
    default: "",
  },
  lastName: {
    type: String,
    unique: false,
    default: "",
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
  },
  current: {
    timestamp: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    color: {
      type: String,
      default: "#84EB76",
      validator: [colorValidator, "Invalid color"],
      required: true,
    },
  },
  following: {
    type: Array,
    required: true,
    default: [],
  },
  roles: {
    type: [String],
    required: true,
    default: ["basic"],
    enum: ["basic", "paid", "admin", "superadmin"],
  },
  // history: {
  //   colors: {
  //     type: Array,
  //   },
  // },
  google: {
    googleId: {
      type: String,
      required: false,
    },
  },
});

module.exports = { user };
