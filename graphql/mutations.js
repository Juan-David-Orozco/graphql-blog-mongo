const { GraphQLString, GraphQLID } = require('graphql')
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

const updatePost = {
  type: PostType,
  description: "Updated a post",
  args: {
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    body: {type: GraphQLString},
  },
  async resolve(_, {id, title, body}, { verifiedUser }) {
    console.log(verifiedUser)
    console.log(id, title, body)
    if(!verifiedUser) throw new Error("Unauthorized")
    const updatedPost = await Post.findOneAndUpdate(
      {_id: id, authorId: verifiedUser._id}, //Condiciones de busqueda
      {title, body}, // Elementos a modificar
      {new: true} // Retorna nuevo registro modificado
    )
    console.log(updatedPost)
    return updatedPost
  }
}

module.exports = {
  register,
  login,
  createPost,
  updatePost
};