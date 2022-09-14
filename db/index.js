const mongoose = require('mongoose')

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost/graphql-blog')
  console.log('>>> DB is connected')
}

module.exports = { connectDB }
