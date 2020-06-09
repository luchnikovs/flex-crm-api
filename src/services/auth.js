const jwt = require('express-jwt')

const getTokenFromHeader = req => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}

const isAuth = jwt({
  secret: process.env.TOKEN_SECRET,
  userProperty: 'something',
  getToken: req => {
    return process.env.NODE_ENV === 'test' ? getTokenFromHeader(req) : req.cookies.token || getTokenFromHeader(req)
  }
})

module.exports = {isAuth}