const { GraphQLID, GraphQLList } = require('graphql')
const { UserType } = require('./types')
const { User } = require('../models')

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

module.exports = { users, user }