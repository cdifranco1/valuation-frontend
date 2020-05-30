const jwt = require('jsonwebtoken')
const OktaJwtVerifier = require("@okta/jwt-verifier")


const authorization = async (req, res, next) => {
  const authErr = { message: "Invalid credentials."}
  const jwtVerifier = new OktaJwtVerifier({
    issuer: "https://dev-712850.okta.com/oauth2/default"
  })
 
  const userIdToken = req.cookies.token
  const { userId } = jwt.decode(userIdToken)
  req.userId = userId
  
  const accessToken = req.headers.authorization

  try {
    const valid = await jwtVerifier.verifyAccessToken(accessToken, "api://default")
    
    if (!valid) return res.status(401).json(authErr)

    next()

  } catch(err){
    "running"
    next(err)
  }
}

module.exports = authorization