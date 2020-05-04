const jwt = require('jsonwebtoken')


const authorization = async (req, res, next) => {
  const authErr = { message: "Invalid credentials."}
 
  const { token } = req.cookies

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json(authErr)
      
      req.userId = decoded.userId
      
      next()
    })

  } catch(err){
    next(err)
  }
}

module.exports = authorization