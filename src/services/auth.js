const jwt = require('express-jwt')

const getTokenFromHeader = req => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}

const isAuth = jwt({
  secret: process.env.TOKEN_SECRET, // Тут должно быть то же самое, что использовалось при подписывании JWT
  userProperty: 'something', // Здесь следующее промежуточное ПО сможет найти то, что было закодировано в services/auth:generateToken -> 'req.token'
  getToken: req => req.cookies.token
})

module.exports = {getTokenFromHeader, isAuth}