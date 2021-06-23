const bot = require('../controllers/BotSearch');
const User = require('../model/Users')
const jwt = require('jsonwebtoken')

const BotRoutes = {
  getParams: async function (req, res) {
    //pegando o cpf procurado no PARAMS 
    const token = req.params.token
    const username = req.params.user
    let cpf = req.body.cpf_oculto


    const selectedUser = await User.findOne({ username })

    if (!token) return res.status(401).send("Acesso Negado1")
    if (!selectedUser) return res.status(401).send("Acesso Negado2")
    if (!cpf) return res.redirect(`/principal/${selectedUser.username}/${token}`)

    try {
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)

      if (userVerified) {
        return res.redirect(`/get_bot/${cpf}/${selectedUser.username}/${token}`)
      }

    } catch (error) {
      console.log(error)
      res.redirect("/")
    }
  },
  getBot: async function (req, res) {
    let cpf = req.params.cpf
    let username = req.params.user
    let token = req.params.token
    const selectedUser = await User.findOne({ username })

    try {
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)

      if (userVerified) {

        await bot(cpf, selectedUser.sigplay_user, selectedUser.sigplay_pass).then((result) => {
          //enviando os resultados da pesquisa          
            //TRANSFORMANDO EM OS [NAMES] ATRIBUTOS EM KEYS E OS VALUES EM DADOS PARA USAR COMO OBJETO
            const resultado = result.reduce((curr, item) => {
              const [key, ...values] = item?.split(':')
              return { ...curr, [key]: values?.join(':') }

            }, {})
            console.log(resultado)            
            return res.render("principal", { user: selectedUser, token, values: resultado })
          


        }).catch((error) => res.send(error));
      }

    } catch (error) {
      console.log(error)
      res.redirect("/")
    }
  }
}

module.exports = BotRoutes