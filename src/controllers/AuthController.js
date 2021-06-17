const jwt = require('jsonwebtoken')

module.exports = function (req, res,next){
  const token = req.params.token
  if(!token) return res.status(401).send("Acesso Negado")

  try{
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = userVerified
    next()
  }catch(error){
    console.log(error)
    res.redirect("/")
  }
  
}