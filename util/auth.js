const jwt = require('jsonwebtoken')
const { SECRET_TOKEN } = require('../config')

const createJWTToken = (user) => {
  const token = jwt.sign(
    {user},
    SECRET_TOKEN,
    {expiresIn: '1d'}
  )
  return token
}

module.exports = {
  createJWTToken,
}