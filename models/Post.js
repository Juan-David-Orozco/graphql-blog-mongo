const { Schema, model } = require('mongoose')

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

module.exports = model('Post', postSchema)