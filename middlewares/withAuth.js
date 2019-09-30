const jwt = require('jsonwebtoken');

const withAuth = (req, res, next) => {
  const token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  if (!token)
    res.status(401).json('Unauthorized: No token provided')
  else {
    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
      if (err)
        res.status(401).json('Unauthorized: Invalid token')
      else {
        req.user = {
          _id: decoded._id,
          firstName: decoded.firstName,
          secondName: decoded.secondName
        }
        next()
      }
    })
  }
}

module.exports = withAuth