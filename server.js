const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')
const { connectDB } = require('./db')
const { authenticate } = require('./middlewares/auth')

const app = express()
connectDB()

app.use(authenticate)

app.use('/graphql', graphqlHTTP({
  graphiql: true, // interfaz para realizar las consultas a la API
  schema: schema
}))

app.get('/', (req, res) => { res.send("Welcome to GraphQL API") })

app.listen(3000, () => console.log("Server on port 3000"))