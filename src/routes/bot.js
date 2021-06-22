const bot = require('../controllers/BotSearch');
const User = require('../model/Users')
const jwt = require('jsonwebtoken')
const fs = require('fs');



const BotRoutes = {
  getParams: async function (req, res) {
    //pegando o cpf procurado no PARAMS 
    const token = req.params.token
    const username = req.params.user
    let cpf = req.body.cpf_oculto


    const selectedUser = await User.findOne({ username })
    console.log('user1:', selectedUser)
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
          const filePath = `${__dirname}/../model/json/${cpf}.json`

          fs.writeFile(filePath, JSON.stringify(result, null, 2), err => {
            if (err) throw new Error("Erro na criação do objeto JSON")

          })
          fs.readFile(`${__dirname}/../model/json/${cpf}.json`, 'utf8', (error, data) => {

            //caso haja erro mostra no terminal
            if (error) {
              console.log('erro', error)
            }

            //se está tudo ok... converte o json 
            let fileConvert = JSON.parse(data)

            res.send(`bom ${fileConvert} e ${data}`)
            const result = fileConvert.reduce((curr, item) => {
              const [key, ...values] = item?.split(':')
              return { ...curr, [key]: values?.join(':') }


            }, {})
            res.send(`quase`)
            return res.render("principal", { user: selectedUser, token, values: result })
          })


        }).catch((error) => res.send(error));
      }

    } catch (error) {
      console.log(error)
      res.redirect("/")
    }
  }
}

module.exports = BotRoutes