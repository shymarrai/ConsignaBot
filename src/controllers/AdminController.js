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
const headingColumnsNames = ['Criado','Supervisor', 'Operacional', "Nome","CPF",	"Nº Benefício","Tipo de Operação"	,"Banco Origem","Valor Parcela" ,"Quitação" ,	"Parcelas Restantes", "Contrato","Taxa","Status","Obs"]
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

    const operacional = req.body.filtro_operacional
    const status = req.body.filtro_status
    const supervisor = req.body.filtro_supervisor

    const selectedUser = await User.findOne({ username })

    if (!token) return res.status(401).send("Acesso Negado")
    if (!selectedUser) return res.status(401).send("Acesso Negado")
    if(!selectedUser.admin) return res.status(401).send("Acesso Negado")
    if(!de) return res.redirect(`/relatorio/${selectedUser.username}/${token}`)
    if(!ate) return res.redirect(`/relatorio/${selectedUser.username}/${token}`)

    // {"$and": [{cli_cpf  : cpfClient},{ url:  {$ne:''} }]}
    try {  
      const filtroOperacional =  (operacional !== 'todos') ? {"operacional": operacional} : {}
      const filtroSupervisor =  (supervisor !== 'todos') ? {"supervisor": supervisor} : {}
      const filtroStatus =  (status !== 'todos') ? {"status": status} : {}
      
      const result = await Client.find({"$and": [{"created_at": { "$gte" : de , "$lte" : ate}},filtroOperacional,filtroSupervisor,filtroStatus] }).sort({"_id" : -1})


      if(result.length <= 0) return res.send(`Resultado Vazio <a href='/relatorio/${selectedUser.username}/${token}'>Voltar</a>`)
      
      let headingColumnsIndex = 1
      headingColumnsNames.forEach( heading => {
        ws.cell(1,headingColumnsIndex++).string(heading)
      })




      // ['Criado', 'Operador', 'Supervisor', "Nome","CPF"	,"Data Nasc.",
      // "Endereço", "Bairro"	,"Cidade",	"UF",	"CEP",	"Contato1",	"Contato2",	
      // "Nº Benefício",	"Banco",	"Agência",	"Tipo",	"Nº Conta",	"Tipo Conta",	

      // "Banco origem",	"Data Inicio",	"Quitação",	"Valor Parcelas",	"Total Parcelas", 
      // "Parcelas restantes","Contrato", "Qtd Pagas", "Contrato", "Taxa",	"Status","Obs"]

      let rowIndex = 2;
      result.forEach(record => {
        ws.cell(rowIndex, 1).string(String(record['created_at']))        
        ws.cell(rowIndex, 2).string(String(record['supervisor']))        
        ws.cell(rowIndex, 3).string(String(record['operacional']))        
        ws.cell(rowIndex, 4).string(String(record['cli_nome']))        
        ws.cell(rowIndex, 5).string(String(record['cli_cpf']))        
        ws.cell(rowIndex, 6).string(String(record['cli_matricula']))       /* n beneficio */        
        ws.cell(rowIndex, 7).string(String(record['tipo_operacao']))        /*tipo de operacao  */
        ws.cell(rowIndex, 8).string(String(record['banco_origem']))       /* banco origem  */
        ws.cell(rowIndex, 9).string(String(record['v_parcela']))  /* valor parcelas */
        ws.cell(rowIndex, 10).string(String(record['quitacao']))  /* quitacao */
        ws.cell(rowIndex, 11).string(String(record['parcelas_restantes']))   /* parcelas restantes */
        ws.cell(rowIndex, 12).string(String(record['n_contrato']))     /* contrato */  
        ws.cell(rowIndex, 13).string(String(record['taxa']))        /* taxa */            
        ws.cell(rowIndex, 14).string(String(record['status']))         /* status */  
        ws.cell(rowIndex, 15).string(String(record['obs']))        /* obs */
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


/*  ws.cell(rowIndex, 19).string(String(record['tipo_operacao']))        
ws.cell(rowIndex, 20).string(String(record['info1'])) // banco origem    
ws.cell(rowIndex, 22).string(String(record['info6']))  // quitacao 
ws.cell(rowIndex, 23).string(String(record['v_parcela']))  // valor parcelas 
ws.cell(rowIndex, 24).string(String(record['info3']))  // total parcelas 
ws.cell(rowIndex, 25).string(String(record['info5']))   // parcelas restantes 
ws.cell(rowIndex, 26).string(String(record['qtd_pagas']))     // qtd pagas  
ws.cell(rowIndex, 26).string(String(record['desejada']))     // qtd pagas  
ws.cell(rowIndex, 27).string(String(record['info8']))     // contrato 
ws.cell(rowIndex, 28).string(String(record['info9']))        // taxa    
ws.cell(rowIndex, 28).string(String(record['v_liberado']))        // taxa        
ws.cell(rowIndex, 29).string(String(record['status']))         // status      
ws.cell(rowIndex, 30).string(String(record['obs']))        // obs 

**/