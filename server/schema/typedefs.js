const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Current {
    timestamp: String
    color: String!
  }
  type User {
    username: String!
    avatar: String!
    current: Current!
    following: [User]!
  }
  type UserCollection {
    cursor: String
    hasMore: Boolean!
    users: [User]
  }
  type Query {
    # me: User
    getFollowings(pageSize: Int, after: String): UserCollection
    getUser(username: String!): User
    getUsers(number: Int!): [User]
    getAllUsers(pageSize: Int, after: String): UserCollection
    getRandomNotFollowedUsers(number: Int!): [User]
  }
  type Mutation {
    followerChange(follower: String!): User
    updateColor(timestamp: String!, color: String!): User
    deleteUser(username: String!): String
    loginOrCreateUser(username: String!, email: String!): User
  }
  type Subscription {
    currentUpdated(username: String!): User
    followersUpdated(username: String!): User
    userUpdated(username: String!): User
  }
`;

module.exports = typeDefs;
