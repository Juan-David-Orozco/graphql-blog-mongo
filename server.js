const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')
const { connectDB } = require('./db')
const morgan = require('morgan')

const app = express()
connectDB()

//app.use(morgan('dev'))

app.use('/graphql', graphqlHTTP({
  graphiql: true, // interfaz para realizar las consultas a la API
  schema: schema
}))

app.get('/', (req, res) => { res.send("Welcome to server") })

app.listen(3000, () => console.log("Server on port 3000"))