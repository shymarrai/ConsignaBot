const { encode, decode } = require('url-encode-decode')
const jwt = require('jsonwebtoken')
const User = require('../model/Users')

const ClientController = {
  save: async function(req, res){
    const token = req.params.token
    const username = req.params.user
    const anexo = req.body.anexo

    // AUTENTICAÇÃO
    const selectedUser = await User.findOne({username})
    
    if(!token) return res.status(401).send("Acesso Negado1")
    if(!selectedUser) return res.status(401).send("Acesso Negado2")
    

    try{
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
      if(userVerified){
        return res.send(anexo)
      }
    }catch(error){
      console.log(error)
      res.redirect("/")
    }
  }

}



module.exports = ClientController