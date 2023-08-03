const { GraphQLString, GraphQLID } = require('graphql')
const { User, Post, Comment } = require('../models')
const { createJWTToken } = require('../util/auth')
const { PostType, CommentType } = require('./types')
const moment = require('moment')

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
    const createdAt = moment(Date().now).format('MMMM Do YYYY, h:mm:ss a')
    const user = new User({username, password, email, displayName, createdAt})
    await user.save()
    const token = createJWTToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
    console.log(user)
    console.log(token)
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
    const token = createJWTToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
    console.log(user)
    console.log(token)
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
    const post = new Post({
      title: args.title,
      body: args.body,
      authorId: verifiedUser._id,
      createdAt: moment(Date().now).format('MMMM Do YYYY, h:mm:ss a'),
      updatedAt: moment(Date().now).format('MMMM Do YYYY, h:mm:ss a')
    })
    await post.save()
    console.log(verifiedUser)
    console.log(post)
    return post
  }
}

const updatePost = {
  type: PostType,
  description: "Updated a post",
  args: {
    postId: {type: GraphQLID},
    title: {type: GraphQLString},
    body: {type: GraphQLString},
  },
  async resolve(_, {postId, title, body}, { verifiedUser }) {
    if(!verifiedUser) throw new Error("Unauthorized")
    const updatedPost = await Post.findOneAndUpdate(
      {_id: postId, authorId: verifiedUser._id}, //Condiciones de busqueda
      { title, body, updatedAt: moment(Date().now).format('MMMM Do YYYY, h:mm:ss a')}, // Elementos a modificar
      {new: true} // Retorna nuevo registro modificado
    )
    if(!updatedPost) throw new Error("Post not found")
    console.log(verifiedUser)
    console.log(updatedPost)
    return updatedPost
  }
}

const deletePost = {
  type: GraphQLString,
  description: "Delete a post",
  args : {
    postId: {type: GraphQLID},
  },
  async resolve(_, { postId }, { verifiedUser }) {
    if(!verifiedUser) throw new Error("Unauthorized")
    const deletedPost = await Post.findOneAndDelete({
      _id: postId, authorId: verifiedUser._id  //Condiciones de busqueda
    })
    console.log(verifiedUser)
    console.log(deletedPost)
    if(!deletedPost) throw new Error("Post not found")
    return "Deleted a post successfully"
  }
}

const addComment = {
  type: CommentType,
  description: "Add a comment to a post",
  args: {
    comment: {type: GraphQLString},
    postId: {type: GraphQLID},
  },
  async resolve(_, {comment, postId}, { verifiedUser }) {
    if(!verifiedUser) throw new Error("Unauthorized")
    const newComment = new Comment({
      comment: comment,
      postId: postId,
      userId: verifiedUser._id,
      createdAt: moment(Date().now).format('MMMM Do YYYY, h:mm:ss a'),
      updatedAt: moment(Date().now).format('MMMM Do YYYY, h:mm:ss a')
    })
    const savedComment = await newComment.save()
    console.log(verifiedUser)
    console.log(savedComment)
    return savedComment
  }
}

const updateComment = {
  type: CommentType,
  description: "Update a comment",
  args: {
    commentId: {type: GraphQLID},
    comment: {type: GraphQLString},
  },
  async resolve(_, {commentId, comment}, { verifiedUser }) {
    if(!verifiedUser) throw new Error("Unauthorized")
    const updatedComment = await Comment.findOneAndUpdate(
      {_id: commentId, userId: verifiedUser._id}, //Condiciones de busqueda
      {comment, updatedAt: moment(Date().now).format('MMMM Do YYYY, h:mm:ss a')}, // Elementos a modificar
      {new: true} // Retorna nuevo registro modificado
    )
    console.log(verifiedUser)
    console.log(updatedComment)
    if(!updatedComment) throw new Error("Comment not found")
    return updatedComment
  }
}

const deleteComment = {
  type: GraphQLString,
  description: "Delete a comment",
  args:{
    commentId: {type: GraphQLID}
  },
  async resolve(_, { commentId }, { verifiedUser }) {
    if(!verifiedUser) throw new Error("Unauthorized")
    const deletedComment = await Comment.findOneAndDelete(
      {_id: commentId, userId: verifiedUser._id}
    )
    console.log(verifiedUser)
    console.log(deletedComment)
    if(!deletedComment) throw new Error("Comment not found")
    return "Comment deleted successfully"
  }
}

module.exports = {
  register,
  login,
  createPost,
  updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment
};