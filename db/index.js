const mongoose = require('mongoose')
const { MONGODB_URI } = require('../config')

const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI)
    console.log('>>> DB is connected', db.connection.name)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { connectDB }
