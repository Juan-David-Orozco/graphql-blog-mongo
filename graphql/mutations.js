const { GraphQLString } = require('graphql')
const { User } = require('../models')
const { createJWTToken } = require('../util/auth')

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
  args: {
    email: {type: GraphQLString},
    password: {type: GraphQLString},
  },
  async resolve(_, args) {
    const {email, password} = args
    const user = await User.findOne({email: email}).select('+password')
    if(!user || password !== user.password) throw new Error("Invalid Credentials")
    console.log(user)

    const token = createJWTToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
    console.log(token)

    return token
  }
}

module.exports = {
  register,
  login
};