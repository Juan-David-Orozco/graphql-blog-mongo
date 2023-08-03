const { Schema, model } = require('mongoose')
const moment = require('moment')

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: true
    },
    createdAt: {
      type: String
    },
    updatedAt: {
      type: String
    }
  },
  {
    //timestamps: true,
    versionKey: false
  }
)

module.exports = model('Comment', commentSchema)