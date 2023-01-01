const jwt = require('jsonwebtoken')
const { SECRET_TOKEN } = require('../config')

const authenticate = (req, res, next) => {
  try {
    // Se obtiene el token en el header de la peticion
    const token = req.headers.authorization?.split(' ')[1]  
    if(!token) return res.status(401).send('Not token provided')
    // Se decodifica usando la firma establecida 
    const userDecoded = jwt.verify(token, SECRET_TOKEN)
    if(!userDecoded) return res.status(401).send('Not provided valid signature')
    console.log(userDecoded)
    req.verifiedUser = userDecoded.user
    next()
  } catch (error) {
    res.status(500).send(error.message)
    next()
  }
}

module.exports = {
  authenticate
}