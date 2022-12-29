const { config } = require('dotenv')
config()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI
const SECRET_TOKEN = process.env.SECRET_TOKEN

module.exports = {
  PORT, MONGODB_URI, SECRET_TOKEN
}