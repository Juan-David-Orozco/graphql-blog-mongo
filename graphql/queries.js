const { GraphQLID, GraphQLList } = require('graphql')
const { UserType, PostType, CommentType } = require('./types')
const { User, Post, Comment } = require('../models')

const users = {
  type: new GraphQLList(UserType),
  description: "Get all users",
  async resolve() {
    return await User.find()
  }
}

const user = {
  type: UserType,
  description: "Get user by Id",
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

const comments = {
  type: new GraphQLList(CommentType),
  description: "Get all comments",
  async resolve() {
    return await Comment.find()
  }
}

const comment = {
  type: CommentType,
  description: "Get comment by Id",
  args: {
    id: {type: GraphQLID},
  },
  resolve: async (_, { id }) => await Comment.findById(id)
}

module.exports = { users, user, posts, post, comments, comment }