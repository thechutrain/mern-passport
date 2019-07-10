const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

const colorValidator = v => /^#([0-9a-f]{3}){1,2}$/i.test(v); // TODO: this no workie.

const userSchema = new Schema({
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
  // local: {
  //   username: {
  //     type: String,
  //     unique: false,
  //     required: false,
  //   },
  //   password: {
  //     type: String,
  //     unique: false,
  //     required: false,
  //   },
  // },
  google: {
    googleId: {
      type: String,
      required: false,
    },
  },
  tumblr: {
    tumblrId: {
      type: String,
      required: false,
    },
  },
});

// userSchema.methods = {
//   checkPassword: function(inputPassword) {
//     return bcrypt.compareSync(inputPassword, this.local.password);
//   },
//   hashPassword: plainTextPassword => {
//     return bcrypt.hashSync(plainTextPassword, 10);
//   },
// };

// Define hooks for pre-saving
// userSchema.pre("save", function(next) {
//   if (!this.local.password) {
//     console.log("=======NO PASSWORD PROVIDED=======");
//     next();
//   } else {
//     this.local.password = this.hashPassword(this.local.password);
//     next();
//   }
// });

// Create reference to User & export
const User = mongoose.model("User", userSchema);
module.exports = User;
