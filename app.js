const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')
const { authenticate } = require('./middlewares/auth')

const app = express()

app.get('/', (req, res) => { res.send("Welcome to GraphQL API") })

app.use(authenticate)

app.use('/graphql', graphqlHTTP({
  graphiql: true, // interfaz para realizar las consultas a la API
  schema: schema
}))

module.exports = app