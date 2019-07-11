/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const Redis = require("ioredis");
const { RedisPubSub } = require("graphql-redis-subscriptions");
// const { PubSub } = require('apollo-server-express');

const { unusableCheck, userReducer } = require("../helperFuncs");

const { User, Unusables } = require("../db/models/index");
const { paginateResults } = require("./utils");

// const pubsub = new RedisPubSub({
//   publisher: new Redis(process.env.REDIS_URL),
//   subscriber: new Redis(process.env.REDIS_URL),
// });
// const pubsub = new PubSub();

const CURRENT_UPDATED = "CURRENT_UPDATED";
const FOLLOWERS_UPDATED = "FOLLOWERS_UPDATED";
const USER_UPDATED = "USER_UPDATED";

const resolvers = {
  Subscription: {
    currentUpdated: {
      subscribe: () => pubsub.asyncIterator([CURRENT_UPDATED]),
    },
    followersUpdated: {
      subscribe: () => pubsub.asyncIterator([FOLLOWERS_UPDATED]),
    },
    userUpdated: {
      subscribe: () => pubsub.asyncIterator([USER_UPDATED]),
    },
  },
  User: {
    following: user =>
      User.find({ username: { $in: user.following } }, (err, docs) => {
        if (err || !docs) {
          console.log("User: following", err);
          return null;
        }
        return docs.map(doc => userReducer(doc));
      }),
  },
  Mutation: {
    followerChange: async (_, { follower }, context) => {
      const { username } = context.user._doc;
      const weAreCurrentlyFollowing = await User.findOne({ username })
        .then(doc => doc.following.includes(follower))
        .catch(() => console.log("man, i dunno"));
      const action = weAreCurrentlyFollowing ? "$pull" : "$addToSet";
      return User.findOneAndUpdate(
        { username },
        { [action]: { following: follower } },
        {
          new: true,
          useFindAndModify: false,
        }
      )
        .then(doc => {
          pubsub.publish(USER_UPDATED, { userUpdated: userReducer(doc) });
          pubsub.publish(FOLLOWERS_UPDATED, {
            followersUpdated: userReducer(doc),
          });
          return userReducer(doc);
        })
        .catch(err => {
          console.log("Mutation: followingUser", err);
          return null;
        });
    },
    loginOrCreateUser: async (_, { username, email }) => {
      if ((await unusableCheck(username)) === true) {
        console.log("Name unavailable");
        // true means a doc was found; name's reserved, do not continue
        return null;
      }
      return User.findOne({ email })
        .then(doc => userReducer(doc))
        .catch(() => {
          const yuser = new User();
          // yuser.password = yuser.generateHash(password);
          yuser.username = username;
          yuser.email = email;
          yuser.current = {
            timestamp: Date.now(),
            color: "#115533",
          };
          const promise = yuser.save();
          return promise
            .then(doc => userReducer(doc))
            .catch(erro => {
              console.log("createUser fail: ", erro);
              return null;
            });
        });
    },
    deleteUser: (_, { username }, context) => {
      if (!context.user._doc.roles.includes("admin")) {
        console.log("unauthorized attempt to delete a User");
        return null;
      }
      return User.deleteOne({ username })
        .then(res => {
          if (res.deletedCount === 1) {
            const trash = new Unusables({
              unusableUsername: username,
              reason: "Deleted by admin or higher",
            });
            return trash
              .save()
              .then(ress => {
                console.log(ress);
                return `Done. Deleted ${username} and marked that username as unusable.`;
              })
              .catch(er => {
                console.log(
                  `Deleted ${username} from 'users' collections, but tripped marking the name as unusable: ${er}`
                );
              });
          }
          return `Not sure about ${username}. dB response says nothing deleted.`;
        })
        .catch(err => {
          console.log("Delete user failed", err);
          return null;
        });
    },
    updateColor: (_, { color, timestamp }, context) => {
      const { username } = context.user._doc;
      return User.findOneAndUpdate(
        { username },
        { $set: { current: { color, timestamp } } },
        { new: true, useFindAndModify: false },
        (err, doc) => {
          if (err || !doc) {
            console.log("updateColor failed: ", err, doc);
            return null;
          }
          pubsub.publish(USER_UPDATED, { userUpdated: userReducer(doc) });
          pubsub.publish(CURRENT_UPDATED, { currentUpdated: userReducer(doc) });
          return userReducer(doc);
        }
      );
    },
  },
  Query: {
    getFollowings: async (_, { after, pageSize }, context) => {
      const { username } = context.user._doc;
      const allFollowings = await User.find({ username }).then(docs =>
        docs.map(u => userReducer(u))
      );
      const followings = await paginateResults({
        after,
        pageSize,
        results: allFollowings,
      });
      return {
        followings,
        cursor: followings.length
          ? followings[followings.length - 1].cursor
          : null,
        hasMore: followings.length
          ? followings[followings.length - 1].cursor !==
            allFollowings[allFollowings.length - 1].cursor
          : false,
      };
    },
    getAllUsers: async (_, { after, pageSize }) => {
      const allUsers = await User.find({}).then(docs =>
        docs.map(u => userReducer(u))
      );
      const users = await paginateResults({
        after,
        pageSize,
        results: allUsers,
      });
      return {
        users,
        cursor: users.length ? users[users.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: users.length
          ? users[users.length - 1].cursor !==
            allUsers[allUsers.length - 1].cursor
          : false,
      };
    },
    getUser: (_, { username }) =>
      User.findOne({ username }, (err, doc) => {
        if (err || !doc) {
          console.log("Query:getUser", err, doc);
          return null;
        }
        return userReducer(doc);
      }),
    getUsers: (_, { number }) =>
      User.find()
        .limit(number)
        .then(doc => doc.map(item => userReducer(item)))
        .catch(err => console.log("GetUsers:catch", err)),
    getRandomNotFollowedUsers: (_, { number }, context) => {
      try {
        const { following, username } = context.user._doc;
        following.concat([username]);
        return User.aggregate([
          { $match: { username: { $nin: following } } },
          { $sample: { size: number } },
        ])
          .then(doc => doc.map(item => userReducer(item)))
          .catch(err => console.log("GetRandomNotFollowedUsers:catch", err));
      } catch (e) {
        return null;
      }
    },
  },
};

module.exports = resolvers;
