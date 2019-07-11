/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const { User, Unusables } = require("./db/models/index");

const userReducer = doc => ({
  _id: doc._id,
  username: doc.username,
  current: doc.current,
  following: doc.following,
  cursor: doc.username,
});

const unusableCheck = string =>
  Unusables.findOne({ unusableUsername: string })
    .then(doc => {
      // console.log("doc found in Unusables: ", doc);
      if (doc !== null) return true;
      return false;
    })
    .catch(erx => {
      console.log(`name-check failed: ${erx}`);
      return true;
    });

const getUser = _id =>
  User.findOne({ _id })
    .then(doc => {
      // console.log(doc);
      // console.log("helper sending this back to apollo\n", userReducer(doc));
      // return userReducer(doc);
      return doc;
    })
    .catch(err => {
      // console.log(err);
      return null;
    });

module.exports = {
  unusableCheck,
  getUser,
  userReducer,
};
