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
    
    const selectedUser = await User.findOne({ username })
    if (!token) return res.status(401).send("Acesso Negado Token de acesso - Relogue")
    if (!selectedUser) return res.status(401).send("Acesso Negado Usuário desconhecido")
    if (!req.body.cpf || !req.body.operador) return res.redirect(`/principal/${selectedUser.username}/${token}`)
    
    const values = await Client.findOne({ cli_cpf: req.body.cpf }).sort( {"_id" : -1})
    const ClientOnUrl = await Client.findOne({"$and": [{cli_cpf  : req.body.cpf},{ url:  {$ne:''} }]}).sort( {"_id" : -1})
  
    var urlImage = {webViewLink: ''}
    var type = ''
    var margem = ''
    var parcela_nova = ''
    var valor_saque = ''

    if(req.body.type !== '') {
      let id = await uploadFile(req.body.cpf, req.body.type)
      urlImage = await generatePublicUrl(id)
      type = req.body.type
    }else if(req.body.type === '' && values && ClientOnUrl){
      urlImage = {webViewLink: ClientOnUrl.url}
      type = ClientOnUrl.type
    }


    Date.prototype.addHours = function (value) {
      this.setHours(this.getHours() + value);
    }

    let data = new Date()
    data.addHours(-6);

    
    if(req.body.margem){
      margem = req.body.margem

    }
    if(req.body.parcela_nova){
      parcela_nova = req.body.parcela_nova

    }
    if(req.body.valor_saque){
      valor_saque = req.body.valor_saque

    }
    

    try {
      const client = new Client({
        operador: req.body.operador,
        supervisor: req.body.supervisor,
        operacional: req.body.operacional,
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
        rf_extra_base_margem: req.body.salario,
        Agencia_Pagto: req.body.ag,
        especie: req.body.tipo,
        contacorrente: req.body.n_conta,
        meiopagto: req.body.tipo_conta,
        tipo_operacao: req.body.tipo_operacao,
        banco_origem: req.body.banco_origem,
        v_parcela: req.body.v_parcela,
        desejada: req.body.desejada,
        quitacao: req.body.quitacao,
        total_parcelas: req.body.parcelas,
        qtd_pagas: req.body.qtd_pagas,
        parcelas_restantes: req.body.prazo,
        n_contrato: req.body.contrato,
        taxa: req.body.taxa,
        status: req.body.status,
        margem: margem,
        parcela_nova:parcela_nova,
        valor_saque: valor_saque,
        b_digitado: req.body.b_digitado,
        n_proposta: req.body.n_proposta,
        v_liberado: req.body.v_liberado,
        obs: req.body.obs,
        url: urlImage.webViewLink,
        anexo: type,
        created_at: data,
      })
      console.log(`criou: ${client}`)
      await client.save()
      console.log(`salvou: ${client}`)
      res.send(`CLIENTE SALVO <a href='/principal/${selectedUser.username}/${token}'>voltar</a>`)
    } catch (error) {

      res.redirect(`/principal/${selectedUser.username}/${token}`)
    }
  },
  search: async function (req, res) {
    const token = req.params.token
    const username = req.params.user
    const cpfClient = req.body.cpf_search

    const values = await Client.findOne({ cli_cpf: cpfClient }).sort( {"_id" : -1})
    const ClientOnUrl = await Client.findOne({"$and": [{cli_cpf  : cpfClient},{ url:  {$ne:''} }]}).sort( {"_id" : -1})

    const selectedUser = await User.findOne({ username })

    if (!req.body.cpf_search) return res.redirect(`/principal/${selectedUser.username}/${token}`)
    if(!selectedUser)return res.redirect(`/principal/${selectedUser.username}/${token}`)
    if(!values)return res.redirect(`/principal/${selectedUser.username}/${token}`)

    if(values.url === '' && ClientOnUrl?.url){
      values.url = ClientOnUrl.url
      
    }else if(values.anexo === '' && ClientOnUrl?.anexo){
      values.anexo = ClientOnUrl.anexo
    }

    
    return res.render('principal', { user: selectedUser, token, values })

  }

}



module.exports = ClientController




/* try {
  const client = new Client({
    operador: req.body.operador,
    supervisor: req.body.supervisor,
    operacional: req.body.operacional,
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
    rf_extra_base_margem: req.body.salario,
    Agencia_Pagto: req.body.ag,
    especie: req.body.tipo,
    contacorrente: req.body.n_conta,
    meiopagto: req.body.tipo_conta,
    tipo_operacao: req.body.tipo_operacao,
    info1: req.body.banco_origem,
    v_parcela: req.body.v_parcela,
    desejada: req.body.desejada,
    info6: req.body.quitacao,
    info3: req.body.parcelas,
    qtd_pagas: req.body.qtd_pagas,
    info5: req.body.prazo,
    info8: req.body.contrato,
    info9: req.body.taxa,
    v_liberado: req.body.v_liberado,
    status: req.body.status,
    b_digitado: req.body.b_digitado,
    n_proposta: req.body.n_proposta,
    v_liberado: req.body.v_liberado,
    obs: req.body.obs,
    url: urlImage.webViewLink,
    anexo: type,
    created_at: data,
  }) */