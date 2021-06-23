const express = require('express');
const path = require('path')
const UserController = require('../controllers/UserController')
const ClientController = require('../controllers/ClientController')
const botRouter = require('./bot')
const multer = require('multer')
const multerConfig = require('../config/multer')
var bodyParser = require('body-parser')

require('dotenv').config()
const app = express();


var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/', UserController.logar)
app.post('/', UserController.login)

app.get('/register', UserController.register)
app.post('/register',UserController.save)

app.use('/principal/:user/:token',jsonParser,UserController.principal)


// app.post('/consigna_bot', botRoutes.getParams)
app.use('/consigna_bot/:user/:token',botRouter.getParams)
app.get('/get_bot/:cpf/:user/:token', botRouter.getBot)



app.post('/save_data_client/:user/:token',urlencodedParser, ClientController.save)
app.post('/search_client/:user/:token', ClientController.search)

app.use("/files", express.static(path.resolve(__dirname, "..", "..", "public", "uploads")))
// app.get('/consigna_bot/:cpf', botRoutes.getBot)

app.use('/logout',UserController.logout)




module.exports = app