const jwt = require('express-jwt')

const getTokenFromHeader = req => {
  console.log(req.headers);
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}

const isAuth = jwt({
  secret: process.env.TOKEN_SECRET,
  userProperty: 'something',
  getToken: req => {
    return getTokenFromHeader(req)
  }
})

module.exports = {isAuth}