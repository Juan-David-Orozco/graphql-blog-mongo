const { GraphQLString } = require('graphql')
const { User } = require('../models')

const register = {
  type: GraphQLString,
  description: "Register new user",
  args: {
    username: {type: GraphQLString},
    password: {type: GraphQLString},
    email: {type: GraphQLString},
    displayName: {type: GraphQLString}
  },
  async resolve(_, args) {
    const {username, password, email, displayName} = args
    console.log(args)
    const newUser = new User({
      username, password, email, displayName
    })
    console.log(newUser)
    const user = await newUser.save()
    console.log(user)
    return "User register successfully"
  }
}

module.exports = {
  register
};