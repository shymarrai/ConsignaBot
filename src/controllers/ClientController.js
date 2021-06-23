const User = require('../model/Users')
const Client = require('../model/Clients')
const { google } = require('googleapis')
const path = require('path')
const fs = require('fs')
require('dotenv').config()


const CLIENT_ID = process.env.CLIENT_ID_DRIVE
const CLIENT_SECRET = process.env.CLIENT_SECRET_DRIVE
const REDIRECT_URI = process.env.REDIRECT_URI_DRIVE

const REFRESH_TOKEN = process.env.REFRESH_TOKEN_DRIVE


const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
})

async function uploadFile(name, type) {

  const filePath = path.join(__dirname, '..', '..', 'public', 'uploads', `${name}.${type}`)

  try {
    const response = await drive.files.create({
      requestBody: {
        name: `${name}.${type}`,
        mimeType: ['image/jpeg', 'image/jpg', 'image/png', `image/${type}`]
      },
      media: {
        mimeType: ['image/jpeg', 'image/jpg', 'image/png', `image/${type}`],
        body: fs.createReadStream(filePath)
      }
    })
    return response.data.id
  } catch (e) {
    console.log(e)
  }
}


async function generatePublicUrl(id) {
  try {
    const fileId = `${id}`;
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    })
    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink'
    })
    return result.data
  } catch (e) {
    console.log(e)
  }
}






const ClientController = {
  save: async function (req, res) {
    const token = req.params.token
    const username = req.params.user

    // AUTENTICAÇÃO
    console.log(`salvando `)
    const selectedUser = await User.findOne({ username })

    if (!token) return res.status(401).send("Acesso Negado Token de acesso - Relogue b")
    if (!selectedUser) return res.status(401).send("Acesso Negado Usuário desconhecido")
    //if (!req.body.cpf || !req.body.operador) return res.redirect(`/principal/${selectedUser.username}/${token}`)
    
    console.log(`user: ${selectedUser} `)
    console.log(`token: ${selectedUser} `)
    console.log(`cpf: ${req.body.cpf}  e oper: ${req.body.operador}`)

    if (req.body.type && req.body.cpf) {
      let id = await uploadFile(req.body.cpf, req.body.type)
      var urlImage = await generatePublicUrl(id)
    }


    try {
      const client = new Client({
        operador: req.body.operador,
        cli_nome: req.body.nome,
        cli_cpf: req.body.cpf,
        cli_data_nasc: req.body.dt_nasc,
        ENDERECO: req.body.end,
        BAIRRO: req.body.bairro,
        CIDADE: req.body.municipio,
        UF_ENDERECO: req.body.uf,
        CEP: req.body.cep,
        contato1: req.body.tel,
        contato2: req.body.cel,
        cli_matricula: req.body.n_beneficio,
        Banco: req.body.banco,
        Agencia_Pagto: req.body.ag,
        especie: req.body.tipo,
        contacorrente: req.body.n_conta,
        meiopagto: req.body.tipo_conta,
        info1: req.body.banco_origem,
        info2: req.body.data_inicio,
        info6: req.body.quitacao,
        info3: req.body.parcelas,
        info5: req.body.prazo,
        info8: req.body.contrato,
        info9: req.body.taxa,
        status: req.body.status,
        obs: req.body.obs,
        url: urlImage.webViewLink,
        anexo: req.body.type
      })
      await client.save()
      res.send(`CLIENTE SALVO <a href='/principal/${selectedUser.username}/${token}'>voltar</a>`)
    } catch (error) {

      res.redirect(`/`)
    }
  },
  search: async function (req, res) {
    const token = req.params.token
    const username = req.params.user
    const cpfClient = req.body.cpf_search


    const values = await Client.findOne({ cli_cpf: cpfClient }).sort({ "_id": -1 })
    const selectedUser = await User.findOne({ username })

    if (!req.body.cpf_search) return res.redirect(`/principal/${selectedUser.username}/${token}`)


    return res.render('principal', { user: selectedUser, token, values })

  }

}



module.exports = ClientController