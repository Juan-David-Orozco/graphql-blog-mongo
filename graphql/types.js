const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const { User } = require('../models')

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "The user type",
  fields: {
    id: {type: GraphQLID},
    username: {type: GraphQLString},
    email: {type: GraphQLString},
    displayName: {type: GraphQLString},
    createdAt: {type: GraphQLString},
    updatedAt: {type: GraphQLString},
  },
})

const PostType = new GraphQLObjectType({
  name: "PostType",
  description: "The post type",
  fields: {
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    body: {type: GraphQLString},
    author: { type: UserType, resolve(parent) {
      return User.findById(parent.authorId)
    } },
  },
})

module.exports = {
  UserType, PostType
}