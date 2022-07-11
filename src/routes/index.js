const express = require('express');
const path = require('path')
const UserController = require('../controllers/UserController')
const ClientController = require('../controllers/ClientController')
const Admin = require('../controllers/AdminController')
const botRouter = require('./bot')
const multer = require('multer')
const multerConfig = require('../config/multer')


require('dotenv').config()
const app = express();

// create application/x-www-form-urlencoded parser
app.use(express.json());
app.use(express.urlencoded());

app.get('/', UserController.logar)
app.post('/', UserController.login)

app.get('/register', UserController.register)
app.post('/register',UserController.save)

app.use('/principal/:user/:token',UserController.principal)


// app.post('/consigna_bot', botRoutes.getParams)
app.use('/consigna_bot/:user/:token',botRouter.getParams)
app.get('/get_bot/:cpf/:user/:token', botRouter.getBot)



app.post('/save_data_client/:user/:token',multer(multerConfig).single('anexo'), ClientController.save)
app.post('/search_client/:user/:token', ClientController.search)
app.get('/search_client/:user/:token/:idItem', ClientController.searchForm)

app.use("/files", express.static(path.resolve(__dirname, "..", "..", "public", "uploads")))
// app.get('/consigna_bot/:cpf', botRoutes.getBot)

app.get('/relatorio/:user/:token', Admin.dash)
app.post('/generate/:user/:token', Admin.generate)

app.use('/logout',UserController.logout)

app.use('/reset/',UserController.resetPass)

app.get('/download', async function(req, res){
  const file = `${__dirname}/../../Export.xlsx`;
  if(file){
    res.download(file); 
  }else{
    res.send("Sem arquivo gerado!")
  }
});





module.exports = app