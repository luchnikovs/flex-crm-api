const jwt = require('express-jwt')
const config = require('../config')

const getTokenFromHeader = req => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}

module.exports = jwt({
  secret: config.tokenSecret, // Тут должно быть то же самое, что использовалось при подписывании JWT
  userProperty: 'something', // Здесь следующее промежуточное ПО сможет найти то, что было закодировано в services/auth:generateToken -> 'req.token'
  getToken: req => req.cookies.token
})