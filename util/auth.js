const jwt = require('jsonwebtoken')

const createJWTToken = (user) => {
  const token = jwt.sign({user}, 'SecretToken', {
    expiresIn: '1h'
  })
  return token
}

module.exports = {
  createJWTToken,
}