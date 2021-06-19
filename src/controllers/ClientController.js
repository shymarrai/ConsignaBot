
const jwt = require('jsonwebtoken')
const User = require('../model/Users')
const Client = require('../model/Clients')

const ClientController = {
  save: async function(req, res){
    const token = req.params.token
    const username = req.params.user

    // AUTENTICAÇÃO
    const selectedUser = await User.findOne({username})

    if(!token) return res.status(401).send("Acesso Negado Token de acesso - Relogue")
    if(!selectedUser) return res.status(401).send("Acesso Negado Usuário desconhecido")
    if(!req.body.cpf || !req.body.operador) return res.redirect(`/principal/${selectedUser.username}/${token}`)
    try{
        const client = new Client({
          operador:  req.body.operador ,
          cli_nome:   req.body.nome ,
          cli_cpf:  req.body.cpf ,
          cli_data_nasc: req.body.dt_nasc,
          ENDERECO:  req.body.end ,
          BAIRRO: req.body.bairro ,
          CIDADE:   req.body.municipio ,
          UF_ENDERECO:  req.body.uf ,
          CEP:  req.body.cep ,
          contato1:  req.body.tel ,
          contato2:  req.body.cel ,
          cli_matricula:  req.body.n_beneficio ,
          Banco:  req.body.banco ,
          Agencia_Pagto:  req.body.ag ,
          especie:  req.body.tipo ,
          contacorrente:  req.body.n_conta ,
          meiopagto:  req.body.tipo_conta ,
          info1:  req.body.banco_origem ,
          info2:  req.body.data_inicio ,
          info6:  req.body.quitacao ,
          info3:  req.body.parcelas ,
          info5:  req.body.prazo ,
          info8:  req.body.contrato ,
          info9:  req.body.taxa ,
          status:  req.body.status ,
          obs: req.body.obs,
          anexo: req.body.type
        })
        await client.save()
        res.send(`CLIENTE SALVO <a href='/principal/${selectedUser.username}/${token}'>voltar</a>`)
    }catch(error){
      
      res.redirect(`/principal/${selectedUser.username}/${token}`)
    }
  },
  search: async function(req, res){
    const token = req.params.token
    const username = req.params.user
    const cpfClient = req.body.cpf_search
    

    const values = await Client.findOne({cli_cpf: cpfClient}).sort({ "_id":-1})
    const selectedUser = await User.findOne({username})

    if(!req.body.cpf_search)return res.redirect(`/principal/${selectedUser.username}/${token}`)

    
    return res.render('principal',{user: selectedUser, token,values})

  }

}



module.exports = ClientController