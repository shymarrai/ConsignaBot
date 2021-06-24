const User = require('../model/Users')
const jwt = require('jsonwebtoken')
const Client = require('../model/Clients')
const xl = require('excel4node')
const wb = new xl.Workbook()
var data = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
dataAtual = dia + '/' + mes + '/' + ano;

const ws = wb.addWorksheet(`${String(dataAtual)}`)
const headingColumnsNames = ['Criado', 'Operador', 'Supervisor', "Nome","CPF"	,"Data Nasc.",	"Endereço", "Bairro"	,"Cidade",	"UF",	"CEP",	"Contato1",	"Contato2",	"Nº Benefício",	"Banco",	"Agência",	"Tipo",	"Nº Conta",	"Tipo Conta",	"Banco origem",	"Data Inicio",	"Quitação",	"Parcelas",	"Restantes",	"Contrato",	"Taxa",	"Status","Obs"]
const Admin = {
  dash: async function (req, res) {
    const token = req.params.token
    const username = req.params.user
    const result = ''
    const selectedUser = await User.findOne({ username })

    if (!token) return res.status(401).send("Acesso Negado")
    if (!selectedUser) return res.status(401).send("Acesso Negado")
    if(!selectedUser.admin) return res.status(401).send("Acesso Negado")

    try {
      const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
      if (userVerified) {
        return res.render('relatorio', {user: selectedUser, token, result})
      }
    }catch(e){
      return res.redirect('/')
    }


  },
  generate: async function (req, res) {
    const token = req.params.token
    const username = req.params.user
    const de = req.body.de
    const ate = req.body.ate

    const selectedUser = await User.findOne({ username })

    if (!token) return res.status(401).send("Acesso Negado")
    if (!selectedUser) return res.status(401).send("Acesso Negado")
    if(!selectedUser.admin) return res.status(401).send("Acesso Negado")
    if(!de) return res.redirect(`/relatorio/${selectedUser.username}/${token}`)
    if(!ate) return res.redirect(`/relatorio/${selectedUser.username}/${token}`)


    try {
      const result = await Client.find({"created_at": { "$gte" : de , "$lte" : ate}})
      if(result.length <= 0) return res.send(`Resultado Vazio <a href='/relatorio/${selectedUser.username}/${token}'>Voltar</a>`)
      
      let headingColumnsIndex = 1
      headingColumnsNames.forEach( heading => {
        ws.cell(1,headingColumnsIndex++).string(heading)
      })
      
      let rowIndex = 2;
      result.forEach(record => {
        ws.cell(rowIndex, 1).string(String(record['created_at']))        
        ws.cell(rowIndex, 2).string(String(record['operador']))        
        ws.cell(rowIndex, 3).string(String(record['supervisor']))        
        ws.cell(rowIndex, 4).string(String(record['cli_nome']))        
        ws.cell(rowIndex, 5).string(String(record['cli_cpf']))        
        ws.cell(rowIndex, 6).string(String(record['cli_data_nasc']))        
        ws.cell(rowIndex, 7).string(String(record['ENDERECO']))        
        ws.cell(rowIndex, 8).string(String(record['BAIRRO']))        
        ws.cell(rowIndex, 9).string(String(record['CIDADE']))        
        ws.cell(rowIndex, 10).string(String(record['UF_ENDERECO']))        
        ws.cell(rowIndex, 11).string(String(record['CEP']))        
        ws.cell(rowIndex, 12).string(String(record['contato1']))        
        ws.cell(rowIndex, 13).string(String(record['contato2']))        
        ws.cell(rowIndex, 14).string(String(record['cli_matricula']))        
        ws.cell(rowIndex, 15).string(String(record['Banco']))        
        ws.cell(rowIndex, 16).string(String(record['Agencia_Pagto']))        
        ws.cell(rowIndex, 17).string(String(record['especie']))        
        ws.cell(rowIndex, 18).string(String(record['contacorrente']))        
        ws.cell(rowIndex, 19).string(String(record['meiopagto']))        
        ws.cell(rowIndex, 20).string(String(record['info1']))        
        ws.cell(rowIndex, 21).string(String(record['info2']))        
        ws.cell(rowIndex, 22).string(String(record['info6']))        
        ws.cell(rowIndex, 23).string(String(record['info3']))        
        ws.cell(rowIndex, 24).string(String(record['info5']))        
        ws.cell(rowIndex, 25).string(String(record['info8']))        
        ws.cell(rowIndex, 26).string(String(record['info9']))               
        ws.cell(rowIndex, 27).string(String(record['status']))               
        ws.cell(rowIndex, 28).string(String(record['obs']))        
        rowIndex++
      })

      await wb.write('Export.xlsx')
      
      res.render("relatorio", {user: selectedUser, token, result})

    }catch(e){
      console.log(e)
      return res.redirect(`/relatorio/${selectedUser.username}/${token}`)
    }
  }
}

module.exports = Admin