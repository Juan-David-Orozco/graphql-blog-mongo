const { Schema, model } = require('mongoose')
const moment = require('moment')

const postSchema = new Schema(
  {
    authorId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      default: moment(Date().now).format('MMMM Do YYYY, h:mm:ss a')
    },
    updatedAt: {
      type: String,
      default: moment(Date().now).format('MMMM Do YYYY, h:mm:ss a')
    }
  },
  {
    //timestamps: true,
    versionKey: false
  }
)

module.exports = model('Post', postSchema)