const jwt = require('jsonwebtoken')

const createJWTToken = (user) => {
  const token = jwt.sign({user}, 'SecretToken', {
    expiresIn: '1d'
  })
  return token
}

module.exports = {
  createJWTToken,
}