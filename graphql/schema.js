const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const { hello } = require('./queries')
const { register, login } = require('./mutations')

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: { //Se definen las funciones que puedo consultar
    hello,
  }
})

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    register, login
  }
})

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})

