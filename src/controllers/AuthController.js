
const jwt = require('jsonwebtoken')

module.exports = function (req, res,next){
  const token = req.header('Access-Control')
  if(!token) return res.status(401).redirect("/")

  try{
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
    console.log(userVerified)
    req.user = userVerified
    next()
  }catch(error){
    res.redirect("/")
  }
  
}