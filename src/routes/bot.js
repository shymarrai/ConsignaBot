const bot = require('../controllers/BotSearch');
const User = require('../model/Users')
const jwt = require('jsonwebtoken')


const BotRoutes = {
  getParams: async function(req, res){
    //pegando o cpf procurado no PARAMS 
    const token = req.params.token
    const username = req.params.user
    let cpf = req.body.cpf_oculto

    const selectedUser = await User.findOne({username})
    console.log('user1:',selectedUser)
    if(!token) return res.status(401).send("Acesso Negado1")
    if(!selectedUser) return res.status(401).send("Acesso Negado2")

    try{
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
      
      if(userVerified){
        return res.redirect(`/get_bot/${cpf}/${selectedUser.username}/${token}`)
      }
        
    }catch(error){
      console.log(error)
      res.redirect("/")
    }    
  },
  getBot: async function(req, res){
    let cpf = req.params.cpf
    let username = req.params.user
    let token = req.params.token
    let valueUndefined = 0
    try{
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
      if(userVerified){

        await bot(cpf).then((result) => {
          //enviando os resultados da pesquisa
         // result = JSON.stringify(result).then(e => console.log(e)).catch(err => console.log(err))
          
          res.json(result)
          // let values = result.slice(1,result.length - 1)
          values = 1
          
          //return res.redirect(`/principal/${username}/${token}/${values}`)
        }).catch((error) => res.redirect(`/principal/${username}/${token}/${valueUndefined}`));


      }

    }catch(error){
      console.log(error)
      res.redirect("/")
    }    
  }
}

module.exports = BotRoutes