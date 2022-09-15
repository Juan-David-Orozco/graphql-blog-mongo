const { GraphQLID, GraphQLList } = require('graphql')
const { UserType, PostType } = require('./types')
const { User, Post } = require('../models')

const users = {
  type: new GraphQLList(UserType),
  async resolve() {
    return await User.find()
  }
}

const user = {
  type: UserType,
  description: "Get a user by ID",
  args: {
    id: {type: GraphQLID},
  },
  async resolve(_, { id }) {
    return await User.findById(id)
  }
}

const posts = {
  type: new GraphQLList(PostType),
  description: "Get all posts",
  async resolve() {
    return await Post.find()
  }
}

const post = {
  type: PostType,
  description: "Get post by Id",
  args: {
    id: {type: GraphQLID},
  },
  resolve: async (_, { id }) => await Post.findById(id)
}

module.exports = { users, user, posts, post }