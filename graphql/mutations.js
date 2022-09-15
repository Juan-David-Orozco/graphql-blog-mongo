const { GraphQLString } = require('graphql')
const { User, Post } = require('../models')
const { createJWTToken } = require('../util/auth')
const { PostType } = require('./types')

const register = {
  type: GraphQLString,
  description: "Register new user and return a token",
  args: {
    username: {type: GraphQLString},
    password: {type: GraphQLString},
    email: {type: GraphQLString},
    displayName: {type: GraphQLString}
  },
  async resolve(_, args) {
    const {username, password, email, displayName} = args
    const user = new User({username, password, email, displayName})
    await user.save()
    console.log(user)

    const token = createJWTToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
    console.log(token)

    //return "User register successfully"
    return token
  }
}

const login = {
  type: GraphQLString,
  description: "Login a user and returns a token",
  args: {
    email: {type: GraphQLString},
    password: {type: GraphQLString},
  },
  async resolve(_, args) {
    const {email, password} = args
    const user = await User.findOne({email: email}).select('+password')
    if(!user || password !== user.password) throw new Error("Invalid Credentials")
    //console.log(user)
    const token = createJWTToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
    return token
  }
}

const createPost = {
  type: PostType,
  description: "Create a new post",
  args: {
    title: {type: GraphQLString},
    body: {type: GraphQLString},
  },
  async resolve(_, args, { verifiedUser }) {
    console.log(verifiedUser)
    const post = new Post({
      title: args.title,
      body: args.body,
      authorId: verifiedUser._id
    })
    await post.save()
    return post
  }
}

module.exports = {
  register,
  login,
  createPost
};