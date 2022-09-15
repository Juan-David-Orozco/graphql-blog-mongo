const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const { users, user } = require('./queries')
const { register, login, createPost } = require('./mutations')

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: { //Se definen las funciones que puedo consultar
    users, user
  }
})

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    register, login, createPost
  }
})

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})

