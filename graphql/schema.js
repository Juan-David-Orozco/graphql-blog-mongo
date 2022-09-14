const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const { hello } = require('./queries')

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: { //Se definen las funciones que puedo consultas
    hello,
  }
})

module.exports = new GraphQLSchema({
  query: QueryType
})

